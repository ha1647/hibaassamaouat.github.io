const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

let timeoutId;

searchIcon.addEventListener("mouseenter", () => {
  searchInput.classList.add("show");
  clearTimeout(timeoutId); // Cancel any previous timer
});

searchIcon.addEventListener("mouseleave", () => {
  timeoutId = setTimeout(() => {
    searchInput.classList.remove("show");
  }, 3000); // Delay before collapsing
});
