// STATE
let currentStep = 0;
let currentPage = 0;
let loginMoves = 0;
const MAX_LOGIN_MOVES = 12;
let youtubeInterludeCount = 0;
const MAX_YOUTUBE_INTERLUDES = 3;

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
    if (loginMoves < MAX_LOGIN_MOVES) {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150;
        loginBtn.style.transform = `translate(${x}px, ${y}px)`;
        loginBtn.style.setProperty('--last-x', `${x}px`);
        loginBtn.style.setProperty('--last-y', `${y}px`);
        loginMoves++;
    } else if (loginMoves === MAX_LOGIN_MOVES) {
        loginBtn.classList.add('falling-btn');
        loginMoves++; // prevent repeated fall trigger
        setTimeout(() => {
            if (passField.value.toLowerCase() === 'caca') {
                startBoot();
            } else {
                loginBtn.classList.remove('falling-btn');
                loginBtn.style.transform = "translate(0,0)";
                loginMoves = 0;
                showAlert("Erreur Système", "Mot de passe incorrect ! Indice: C'est un mot de 4 lettres que les enfants aiment bien dire.");
            }
        }, 2000);
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

// 3. LOADING SEQUENCE
function startLoading() {
    bootScreen.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    audioLoading.play();

    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 5;
            loadingStatus.innerText = progress + "%";
            const square = document.createElement('div');
            square.className = 'loader-square';
            squareLoader.appendChild(square);
        } else {
            clearInterval(interval);
            setTimeout(startJourney, 1000);
        }
    }, 100);
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

    journeyScreen.className = "screen theme-" + data.theme;
    title.innerText = `${data.city}, ${data.country}`;
    text.innerText = data.pages[currentPage];

    if (currentPage < data.pages.length - 1) {
        nextBtn.innerText = "Page suivante";
    } else {
        nextBtn.innerText = (currentStep < journeyData.length - 1) ? "Continuer le voyage" : "Terminer l'aventure";
    }

    if (currentPage === 0) {
        visual.innerHTML = "";
        data.images.forEach((img, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = "image-wrapper";
            const imgEl = document.createElement('img');
            imgEl.src = img;
            if (idx % 3 === 0) wrapper.classList.add('landscape');
            wrapper.appendChild(imgEl);
            visual.appendChild(wrapper);
        });

        // Specific IKEA logic
        if (data.theme === 'sweden') {
            const basket = document.createElement('div');
            basket.id = 'ikea-basket';
            basket.innerHTML = "<h3>Mon Panier IKEA</h3><div id='basket-items'>Vide</div><button id='checkout-btn'>Passer à la caisse</button>";
            visual.appendChild(basket);

            document.querySelectorAll('.image-wrapper').forEach(w => {
                w.onclick = () => {
                    const itemName = w.getAttribute('data-name') || "Meuble Stockholm";
                    const itemDiv = document.createElement('div');
                    itemDiv.innerText = "1x " + itemName + " - 29.99€";
                    document.getElementById('basket-items').appendChild(itemDiv);
                };
            });

            document.getElementById('checkout-btn').onclick = () => {
                showAlert("Paiement Sécurisé", "Veuillez insérer votre carte de crédit imaginaire... <br><br> Paiement accepté ! Merci de votre visite.", true);
            };
        }
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
            // Logic for YouTube interludes
            if (youtubeInterludeCount < MAX_YOUTUBE_INTERLUDES &&
                (currentStep === 3 || currentStep === 6 || currentStep === journeyData.length - 1)) {
                showYoutubeInterlude();
            } else {
                showTransition();
            }
        } else {
            showFinal();
        }
    }
});

function showYoutubeInterlude() {
    const interlude = document.createElement('div');
    interlude.id = 'youtube-interlude';
    interlude.innerHTML = `
        <div class="interlude-overlay">
            <h2>Interlude Musical...</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/J8ugZk1rPpU?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <button onclick="this.parentElement.parentElement.remove(); showTransition();">Passer l'interlude</button>
        </div>
    `;
    document.body.appendChild(interlude);
    youtubeInterludeCount++;
}

function showTransition() {
    const trans = document.getElementById('transport-transition');
    const transText = document.getElementById('transition-text');
    const transport = journeyData[currentStep-1].transport;

    if (transport === 'fin' || transport === 'none') {
        renderCity();
        return;
    }

    // Pick a random movement class
    const moves = ['move-right', 'move-left', 'move-up'];
    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    trans.classList.remove('hidden');
    trans.className = 'transition-container active ' + transport + ' ' + randomMove;
    transText.innerText = `Déplacement vers ${journeyData[currentStep].city}...`;

    setTimeout(() => {
        trans.classList.add('hidden');
        trans.classList.remove('active');
        renderCity();
    }, 3000);
}

// 5. FINAL SCREEN
function showFinal() {
    journeyScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');

    const container = document.getElementById('interactive-cloud-lake');
    container.innerHTML = ""; // Clear

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

    journeyData.forEach(d => {
        if (d.images.length > 0) {
            const icon = document.createElement('img');
            icon.src = "https://win98icons.alexmeub.com/icons/png/image_file-0.png";
            icon.className = "floating-icon";
            icon.style.left = (Math.random() * 80 + 10) + "%";
            icon.style.top = (Math.random() * 80 + 10) + "%";
            icon.onclick = () => {
                const randomImg = d.images[Math.floor(Math.random() * d.images.length)];
                showAlert(`Souvenir de ${d.city}`, `<img src='${randomImg}' style='width:100%'>`, true);
            };
            container.appendChild(icon);
        }
    });
}
