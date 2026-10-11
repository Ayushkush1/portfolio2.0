// First-visit intro for the homepage: only the "ak" signature, writing itself on a dark stage.
// As the curtain lifts to reveal the hero, the signature flies into the navbar and lands
// exactly on the logo, which then takes over. Pure HTML/CSS + a tiny inline script, so it
// covers the page from the very first paint without waiting for React to hydrate.
// Plays once per session and never for reduced-motion users (styles live in index.css).

const INTRO_SCRIPT = `(function(){try{
  if(location.pathname!=='/'||sessionStorage.getItem('ak-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var d=document.documentElement;
  d.dataset.intro='play';
  sessionStorage.setItem('ak-intro','1');
  setTimeout(function(){
    // Measure where the signature is and where the navbar logo sits, then fly between them
    var s=document.querySelector('.intro-sig'), t=document.querySelector('.nav-logo img');
    if(s&&t){
      var a=s.getBoundingClientRect(), b=t.getBoundingClientRect();
      s.style.setProperty('--fx',(b.left-a.left)+'px');
      s.style.setProperty('--fy',(b.top-a.top)+'px');
      s.style.setProperty('--fs',String(b.width/a.width));
    }
    d.dataset.intro='reveal';
  },1700);
  setTimeout(function(){delete d.dataset.intro},2750);
}catch(e){}})();`;

const IntroCurtain = () => (
  <>
    <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
    <div className="intro-curtain" aria-hidden="true" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/ayush-kushwaha-logo.webp" alt="" aria-hidden="true" className="intro-sig" width={274} height={108} />
  </>
);

export default IntroCurtain;
