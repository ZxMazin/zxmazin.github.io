document.addEventListener("DOMContentLoaded", () => {
    const nodes = [
        { id: 'meknes', name: 'Meknès', x: 12, y: 75, img: 'images/meknes/000118380040.jpg' },
        { id: 'rabat', name: 'Rabat', x: 10, y: 70, img: 'images/rabat/000118380038.jpg' },
        { id: 'paris', name: 'Paris', x: 33, y: 48, img: 'images/paris/IMG_0380.JPG' },
        { id: 'stockholm', name: 'Stockholm', x: 62, y: 22, img: 'images/stockholm/IMG_0828.JPG' },
        { id: 'helsinki', name: 'Helsinki', x: 75, y: 18, img: 'images/helsinki/000118380034.jpg' },
        { id: 'tallinn', name: 'Tallinn', x: 75, y: 26, img: 'images/tallinn/000118380033.jpg' },
        { id: 'riga', name: 'Riga', x: 72, y: 34, img: 'images/riga/IMG_1731.JPG' },
        { id: 'varsovie', name: 'Varsovie', x: 60, y: 45, img: 'images/varsovie/000118380025.jpg' },
        { id: 'prague', name: 'Prague', x: 50, y: 52, img: 'images/prague/000118380002.jpg' },
    ];

    const map = document.getElementById('adventure-map');
    const nodesLayer = document.getElementById('nodes-layer');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loginOverlay = document.getElementById('login-overlay');
    const passwordInput = document.getElementById('site-password');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');

    // Authentication Check
    const isAuthenticated = sessionStorage.getItem('site_auth') === 'true';
    const hasSeenLoader = sessionStorage.getItem('has_seen_loader') === 'true';

    if (isAuthenticated) {
        loginOverlay.style.display = 'none';
        if (hasSeenLoader) {
            loadingOverlay.style.display = 'none';
        } else {
            runLoader();
        }
    } else {
        loadingOverlay.style.display = 'none';
        loginButton.onclick = attemptLogin;
        passwordInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
    }

    function attemptLogin() {
        if (passwordInput.value.toLowerCase() === 'octobre') {
            sessionStorage.setItem('site_auth', 'true');
            loginOverlay.style.opacity = '0';
            setTimeout(() => {
                loginOverlay.style.display = 'none';
                runLoader();
            }, 1000);
        } else {
            loginError.style.display = 'block';
            passwordInput.value = '';
        }
    }

    function runLoader() {
        loadingOverlay.style.display = 'flex';
        sessionStorage.setItem('has_seen_loader', 'true');
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 1000);
        }, 3000);
    }

    // Initialize Map Nodes
    nodes.forEach(node => {
        const div = document.createElement('div');
        div.className = 'map-node';
        div.style.left = node.x + '%';
        div.style.top = node.y + '%';
        div.innerHTML = `
            <img src="${node.img}" alt="${node.name}">
            <span>${node.name}</span>
        `;
        div.onclick = () => {
            window.location.href = `destinations/${node.id}.html`;
        };
        nodesLayer.appendChild(div);
    });

    // Drawing connections
    const linksLayer = document.getElementById('links-layer');
    for (let i = 0; i < nodes.length - 1; i++) {
        const n1 = nodes[i];
        const n2 = nodes[i+1];
        drawLink(n1, n2, linksLayer);
    }

    function drawLink(n1, n2, layer) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", n1.x);
        line.setAttribute("y1", n1.y);
        line.setAttribute("x2", n2.x);
        line.setAttribute("y2", n2.y);
        line.setAttribute("class", "map-link");
        layer.appendChild(line);
    }
});
