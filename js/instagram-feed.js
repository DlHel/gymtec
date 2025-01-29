// Instagram Feed usando LightWidget
document.addEventListener('DOMContentLoaded', function() {
    const instagramFeed = document.getElementById('instagram-feed');
    if (!instagramFeed) return;

    // Widget de Instagram
    instagramFeed.innerHTML = `
        <div class="instagram__widget">
            <iframe src="//lightwidget.com/widgets/2cf83807757e53bcb40fa70e3e82f8e3.html" 
                    class="lightwidget-widget" 
                    scrolling="no" 
                    allowtransparency="true" 
                    style="width: 100%; border: 0; overflow: hidden; background-color: transparent;">
            </iframe>
        </div>
    `;

    // Cargar el script de LightWidget
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    document.body.appendChild(script);

    // Función para ocultar el botón de seguir
    const hideFollowButton = () => {
        const iframes = document.querySelectorAll('.lightwidget-widget');
        iframes.forEach(iframe => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                const followButtons = doc.querySelectorAll('[class*="follow"], [class*="Follow"]');
                followButtons.forEach(button => {
                    button.style.display = 'none';
                });
            } catch (e) {
                console.log('No se pudo acceder al iframe');
            }
        });
    };

    // Intentar ocultar el botón varias veces después de que se cargue el widget
    script.onload = function() {
        const attempts = [0, 1000, 2000, 3000];
        attempts.forEach(delay => {
            setTimeout(hideFollowButton, delay);
        });
    };
}); 