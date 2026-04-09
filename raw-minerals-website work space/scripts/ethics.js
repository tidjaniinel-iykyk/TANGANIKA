// Page-specific interactions for ethics/due-diligence timeline and accordion
document.addEventListener('DOMContentLoaded', function(){
  const timeline = document.getElementById('timeline');
  if(!timeline) return;

  const nodes = timeline.querySelectorAll('.timeline-node');
  const details = timeline.querySelectorAll('.timeline-details .detail');

  function activate(step){
    nodes.forEach(n=> n.classList.toggle('active', n.dataset.step === String(step)) );
    details.forEach(d=> d.classList.toggle('active', d.id === `step-${step}`));
    // Ensure focused node is visible
    const activeNode = [...nodes].find(n => n.dataset.step === String(step));
    if(activeNode){ activeNode.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}); }
  }

  // initial
  activate(1);

  nodes.forEach(n=>{
    const step = n.dataset.step;
    n.addEventListener('click', ()=> activate(step));
    n.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(step); } });
  });

  // Mobile: make timeline details collapsible / accordion style
  function setupAccordion(){
    if(window.innerWidth <= 700){
      details.forEach(d => {
        // If header isn't created, attach a mobile header
        if(!d.previousElementSibling || !d.previousElementSibling.classList.contains('mobile-toggle')){
          const header = document.createElement('button');
          header.type = 'button';
          header.className = 'mobile-toggle';
          header.innerText = d.querySelector('h3').innerText;
          header.addEventListener('click', ()=>{
            const open = d.classList.toggle('active');
            header.setAttribute('aria-expanded', open ? 'true' : 'false');
            // close siblings
            details.forEach(x=>{ if(x !== d) x.classList.remove('active'); });
          });
          d.parentNode.insertBefore(header, d);
        }
      });
      // close all details initially for mobile
      details.forEach(d=> d.classList.remove('active'));
    }
  }

  setupAccordion();
  window.addEventListener('resize', ()=> setupAccordion());

  // Smooth scroll for 'Explore Our Framework' anchor
  const exploreBtn = document.getElementById('explore-framework');
  if(exploreBtn){
    exploreBtn.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector('#dd-framework').scrollIntoView({behavior:'smooth'});
    });
  }
});
