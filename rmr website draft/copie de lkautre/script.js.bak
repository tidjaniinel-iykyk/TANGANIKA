(() => {
  const header = document.getElementById("site-header");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  function onScroll(){
    if(!header) return;
    if(window.scrollY > 50){
      header.classList.remove("hidden");
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
      header.classList.add("hidden");
    }
  }

  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  if(hamburger && mobileMenu){
    // initialize accessible state
    if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded','false');
    if (!mobileMenu.hasAttribute('aria-hidden')) mobileMenu.setAttribute('aria-hidden','true');

    hamburger.addEventListener("click", ()=>{
      const shown = mobileMenu.getAttribute("aria-hidden") === "false";
      mobileMenu.setAttribute("aria-hidden", shown ? "true" : "false");
      hamburger.setAttribute('aria-expanded', shown ? 'false' : 'true');
    });

    mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{
      mobileMenu.setAttribute("aria-hidden","true");
      hamburger.setAttribute('aria-expanded','false');
    }));
  }
})();