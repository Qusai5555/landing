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

  const servicesData = {
    "ai-software": {
      title: "AI & Software Solutions",
      description: "We design and build AI-powered systems, automation solutions, and data platforms tailored to your business operations.",
      goal: "We help you automate workflows, improve decision-making, and build smart digital solutions that deliver real impact.",
      cards: [
        { label: "Core Service", title: "AI Agents & Chatbots", description: "Build intelligent assistants that answer questions, automate tasks, and improve customer or team interaction." },
        { label: "Core Service", title: "Automation Systems", description: "Automate repetitive workflows, connect systems, and reduce manual effort across daily operations." },
        { label: "Core Service", title: "Data & BI Solutions", description: "Turn raw data into clear dashboards, reports, and insights that support better decision-making." },
        { label: "Core Service", title: "Smart Applications", description: "Develop custom applications powered by AI and modern technologies to support real business needs." }
      ]
    },
    "training-center": {
      title: "AI Training & Enablement",
      description: "We provide tailored AI training programs designed for organizations, schools, and teams based on their needs, level, and field of work.",
      goal: "We help individuals and teams understand, use, and apply AI tools effectively in their daily work.",
      cards: [
        { label: "Enablement", title: "Customized Training Programs", description: "Training tailored to your organization, team level, and specific business needs." },
        { label: "Enablement", title: "Tools & Software Training", description: "We train your team on the tools you need — whether by helping you choose the right solution or delivering training on specific software requested by your organization." },
        { label: "Enablement", title: "Organization & Team Training", description: "Training programs designed for companies, government entities, schools, and universities." },
        { label: "Enablement", title: "Practical AI Usage", description: "Learn how to use AI in real work scenarios to improve workflows, productivity, and decision-making." }
      ]
    },
    hardware: {
      title: "Smart Hardware & Robotics",
      description: "We provide interactive robots and smart hardware solutions designed for engagement, education, and real-world applications.",
      goal: "Enhance user experience, automate interactions, and bring AI into real-world environments.",
      cards: [
        { label: "Hardware", title: "Reception & Welcome Robots", description: "Robots designed to welcome visitors, guide them, and provide information in an interactive way." },
        { label: "Hardware", title: "Guide & Assistance Robots", description: "Help users navigate spaces, answer questions, and provide real-time assistance." },
        { label: "Hardware", title: "Educational Robots", description: "Robots used in schools and training environments to support learning and interactive education." },
        { label: "Hardware", title: "Custom Robot Solutions", description: "Robots tailored to specific use cases, integrated with AI to perform customized tasks." }
      ]
    }
  };

  function renderTab(tabKey){
    const data = servicesData[tabKey];
    if(!data) return;

    panel.classList.remove("is-visible");
    window.requestAnimationFrame(() => {
      content.innerHTML = `
        <h3 class="services-content__title"><span class="services-content__title-box">${data.title}</span></h3>
        <p class="services-content__desc">${data.description}</p>
        <p class="services-content__goal">${data.goal}</p>
        <div class="solution-grid">
          ${data.cards.map(card => `
            <article class="solution-card">
              <span class="solution-label">${card.label}</span>
              <h4><span class="solution-card__title-box">${card.title}</span></h4>
              <p>${card.description}</p>
              <div class="solution-visual" aria-hidden="true">
                <span class="solution-visual__line"></span>
                <span class="solution-visual__line"></span>
                <span class="solution-visual__line"></span>
                <span class="solution-visual__bar"></span>
                <span class="solution-visual__bar"></span>
                <span class="solution-visual__bar"></span>
                <span class="solution-visual__bar"></span>
              </div>
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
