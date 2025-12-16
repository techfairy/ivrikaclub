document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Анимация появления маркеров ценности (в HERO секции)
    const valueMarkers = document.querySelectorAll('.value-markers li');
    
    valueMarkers.forEach((marker, index) => {
        // Задержка зависит от индекса, чтобы они появлялись по очереди
        const delay = index * 200 + 100; // 100мс, 300мс, 500мс
        
        setTimeout(() => {
            // Установка финальных стилей после задержки
            marker.style.opacity = '1';
            marker.style.transform = 'translateY(0)';
        }, delay);
    });

    // 2. Анимация подчеркивания ключевой фразы (Accent Text)
    // Используем Intersection Observer для запуска, когда блок попадает в видимую область
    const blameAccentText = document.querySelector('.blame-accent-text');

    if (blameAccentText) {
        const accentObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Анимируем, когда 50% текста будет видно (более надежно, чем 90%)
        };

        const accentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Активируем анимацию
                    entry.target.classList.add('underline-active');
                    observer.unobserve(entry.target); // Останавливаем наблюдение
                }
            });
        }, accentObserverOptions);

        accentObserver.observe(blameAccentText);
    }
    
    // 3. Анимация появления карточек (Target Cards) при скролле
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Карточка появится, когда 20% ее будет видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.getAttribute('data-delay')) * 100; // 100ms задержки между карточками
                
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, delay);

                // Прекращаем наблюдение, как только элемент появился
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Находим все карточки и начинаем за ними наблюдать
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach(card => {
        observer.observe(card);
    });

    // 4. Логика Аккордеона (FAQ): только один открыт
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    // Добавляем обработчик на событие 'toggle' (открытие/закрытие)
    item.addEventListener('toggle', (event) => {
        // Проверяем, открылся ли текущий элемент
        if (item.open) {
            // Если открылся, то проходим по всем элементам
            accordionItems.forEach(otherItem => {
                // Если элемент не текущий И он открыт, то закрываем его
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        }
    });
});

// 🔥 НОВЫЙ БЛОК: 5. Универсальная анимация Scroll Reveal для всех секций
    const revealItems = document.querySelectorAll('.reveal-item');

    if (revealItems.length > 0) {
        const revealObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Появится, когда 10% элемента будет видно
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Используем класс 'visible' для универсальной анимации
                    entry.target.classList.add('visible'); 
                    observer.unobserve(entry.target);
                }
            });
        }, revealObserverOptions);

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    }

});