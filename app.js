// =========================
// FOOTER YEAR
// =========================
document.getElementById('y').textContent = new Date().getFullYear();

/* =========================
  HERO MEDIA SLIDESHOW
========================= */
(function(){
  const media = document.getElementById('heroBgSlider');
  if(!media) return;

  const slides = media.querySelectorAll('.hero-bg-slide');
  if(!slides.length) return;

  let activeIndex = 0;
  let timer = null;

  function show(index){
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
  }

  function next(){
    activeIndex = (activeIndex + 1) % slides.length;
    show(activeIndex);
  }

  function start(){
    timer = setInterval(next, 3000);
  }

  function stop(){
    if(timer) clearInterval(timer);
  }

  media.addEventListener('mouseenter', stop);
  media.addEventListener('mouseleave', start);

  show(activeIndex);
  start();
})();

/* =========================
  SERVICES TABS
========================= */
(function(){
  const tabsWrap = document.getElementById("servicesTabs");
  const content = document.getElementById("servicesContent");
  const panel = document.getElementById("servicesPanel");
  if(!tabsWrap || !content || !panel) return;

  const iconPaths = {
    bot: '<path d="M12 8V4"/><path d="M9 4h6"/><rect x="4" y="8" width="16" height="10" rx="3"/><path d="M8 12h.01"/><path d="M16 12h.01"/><path d="M9 16h6"/>',
    workflow: '<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="8.5" y="14" width="7" height="7" rx="1.5"/><path d="M10 7.5h4"/><path d="M12 11v3"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 15v-5"/><path d="M13 15V8"/><path d="M18 15v-9"/>',
    app: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><path d="M8 14h2"/><path d="M12 14h4"/>',
    graduation: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4"/><path d="M22 10v6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-1.1 1.1-1.6 1.9-1.8 3h-2.4c-.2-1.1-.7-1.9-1.8-3z"/>'
  };

  const servicesData = {
    "ai-software": {
      title: "AI & Software Solutions",
      description: "We design and build AI-powered systems, automation solutions, and data platforms tailored to your business operations.",
      goal: "We help you automate workflows, improve decision-making, and build smart digital solutions that deliver real impact.",
      cards: [
        { title: "AI Agents & Chatbots", description: "Build intelligent assistants that answer questions, automate tasks, and improve customer or team interaction.", icon: "bot" },
        { title: "Automation Systems", description: "Automate repetitive workflows, connect systems, and reduce manual effort across daily operations.", icon: "workflow" },
        { title: "Data & BI Solutions", description: "Turn raw data into clear dashboards, reports, and insights that support better decision-making.", icon: "chart" },
        { title: "Smart Applications", description: "Develop custom applications powered by AI and modern technologies to support real business needs.", icon: "app" }
      ]
    },
    "training-center": {
      title: "AI Training & Enablement",
      description: "We provide tailored AI training programs designed for organizations, schools, and teams based on their needs, level, and field of work.",
      goal: "We help individuals and teams understand, use, and apply AI tools effectively in their daily work.",
      cards: [
        { title: "Customized Training Programs", description: "Training tailored to your organization, team level, and specific business needs.", icon: "graduation" },
        { title: "Tools & Software Training", description: "We train your team on the tools you need — whether by helping you choose the right solution or delivering training on specific software requested by your organization.", icon: "settings" },
        { title: "Organization & Team Training", description: "Training programs designed for companies, government entities, schools, and universities.", icon: "users" },
        { title: "Practical AI Usage", description: "Learn how to use AI in real work scenarios to improve workflows, productivity, and decision-making.", icon: "lightbulb" }
      ]
    },
    hardware: {
      title: "Smart Hardware & Robotics",
      description: "We provide interactive robots and smart hardware solutions designed for engagement, education, and real-world applications.",
      goal: "Enhance user experience, automate interactions, and bring AI into real-world environments.",
      cards: [
        { title: "Reception & Welcome Robots", description: "Robots designed to welcome visitors, guide them, and provide information in an interactive way.", image: "images/services/01-ai-solutions.jpg" },
        { title: "Guide & Assistance Robots", description: "Help users navigate spaces, answer questions, and provide real-time assistance.", image: "images/services/02-applications-ai.jpg" },
        { title: "Educational Robots", description: "Robots used in schools and training environments to support learning and interactive education.", image: "images/services/03-automations.jpg" },
        { title: "Custom Robot Solutions", description: "Robots tailored to specific use cases, integrated with AI to perform customized tasks.", image: "images/services/04-interactive-web.jpg" }
      ]
    }
  };

  const gradientDefs = `
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="servicesIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B82F6"></stop>
          <stop offset="50%" stop-color="#6366F1"></stop>
          <stop offset="100%" stop-color="#8B5CF6"></stop>
        </linearGradient>
      </defs>
    </svg>
  `;

  function iconMarkup(name){
    return `
      <div class="solution-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">${iconPaths[name] || ""}</svg>
      </div>
    `;
  }

  function renderTab(tabKey){
    const data = servicesData[tabKey];
    if(!data) return;

    panel.classList.remove("is-visible");
    window.requestAnimationFrame(() => {
      content.innerHTML = `
        ${gradientDefs}
        <h3 class="services-content__title">${data.title}</h3>
        <p class="services-content__desc">${data.description}</p>
        <p class="services-content__goal">${data.goal}</p>
        <div class="solution-grid">
          ${data.cards.map(card => `
            <article class="solution-card">
              ${card.icon ? iconMarkup(card.icon) : ""}
              ${card.image ? `<div class="solution-media"><img src="${card.image}" alt="${card.title}"></div>` : ""}
              <h4>${card.title}</h4>
              <p>${card.description}</p>
            </article>
          `).join("")}
        </div>
      `;
      panel.classList.add("is-visible");
    });
  }

  function setActiveTab(tabKey){
    tabsWrap.querySelectorAll(".services-tab").forEach(btn => {
      const isActive = btn.dataset.tab === tabKey;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    renderTab(tabKey);
  }

  tabsWrap.querySelectorAll(".services-tab").forEach(btn => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
  });

  setActiveTab("ai-software");
})();

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
