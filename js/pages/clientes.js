// Funcionalidad específica para la página de clientes

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

    // Lazy loading para las imágenes de clientes
    const clientImages = document.querySelectorAll('.client img');
    
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

    clientImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Filtro de categorías
    const categoryTitles = document.querySelectorAll('.clients__category-title');
    const clientCategories = document.querySelectorAll('.clients__category');

    categoryTitles.forEach(title => {
        title.addEventListener('click', () => {
            const category = title.parentElement;
            const isExpanded = category.classList.contains('expanded');

            // Contraer todas las categorías
            clientCategories.forEach(cat => {
                cat.classList.remove('expanded');
                const grid = cat.querySelector('.clients__grid');
                grid.style.maxHeight = '0';
            });

            // Expandir la categoría seleccionada si no estaba expandida
            if (!isExpanded) {
                category.classList.add('expanded');
                const grid = category.querySelector('.clients__grid');
                grid.style.maxHeight = grid.scrollHeight + 'px';
            }
        });
    });
}); 