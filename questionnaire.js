const card = document.getElementById("card");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");

const introSound = document.getElementById("intro-sound");
const clickSound = document.getElementById("click-sound");

const app = document.getElementById("app");
const loadingCircle = document.getElementById("loading-circle");

// === Questions ===
const questions = {
  start: {
    text: "Est-ce ta première visite sur ce portfolio ?",
    answers: [
      { label: "Oui", next: "discover" },
      { label: "Non", next: "direct" }
    ]
  },
  discover: {
    text: "Comment veux-tu découvrir ce projet ?",
    answers: [
      { label: "Par les photos", redirect: "index.html" },
      { label: "Par le texte", redirect: "index.html#texte" }
    ]
  },
  direct: {
    text: "Où veux-tu aller directement ?",
    answers: [
      { label: "Accueil", redirect: "index.html" },
      { label: "Helsinki", redirect: "destinations/helsinki.html" }
    ]
  }
};

// === Affichage question avec animation ===
function showQuestion(id) {
  const q = questions[id];
  if (!q) return;

  card.classList.add("hidden");

  setTimeout(() => {
    questionText.textContent = q.text;
    answersDiv.innerHTML = "";

    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.label;

      btn.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.volume = 0.4;
        clickSound.play();

        if (answer.next) showQuestion(answer.next);
        if (answer.redirect) {
          card.classList.add("hidden");
          setTimeout(() => window.location.href = answer.redirect, 600);
        }
      });

      answersDiv.appendChild(btn);
    });

    card.classList.remove("hidden");
  }, 450);
}

// === Intro son et animation ===
setTimeout(() => {
  introSound.volume = 0.35;
  introSound.play().catch(() => {});
}, 300);

// afficher première question après 7s (durée du chargement)
setTimeout(() => {
  loadingCircle.style.display = "none";
  showQuestion("start");
}, 7000);

// === Plein écran au premier clic ===
let fullscreenActivated = false;

document.addEventListener("click", () => {
  if (!fullscreenActivated) {
    if (app.requestFullscreen) {
      app.requestFullscreen().catch(() => {});
    }
    fullscreenActivated = true;
  }
}, { once: true });