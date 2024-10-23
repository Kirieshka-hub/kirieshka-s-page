document.addEventListener('DOMContentLoaded', () => {
    const frontTextElements = document.querySelectorAll('.front .glitch-text');
    const backTextElements = document.querySelectorAll('.back .glitch-text');
    const card = document.querySelector('.card');
    
    let backTextTyped = false;

    frontTextElements.forEach((element) => {
        const typingSpeed = element.classList.contains('fast') ? 10 : 300;
        typeTextWithGlitch(element, typingSpeed);
    });

    const noFlipLinks = document.querySelectorAll('.no-flip');
    noFlipLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');

        if (card.classList.contains('flipped')) {
            if (!backTextTyped) {
                backTextElements.forEach((element) => {
                    const typingSpeed = element.classList.contains('slow') ? 200 : 10;
                    typeTextWithGlitch(element, typingSpeed);
                });
                backTextTyped = true;
            }
        } else {
            backTextTyped = false;
        }
    });
});

function typeTextWithGlitch(element, typingSpeed) {
    const fullText = element.textContent;
    let displayedText = '';
    let index = 0;

    element.textContent = '';

    const glitchProbability = 0.3;
    const glitchDuration = 300;
    const glitchLetterProbability = 0.001;

    function typeCharacter() {
        if (index < fullText.length) {
            let char = fullText[index];

            if (Math.random() < glitchProbability) {
                const randomChar = getRandomChar();
                displayedText += randomChar;
                element.textContent = displayedText;

                setTimeout(() => {
                    displayedText = displayedText.slice(0, -1);
                    element.textContent = displayedText;
                    continueTyping();
                }, glitchDuration);
            } else {
                if (Math.random() < glitchLetterProbability) {
                    char = `<span class="glitch-letter">${char}</span>`;
                }

                displayedText += char;
                element.innerHTML = displayedText;
                index++;
                continueTyping();
            }
        }
    }

    function continueTyping() {
        setTimeout(typeCharacter, typingSpeed);
    }

    continueTyping();
}

function getRandomChar() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-{}[];:<>,.?/';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}
