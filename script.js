function makeDraggable(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const handle = card.querySelector(".drag-handle");
  if (!handle) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("dot")) return;

    isDragging = true;
    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;
    bringToFront(card);
    card.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    card.style.left = `${e.clientX - offsetX}px`;
    card.style.top = `${e.clientY - offsetY}px`;
    card.style.right = "auto";
    card.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    card.classList.remove("dragging");
  });
}

let topZIndex = 1000;

function bringToFront(card) {
  topZIndex += 1;
  card.style.zIndex = topZIndex;
}

[
  "photo-card",
  "contact-card",
  "project-card-1",
  "project-card-2",
  "project-card-3"
].forEach(makeDraggable);

document.querySelectorAll(".dot.red").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = button.closest(".draggable-card");
    if (card) {
      card.style.display = "none";
    }
  });
});

document.querySelectorAll(".dot.yellow").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = button.closest(".draggable-card");
    if (card) {
      bringToFront(card);
      card.classList.add("minimized");
    }
  });
});

document.querySelectorAll(".dot.green").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = button.closest(".draggable-card");
    if (card) {
      card.style.display = "block";
      card.classList.remove("minimized");
      bringToFront(card);
    }
  });
});

/* dark mode: always follow system, button only changes current page */
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    if (toggleButton) toggleButton.textContent = "☀";
  } else {
    body.classList.remove("dark-mode");
    if (toggleButton) toggleButton.textContent = "☾";
  }
}

applyTheme(mediaQuery.matches ? "dark" : "light");

mediaQuery.addEventListener("change", (e) => {
  applyTheme(e.matches ? "dark" : "light");
});

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");
    applyTheme(isDark ? "light" : "dark");
  });
}
