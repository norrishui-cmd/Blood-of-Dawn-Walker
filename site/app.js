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

const countdown = document.querySelector(".countdown");
if (countdown) {
  const launchDate = new Date(countdown.dataset.launchDate);
  const daysEl = countdown.querySelector("[data-countdown-days]");
  const hoursEl = countdown.querySelector("[data-countdown-hours]");
  const minutesEl = countdown.querySelector("[data-countdown-minutes]");
  const secondsEl = countdown.querySelector("[data-countdown-seconds]");
  const titleEl = countdown.querySelector("h2");

  function updateCountdown() {
    const remaining = launchDate.getTime() - Date.now();

    if (remaining <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";
      titleEl.textContent = "Launch day is here";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.querySelectorAll(".checklist input").forEach((checkbox, index) => {
  const key = `bdw-check-${index}`;
  checkbox.checked = localStorage.getItem(key) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(key, String(checkbox.checked));
  });
});
