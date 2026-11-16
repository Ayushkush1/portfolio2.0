import {
  C,
  Callout,
  Code,
  EventGrid,
  Figure,
  HeartbeatDiagram,
  IncidentLog,
  Lead,
  List,
  P,
  Section,
  StatStrip,
  Strong,
  Terminal,
} from "@/components/blog/post-kit";
import type { PostSection } from "@/components/blog/post-layout";

// Facts in this post come from the ServEye repository (README, agent, monitor and heartbeat code,
// commit history) and the production dashboard. Code excerpts are trimmed from the real source.

export const sections: PostSection[] = [
  { id: "quiet-failures", label: "Quiet failures" },
  { id: "why-build", label: "Why build it" },
  { id: "architecture", label: "Architecture" },
  { id: "agent", label: "The agent" },
  { id: "detection", label: "Detection" },
  { id: "alerts", label: "Alerts" },
  { id: "security", label: "Security" },
  { id: "design", label: "Design" },
  { id: "results", label: "Results" },
];

export default function BuildingServEye() {
  return (
    <>
      <div className="pt-12 md:pt-16 space-y-8">
        <Lead>
          A client website rarely goes down with a bang. A PM2 app quietly fails to start after a reboot, a disk creeps towards 100%,
          a certificate runs out on a Sunday. ServEye is the self-hosted monitor I designed and built to catch those quiet failures
          across every server and client site my team runs, and to email us the moment one happens.
        </Lead>
        <StatStrip
          stats={[
            { value: "3 days", label: "First commit to watching production" },
            { value: "30s", label: "Heartbeat from every server" },
            { value: "0", label: "Dependencies in the server agent" },
            { value: "8 · 35", label: "Servers · websites watched" },
          ]}
        />
      </div>

      <Section id="quiet-failures" title="The outages nobody notices">
        <P>
          We host dozens of client websites and CMS apps across several Linux servers, many of them Node.js apps kept alive by PM2
          behind nginx. When something fails loudly, someone notices quickly. The expensive failures are the quiet ones, because
          the first person to notice is usually the client.
        </P>
        <P>
          In its first days running, ServEye raised eight problems, and all eight were fixed. None of the ones below is a server falling
          over. They are the quiet kind:
        </P>
        <IncidentLog
          fixed={8}
          total={8}
          items={[
            { title: 'PM2 app "client-cms" is missing on Product Server', meta: "2d ago · Fixed" },
            { title: 'PM2 app "client-cms" is stopped on Product Server', meta: "2d ago · Fixed" },
            { title: 'PM2 app "client-cms" is stopped on Product Server', meta: "2d ago · Fixed" },
            { title: "mysql is activating on Client Server", meta: "2d ago · Fixed" },
          ]}
        />
        <P>
          Failures like these can look fine from the outside for a while: a static front end keeps answering while the CMS behind it is
          stopped, or a database sits in <C>activating</C> until the next write fails. That gap between &ldquo;the site responds&rdquo; and &ldquo;everything is actually working&rdquo; is what ServEye exists to close.
        </P>
      </Section>

      <Section id="why-build" title="Why an uptime checker wasn't enough">
        <P>
          External uptime services are good at one thing: requesting a URL and reporting whether it answered. That is half the picture.
          They can&apos;t see a PM2 process that crashed behind a cached page, a disk at 95%, a reboot at 3am that some apps never recovered
          from, or a stopped nginx on a server whose traffic is routed somewhere else.
        </P>
        <P>
          To see those you need eyes <Strong>inside</Strong> the server. So ServEye is two parts: a tiny agent that runs on every server and
          reports what it sees, and a dashboard that checks websites from the outside, decides what counts as a problem, and tells people.
        </P>
        <Callout label="Monitor the monitor">
          If the dashboard&apos;s own server goes down, nothing can email you. The setup guide installs the agent on the dashboard server too,
          and points a free external uptime checker at ServEye itself. External checkers still have a job, just a smaller one.
        </Callout>
      </Section>

      <Section id="architecture" title="How it fits together">
        <P>
          Every 30 seconds each agent posts a heartbeat: CPU, memory, disks, load, network, every PM2 app, the systemd services it
          watches, and request counts from nginx or Apache access logs. The dashboard stores it, compares it with the last one, and
          opens or resolves incidents.
        </P>
        <HeartbeatDiagram />
        <P>
          The dashboard is a single Next.js 16 app on PostgreSQL with Drizzle ORM. There is no separate worker process: the monitoring
          loops start from Next.js&apos;s <C>instrumentation.ts</C> hook when the server boots. Three loops do the work: offline detection
          every 15 seconds, website checks every 5 seconds for whichever sites are due (up to 20 in parallel), and an hourly cleanup of
          old metrics.
        </P>
        <P>
          Running loops inside a web app raises one obvious question: what if two instances start? Postgres answers it. Only the
          instance holding an advisory lock runs the monitors, and if that connection drops, another instance takes over.
        </P>
        <Code
          title="src/lib/monitor/scheduler.ts (simplified)"
          code={`
// Only the instance holding this Postgres advisory lock runs monitors.
const { rows } = await client.query(
  "select pg_try_advisory_lock($1) as ok", [LOCK_ID]
);
if (!rows[0]?.ok) {
  client.release();
  setTimeout(acquireLeadership, 60_000); // someone else leads; try again later
  return;
}
startLoops(); // offline checks every 15s, website checks every 5s, prune hourly
`}
        />
      </Section>

      <Section id="agent" title="An agent that costs almost nothing">
        <P>
          The agent is the part that runs on production servers, so it had one rule: it must never be the thing that causes a problem.
          It is a single Node.js file with <Strong>zero dependencies</Strong>, using only Node&apos;s built-in modules, so there is nothing to
          npm install on a production box. Adding a server is one command:
        </P>
        <Terminal
          command="curl -fsSL https://monitor.yourcompany.com/agent/install | sudo bash -s -- --token se_xxxxx"
          caption="The installer detects nginx, Apache, MySQL, MariaDB, PostgreSQL, Redis, MongoDB, Docker and every user running PM2, then registers a systemd service that restarts itself and starts on boot."
        />
        <P>
          It reads most of what it needs straight from Linux: boot time from <C>/proc/stat</C>, CPU and memory per process from{" "}
          <C>/proc/&lt;pid&gt;</C>, service state from <C>systemctl is-active</C>. The one expensive call is PM2&apos;s own CLI, so the agent
          avoids it unless something has actually changed.
        </P>
        <Code
          title="agent/serveye-agent.js"
          lang="js"
          code={`
// Starting the PM2 CLI ("pm2 jlist") costs ~0.2-0.3s of CPU, so it only runs when
// something changed (an app stopped, restarted or was added) or every 5 minutes.
// In between, liveness, CPU and memory come straight from /proc (microseconds).

/** Fingerprint of PM2's pid files and whether each process is alive. */
function pidFingerprint(pm2Home) {
  const dir = path.join(pm2Home, "pids");
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".pid"))
    .sort()
    .map((f) => {
      const pid = Number(readFile(path.join(dir, f)).trim());
      return \`\${f}=\${pid}:\${alive(pid) ? 1 : 0}\`;
    })
    .join("|");
}
`}
        />
        <Callout label="A gotcha worth knowing">
          Never run <C>pm2 jlist</C> when the PM2 daemon is down. The CLI helpfully starts a fresh, empty daemon, which hides the very
          failure you are trying to detect. The agent checks the daemon&apos;s pid file first and reports &ldquo;PM2 daemon is not running&rdquo; instead.
        </Callout>
      </Section>

      <Section id="detection" title="Knowing what &ldquo;broken&rdquo; means">
        <P>Most of the value is in the rules: what the dashboard treats as a problem, and when.</P>
        <EventGrid
          items={[
            { event: "Server down", how: "No heartbeat for 90 seconds (configurable)" },
            { event: "Server rebooted", how: "Boot time changed; the email includes the previous uptime and how long it was unreachable" },
            { event: "PM2 didn't come back", how: "The PM2 daemon isn't running for a user that had apps" },
            { event: "PM2 app stopped or missing", how: "Every app ever seen online is watched automatically, no setup" },
            { event: "Service stopped", how: "nginx, MySQL or any watched systemd unit is no longer active" },
            { event: "Disk or memory nearly full", how: "Thresholds in Settings, 90% and 95% by default" },
            { event: "Website down", how: "Wrong status, missing required text or timeout, after N failures in a row" },
            { event: "Certificate expiring", how: "Checked every 6 hours; warns 14 days before expiry" },
          ]}
        />
        <P>
          Reboots needed the most care. The agent sends the kernel&apos;s boot time with every heartbeat. If it moves by more than two
          minutes, the server rebooted, and ServEye says so, with the previous uptime. Then it waits: apps and services get a{" "}
          <Strong>three-minute grace period</Strong> to come back before anything is reported as down. Alert straight away and every planned
          restart becomes a flood of false alarms.
        </P>
      </Section>

      <Section id="alerts" title="Alerts the team can trust">
        <P>
          An alert is only useful if people still read it after a month. Three decisions keep ServEye&apos;s emails worth opening:
        </P>
        <List
          items={[
            <>Websites alert only after <Strong>several failures in a row</Strong>, so a single slow response or network blip stays quiet.</>,
            <>Every problem gets a matching <Strong>recovery email</Strong> with the total downtime, so nobody has to check whether it fixed itself.</>,
            <>Each incident is opened once and resolved once, so a server that stays down for an hour sends one email when it goes down and one when it&apos;s back, however many checks run in between.</>,
          ]}
        />
        <P>
          The heartbeat endpoint stays fast for the agent, too. It validates and stores the heartbeat, replies straight away, and does the
          comparison and any email sending afterwards with Next.js&apos;s <C>after()</C>:
        </P>
        <Code
          title="src/app/api/agent/heartbeat/route.ts (simplified)"
          code={`
const { prev, watched } = await storeHeartbeat(server, payload);

// Reply to the agent now; compare with the last state and send alerts afterwards
after(() => evaluateHeartbeat(prev, payload, watched));

return json({ ok: true, interval: 30 });
`}
        />
      </Section>

      <Section id="security" title="Built like it will be attacked">
        <P>
          A monitoring dashboard knows every server you run, so it is a tempting target. Security wasn&apos;t a later pass; it shaped the
          first version:
        </P>
        <List
          items={[
            <>Argon2id password hashing with OWASP parameters, and constant-time login, so unknown emails can&apos;t be discovered by timing.</>,
            <>Signed <C>HttpOnly</C>, <C>Secure</C>, <C>SameSite=Strict</C> session cookies that are revoked when a password changes.</>,
            <>Login rate limits per IP and per email, plus nginx limits in front.</>,
            <>A per-request nonce Content Security Policy, <C>X-Frame-Options: DENY</C>, HSTS and a CSRF origin check on every write.</>,
            <>Agent tokens are 256-bit, shown once, stored only as a SHA-256 hash, and can be rotated. Heartbeats are size-limited and schema-validated.</>,
            <>The app listens on <C>127.0.0.1</C> only, so nginx with HTTPS is the single way in.</>,
          ]}
        />
      </Section>

      <Section id="design" title="Designed for a two-second glance">
        <P>
          Monitoring tools tend to show everything at once. I wanted the opposite: open the dashboard and know within two seconds whether
          anything needs you. The overview leads with one sentence, a single status bar and three numbers: servers, websites and open
          problems.
        </P>
        <Figure
          src="/assets/ServEye_1.webp"
          alt="ServEye overview: status bar, uptime ring, website speed and recent problems"
          caption="The overview. Fixed problems stay listed, struck through, so the team sees what broke and that it was handled. (Client names blurred.)"
        />
        <P>
          The language is plain on purpose. &ldquo;Working fine&rdquo;, &ldquo;Online time&rdquo;, &ldquo;Restarts: Never&rdquo;. Anyone on the team can read a
          server&apos;s health without knowing what a load average is, and the engineers still get the full charts one click deeper.
        </P>
        <Figure
          src="/assets/ServEye_2.webp"
          alt="ServEye server detail: running time, online time, restarts, last check-in and CPU and memory charts"
          caption="A server at a glance: how long it has been up, availability, restarts and the last heartbeat, then the performance charts."
        />
        <Figure
          src="/assets/ServEye_3.webp"
          alt="ServEye website detail: response speed, online time, certificate days left and a 24-hour status bar"
          caption="Each website gets its speed, uptime, certificate countdown and a 24-hour strip you can read without a legend."
        />
      </Section>

      <Section id="results" title="Where it is now">
        <P>
          The first commit landed on 13 November 2026. Three days later ServEye was watching <Strong>8 servers and 35 websites</Strong> in
          production, and every problem it had raised was fixed. The month&apos;s uptime ring reads 99.99%.
        </P>
        <P>A few things I&apos;d carry into any system like this:</P>
        <List
          items={[
            <><Strong>Measure from inside.</Strong> The most useful signals came from the server itself, not from requesting a URL.</>,
            <><Strong>Make the cheap path the default.</Strong> Reading /proc costs microseconds; the expensive call runs only when something changed.</>,
            <><Strong>Earn trust with restraint.</Strong> Grace periods, failure thresholds and recovery emails are what make people keep reading alerts.</>,
          ]}
        />
        <Callout label="Want one for your team?">
          ServEye is built for agencies and teams that host client work on their own servers. If you want a monitor, an internal
          dashboard or any product built with this level of care, get in touch below. It comes straight to me.
        </Callout>
      </Section>
    </>
  );
}
