document.addEventListener("DOMContentLoaded", () => {
    const nodes = [
        { id: 'switzerland', name: 'Switzerland', x: 35, y: 55, img: 'images/paris/IMG_0380.JPG' },
        { id: 'meknes', name: 'Meknès', x: 15, y: 75, img: 'images/meknes/000118380040.jpg' },
        { id: 'rabat', name: 'Rabat', x: 18, y: 70, img: 'images/rabat/000118380038.jpg' },
        { id: 'paris', name: 'Paris', x: 30, y: 45, img: 'images/paris/IMG_0380.JPG' },
        { id: 'stockholm', name: 'Stockholm', x: 45, y: 25, img: 'images/stockholm/IMG_0828.JPG' },
        { id: 'helsinki', name: 'Helsinki', x: 60, y: 20, img: 'images/helsinki/000118380034.jpg' },
        { id: 'tallinn', name: 'Tallinn', x: 60, y: 30, img: 'images/tallinn/000118380033.jpg' },
        { id: 'riga', name: 'Riga', x: 58, y: 38, img: 'images/riga/IMG_1731.JPG' },
        { id: 'varsovie', name: 'Varsovie', x: 55, y: 48, img: 'images/varsovie/000118380025.jpg' },
        { id: 'prague', name: 'Prague', x: 45, y: 55, img: 'images/prague/000118380002.jpg' },
    ];

    const map = document.getElementById('adventure-map');
    const nodesLayer = document.getElementById('nodes-layer');

    nodes.forEach(node => {
        const div = document.createElement('div');
        div.className = 'map-node';
        div.style.left = node.x + '%';
        div.style.top = node.y + '%';
        div.innerHTML = `
            <img src="${node.img}" alt="${node.name}">
            <span>${node.name}</span>
        `;
        div.onclick = async () => {
            div.classList.add('node-open-top');

            const portal = document.createElement('div');
            portal.className = 'portal-overlay';
            // Set position exactly over the clicked node initially
            portal.style.top = `${node.y}%`;
            portal.style.left = `${node.x}%`;
            document.body.appendChild(portal);

            // trigger animation
            requestAnimationFrame(() => {
                portal.classList.add('portal-active');
            });

            const destUrl = `destinations/${node.id}.html`;

            // Try to preload some images
            try {
                const response = await fetch(destUrl);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const imgs = doc.querySelectorAll('img');

                // Preload up to 5 images
                const imgsToLoad = Array.from(imgs).slice(0, 5);
                imgsToLoad.forEach(img => {
                    const preload = new Image();
                    preload.src = img.src;
                });
            } catch (e) {
                console.error("Error preloading:", e);
            }

            // wait for portal to fill screen
            setTimeout(() => {
                window.location.href = destUrl;
            }, 1000);
        };
        nodesLayer.appendChild(div);
    });

    // Transport Sequence
    const sequence = [
        { from: 'switzerland', to: 'meknes', transport: 'plane' },
        { from: 'meknes', to: 'rabat', transport: 'train' },
        { from: 'rabat', to: 'paris', transport: 'plane' },
        { from: 'paris', to: 'stockholm', transport: 'plane' },
        { from: 'stockholm', to: 'helsinki', transport: 'plane' },
        { from: 'helsinki', to: 'tallinn', transport: 'ship' },
        { from: 'tallinn', to: 'riga', transport: 'bus' },
        { from: 'riga', to: 'varsovie', transport: 'bus' },
        { from: 'varsovie', to: 'prague', transport: 'train' },
        { from: 'prague', to: 'switzerland', transport: 'train' }
    ];

    const linksLayerSvg = document.getElementById('links-layer-svg');

    function drawConnections() {
        linksLayerSvg.innerHTML = '';

        sequence.forEach(link => {
            const n1 = nodes.find(n => n.id === link.from);
            const n2 = nodes.find(n => n.id === link.to);

            if (!n1 || !n2) return;

            // Find the center of the nodes in pixel coordinates
            const x1 = (n1.x / 100) * window.innerWidth + 60; // +60 for center of 120px node
            const y1 = (n1.y / 100) * window.innerHeight + 60;
            const x2 = (n2.x / 100) * window.innerWidth + 60;
            const y2 = (n2.y / 100) * window.innerHeight + 60;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            if (link.transport === 'ship') {
                // Curved path for ship
                const cx = (x1 + x2) / 2 + 50;
                const cy = (y1 + y2) / 2 - 50;
                path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
            } else {
                path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
            }

            path.classList.add(`link-${link.transport}`);
            linksLayerSvg.appendChild(path);
        });
    }

    drawConnections();
    window.addEventListener('resize', drawConnections);

    // Hide loading screen
    setTimeout(() => {
        const loader = document.getElementById('loading-overlay');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 1000);
    }, 3000);
});
