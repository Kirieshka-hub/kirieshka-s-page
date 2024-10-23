document.addEventListener('DOMContentLoaded', () => {
    const frontTextElements = document.querySelectorAll('.front .glitch-text');
    const backTextElements = document.querySelectorAll('.back .glitch-text');
    const card = document.querySelector('.card');
    
    let backTextTyped = false; // Флаг для проверки, напечатан ли текст на обратной стороне

    // Запускаем анимацию для передней стороны с уникальной скоростью
    frontTextElements.forEach((element) => {
        const typingSpeed = element.classList.contains('fast') ? 100 : 300; // Пример условия для скорости
        typeTextWithGlitch(element, typingSpeed);
    });

    // Отслеживаем переворот карточки
    card.addEventListener('click', () => {
        card.classList.toggle('flipped'); // Переключаем класс переворота

        if (card.classList.contains('flipped')) {
            // Если карточка перевернута на обратную сторону
            if (!backTextTyped) {
                backTextElements.forEach((element) => {
                    const typingSpeed = element.classList.contains('slow') ? 300 : 10; // Уникальная скорость для обратной стороны
                    typeTextWithGlitch(element, typingSpeed);
                });
                backTextTyped = true; // Устанавливаем флаг, что текст напечатан
            }
        } else {
            // Если карточка возвращается обратно, сбрасываем текст на обратной стороне, но не очищаем его
            backTextTyped = false; // Сбрасываем флаг для повторного печатания текста на back
        }
    });
});

function typeTextWithGlitch(element, typingSpeed) {
    const fullText = element.textContent;
    let displayedText = '';
    let index = 0;

    element.textContent = ''; // Очистить текст перед началом анимации

    const glitchProbability = 0.3; // Вероятность глитча (ошибочного символа)
    const glitchDuration = 300; // Длительность показа ошибочного символа
    const glitchLetterProbability = 0.01; // Вероятность глюка символа

    function typeCharacter() {
        if (index < fullText.length) {
            let char = fullText[index];

            if (Math.random() < glitchProbability) {
                const randomChar = getRandomChar();
                displayedText += randomChar;
                element.textContent = displayedText;

                // Задержка для отображения ошибочного символа
                setTimeout(() => {
                    displayedText = displayedText.slice(0, -1); // Удаляем ошибочный символ
                    element.textContent = displayedText;
                    continueTyping(); // Продолжаем набор после удаления глитча
                }, glitchDuration);
            } else {
                if (Math.random() < glitchLetterProbability) {
                    // Применяем класс глюка к символу
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
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-{}[];:<>,.?/'; // Набор случайных символов
    return characters.charAt(Math.floor(Math.random() * characters.length));
}
