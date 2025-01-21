// Elementos del DOM
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

// Toggle menu móvil
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
});

// Cerrar menu al hacer click en un enlace
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Cerrar menu al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav__menu') && !e.target.closest('.nav__toggle')) {
        navMenu?.classList.remove('show-menu');
    }
});

// Cambiar background del header al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

// Animación de elementos al hacer scroll
const animateElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cerrar el modal si el enlace está dentro de uno
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact__form');
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</p>
    `;
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Funcionalidad de los modales
document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');

    // Función para abrir modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar modal
    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Agregar eventos click a los servicios
    services.forEach((service, index) => {
        service.style.cursor = 'pointer';
        service.addEventListener('click', () => {
            const modalId = `modal-${['mantenimiento', 'reparacion', 'instalacion'][index]}`;
            openModal(modalId);
        });
    });

    // Agregar eventos para cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Cerrar modal al hacer click fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}); 