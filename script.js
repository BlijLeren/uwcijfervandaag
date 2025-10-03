let cijferData = {};
let currentC = null;

async function loadData() {
    const res = await fetch('data.json');
    cijferData = await res.json();
}

function getRandomCijfer() {
    const keys = Object.keys(cijferData);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return cijferData[randomKey];
}

function typeText(element, text, speed = 40) {
    return new Promise(resolve => {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadData();

    const inboxBtn = document.getElementById('inbox-btn');
    const berichtContainer = document.getElementById('bericht-container');
    const cijferContainer = document.getElementById('cijfer-container');
    const arrowBtn = document.getElementById('arrow-btn');
    const factContainer = document.getElementById('fact-container');
    const readMoreBtn = document.getElementById('read-more-btn');
    const readMoreContent = document.getElementById('readmore-content');
    const container = document.querySelector('.container');
    const loadingMessage = document.getElementById('loading-message');
    const nieuwBericht = document.getElementById('nieuw-bericht');

    inboxBtn.addEventListener('click', async () => {
        // Hide inbox button and nieuw bericht message
        inboxBtn.style.display = 'none';
        nieuwBericht.style.display = 'none';

        // Show loading state
        container.classList.add('loading');
        // Simulate loading delay for effect
        await new Promise(res => setTimeout(res, 700));

        // Reset UI
        berichtContainer.textContent = '';
        cijferContainer.textContent = '';
        cijferContainer.classList.remove('visible');
        factContainer.textContent = '';
        arrowBtn.style.display = 'none';
        arrowBtn.classList.remove('visible');
        readMoreBtn.style.display = 'none';

        currentC = getRandomCijfer();

        // Remove loading state and show content
        container.classList.remove('loading');

        // 1. Type bericht
        await typeText(berichtContainer, currentC.bericht);

        // Extra delay before cijfer fade-in
        await new Promise(res => setTimeout(res, 700));

        // 2. Fade in cijfer
        cijferContainer.textContent = currentC.cijfer;
        // Force reflow to allow transition
        void cijferContainer.offsetWidth;
        cijferContainer.classList.add('visible');

        // Wait for fade-in to finish
        await new Promise(res => setTimeout(res, 2200));

        // 3. Fade in arrow button
        arrowBtn.style.display = 'inline-block';
        // Force reflow to allow transition
        void arrowBtn.offsetWidth;
        arrowBtn.classList.add('visible');
    });

    arrowBtn.addEventListener('click', () => {
        // Hide bericht and cijfer, show fact
        berichtContainer.textContent = '';
        cijferContainer.textContent = '';
        cijferContainer.classList.remove('visible');
        arrowBtn.style.display = 'none';
        arrowBtn.classList.remove('visible');
        factContainer.textContent = currentC.fact;
        readMoreBtn.style.display = 'inline-block';
    });

    readMoreBtn.addEventListener('click', () => {
            void readMoreContent.offsetWidth;
            readMoreContent.classList.add('visible');

        setTimeout(() => {
            readMoreContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
                readMoreContent.style.display = 'block';

    });
});
