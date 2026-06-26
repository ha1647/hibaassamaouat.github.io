// === Landing page animations ===
const typedEl   = document.querySelector(".typed");
const caretEl   = document.querySelector(".caret");
const welcomeEl = document.querySelector(".hero-welcome");
const actionsEl = document.querySelector(".hero-actions");

// Needed to add this condition so it would only run in the landing page otherwise error @console
if (typedEl && caretEl && welcomeEl && actionsEl) {
  const NAME = "Hiba Assamaouat";
  const TYPE_SPEED = 85, START_DELAY = 350, POST_TYPE_PAUSE = 450, WELCOME_TO_BTNS = 550;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal() {
    welcomeEl.classList.add("is-visible");
    setTimeout(() => actionsEl.classList.add("is-visible"), WELCOME_TO_BTNS);
  }

  if (reduceMotion) {
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
        setTimeout(() => { caretEl.classList.add("is-hidden"); reveal(); }, POST_TYPE_PAUSE);
      }
    }
    setTimeout(typeNext, START_DELAY);
  }
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
 
if (toggle && menu) {
  toggle.addEventListener("click", openMenu);
  closers.forEach((el) => el.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

// faint separation appears once scrolled
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll);
  onScroll();
}


// certificates display toggle
const certsToggle = document.querySelector('.certs-toggle');
if (certsToggle) {
  certsToggle.addEventListener('click', () => {
    const expanded = certsToggle.getAttribute('aria-expanded') === 'true';
    certsToggle.setAttribute('aria-expanded', String(!expanded));
    document.querySelector('.certs').classList.toggle('expanded');
    certsToggle.querySelector('.certs-toggle-text').textContent =
      expanded ? 'See full list' : 'See less';
  });
}

// Redirect to exact project from project selection in path
window.addEventListener('DOMContentLoaded', () => {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const card = document.querySelector(`.portfolio-item[data-project="${id}"]`);
  if (card) openProject(card);
});

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
const projectOverlay = document.getElementById('projectOverlay');
if (projectOverlay) {
  projectOverlay.addEventListener('click', e => {
    if (e.target === projectOverlay) closeProject();  // backdrop only, not the modal
  });
}

// if (e.key === 'Escape') {
//   const overlay = document.getElementById('projectOverlay');
//   if (overlay && overlay.classList.contains('active')) closeProject();
// }

// // Close project by clicking away
// const overlay = document.getElementById('projectOverlay');
// const modal = overlay.querySelector('.project-modal');

// overlay.addEventListener('click', () => {
//   closeProject();
// });

// modal.addEventListener('click', e => {
//   e.stopPropagation(); // prevents closing when clicking inside modal
// });





// Prose ISSUE_00x content
// read time
const body = document.querySelector(".article-body");
const rt = document.getElementById("readtime");
if (body && rt) {
  const words = body.innerText.trim().split(/\s+/).filter(Boolean).length;
  rt.textContent = Math.max(1, Math.round(words / 225)) + " min read";
}

// link copied message
const btn   = document.getElementById("copy");
const toast = document.querySelector(".copied-toast");
let toastTimer;

function showToast(msg, ok = true){
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.toggle("is-error", !ok);
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 5000);
}

if (btn) {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy — copy from the address bar", false);
    }
  });
}

// ===== Footer: signature scrolls to top =====
document.querySelector(".footer-signature")
  ?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );





// ===== Marginalia rail: collapse / expand =====
const proseLayout = document.querySelector('.prose-layout');
if (proseLayout) {
  const margToggles = proseLayout.querySelectorAll('[data-marg-toggle]');
  const STORE_KEY = 'marginalia-collapsed';

  // const spineCount = proseLayout.querySelector('.marg-spine-count');
  // if (spineCount) spineCount.textContent =
  //   proseLayout.querySelectorAll('.rec').length + ' finds';

  const setCollapsed = (collapsed) => {
    proseLayout.classList.toggle('rail-collapsed', collapsed);
    margToggles.forEach(btn => {
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.setAttribute('aria-label',
        collapsed ? 'Expand recommendations' : 'Collapse recommendations');
    });
    try { localStorage.setItem(STORE_KEY, collapsed ? '1' : '0'); } catch {}
  };

  let saved = '0';
  try { saved = localStorage.getItem(STORE_KEY) ?? '0'; } catch {}
  setCollapsed(saved === '1');   // default: expanded

  margToggles.forEach(btn =>
    btn.addEventListener('click', () =>
      setCollapsed(!proseLayout.classList.contains('rail-collapsed'))
    )
  );
}


// ===== Marginalia: render cards from JSON =====
const margList = document.getElementById('marg-list');
if (margList) {
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

  const recHTML = (r) => {
    const inner = esc(r.title) +
      (r.url ? '<i class="redirect-icon" aria-hidden="true"></i>' : '');
    const title = r.url ? `<a href="${esc(r.url)}">${inner}</a>` : inner;
    const by = r.by
      ? `<p class="rec-by">${esc(r.by)}${r.via ? ` · <span class="rec-via">${esc(r.via)}</span>` : ''}</p>`
      : '';
    const find = (!r.url && r.find)
      ? `<p class="rec-find"><span>find:</span> ${esc(r.find)}</p>`
      : '';
    return `<article class="rec">
        <div class="rec-meta"><span class="rec-kind">${esc(r.kind)}</span><span class="rec-date">${esc(r.date)}</span></div>
        <h4 class="rec-title">${title}</h4>
        ${by}
        <p class="rec-note">${esc(r.note)}</p>
        ${find}
      </article>`;
  };

  fetch('marginalia.json')
    .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(items => {
      margList.innerHTML = items.map(recHTML).join('');
      const spineCount = document.querySelector('.marg-spine-count');
      if (spineCount) spineCount.textContent = items.length + ' finds';
    })
    .catch(err => {
      console.error('Marginalia failed to load:', err);
      margList.innerHTML = '<p class="rec-note">Couldn’t load recommendations.</p>';
    });
}