// STATE
let currentStep = 0;
let currentPage = 0;
let loginFails = 0;

// DOM ELEMENTS
const loginScreen = document.getElementById('login-screen');
const bootScreen = document.getElementById('boot-screen');
const loadingScreen = document.getElementById('loading-screen');
const journeyScreen = document.getElementById('journey-screen');
const finalScreen = document.getElementById('final-screen');

const loginBtn = document.getElementById('login-ok-btn');
const passField = document.getElementById('password-field');
const bootLog = document.getElementById('boot-log');
const squareLoader = document.getElementById('square-loader');
const loadingStatus = document.getElementById('loading-status');

// Modal Elements
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalOkBtn = document.getElementById('modal-ok-btn');

const audioBoot = document.getElementById('audio-boot');
const audioLoading = document.getElementById('audio-loading');
const audioClick = document.getElementById('audio-click');

// MODAL LOGIC
function showAlert(title, message, isHtml = false) {
    modalTitle.innerText = title;
    if (isHtml) {
        modalBody.innerHTML = message;
    } else {
        modalBody.innerText = message;
    }
    customModal.classList.remove('hidden');
}

function hideAlert() {
    customModal.classList.add('hidden');
}

modalCloseBtn.onclick = hideAlert;
modalOkBtn.onclick = hideAlert;

// 1. LOGIN LOGIC
loginBtn.addEventListener('mouseover', () => {
    if (loginFails < 12) {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150;
        loginBtn.style.transform = `translate(${x}px, ${y}px)`;
        loginBtn.style.setProperty('--last-x', `${x}px`);
        loginBtn.style.setProperty('--last-y', `${y}px`);
        loginFails++;

        if (loginFails === 12) {
            loginBtn.classList.add('falling-btn');
            setTimeout(() => {
                // On ouvre 2 secondes après que le bouton soit tombé
                if (passField.value.toLowerCase() === 'caca') {
                   startBoot();
                } else {
                    // Reset pour que l'utilisateur puisse re-essayer si il a pas mis le mdp
                    loginBtn.classList.remove('falling-btn');
                    loginBtn.style.transform = "translate(0,0)";
                    loginFails = 0;
                    showAlert("Erreur Système", "Mot de passe incorrect ! Indice: C'est un mot de 4 lettres que les enfants aiment bien dire.");
                }
            }, 2000);
        }
    }
});

loginBtn.addEventListener('click', () => {
    if (passField.value.toLowerCase() === 'caca') {
        audioClick.play();
        startBoot();
    } else {
        showAlert("Erreur Système", "Mot de passe incorrect ! Indice: C'est un mot de 4 lettres que les enfants aiment bien dire.");
    }
});

// 2. BOOT SEQUENCE
function startBoot() {
    loginScreen.classList.add('hidden');
    bootScreen.classList.remove('hidden');
    audioBoot.play();

    const messages = [
        "BIOS Version 1.0.4 - Souvenir System",
        "Copyright (C) 1998, Mazin Corp.",
        "CPU: 486DX2 at 66MHz",
        "Memory Test: 16384K OK",
        "Detecting primary master... VOYAGE-HD-2GB",
        "Loading Kernel...",
        "Init: Loading drivers [OK]",
        "Mounting /mnt/memories... [OK]",
        "Starting Trip.exe..."
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < messages.length) {
            const p = document.createElement('p');
            p.innerText = messages[i];
            bootLog.appendChild(p);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(startLoading, 1000);
        }
    }, 400);
}

// 3. LOADING SEQUENCE (Square loader)
function startLoading() {
    bootScreen.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    audioLoading.play();

    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 2; // Slower and more squares
            loadingStatus.innerText = progress + "%";
            if (progress % 4 === 0) {
                const square = document.createElement('div');
                square.className = 'loader-square';
                square.style.flex = "0 0 15px"; // Fixed width to prevent wrapping
                squareLoader.appendChild(square);
            }
        } else {
            clearInterval(interval);
            setTimeout(startJourney, 1000);
        }
    }, 150);
}

// 4. JOURNEY ENGINE
function startJourney() {
    loadingScreen.classList.add('hidden');
    audioLoading.pause();
    journeyScreen.classList.remove('hidden');
    renderCity();
}

function renderCity() {
    const data = journeyData[currentStep];
    const title = document.getElementById('city-title');
    const text = document.getElementById('dialogue-text');
    const visual = document.getElementById('visual-container');
    const nextBtn = document.getElementById('next-city-btn');

    // Theme transition
    journeyScreen.className = "screen theme-" + data.theme;

    title.innerText = `${data.city}, ${data.country}`;
    text.innerText = data.pages[currentPage];

    // Button text update
    if (currentPage < data.pages.length - 1) {
        nextBtn.innerText = "Page suivante";
    } else {
        nextBtn.innerText = "Continuer le voyage";
    }

    // Clear & Fill Visuals (only if first page of city to avoid flickering)
    if (currentPage === 0) {
        visual.innerHTML = "";
        data.images.forEach(img => {
            const wrapper = document.createElement('div');
            wrapper.className = "image-wrapper";

            const imgEl = document.createElement('img');
            imgEl.src = img;

            // Heuristic to detect landscape: images starting with IMG_ or having specific names
            // For now, let's make every 3rd image a landscape to fill space creatively
            if (data.images.indexOf(img) % 3 === 0) {
                wrapper.classList.add('landscape');
            }

            wrapper.appendChild(imgEl);
            visual.appendChild(wrapper);
        });
    }
}

document.getElementById('next-city-btn').addEventListener('click', () => {
    const data = journeyData[currentStep];
    if (currentPage < data.pages.length - 1) {
        currentPage++;
        renderCity();
    } else {
        currentStep++;
        currentPage = 0;
        if (currentStep < journeyData.length) {
            showTransition();
        } else {
            showFinal();
        }
    }
});

function showTransition() {
    const trans = document.getElementById('transport-transition');
    const transText = document.getElementById('transition-text');
    const transIcon = trans.querySelector('.transport-icon');
    const transport = journeyData[currentStep-1].transport;

    const icons = {
        'train': '🚂',
        'avion': '✈️',
        'bateau': '🚢',
        'bus': '🚌'
    };

    const animations = ['move-right', 'move-left', 'move-up'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];

    trans.classList.remove('hidden');
    transIcon.innerText = icons[transport] || '👣';
    transIcon.className = 'transport-icon ' + randomAnim;
    transText.innerText = `Direction ${journeyData[currentStep].city} par ${transport}...`;

    setTimeout(() => {
        trans.classList.add('hidden');
        renderCity();
    }, 2500);
}

// 5. FINAL SCREEN
function showFinal() {
    journeyScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');

    const container = document.getElementById('interactive-cloud-lake');
    poems.forEach((poem, i) => {
        const icon = document.createElement('img');
        icon.src = "https://win98icons.alexmeub.com/icons/png/document_writing-0.png";
        icon.className = "floating-icon";
        icon.style.left = (Math.random() * 80 + 10) + "%";
        icon.style.top = (Math.random() * 80 + 10) + "%";
        icon.onclick = () => {
            icon.classList.toggle('dance');
            showAlert(poem.title, `par ${poem.author}\n\n${poem.text}`);
        };
        container.appendChild(icon);
    });

    // Easter Egg: Random joke when clicking the sky
    container.onclick = (e) => {
        if (e.target === container) {
            const jokes = ["Pourquoi les oiseaux volent-ils vers le sud ? Parce que c'est trop loin pour y aller à pied.", "Un nuage dit à un autre : 'Tu as une mine grisâtre aujourd'hui.'"];
            showAlert("Blague de Nuage", jokes[Math.floor(Math.random()*jokes.length)]);
        }
    };

    // Add some photo icons too
    journeyData.forEach(d => {
        const icon = document.createElement('img');
        icon.src = "https://win98icons.alexmeub.com/icons/png/image_file-0.png";
        icon.className = "floating-icon";
        icon.style.left = (Math.random() * 80 + 10) + "%";
        icon.style.top = (Math.random() * 80 + 10) + "%";
        icon.onclick = () => {
            icon.classList.toggle('dance');
            const randomImg = d.images[Math.floor(Math.random() * d.images.length)];
            showAlert(`Souvenir de ${d.city}`, `<img src='${randomImg}' style='width:100%'>`, true);
        };
        container.appendChild(icon);
    });
}
