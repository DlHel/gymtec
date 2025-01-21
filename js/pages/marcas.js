// Funcionalidad específica para la página de marcas

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

    // Lazy loading para las imágenes
    const brandImages = document.querySelectorAll('.brand img');
    
    const lazyLoadImage = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoadImage, {
        root: null,
        threshold: 0.1
    });

    brandImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}); 