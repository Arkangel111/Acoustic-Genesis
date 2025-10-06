// ui.js
export function renderResults(items, container) {
  container.innerHTML = ""; // clear old results

  if (!items || items.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    const img = document.createElement("img");
    img.src = item.links?.[0]?.href || "assets/placeholder.jpg";
    img.alt = item.data?.[0]?.title || "NASA media";

    const title = document.createElement("h3");
    title.textContent = item.data?.[0]?.title || "Untitled";

    card.appendChild(img);
    card.appendChild(title);

    // if item has an audio link
    const audioLink = item.href;
    if (audioLink && audioLink.includes("audio")) {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = audioLink;
      card.appendChild(audio);
    }

    card.addEventListener("click", () => showModal(item));

    container.appendChild(card);
  });
}

// ui.js
export function setupModal() {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.classList.add("hidden");
  modal.innerHTML = `
    <div class="modal-content">
      <span id="closeModal">&times;</span>
      <img id="modalImage" alt="">
      <h2 id="modalTitle"></h2>
      <p id="modalDesc"></p>
      <audio id="modalAudio" controls></audio>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = document.getElementById("closeModal");

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Reposition close button on window resize
  window.addEventListener("resize", () => {
    if (!modal.classList.contains("hidden")) {
      const modalContent = modal.querySelector(".modal-content");
      const rect = modalContent.getBoundingClientRect();
      closeBtn.style.top = rect.top + rect.height / 2 + "px";
      closeBtn.style.left = rect.right + 10 + "px";
    }
  });
}


export function showModal(item) {
  const modal = document.getElementById("modal");
  const title = item.data?.[0]?.title || "Untitled";
  const desc = item.data?.[0]?.description || "No description available.";
  const img = item.links?.[0]?.href || "assets/placeholder.jpg";
  const audioLink = item.href && item.href.includes("audio") ? item.href : null;

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDesc").textContent = desc;
  document.getElementById("modalImage").src = img;

  const audio = document.getElementById("modalAudio");
  if (audioLink) {
    audio.src = audioLink;
    audio.style.display = "block";
  } else {
    audio.style.display = "none";
  }

  modal.classList.remove("hidden");
  
  const closeBtn = document.getElementById("closeModal");
  const modalContent = modal.querySelector(".modal-content");
  const rect = modalContent.getBoundingClientRect();
  
  closeBtn.style.top = rect.top + rect.height / 2 + "px";
  closeBtn.style.left = rect.right + 10 + "px";
}

