// Dark mode toggle
const darkBtn = document.getElementById("darkToggle");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// adjust scroll amount to match smaller card width + gap
const cardWidth = 296; // 280px + 16px margin
// Destinations
const destinations = [
  {
    city: "Alleppey Backwaters",
    img: "https://images.pexels.com/photos/12893395/pexels-photo-12893395.jpeg",
  },
  {
    city: "Munnar Tea Hills",
    img: "https://images.pexels.com/photos/16252050/pexels-photo-16252050.jpeg",
  },
  {
    city: "Kovalam Beach",
    img: "https://images.pexels.com/photos/3652390/pexels-photo-3652390.jpeg",
  },
  {
    city: "Fort Kochi",
    img: "https://images.pexels.com/photos/8075989/pexels-photo-8075989.jpeg",
  },
  {
    city: "Varkala Beach",
    img: "https://images.pexels.com/photos/2692657/pexels-photo-2692657.jpeg",
  },
  {
    city: "Thekkady Wildlife",
    img: "https://images.pexels.com/photos/5557878/pexels-photo-5557878.jpeg",
  },
];

const grid = document.getElementById("destinationGrid");
destinations.forEach((dest) => {
  const price = Math.floor(Math.random() * 2000) + 3000;
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${dest.img}" alt="${dest.city}">
    <div class="card-content">
      <h3>${dest.city}</h3>
      <p>Starting ₹${price}/day</p>
    </div>
  `;
  grid.appendChild(card);
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));

// Font size controls
const body = document.body;
document.getElementById("fontIncrease").addEventListener("click", () => {
  let size = parseInt(window.getComputedStyle(body).fontSize);
  if (size < 24) body.style.fontSize = size + 2 + "px";
});
document.getElementById("fontDecrease").addEventListener("click", () => {
  let size = parseInt(window.getComputedStyle(body).fontSize);
  if (size > 12) body.style.fontSize = size - 2 + "px";
});

// ==========================
// RESPONSIVE TESTIMONIAL SLIDER
// ==========================

const wrapper = document.getElementById("testimonialWrapper");
const viewport = document.querySelector(".testimonial-viewport");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");

let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function updateSlider() {
  const cardsPerView = getCardsPerView();
  const totalCards = wrapper.children.length;

  const cardWidth = viewport.clientWidth / cardsPerView;
  wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  // Disable arrows intelligently
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
}

nextBtn.addEventListener("click", () => {
  const totalCards = wrapper.children.length;
  const cardsPerView = getCardsPerView();

  if (currentIndex < totalCards - cardsPerView) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener("resize", () => {
  currentIndex = 0; // reset to prevent layout glitches
  updateSlider();
});

window.addEventListener("load", updateSlider);
