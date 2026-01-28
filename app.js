// =========================
// FOOTER YEAR
// =========================
document.getElementById('y').textContent = new Date().getFullYear();

/* =========================
  HERO LOGO TILT (Desktop only)
========================= */
(function(){
  const wrap = document.getElementById('heroLogoWrap');
  const tilt = document.getElementById('heroLogoTilt');
  if(!wrap || !tilt) return;

  // Disable on touch devices
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if(isTouch) return;

  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform =
      `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    tilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
})();

/* =========================
  SERVICES SLIDER DATA
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

/* =========================
  SLIDER LOGIC
========================= */
const slider   = document.getElementById("slider");
const dotsWrap = document.getElementById("dots");
const prevBtn  = document.getElementById("prev");
const nextBtn  = document.getElementById("next");

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
    const dot = document.createElement("div");
    dot.className = "dot" + (i === active ? " active" : "");
    dot.addEventListener("click", () => {
      stopAutoplay();
      goTo(i, i > active ? "right" : "left");
    });
    dotsWrap.appendChild(dot);
  });
}

function renderSlides(){
  slider.innerHTML = "";
  slides.forEach((s, i) => {
    const slide = document.createElement("div");
    slide.className = "slide" + (i === active ? " active" : "");

    slide.innerHTML = `
      <div class="content">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="tags">
          ${s.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
      <div class="visual">
        <img src="${s.image}" alt="${s.title}">
      </div>
    `;

    slide.addEventListener("click", stopAutoplay);
    slide.addEventListener("pointerdown", stopAutoplay, { passive: true });

    slider.appendChild(slide);
  });
}

function update(direction){
  const allSlides = slider.querySelectorAll(".slide");
  allSlides.forEach((slide, i) => {
    slide.classList.remove("active", "enter-from-right", "enter-from-left");
    if(i === active){
      slide.classList.add("active");
      slide.classList.add(
        direction === "right" ? "enter-from-right" : "enter-from-left"
      );
    }
  });

  dotsWrap.querySelectorAll(".dot")
    .forEach((d,i)=>d.classList.toggle("active", i === active));
}

function goTo(index, direction){
  active = (index + slides.length) % slides.length;
  update(direction);
}

function next(){ goTo(active + 1, "right"); }
function prev(){ goTo(active - 1, "left"); }

function startAutoplay(){
  timer = setInterval(() => {
    if(autoplay) next();
  }, 2000);
}

/* =========================
  EVENTS
========================= */
prevBtn.addEventListener("click", () => {
  stopAutoplay();
  prev();
});

nextBtn.addEventListener("click", () => {
  stopAutoplay();
  next();
});

document.addEventListener("keydown", (e) => {
  if(e.key === "ArrowRight"){ stopAutoplay(); next(); }
  if(e.key === "ArrowLeft"){ stopAutoplay(); prev(); }
});

slider.addEventListener("wheel", stopAutoplay, { passive: true });
slider.addEventListener("touchstart", stopAutoplay, { passive: true });

/* =========================
  INIT
========================= */
renderSlides();
renderDots();
startAutoplay();

/* =========================
  WHY SECTION ANIMATION
========================= */
(function(){
  const cards = document.querySelectorAll('.why-card');
  if(!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    if(!entries[0].isIntersecting) return;
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('is-visible'), i * 70);
    });
    observer.disconnect();
  }, { threshold: 0.18 });

  observer.observe(cards[0]);
})();
