# fix_site.ps1
# Restores a corrected set of site files for Raw Minerals Ressources LTD
# Saves files under: C:\Users\user\Desktop\Nouveau dossier\mybusiness-site
# WARNING: This will overwrite files in that folder.

$project = 'C:\Users\user\Desktop\Nouveau dossier\mybusiness-site'
$assets = Join-Path $project 'assets'

# Create folders
New-Item -ItemType Directory -Path $project -Force | Out-Null
New-Item -ItemType Directory -Path $assets -Force | Out-Null

# index.html
@'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Raw Minerals Ressources LTD</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header id="site-header" class="hidden">
      <div class="container">
        <a class="logo" href="index.html">Raw Minerals Ressources LTD</a>
        <nav id="main-nav">
          <a href="about.html">About</a>
          <a href="details.html">Details</a>
        </nav>
        <button id="hamburger" aria-label="Menu">☰</button>
      </div>
    </header>

    <main>
      <section class="hero" id="hero">
        <img class="hero-img" src="assets/hero.svg" alt="Pastel gradient hero" aria-hidden="true" />
        <div class="hero-overlay">
          <h1>We craft memorable experiences</h1>
          <p class="subtitle">Local expertise • Thoughtful design • Trusted results</p>
          <a class="scroll-hint" href="#content">▼ Scroll</a>
        </div>
      </section>

      <section id="content" class="content">
        <div class="container">
          <h2>Our Approach</h2>
          <p>This single-page layout highlights our mission and reputation. Keep content concise and focused on trust and quality. Navigation appears after you start scrolling.</p>

          <h3>Services</h3>
          <p>Short bullets describing key services or strengths. For more detail use the linked pages above.</p>

          <h3>Contact</h3>
          <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
        </div>
      </section>
    </main>

    <div id="mobile-menu" class="mobile-menu" aria-hidden="true">
      <a href="about.html">About</a>
      <a href="details.html">Details</a>
      <a href="index.html">Home</a>
    </div>

    <script src="script.js"></script>
  </body>
</html>
'@ | Out-File -FilePath (Join-Path $project 'index.html') -Encoding utf8

# about.html
@'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>About — Raw Minerals Ressources LTD</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header id="site-header" class="visible">
      <div class="container">
        <a class="logo" href="index.html">Raw Minerals Ressources LTD</a>
        <nav id="main-nav">
          <a href="about.html">About</a>
          <a href="details.html">Details</a>
        </nav>
        <button id="hamburger" aria-label="Menu">☰</button>
      </div>
    </header>

    <main>
      <div class="container" style="padding-top:6rem">
        <h1>About Us</h1>

        <!-- About Us Section -->
        <section class="about-grid" aria-labelledby="who-we-are">
          <div class="about-image">
            <!-- Replace with a real mining/warehouse photo at assets/mining.jpg if you have one -->
            <img src="assets/hero.svg" alt="Mining or warehouse image" />
          </div>

          <div class="about-text">
            <h2 id="who-we-are">Who We Are</h2>
            <blockquote>
              Raw Mineral Resources Company Ltd is a leading mineral exporter based in Rwanda. With years of experience in sourcing, processing, and exporting high-quality minerals, we connect Rwandan resources with global markets. Reliability, compliance, and ethical sourcing are at the heart of everything we do.
            </blockquote>
          </div>
        </section>

        <p><a href="index.html">Back to home</a></p>
      </div>
    </main>

    <script src="script.js"></script>
  </body>
</html>
'@ | Out-File -FilePath (Join-Path $project 'about.html') -Encoding utf8

# details.html
@'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Details — Raw Minerals Ressources LTD</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header id="site-header" class="visible">
      <div class="container">
        <a class="logo" href="index.html">Raw Minerals Ressources LTD</a>
        <nav id="main-nav">
          <a href="about.html">About</a>
          <a href="details.html">Details</a>
        </nav>
        <button id="hamburger" aria-label="Menu">☰</button>
      </div>
    </header>

    <main>
      <div class="container" style="padding-top:6rem">
        <h1>Details</h1>
        <p>Here you can expand on projects, case studies, or client testimonials. Keep it focused for reputation-building.</p>
        <p><a href="index.html">Back to home</a></p>
      </div>
    </main>

    <script src="script.js"></script>
  </body>
</html>
'@ | Out-File -FilePath (Join-Path $project 'details.html') -Encoding utf8

# styles.css (full corrected)
@'
:root{
  --bg1: #f7e8ff; /* very pale purple */
  --accent1: #d7b3ff; /* pastel purple */
  --accent2: #ffd3e8; /* pastel pink */
  --text: #2b2340;
  --muted: #5b4f6a;
  --glass: rgba(255,255,255,0.6);
}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;color:var(--text);background:var(--bg1);-webkit-font-smoothing:antialiased}
.container{max-width:1000px;margin:0 auto;padding:2rem}

/* Header (hidden until scroll) */
header{position:fixed;left:0;right:0;top:0;z-index:50;transition:transform .35s ease,opacity .35s ease;padding:0.5rem 0}
header.hidden{opacity:0;transform:translateY(-15px);pointer-events:none}
header.visible{opacity:1;transform:none;pointer-events:auto}
header .container{display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:700;color:var(--text);text-decoration:none}
nav a{margin-left:1.25rem;color:var(--muted);text-decoration:none}

#hamburger{display:none;background:transparent;border:0;font-size:1.25rem}

/* Hero */
.hero{position:relative;height:100vh;overflow:hidden}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero-overlay{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;color:white}
.hero h1{font-size:2.25rem;margin:0 0 0.5rem;color:#fff;text-shadow:0 6px 18px rgba(40,20,60,0.35)}
.subtitle{opacity:0.95;margin:0 0 1.6rem}
.scroll-hint{display:inline-block;padding:.5rem .9rem;border-radius:999px;background:rgba(255,255,255,0.15);color:#fff;text-decoration:none}

/* Content */
.content{padding:4rem 0;background:linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))}

/* Mobile menu */
.mobile-menu{position:fixed;top:60px;right:16px;background:var(--glass);backdrop-filter:blur(6px);padding:1rem;border-radius:12px;display:none;flex-direction:column;gap:0.5rem;z-index:60}
.mobile-menu a{color:var(--text);text-decoration:none}

/* Responsive */
@media (max-width:800px){
  nav{display:none}
  #hamburger{display:block}
  .hero h1{font-size:1.6rem}
  .container{padding:1rem}
  .mobile-menu{display:flex}
}

/* small accessibility + polish */
a{color:var(--accent1)}

/* About two-column layout */
.about-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:2rem;
  align-items:center;
  margin:2rem 0;
}
.about-grid .about-image img{
  width:100%;
  height:auto;
  border-radius:8px;
  object-fit:cover;
  box-shadow: 0 8px 30px rgba(40,20,60,0.12);
}
.about-grid .about-text h2{margin-top:0}
.about-grid blockquote{
  margin:0;
  padding-left:1rem;
  border-left:4px solid rgba(215,179,255,0.8);
  color:var(--muted);
  line-height:1.5;
  background:rgba(255,255,255,0.02);
  padding:1rem;
  border-radius:6px;
}

/* Responsive: stack on small screens */
@media (max-width:800px){
  .about-grid{grid-template-columns:1fr;gap:1rem}
  .about-grid .about-image{order:0}
  .about-grid .about-text{order:1}
}
'@ | Out-File -FilePath (Join-Path $project 'styles.css') -Encoding utf8

# script.js (unchanged, re-write to be sure)
@'
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
    hamburger.addEventListener("click", ()=>{
      const shown = mobileMenu.getAttribute("aria-hidden") === "false";
      mobileMenu.setAttribute("aria-hidden", shown ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{
      mobileMenu.setAttribute("aria-hidden","true");
    }));
  }
})();
'@ | Out-File -FilePath (Join-Path $project 'script.js') -Encoding utf8

# hero svg placeholder
@'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffd3e8" />
      <stop offset="50%" stop-color="#f7e8ff" />
      <stop offset="100%" stop-color="#d7b3ff" />
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="80" />
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g1)" />
  <g fill-opacity="0.35" filter="url(#blur)">
    <circle cx="300" cy="200" r="220" fill="#ffd3e8" />
    <circle cx="1300" cy="250" r="200" fill="#d7b3ff" />
    <circle cx="900" cy="700" r="260" fill="#ffe6f0" />
  </g>
  <g opacity="0.06">
    <rect x="0" y="0" width="1600" height="900" fill="#000" />
  </g>
</svg>
'@ | Out-File -FilePath (Join-Path $assets 'hero.svg') -Encoding utf8

# README
@'
# Raw Minerals Ressources LTD — Simple Showcase

This is a minimal, responsive static site to showcase Raw Minerals Ressources LTD and build reputation. It uses a full-screen hero image on the homepage and two extra pages for details.

How to view locally:

Open `index.html` in your browser, or serve with a simple static server. Example (PowerShell):

```powershell
Start-Process index.html
# or
python -m http.server 8000; Start-Process http://localhost:8000