const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    // Remove previous highlights
    clearHighlights();

    const bodyText = document.body.innerHTML;
    const regex = new RegExp(`(${query})`, "gi");
    
    // Highlight all matches
    document.body.innerHTML = bodyText.replace(regex, '<span class="highlight">$1</span>');

    // Scroll to first match
    const firstMatch = document.querySelector(".highlight");
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function clearHighlights() {
    document.body.innerHTML = document.body.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/gi, "$1");
}




// function searchWebsite() {
//     let query = document.getElementById("searchBar").value.toLowerCase();
//     let resultsDiv = document.getElementById("searchResults");
//     resultsDiv.innerHTML = ""; // Clear previous results

//     if (query === "") return; // Don't process an empty query

//     let found = [];
    
//     // Scan all elements with text content
//     document.querySelectorAll("h1, h2, h3, p, a, li").forEach(el => {
//         if (el.textContent.toLowerCase().includes(query)) {
//             found.push({ text: el.textContent, link: findClosestAnchor(el) });
//         }
//     });

//     if (found.length === 0) {
//         resultsDiv.innerHTML = "<p>No results found.</p>";
//         return;
//     }

//     found.forEach(result => {
//         let item = document.createElement("div");
//         let link = document.createElement("a");
//         link.href = result.link;
//         link.textContent = result.text;
//         item.appendChild(link);
//         resultsDiv.appendChild(item);
//     });
// }

// // Function to find the nearest anchor link for better navigation
// function findClosestAnchor(element) {
//     let closestAnchor = element.closest("a");
//     return closestAnchor ? closestAnchor.href : "#"; // Default to "#" if no link is found
// }
