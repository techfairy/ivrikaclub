document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Анимация появления маркеров ценности
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

    // 2. Анимация подчеркивания ключевой фразы
    const accentText = document.getElementById('accent-text');

    if (accentText) {
        // Установка класса для активации CSS-перехода подчеркивания
        setTimeout(() => {
            accentText.style.backgroundSize = '100% 2px';
        }, 800); // Небольшая задержка, чтобы оно появилось не сразу
    }
});
