// =========================
// 1️⃣ Lightbox
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!galleryImages.length || !lightbox || !lightboxImg) return;

  let currentIndex = 0;

  // Ouvrir la lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // bloque le scroll
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox();
  }

  // Boutons
  document.querySelector(".lightbox .close")?.addEventListener("click", closeLightbox);
  document.querySelector(".lightbox .next")?.addEventListener("click", nextImage);
  document.querySelector(".lightbox .prev")?.addEventListener("click", prevImage);

  // Clavier
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // Clic hors image = fermer
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

});

// =========================
// 2️⃣ Couleurs dynamiques + version avancée
// =========================
document.addEventListener("DOMContentLoaded", () => {

  // === 20 styles ===
  const palettes = [
    { bg:"#0f0f1a", card:"#1b1b2f", text:"#e0e0ff", muted:"#a0a0d0", accent:"#ff00ff" },
    { bg:"#1a1a2e", card:"#2c2c3c", text:"#f0f0ff", muted:"#9494b0", accent:"#ff5555" },
    { bg:"#101820", card:"#1d2a3a", text:"#d0e0ff", muted:"#8090a0", accent:"#00ffcc" },
    { bg:"#1c0f2f", card:"#2e1b44", text:"#ffd0ff", muted:"#b090b0", accent:"#ff77ff" },
    { bg:"#0f1a0f", card:"#1b2f1b", text:"#d0ffd0", muted:"#90b090", accent:"#00ff77" },
    { bg:"#1f1a1f", card:"#2b1e2b", text:"#f0d0f0", muted:"#b080b0", accent:"#ff66cc" },
    { bg:"#121212", card:"#1e1e1e", text:"#ccccff", muted:"#9999bb", accent:"#66ccff" },
    { bg:"#2a1f1f", card:"#3b2c2c", text:"#ffd0d0", muted:"#b09090", accent:"#ff4444" },
    { bg:"#1b2626", card:"#2a3a3a", text:"#d0ffff", muted:"#90b0b0", accent:"#00ffff" },
    { bg:"#201a2a", card:"#2f1e3b", text:"#ffd0ff", muted:"#b090b0", accent:"#ff00cc" },
    { bg:"#0f1a1a", card:"#1b2f2f", text:"#d0ffff", muted:"#90b0b0", accent:"#00ccff" },
    { bg:"#1a0f1a", card:"#2c1b2c", text:"#ffccff", muted:"#b090b0", accent:"#ff66ff" },
    { bg:"#10101f", card:"#1e1e3b", text:"#cce0ff", muted:"#8090b0", accent:"#6699ff" },
    { bg:"#1f1a10", card:"#2b2c1e", text:"#fff0cc", muted:"#b0a090", accent:"#ffbb33" },
    { bg:"#0f1010", card:"#1b1e1e", text:"#d0fff0", muted:"#90b0a0", accent:"#33ffbb" },
    { bg:"#1a101f", card:"#2c1e3b", text:"#e0ccff", muted:"#b090b0", accent:"#9966ff" },
    { bg:"#101a10", card:"#1e3b1e", text:"#ccffd0", muted:"#90b090", accent:"#66ff33" },
    { bg:"#20101a", card:"#3b1e2c", text:"#ffccf0", muted:"#b09090", accent:"#ff66bb" },
    { bg:"#10101a", card:"#1e1e3b", text:"#ccccff", muted:"#9090b0", accent:"#6666ff" },
    { bg:"#1a1a10", card:"#2c2c1e", text:"#ffffcc", muted:"#b0b090", accent:"#ffff66" }
  ];

  // Choisir une palette aléatoire
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  // Appliquer chaque variable CSS
  for (const key in randomPalette) {
    document.documentElement.style.setProperty(`--${key}`, randomPalette[key]);
  }

  // === Version avancée : adapter automatiquement le hover et boutons ===
  // Lightbox buttons semi-transparents
  const hexToRgb = (hex) => {
    hex = hex.replace("#","");
    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);
    return `${r}, ${g}, ${b}`;
  }

  // bouton lightbox
  document.documentElement.style.setProperty('--btn-rgb', hexToRgb(randomPalette.accent));

  // cards hover : légère variation plus claire que card
  const lightenHex = (hex, percent) => {
    hex = hex.replace("#","");
    const r = Math.min(255, parseInt(hex.substring(0,2),16) + percent);
    const g = Math.min(255, parseInt(hex.substring(2,4),16) + percent);
    const b = Math.min(255, parseInt(hex.substring(4,6),16) + percent);
    return `rgb(${r}, ${g}, ${b})`;
  }

  document.querySelectorAll('.card').forEach(card => {
    const cardBg = randomPalette.card;
    card.addEventListener('mouseenter', () => {
      card.style.background = lightenHex(cardBg, 20);
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = cardBg;
    });
  });

});

// =========================
// 3️⃣ Screen Saver automatique après inactivité
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const galleryContainer = document.querySelector(".grid");
  const galleryImages = galleryContainer.querySelectorAll("img"); // toutes les images déjà présentes
  let inactivityTimer;
  let autoSlideInterval;
  let currentIndex = 0;

  const slideDelay = 5000; // 20 secondes avant démarrage
  const slideSpeed = 3000;  // 3 secondes entre chaque image

  // Fonction pour faire défiler les images
  function autoSlide() {
    if (galleryImages.length === 0) return;

    // Met en avant la photo courante et atténue les autres
    galleryImages.forEach((img, index) => {
      img.style.opacity = index === currentIndex ? "1" : "0.2";
      img.style.transition = "opacity 0.5s"; // légère animation d'apparition
    });

    currentIndex = (currentIndex + 1) % galleryImages.length;
  }

  // Reset du timer d'inactivité
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearInterval(autoSlideInterval);

    // Remise à l’état normal
    galleryImages.forEach(img => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.3s";
    });

    inactivityTimer = setTimeout(() => {
      autoSlide(); // afficher la première image
      autoSlideInterval = setInterval(autoSlide, slideSpeed);
    }, slideDelay);
  }

  // Détecter l’activité de l’utilisateur
  ["mousemove", "keydown", "scroll", "touchstart"].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer);
  });

  // Lancer le timer au départ
  resetInactivityTimer();
});
// =========================
// 3️⃣ Screen Saver automatique après inactivité
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const galleryContainer = document.querySelector(".gallery");
  const galleryImages = galleryContainer.querySelectorAll("img"); // toutes les images déjà présentes
  let inactivityTimer;
  let autoSlideInterval;
  let currentIndex = 0;

  const slideDelay = 5000; // 20 secondes avant démarrage
  const slideSpeed = 3000;  // 3 secondes entre chaque image

  // Fonction pour faire défiler les images
  function autoSlide() {
    if (galleryImages.length === 0) return;

    // Met en avant la photo courante et atténue les autres
    galleryImages.forEach((img, index) => {
      img.style.opacity = index === currentIndex ? "1" : "0.2";
      img.style.transition = "opacity 0.5s"; // légère animation d'apparition
    });

    currentIndex = (currentIndex + 1) % galleryImages.length;
  }

  // Reset du timer d'inactivité
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearInterval(autoSlideInterval);

    // Remise à l’état normal
    galleryImages.forEach(img => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.3s";
    });

    inactivityTimer = setTimeout(() => {
      autoSlide(); // afficher la première image
      autoSlideInterval = setInterval(autoSlide, slideSpeed);
    }, slideDelay);
  }

  // Détecter l’activité de l’utilisateur
  ["mousemove", "keydown", "scroll", "touchstart"].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer);
  });

  // Lancer le timer au départ
  resetInactivityTimer();
});
