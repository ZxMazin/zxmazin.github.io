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

const zoomOverlay = document.getElementById('zoom-overlay');
const zoomImg = zoomOverlay.querySelector('img');

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
document.addEventListener('mousemove', (e) => {
    if (loginScreen.classList.contains('hidden')) return;

    const rect = loginBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dist = Math.sqrt(Math.pow(e.clientX - btnX, 2) + Math.pow(e.clientY - btnY, 2));

    if (dist < 80 && loginMoves < MAX_LOGIN_MOVES) {
        const x = (Math.random() - 0.5) * window.innerWidth * 0.6;
        const y = (Math.random() - 0.5) * window.innerHeight * 0.6;
        loginBtn.style.transform = `translate(${x}px, ${y}px)`;
        loginBtn.style.setProperty('--last-x', `${x}px`);
        loginBtn.style.setProperty('--last-y', `${y}px`);
        loginMoves++;
    } else if (dist < 80 && loginMoves === MAX_LOGIN_MOVES) {
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

function createBgQuotes(text) {
    const container = document.getElementById('journey-screen');
    // Clear old quotes
    document.querySelectorAll('.bg-quote').forEach(q => q.remove());

    const lines = text.split('\n').filter(l => l.length > 20);
    lines.forEach((line, i) => {
        const q = document.createElement('div');
        q.className = 'bg-quote';
        q.innerText = line;
        q.style.top = (10 + (i * 15) % 80) + '%';
        q.style.animationDelay = (i * 2) + 's';
        q.style.animationDuration = (20 + Math.random() * 20) + 's';
        container.appendChild(q);
    });
}

function renderCity() {
    const data = journeyData[currentStep];
    const title = document.getElementById('city-title');
    const text = document.getElementById('dialogue-text');
    const visual = document.getElementById('visual-container');
    const nextBtn = document.getElementById('next-city-btn');

    journeyScreen.className = "screen theme-" + data.theme;
    title.innerText = `${data.city}, ${data.country}`;
    text.innerText = data.text;

    createBgQuotes(data.text);

    nextBtn.innerText = (currentStep < journeyData.length - 1) ? "Continuer le voyage" : "Terminer l'aventure";

    if (currentPage === 0) {
        visual.innerHTML = "";
        data.images.forEach((imgData, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = "image-wrapper";

            // Layout variety
            if (idx % 5 === 0) wrapper.classList.add('big');
            else if (idx % 3 === 0) wrapper.classList.add('landscape');
            else if (idx % 4 === 0) wrapper.classList.add('portrait');

            const imgEl = document.createElement('img');
            const imgSrc = (typeof imgData === 'string') ? imgData : imgData.src;
            imgEl.src = imgSrc;

            wrapper.onclick = () => {
                zoomImg.src = imgSrc;
                zoomOverlay.style.display = 'flex';
            };

            wrapper.appendChild(imgEl);
            visual.appendChild(wrapper);
        });

        // Specific IKEA logic
        if (data.theme === 'sweden') {
            window.ikeaCart = window.ikeaCart || {};
            window.ikeaPaid = false;

            const basket = document.createElement('div');
            basket.id = 'ikea-basket';
            visual.appendChild(basket);

            const updateBasket = () => {
                const itemsDiv = document.createElement('div');
                let total = 0;
                let count = 0;

                basket.innerHTML = "<h3>Smarte Shopping Cart (SEK)</h3>";

                Object.keys(window.ikeaCart).forEach(id => {
                    const item = window.ikeaCart[id];
                    if (item.qty <= 0) return;

                    count += item.qty;
                    total += item.price * item.qty;

                    const row = document.createElement('div');
                    row.className = 'basket-item';
                    row.innerHTML = `
                        <span>${item.name} x${item.qty}</span>
                        <div class='basket-controls'>
                            <button onclick="window.modIkea('${id}', -1)">-</button>
                            <button onclick="window.modIkea('${id}', 1)">+</button>
                            <span>${(item.price * item.qty).toLocaleString()} kr</span>
                        </div>
                    `;
                    basket.appendChild(row);
                });

                if (count === 0) {
                    basket.innerHTML += "<p>Votre panier est vide.</p>";
                } else {
                    const foot = document.createElement('div');
                    foot.style.marginTop = '10px';
                    foot.style.fontWeight = 'bold';
                    foot.innerHTML = `Total: ${total.toLocaleString()} kr <button id='checkout-btn' style='float:right'>PAYER</button>`;
                    basket.appendChild(foot);
                    document.getElementById('checkout-btn').onclick = showPaymentModal;
                }
            };

            window.modIkea = (id, delta) => {
                if (window.ikeaCart[id]) {
                    window.ikeaCart[id].qty += delta;
                    if (window.ikeaCart[id].qty < 0) window.ikeaCart[id].qty = 0;
                    updateBasket();
                }
            };

            updateBasket();

            // Re-render images with product info
            visual.querySelectorAll('.image-wrapper').forEach((w, idx) => {
                const p = data.images[idx];
                if (!p.name) return;

                w.innerHTML += `<div class='product-info'>${p.name}<br>${p.price} kr</div>`;
                const btn = document.createElement('button');
                btn.className = 'add-to-cart-btn';
                btn.innerText = 'Ajouter au panier';
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const itemId = 'item-' + idx;
                    if (!window.ikeaCart[itemId]) {
                        window.ikeaCart[itemId] = { name: p.name, price: p.price, qty: 0 };
                    }
                    window.ikeaCart[itemId].qty++;
                    updateBasket();
                };
                w.appendChild(btn);
            });
        }
    }
}

document.getElementById('next-city-btn').addEventListener('click', () => {
    // Check for payment lock if in Sweden
    if (journeyData[currentStep].id === 'stockholm' && !window.ikeaPaid) {
        showAlert("Accès Refusé", "Vous devez régler vos achats IKEA avant de quitter la Suède !");
        return;
    }

    currentStep++;
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
});

function showYoutubeInterlude() {
    const interlude = document.createElement('div');
    interlude.id = 'youtube-interlude';
    interlude.innerHTML = `
        <div class="interlude-overlay">
            <h2>Interlude Musical...</h2>
            <iframe src="https://www.youtube-nocookie.com/embed/J8ugZk1rPpU?autoplay=1&mute=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <button onclick="this.parentElement.parentElement.remove(); showTransition();">Passer l'interlude</button>
        </div>
    `;
    document.body.appendChild(interlude);
    youtubeInterludeCount++;
}

// Easter Eggs
document.addEventListener('keydown', (e) => {
    if (e.key === 'h') {
        showAlert("Easter Egg", "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau.");
    }
});

zoomOverlay.onclick = () => zoomOverlay.style.display = 'none';

function showPaymentModal() {
    const html = `
        <div style='color:#000'>
            <p>Veuillez choisir votre méthode de paiement :</p>
            <div style='margin: 15px 0; display: flex; flex-direction: column; gap: 10px;'>
                <label><input type="radio" name="pay" value="card"> Carte de Crédit Imaginaire</label>
                <label><input type="radio" name="pay" value="gold"> Or de Leprechaun</label>
                <label><input type="radio" name="pay" value="cacao"> Fèves de Cacao</label>
            </div>
            <p><i>Note: Aucun remboursement possible après le départ du ferry.</i></p>
        </div>
    `;
    showAlert("Paiement Sécurisé", html, true);

    // Override the OK button for this specific modal
    const okBtn = document.getElementById('modal-ok-btn');
    const oldClick = okBtn.onclick;
    okBtn.onclick = () => {
        const selected = document.querySelector('input[name="pay"]:checked');
        if (selected) {
            window.ikeaPaid = true;
            hideAlert();
            showAlert("Succès", "Paiement accepté ! Vous pouvez maintenant continuer votre voyage vers la Finlande.");
            okBtn.onclick = oldClick; // Restore
        } else {
            alert("Veuillez sélectionner une méthode !");
        }
    };
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
    const moves = ['move-right', 'move-left', 'move-up', 'move-down'];
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

// 5. FINAL SCREEN (WIN98)
function openWin98(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeWin98(id) {
    document.getElementById(id).style.display = 'none';
}

function openFolder(cityId) {
    const data = journeyData.find(d => d.id === cityId);
    const win = document.getElementById('win-folder-view');
    const body = document.getElementById('folder-view-body');
    const title = document.getElementById('folder-view-title');

    title.innerText = `C:\\Voyage\\Archives\\${data.city}`;
    body.innerHTML = `<h3>${data.city}, ${data.country}</h3><p>${data.text}</p><hr><div class='folder-grid'></div>`;

    const grid = body.querySelector('.folder-grid');
    data.images.forEach(img => {
        const src = (typeof img === 'string') ? img : img.src;
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.style.color = '#000';
        icon.innerHTML = `<img src="${src}" style="width:50px; height:50px; object-fit:cover;"><span>Photo</span>`;
        icon.onclick = () => {
            zoomImg.src = src;
            zoomOverlay.style.display = 'flex';
        };
        grid.appendChild(icon);
    });

    openWin98('win-folder-view');
}

function showFinal() {
    journeyScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');

    const arcGrid = document.getElementById('archives-grid');
    arcGrid.innerHTML = "";
    journeyData.forEach(d => {
        if (d.images.length > 0) {
            const icon = document.createElement('div');
            icon.className = 'desktop-icon';
            icon.style.color = '#000';
            icon.innerHTML = `<img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"><span>${d.city}</span>`;
            icon.onclick = () => openFolder(d.id);
            arcGrid.appendChild(icon);
        }
    });

    const poemGrid = document.getElementById('poems-grid');
    poemGrid.innerHTML = "";
    poems.forEach(p => {
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.style.color = '#000';
        icon.innerHTML = `<img src="https://win98icons.alexmeub.com/icons/png/document_writing-0.png"><span>${p.title}</span>`;
        icon.onclick = () => showAlert(p.title, `par ${p.author}\n\n${p.text}`);
        poemGrid.appendChild(icon);
    });
}
