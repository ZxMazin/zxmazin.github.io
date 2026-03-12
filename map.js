document.addEventListener("DOMContentLoaded", () => {
    const nodes = [
        { id: 'meknes', name: 'Meknès', x: 20, y: 70, img: 'images/meknes/000118380040.jpg' },
        { id: 'rabat', name: 'Rabat', x: 25, y: 60, img: 'images/rabat/000118380038.jpg' },
        { id: 'paris', name: 'Paris', x: 35, y: 40, img: 'images/paris/IMG_0380.JPG' },
        { id: 'stockholm', name: 'Stockholm', x: 50, y: 20, img: 'images/stockholm/IMG_0828.JPG' },
        { id: 'helsinki', name: 'Helsinki', x: 65, y: 15, img: 'images/helsinki/000118380034.jpg' },
        { id: 'tallinn', name: 'Tallinn', x: 68, y: 25, img: 'images/tallinn/000118380033.jpg' },
        { id: 'riga', name: 'Riga', x: 65, y: 35, img: 'images/riga/IMG_1731.JPG' },
        { id: 'varsovie', name: 'Varsovie', x: 60, y: 45, img: 'images/varsovie/000118380025.jpg' },
        { id: 'prague', name: 'Prague', x: 50, y: 50, img: 'images/prague/000118380002.jpg' },
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

    // Hide loading screen
    setTimeout(() => {
        const loader = document.getElementById('loading-overlay');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 1000);
    }, 3000);
});
