// MOBILE BLOCK
if (window.innerWidth < 768) {
    document.getElementById('mobile-block').classList.remove('hidden');
}

// STATE
let currentLang = 'fr';
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
const zoomCartBanner = document.getElementById('zoom-cart-banner');
const zoomProductName = document.getElementById('zoom-product-name');
const zoomAddBtn = document.getElementById('zoom-add-btn');

// Modal Elements
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalOkBtn = document.getElementById('modal-ok-btn');

const audioBoot = document.getElementById('audio-boot');
const audioLoading = document.getElementById('audio-loading');
const audioClick = document.getElementById('audio-click');

window.setLanguage = (lang) => {
    currentLang = lang;
    updateUILanguage();
    if (!journeyScreen.classList.contains('hidden')) renderCity();
    if (!finalScreen.classList.contains('hidden')) showFinal();
};

function updateUILanguage() {
    const s = uiStrings[currentLang];
    document.querySelector('#login-screen h2').innerText = s.login_title;
    document.querySelector('#login-screen p').innerText = s.login_pass;
    document.getElementById('password-field').placeholder = s.login_placeholder;
    document.querySelector('#loading-screen h3').innerText = s.booting;

    // Update next button if applicable
    const nextBtn = document.getElementById('next-city-btn');
    if (nextBtn) {
        if (currentStep < journeyData.length - 1) {
            nextBtn.innerText = s.next;
        } else {
            nextBtn.innerText = s.finish;
        }
    }

    // Update Zoom button
    const zoomAddBtnText = document.getElementById('zoom-add-btn');
    if (zoomAddBtnText) zoomAddBtnText.innerText = s.add_to_cart;
}

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
            if (passField.value.toLowerCase() === '1234') {
                startBoot();
            } else {
                loginBtn.classList.remove('falling-btn');
                loginBtn.style.transform = "translate(0,0)";
                loginMoves = 0;
                showAlert("Erreur Système", "Mot de passe incorrect ! Indice: 1234");
            }
        }, 2000);
    }
});

loginBtn.addEventListener('click', () => {
    if (passField.value.toLowerCase() === '1234') {
        audioClick.play();
        startBoot();
    } else {
        showAlert("Erreur Système", "Mot de passe incorrect ! Indice: 1234");
    }
});

passField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// 2. BOOT SEQUENCE
function startBoot() {
    loginScreen.classList.add('hidden');
    bootScreen.classList.remove('hidden');
    audioBoot.play();

    const messages = [
        "Initializing core protocols...",
        "Syncing neural memories...",
        "Establishing connection to archive.v1",
        "Decrypting travel logs [256-bit AES]",
        "Loading destination assets...",
        "Optimizing visual interface...",
        "Ready for departure."
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
    squareLoader.innerHTML = '<div class="loader-square"></div>';
    const bar = squareLoader.querySelector('.loader-square');

    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            loadingStatus.innerText = progress + "%";
            bar.style.width = progress + "%";
        } else {
            clearInterval(interval);
            setTimeout(startJourney, 800);
        }
    }, 50);
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
    const s = uiStrings[currentLang];

    journeyScreen.className = "screen theme-" + data.theme;
    title.innerText = (currentLang === 'de') ? `${data.city_de}, ${data.country_de}` : `${data.city}, ${data.country}`;
    const contentText = (currentLang === 'de') ? data.text_de : data.text;
    text.innerText = contentText;

    nextBtn.innerText = (currentStep < journeyData.length - 1) ? s.next : s.finish;

    if (data.theme === 'sweden' && !window.ikeaPaid) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }

    if (currentPage === 0) {
        visual.innerHTML = "";
        data.images.forEach((imgData, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = "image-wrapper";

            const imgEl = document.createElement('img');
            const imgSrc = (typeof imgData === 'string') ? imgData : imgData.src;
            imgEl.src = imgSrc;

            wrapper.onclick = () => {
                zoomImg.src = imgSrc;
                zoomOverlay.style.display = 'flex';

                if (imgData.name) {
                    zoomCartBanner.style.display = 'flex';
                    zoomProductName.innerText = (currentLang === 'de') ? (imgData.name_de || imgData.name) : imgData.name;
                    zoomAddBtn.onclick = (e) => {
                        e.stopPropagation();
                        const itemId = 'item-' + idx;
                        if (!window.ikeaCart[itemId]) {
                            window.ikeaCart[itemId] = { name: imgData.name, price: imgData.price, qty: 0 };
                        }
                        window.ikeaCart[itemId].qty++;
                        if (window.updateIkeaBasket) window.updateIkeaBasket();
                    };
                } else {
                    zoomCartBanner.style.display = 'none';
                }
            };

            wrapper.appendChild(imgEl);
            visual.appendChild(wrapper);
        });

        // Specific IKEA logic
        if (data.theme === 'sweden') {
            window.ikeaCart = window.ikeaCart || {};
            if (window.ikeaPaid === undefined) window.ikeaPaid = false;

            const basket = document.createElement('div');
            basket.id = 'ikea-basket';
            visual.appendChild(basket);

            const updateBasket = () => {
                window.updateIkeaBasket = updateBasket;
                const itemsDiv = document.createElement('div');
                let total = 0;
                let count = 0;

                basket.innerHTML = `<h3>${uiStrings[currentLang].cart_title}</h3>`;

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
                    foot.innerHTML = `Total: ${total.toLocaleString()} kr <button id='checkout-btn' class='retro-btn' style='float:right'>${s.pay}</button>`;
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

                const pName = (currentLang === 'de') ? (p.name_de || p.name) : p.name;
                const infoDiv = document.createElement('div');
                infoDiv.className = 'product-info';
                infoDiv.innerHTML = `${pName}<br>${p.price} kr`;
                w.appendChild(infoDiv);

                const btn = document.createElement('button');
                btn.className = 'add-to-cart-btn';
                btn.innerText = s.add_to_cart;
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
    const s = uiStrings[currentLang];
    // Check for payment lock if in Sweden
    if (journeyData[currentStep].theme === 'sweden' && !window.ikeaPaid) {
        showAlert(s.access_denied, s.access_denied_msg);
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

    const url = "https://www.youtube-nocookie.com/embed/l5aZJBLAu1E?controls=0&start=120&autoplay=1";

    interlude.innerHTML = `
        <div class="interlude-overlay">
            <h2>Interlude Musical...</h2>
            <iframe 
                width="560"
                height="315"
                src="${url}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <button class="retro-btn" onclick="this.parentElement.parentElement.remove(); showTransition();">
                Passer l'interlude
            </button>
        </div>
    `;

    document.body.appendChild(interlude);
}
// Easter Eggs
document.addEventListener('keydown', (e) => {
    if (e.key === 'h') {
        showAlert("Easter Egg", "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau.");
    }
});

zoomOverlay.onclick = () => zoomOverlay.style.display = 'none';

function showPaymentModal() {
    const s = uiStrings[currentLang];
    const html = `
        <div style='color:#fff'>
            <p>${s.payment_choice}</p>
            <div style='margin: 20px 0; display: flex; flex-direction: column; gap: 15px;'>
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;"><input type="radio" name="pay" value="card"> ${s.payment_card}</label>
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;"><input type="radio" name="pay" value="gold"> ${s.payment_gold}</label>
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;"><input type="radio" name="pay" value="cacao"> ${s.payment_cacao}</label>
            </div>
            <p style="opacity:0.6; font-size:0.8rem;"><i>${s.payment_note}</i></p>
        </div>
    `;
    showAlert(s.payment_title, html, true);

    // Override the OK button for this specific modal
    const okBtn = document.getElementById('modal-ok-btn');
    const oldClick = okBtn.onclick;
    okBtn.onclick = () => {
        const selected = document.querySelector('input[name="pay"]:checked');
        if (selected) {
            window.ikeaPaid = true;
            const nextBtn = document.getElementById('next-city-btn');
            if (nextBtn) {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
            hideAlert();
            showAlert("OK", s.payment_success);
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
    if (id === 'win-video-final') {
        document.getElementById('video-final-frame').src = getYoutubeUrl();
    }
    document.getElementById(id).style.display = 'flex';
}
function closeWin98(id) {
    document.getElementById(id).style.display = 'none';
}

// MINESWEEPER LOGIC
let mines = [];
function initMinesweeper() {
    const grid = document.getElementById('mines-grid');
    grid.innerHTML = "";
    mines = [];
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'mine-cell';
        cell.dataset.index = i;
        cell.onclick = () => revealCell(i);
        cell.oncontextmenu = (e) => { e.preventDefault(); cell.classList.toggle('flagged'); };
        grid.appendChild(cell);
        mines.push({ mine: Math.random() < 0.15, revealed: false });
    }
}

function revealCell(idx) {
    if (mines[idx].revealed) return;
    const grid = document.getElementById('mines-grid');
    const cells = grid.querySelectorAll('.mine-cell');
    mines[idx].revealed = true;
    cells[idx].classList.add('revealed');
    if (mines[idx].mine) {
        cells[idx].innerText = "💣";
        showAlert("Game Over", "BOOM!");
        initMinesweeper();
    } else {
        const count = countMines(idx);
        if (count > 0) cells[idx].innerText = count;
        else {
            const neighbors = getNeighbors(idx);
            neighbors.forEach(n => revealCell(n));
        }
    }
}

function countMines(idx) {
    return getNeighbors(idx).filter(n => mines[n].mine).length;
}

function getNeighbors(idx) {
    const n = [];
    const r = Math.floor(idx / 10);
    const c = idx % 10;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < 10 && nc >= 0 && nc < 10) n.push(nr * 10 + nc);
        }
    }
    return n;
}

// DRAGGING LOGIC
let draggedWin = null;
let offset = { x: 0, y: 0 };

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('win98-title') || e.target.parentElement.classList.contains('win98-title')) {
        draggedWin = e.target.closest('.win98-window');
        const rect = draggedWin.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        draggedWin.style.zIndex = 1000;
    }
});

document.addEventListener('mousemove', (e) => {
    if (draggedWin) {
        draggedWin.style.left = (e.clientX - offset.x) + 'px';
        draggedWin.style.top = (e.clientY - offset.y) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (draggedWin) draggedWin.style.zIndex = 500;
    draggedWin = null;
});

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
        icon.style.color = '#fff';
        icon.innerHTML = `<img src="${src}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;"><span>Photo</span>`;
        icon.onclick = () => {
            zoomImg.src = src;
            zoomOverlay.style.display = 'flex';
        };
        grid.appendChild(icon);
    });

    openWin98('win-folder-view');
}

function showFinal() {
    const s = uiStrings[currentLang];
    journeyScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');

    document.querySelector('.desktop-icon[onclick*="win-archives"] span').innerText = s.archives;
    document.querySelector('.desktop-icon[onclick*="win-video-final"] span').innerText = s.video_final;
    document.querySelector('.desktop-icon[onclick*="win-poems"] span').innerText = s.poems;

    const arcGrid = document.getElementById('archives-grid');
    arcGrid.innerHTML = "";
    journeyData.forEach(d => {
        if (d.images.length > 0) {
            const icon = document.createElement('div');
            icon.className = 'desktop-icon';
            icon.style.color = '#fff';
            icon.innerHTML = `<div class="fallback-icon folder"></div><span>${d.city}</span>`;
            icon.onclick = () => openFolder(d.id);
            arcGrid.appendChild(icon);
        }
    });

    const poemGrid = document.getElementById('poems-grid');
    poemGrid.innerHTML = "";
    poems.forEach(p => {
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.style.color = '#fff';
        const pTitle = (currentLang === 'de') ? (p.title_de || p.title) : p.title;
        const pText = (currentLang === 'de') ? (p.text_de || p.text) : p.text;
        icon.innerHTML = `<div class="fallback-icon poem"></div><span>${pTitle}</span>`;
        icon.onclick = () => showAlert(pTitle, `von ${p.author}\n\n${pText}`);
        poemGrid.appendChild(icon);
    });
}
