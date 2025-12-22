
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
