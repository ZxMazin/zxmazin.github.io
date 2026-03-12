(function() {
    const themes = {
        'theme-morocco': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder for souk
        'theme-scandinavia': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder for wind
        'theme-paris': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Placeholder for cafe
        'theme-eastern-europe': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' // Placeholder for train
    };

    const bodyClass = document.body.className;
    let soundUrl = '';

    for (const [cls, url] of Object.entries(themes)) {
        if (bodyClass.includes(cls)) {
            soundUrl = url;
            break;
        }
    }

    if (soundUrl) {
        const audio = new Audio(soundUrl);
        audio.loop = true;
        audio.volume = 0.2;

        // Try to play on first interaction due to browser policies
        const playAudio = () => {
            audio.play().catch(e => console.log("Autoplay blocked, waiting for interaction."));
            document.removeEventListener('click', playAudio);
        };
        document.addEventListener('click', playAudio);
    }
})();
