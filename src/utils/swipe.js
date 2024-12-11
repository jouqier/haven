export const SwipeToClose = {
    setupSwipeToClose(element, onClose) {
        let startY = 0;
        let currentY = 0;
        let initialTranslate = 0;
        
        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
            currentY = startY;
            initialTranslate = 0;
            element.style.transition = 'none';
        };
        
        const handleTouchMove = (e) => {
            currentY = e.touches[0].clientY;
            const delta = currentY - startY;
            
            if (delta > 0) { // Только при движении вниз
                initialTranslate = delta;
                element.style.transform = `translateY(${delta}px)`;
                
                // Изменяем прозрачность оверлея
                const opacity = Math.max(0.5 - (delta / window.innerHeight), 0);
                element.closest('.overlay').style.background = `rgba(0, 0, 0, ${opacity})`;
            }
        };
        
        const handleTouchEnd = () => {
            element.style.transition = 'all 0.2s ease-out';
            
            if (initialTranslate > 100) { // Если смахнули достаточно далеко
                element.style.transform = `translateY(${window.innerHeight}px)`;
                element.closest('.overlay').style.opacity = '0';
                setTimeout(() => onClose(), 200);
            } else {
                // Возвращаем на место
                element.style.transform = 'translateY(0)';
                element.closest('.overlay').style.background = 'rgba(0, 0, 0, 0.5)';
            }
        };

        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);
    }
}; 