

// ===Landing page animations ===

 const NAME = "Hiba Assamaouat";
  const TYPE_SPEED = 85;     // ms per character
  const START_DELAY = 350;   // beat before typing begins
  const POST_TYPE_PAUSE = 450;   // beat after name finishes, before welcome
  const WELCOME_TO_BTNS = 550;   // gap between welcome fade and buttons rising
 
  const typedEl   = document.querySelector(".typed");
  const caretEl   = document.querySelector(".caret");
  const welcomeEl = document.querySelector(".hero-welcome");
  const actionsEl = document.querySelector(".hero-actions");
 
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
  function reveal() {
    welcomeEl.classList.add("is-visible");
    setTimeout(() => actionsEl.classList.add("is-visible"), WELCOME_TO_BTNS);
  }
 
  if (reduceMotion) { //for accessibility-> if user prefers reduced motion,
    // skip the animation entirely
    typedEl.textContent = NAME;
    reveal();
  } else {
    let i = 0;
    function typeNext() {
      if (i < NAME.length) {
        typedEl.textContent += NAME.charAt(i);
        i++;
        setTimeout(typeNext, TYPE_SPEED);
      } else {
        // done typing: fade the caret out, then reveal the rest
        setTimeout(() => {
          caretEl.classList.add("is-hidden");
          reveal();
        }, POST_TYPE_PAUSE);
      }
    }
    setTimeout(typeNext, START_DELAY);
  }
 
  // ===== hover/focus descriptions =====
  // on mobile, CSS overrides these classes so the text stays visible regardless
  document.querySelectorAll(".hero-option").forEach((option) => {
    const btn  = option.querySelector(".hero-btn");
    const hint = option.querySelector(".hint-text");
    if (!btn || !hint) return;
 
    const show = () => hint.classList.add("is-visible");
    const hide = () => hint.classList.remove("is-visible");
 
    btn.addEventListener("mouseenter", show);
    btn.addEventListener("focus", show);   // keyboard users get it too
    btn.addEventListener("mouseleave", hide);
    btn.addEventListener("blur", hide);
  });


// === end of landing page animations ===






// function showSidebar() {
//   const sidebar = document.querySelector('.sidebar');
//   if (sidebar.style.display === "flex") {
//     sidebar.style.display = "none";
//   } else {
//     sidebar.style.display = "flex";
//   }
// }

// function closeSidebar() {
//   const sidebar = document.querySelector('.sidebar');
//   sidebar.style.display = "none";
// }

// Updated version of smoother sidebar

  // function showSidebar() {
  //   document.querySelector('.sidebar').classList.add('active');
  // }

  // function closeSidebar() {
  //   document.querySelector('.sidebar').classList.remove('active');
  // }

// NEWEST VERSION OF SIDEBAR
  const header   = document.querySelector(".site-header");
  const toggle   = document.querySelector(".nav-toggle");
  const menu     = document.querySelector(".mobile-menu");
  const overlay  = document.querySelector(".nav-overlay");
  const closers  = document.querySelectorAll("[data-close]");
 
  function openMenu() {
    menu.classList.add("is-open");
    overlay.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";   // lock background scroll
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
 
  toggle.addEventListener("click", openMenu);
  closers.forEach((el) => el.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
 
  // faint separation once scrolled
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll);
  onScroll();


// PROJECTS GALLERY FILTER FUNCTIONS
function filterSelection(category, button) {
  const items = document.querySelectorAll('.portfolio-item');
  const buttons = document.querySelectorAll('.filter-button');

  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  items.forEach(item => {
    const itemCategory = item.dataset.category;

    if (category === 'all' || itemCategory === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// GALLERY MODAL OVERLAY
function openProject(card) {
  document.getElementById('projectOverlay').classList.add('active');
  document.body.style.overflow = 'hidden'; // locks background scroll

  const projectId = card.dataset.project;
  const overlay = document.getElementById('projectOverlay');

  // hide all articles
  document.querySelectorAll('.project-article').forEach(article => {
    article.style.display = 'none';
  });

  // displays the matching one
  const activeArticle = overlay.querySelector(
    `.project-article[data-project="${projectId}"]`
  );

  if (activeArticle) {
    activeArticle.style.display = 'block';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('projectOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {   // allows user to close overlay by pressing "esc" key
  if (e.key === 'Escape') {
    const overlay = document.getElementById('projectOverlay');
    if (overlay.classList.contains('active')) {
      closeProject();
    }
  }
});

// Close project by clicking away
const overlay = document.getElementById('projectOverlay');
const modal = overlay.querySelector('.project-modal');

overlay.addEventListener('click', () => {
  closeProject();
});

modal.addEventListener('click', e => {
  e.stopPropagation(); // prevents closing when clicking inside modal
});