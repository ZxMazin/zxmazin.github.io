// STATE
let currentStep = 0;
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

const audioBoot = document.getElementById('audio-boot');
const audioLoading = document.getElementById('audio-loading');
const audioClick = document.getElementById('audio-click');

// 1. LOGIN LOGIC
loginBtn.addEventListener('mouseover', () => {
    if (loginFails < 3) {
        // Blague du bouton qui change de place
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        loginBtn.style.transform = `translate(${x}px, ${y}px)`;
        loginFails++;
    }
});

loginBtn.addEventListener('click', () => {
    if (passField.value.toLowerCase() === 'caca') {
        audioClick.play();
        startBoot();
    } else {
        alert("Mot de passe incorrect ! Indice: C'est un mot de 4 lettres que les enfants aiment bien dire.");
        loginBtn.style.transform = `translate(0, 0)`;
        loginFails = 0;
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
            progress += 5;
            loadingStatus.innerText = progress + "%";
            const square = document.createElement('div');
            square.className = 'loader-square';
            squareLoader.appendChild(square);
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
    const content = document.getElementById('journey-content');
    const title = document.getElementById('city-title');
    const text = document.getElementById('dialogue-text');
    const visual = document.getElementById('visual-container');

    // Theme transition
    journeyScreen.className = "screen theme-" + data.theme;

    title.innerText = `${data.city}, ${data.country}`;
    text.innerText = data.text;

    // Clear & Fill Visuals
    visual.innerHTML = "";
    data.images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = "image-wrapper";

        const imgEl = document.createElement('img');
        imgEl.src = img;

        wrapper.appendChild(imgEl);
        visual.appendChild(wrapper);
    });
}

document.getElementById('next-city-btn').addEventListener('click', () => {
    currentStep++;
    if (currentStep < journeyData.length) {
        showTransition();
    } else {
        showFinal();
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

    trans.classList.remove('hidden');
    transIcon.innerText = icons[transport] || '👣';
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
        icon.onclick = () => alert(`${poem.title}\npar ${poem.author}\n\n${poem.text}`);
        container.appendChild(icon);
    });

    // Easter Egg: Random joke when clicking the sky
    container.onclick = (e) => {
        if (e.target === container) {
            const jokes = ["Pourquoi les oiseaux volent-ils vers le sud ? Parce que c'est trop loin pour y aller à pied.", "Un nuage dit à un autre : 'Tu as une mine grisâtre aujourd'hui.'"];
            alert(jokes[Math.floor(Math.random()*jokes.length)]);
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
            const randomImg = d.images[Math.floor(Math.random() * d.images.length)];
            const win = window.open("", "_blank", "width=600,height=400");
            win.document.write(`<img src='${randomImg}' style='width:100%'>`);
        };
        container.appendChild(icon);
    });
}
