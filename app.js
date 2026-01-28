// سنة الفوتر
document.getElementById('y').textContent = new Date().getFullYear();

/* =========================
  HERO LOGO TILT (mouse move)
========================= */
(function(){
  const wrap = document.getElementById('heroLogoWrap');
  const tilt = document.getElementById('heroLogoTilt');
  if(!wrap || !tilt) return;

  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    tilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
})();

/* =========================
  SERVICES SLIDER
========================= */
const slides = [
  {
    title: "AI Solutions",
    desc: "Chatbots, AI agents, and computer vision systems built to solve real business problems.",
    tags: ["AI Agents","Chatbots","Computer Vision","Intelligent Systems"],
    image: "images/services/01-ai-solutions.jpg"
  },
  {
    title: "Applications with AI",
    desc: "Smart AI-powered applications tailored to real-world needs and scalable deployment.",
    tags: ["Smart Apps","AI Powered","Custom Systems","Deployment"],
    image: "images/services/02-applications-ai.jpg"
  },
  {
    title: "Automations",
    desc: "Workflow automation and system integrations that save time and reduce cost.",
    tags: ["Automation","Workflows","Integrations","Efficiency"],
    image: "images/services/03-automations.jpg"
  },
  {
    title: "Interactive Web",
    desc: "Fast, clean, and interactive web experiences focused on UX and conversion.",
    tags: ["UX","Performance","Motion UI","Modern Web"],
    image: "images/services/04-interactive-web.jpg"
  },
  {
    title: "Business Intelligence",
    desc: "Dashboards and analytics that turn data into actionable insights.",
    tags: ["Dashboards","Analytics","Insights","Data"],
    image: "images/services/05-business-intelligence.jpg"
  }
];

const slider = document.getElementById("slider");
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let active = 0;
let autoplay = true;
let timer = null;

function stopAutoplay(){
  autoplay = false;
  if(timer) clearInterval(timer);
}

function renderDots(){
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === active ? " active" : "");
    d.addEventListener("click", () => {
      stopAutoplay();
      goTo(i, i > active ? "right" : "left");
    });
    dotsWrap.appendChild(d);
  });
}

function renderSlides(){
  slider.innerHTML = "";
  slides.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "slide" + (i === active ? " active" : "");

    el.innerHTML = `
      <div class="content">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="tags">${s.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <div class="visual"><img src="${s.image}" alt="${s.title}"></div>
    `;

    el.addEventListener("click", stopAutoplay);
    slider.appendChild(el);
  });
}

function update(dir){
  const all = slider.querySelectorAll(".slide");
  all.forEach((el, i) => {
    el.classList.remove("active","enter-from-right","enter-from-left");
    if(i === active){
      el.classList.add("active");
      el.classList.add(dir === "right" ? "enter-from-right" : "enter-from-left");
    }
  });

  dotsWrap.querySelectorAll(".dot")
    .forEach((d,i)=>d.classList.toggle("active", i===active));
}

function goTo(i, dir){
  active = (i + slides.length) % slides.length;
  update(dir);
}

function next(){ goTo(active + 1, "right"); }
function prev(){ goTo(active - 1, "left"); }

function start(){
  timer = setInterval(() => {
    if(autoplay) next();
  }, 2000);
}

prevBtn.addEventListener("click", () => { stopAutoplay(); prev(); });
nextBtn.addEventListener("click", () => { stopAutoplay(); next(); });

renderSlides();
renderDots();
start();

/* =========================
  WHY US ENTRY ANIMATION
========================= */
(function(){
  const cards = document.querySelectorAll('.why-card');
  if(!cards.length) return;

  const obs = new IntersectionObserver(entries => {
    if(!entries[0].isIntersecting) return;
    cards.forEach((c,i)=>setTimeout(()=>c.classList.add('is-visible'), i*70));
    obs.disconnect();
  }, { threshold: .18 });

  obs.observe(cards[0]);
})();
