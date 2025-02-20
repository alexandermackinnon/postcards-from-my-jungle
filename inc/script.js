// ========== Wait for DOM to Load ==========
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document fully loaded and parsed!");
  setupToggleButton(); // Initialize toggle button
  startSlideshow();
});

// ========== Asset Configuration ==========
const imageCount = 49; // Total number of images in the folder
const soundCount = 4; // Total number of sounds in the folder

const images = Array.from(
  { length: imageCount },
  (_, i) => `animal_${String(i + 1).padStart(2, "0")}.png`
);
const sounds = Array.from(
  { length: soundCount },
  (_, i) => `sound_${String(i + 1).padStart(2, "0")}.wav`
);

const animalPhrases = [
  "Chrrr-tzzzt, Mrow-flii",
  "Wuff-rah, Clu-tzz, Baa’rum!",
  "Neigh’zzikk, Moo’rah-huff.",
  "Tzz’tik-chit-chirr.",
  "Brrrooo-mrrr, Rummmp-tah.",
  "Mrow-kluk-tzzik!",
  "Wuff-wuff-tik, Neigh-chirr-chirr.",
];

// ========== Slideshow Configuration ==========
let currentIndex = 0;
const slideDuration = 5000; // Time per slide (5 seconds)
const fadeDuration = 1000; // Fade in/out duration (1 second)
let isSoundOn = false; // Sound is OFF by default

// Get audio element
const audioElement = document.getElementById("animal-sound");

// Start Slideshow
function startSlideshow() {
  updateSlideshow();
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlideshow();
  }, slideDuration);
}

// Update the slideshow content
function updateSlideshow() {
  const imageElement = document.getElementById("slideshow-image");
  const textElement = document.getElementById("animal-text");

  // Fade out effect
  imageElement.style.opacity = "0";
  textElement.style.opacity = "0";
  audioElement.pause();

  setTimeout(() => {
    // Update image and text
    imageElement.src = `images/${images[currentIndex]}`;
    textElement.textContent =
      animalPhrases[currentIndex % animalPhrases.length];

    // Loop through sounds independently
    const soundIndex = currentIndex % soundCount;
    audioElement.src = `sounds/${sounds[soundIndex]}`;

    // Fade in effect
    imageElement.style.opacity = "1";
    textElement.style.opacity = "1";

    // Play audio only if sound is enabled
    if (isSoundOn) {
      audioElement.play();
    }
  }, fadeDuration);
}

// ========== Sound Toggle Button ==========
function setupToggleButton() {
  const toggleButton = document.getElementById("toggle-sound");

  toggleButton.addEventListener("click", () => {
    isSoundOn = !isSoundOn; // Toggle sound state

    // Update button text
    toggleButton.textContent = isSoundOn ? "Sound On" : "Sound Off";

    // If sound was turned on, play the current audio
    if (isSoundOn) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  });
}
