
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

  function showSidebar() {
    document.querySelector('.sidebar').classList.add('active');
  }

  function closeSidebar() {
    document.querySelector('.sidebar').classList.remove('active');
  }



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
function openProject() {
  document.getElementById('projectOverlay').classList.add('active');
  document.body.style.overflow = 'hidden'; // locks background scroll
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