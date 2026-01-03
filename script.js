
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
 function filterSelection(category) {
  const items = document.querySelectorAll('.portfolio-item');
  const buttons = document.querySelectorAll('.filter-button');

  // update active button
  buttons.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  items.forEach(item => {
    const itemCategory = item.dataset.category;

    if (category === 'all' || itemCategory === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}