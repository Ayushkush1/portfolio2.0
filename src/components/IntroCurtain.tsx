// First-visit intro for the homepage — the signature, and nothing else:
//   1. Write: the "ak" signature writes itself left → right with a soft pen edge
//   2. Glint: one band of brand-orange light sweeps through the stroke (masked to the signature)
//   3. Land:  the dark stage fades away while the signature flies onto the navbar logo
//
// Every moving part is a transform/opacity CSS animation, so it runs on the GPU compositor and
// stays smooth while the page boots underneath. The inline script only flips the phase and
// measures the logo for the flight. Plays once per session, never for reduced-motion users.
// Styles: index.css "First-visit intro".

const REVEAL_AT = 2250; // ms — after the write (≈1.55s) and the glint (≈2.15s)
const DONE_AT = REVEAL_AT + 1150;

const INTRO_SCRIPT = `(function(){try{
  if(location.pathname!=='/'||sessionStorage.getItem('ak-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var d=document.documentElement;
  d.dataset.intro='play';
  sessionStorage.setItem('ak-intro','1');
  setTimeout(function(){
    // Fly the signature from centre stage onto the navbar logo
    var s=document.querySelector('.intro-sig'), t=document.querySelector('.nav-logo img');
    if(s&&t){
      var a=s.getBoundingClientRect(), b=t.getBoundingClientRect();
      s.style.setProperty('--fx',(b.left-a.left)+'px');
      s.style.setProperty('--fy',(b.top-a.top)+'px');
      s.style.setProperty('--fs',String(b.width/a.width));
    }
    d.dataset.intro='reveal';
  },${REVEAL_AT});
  setTimeout(function(){delete d.dataset.intro},${DONE_AT});
}catch(e){}})();`;

const IntroCurtain = () => (
  <>
    <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
    <div className="intro-stage" aria-hidden="true" />

    {/* Signature: a soft-edged window slides across it (the image counter-slides, so it stays put
        and appears left → right); then an orange glint, masked to the stroke, passes through it */}
    <span className="intro-sig" aria-hidden="true">
      <span className="intro-sig-window">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/ayush-kushwaha-logo.webp" alt="" width={274} height={108} />
      </span>
      <span className="intro-sig-glint">
        <span className="intro-sig-glint-band" />
      </span>
    </span>
  </>
);

export default IntroCurtain;
