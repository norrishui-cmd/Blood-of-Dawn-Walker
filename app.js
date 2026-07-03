const searchInput = document.querySelector("#guide-search");
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const cards = Array.from(document.querySelectorAll(".guide-card"));

let activeFilter = "all";

function normalize(value) {
  return value.trim().toLowerCase();
}

function applyFilters() {
  const query = normalize(searchInput.value);

  cards.forEach((card) => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const haystack = normalize(`${card.textContent} ${card.dataset.keywords || ""}`);
    const queryMatch = !query || haystack.includes(query);

    card.classList.toggle("hidden", !(categoryMatch && queryMatch));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

const urlSearch = new URLSearchParams(window.location.search).get("q");
if (urlSearch) {
  searchInput.value = urlSearch;
  applyFilters();
}

document.querySelectorAll(".checklist input").forEach((checkbox, index) => {
  const key = `bdw-check-${index}`;
  checkbox.checked = localStorage.getItem(key) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(key, String(checkbox.checked));
  });
});
