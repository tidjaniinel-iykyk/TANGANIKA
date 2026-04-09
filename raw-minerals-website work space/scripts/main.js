// Small script for the static demo site
document.addEventListener('DOMContentLoaded', function(){
  // Small site interactions: reveal hero and sections as they come into view
  console.log('RMR site: scripts loaded');

  // reveal hero immediately with a tiny delay
  const hero = document.querySelector('.hero-content');
  if(hero){ setTimeout(()=>hero.classList.add('is-visible'), 180); }

  // Intersection observer to reveal .section elements
  const sections = document.querySelectorAll('.section');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      });
    }, {threshold: 0.16});

    sections.forEach(s => observer.observe(s));
  } else {
    // fallback: show all
    sections.forEach(s => s.classList.add('is-visible'));
  }

  // subtle parallax for hero background
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    // If a data-bg is present, lazy load the hero image for faster first paint
    const heroSrc = heroBg.getAttribute('data-bg');
    if(heroSrc){
      // load gradually (small timeout improves perceived load, hero preloaded in head so this is usually fast)
      const img = new Image();
      img.src = heroSrc;
      img.onload = () => {
        heroBg.style.backgroundImage = `linear-gradient(180deg,rgba(4,6,8,0.55), rgba(4,6,8,0.55)), url('${heroSrc}')`;
        // set a slightly reduced filter once loaded for visual clarity
        heroBg.style.filter = 'grayscale(4%) contrast(1.02) saturate(1.02)';
      };
    }

    // parallax effect (independent of load)
    let lastY = 0, ticking = false;
    function onScroll(){
      lastY = window.scrollY; if(!ticking){ requestAnimationFrame(()=>{
        const offset = Math.max(0, Math.min(120, lastY * 0.18));
        heroBg.style.backgroundPosition = `center calc(50% + ${offset}px)`;
        ticking = false;
      }); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Smooth in-page anchors: if a link points to the current page + hash, scroll smoothly instead of reloading
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    // ignore special links
    if(a.hasAttribute('download') || a.target === '_blank' || a.getAttribute('href')?.startsWith('mailto:')) return;

    let href = a.getAttribute('href') || '';
    // If it's a plain hash link (e.g., '#dd-framework') or a same-page URL, handle smoothly
    try {
      const url = new URL(href, location.href);
      if(url.origin === location.origin && url.pathname === location.pathname && url.hash){
        const id = url.hash.slice(1);
        if(!id) return;
        const target = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
        if(target){
          e.preventDefault();
          // Use smooth behavior and ensure element receives focus for accessibility
          target.scrollIntoView({behavior:'smooth', block:'start'});
          target.setAttribute('tabindex', '-1'); // ensure focusable
          target.focus({preventScroll:true});
          // remove tabindex if it wasn't present initially
          setTimeout(()=>{ if(target.getAttribute('tabindex') === '-1') target.removeAttribute('tabindex'); }, 1200);
        }
      }
    } catch(err){ /* if URL parsing fails, ignore */ }
  }, {passive:false});

  // lazy load background images for elements with data-bg (rwanda-photo, process-photo etc.)
  const bgElements = document.querySelectorAll('[data-bg]');
  if('IntersectionObserver' in window){
    const bgObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e => {
        if(e.isIntersecting){
          const el = e.target;
          const src = el.getAttribute('data-bg');
          if(src){
            const img = new Image();
            img.src = src;
            img.onload = () => {
              // set background with existing gradient preserved
              const current = getComputedStyle(el).backgroundImage;
              // replace only if gradient-only currently
              el.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), url('${src}')`;
              bgObserver.unobserve(el);
            };
          }
        }
      });
    }, {threshold: 0.2});

    bgElements.forEach(el => bgObserver.observe(el));
  } else {
    bgElements.forEach(el => {
      const src = el.getAttribute('data-bg');
      if(src){ el.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), url('${src}')`; }
    });
  }
});
