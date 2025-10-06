// scripts/app.js
import { searchNasaMedia } from "./api.js";
import { renderResults, setupModal } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  setupModal();

  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    document.getElementById("results").innerHTML = "<p>Loading...</p>";
    const results = await searchNasaMedia(query);
    renderResults(results, resultsContainer);
  });
});
