// Funcionalidad específica para la página de contacto

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

    // Manejo del formulario de contacto
    const contactForm = document.querySelector('.contact__form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aquí iría la lógica para enviar el formulario al servidor
        // Por ahora solo mostraremos un mensaje de éxito

        // Crear mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.</span>
        `;

        // Agregar mensaje al formulario
        contactForm.appendChild(successMessage);

        // Limpiar formulario
        contactForm.reset();

        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('.contact__form-input');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        
        if (!value) {
            setInputError(input, 'Este campo es requerido');
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            setInputError(input, 'Ingresa un correo electrónico válido');
            return false;
        }

        if (input.type === 'tel' && !isValidPhone(value)) {
            setInputError(input, 'Ingresa un número de teléfono válido');
            return false;
        }

        removeInputError(input);
        return true;
    }

    function setInputError(input, message) {
        const formGroup = input.closest('.contact__form-group');
        let errorMessage = formGroup.querySelector('.error-message');
        
        if (!errorMessage) {
            errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        input.classList.add('error');
    }

    function removeInputError(input) {
        const formGroup = input.closest('.contact__form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^(\+?56)?[1-9]\d{8}$/.test(phone.replace(/\s+/g, ''));
    }
}); 