// Funcionalidad específica para la página de servicios

document.addEventListener('DOMContentLoaded', () => {
    // Manejo de modales de servicios
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modalCloseButtons = document.querySelectorAll('.modal__close');
    const modals = document.querySelectorAll('.modal');

    // Abrir modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal con botón
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar modal al hacer clic fuera
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
            }
        });
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('modal--active')) {
                    modal.classList.remove('modal--active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

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
}); 