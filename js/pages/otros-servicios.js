// Funcionalidad específica para la página de otros servicios

document.addEventListener('DOMContentLoaded', () => {
    // Animaciones al hacer scroll
    const animateElements = document.querySelectorAll('.animate');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('animate--visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Animar elementos visibles al cargar

    // Hover effects para los íconos
    const specialties = document.querySelectorAll('.specialty');
    
    specialties.forEach(specialty => {
        specialty.addEventListener('mouseenter', () => {
            const icon = specialty.querySelector('.specialty__icon');
            icon.style.transform = 'scale(1.1) rotate(10deg)';
        });

        specialty.addEventListener('mouseleave', () => {
            const icon = specialty.querySelector('.specialty__icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}); 