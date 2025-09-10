document.addEventListener('DOMContentLoaded', function() {
    function loadAndInclude(filename, dataAttribute) {
        fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${filename}`);
                }
                return response.text();
            })
            .then(html => {
                document.querySelectorAll(`[data-include="${dataAttribute}"]`).forEach(element => {
                    element.innerHTML = html;
                    
                    if (dataAttribute === 'header') {
                        const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
                        const langSelectorContainer = element.querySelector('.lang-selector-container');
                        const siteTitleElement = element.querySelector('#siteTitle');

                        // Ocultar el selector de idioma en páginas que no son el index
                        if (!isIndexPage && langSelectorContainer) {
                            langSelectorContainer.style.display = 'none';
                        }
                        
                        // Cargar el título de la página actual en el header
                        const pageTitle = document.title;
                        if (siteTitleElement) {
                            siteTitleElement.textContent = pageTitle;
                        }

                        // Inicializar el selector de idioma solo en el index
                        if (isIndexPage && langSelectorContainer) {
                            const langSelect = langSelectorContainer.querySelector('#lang-select');
                            if (langSelect) {
                                const savedLang = localStorage.getItem('courseLang') || 'fr';
                                langSelect.value = savedLang;
                                langSelect.addEventListener('change', (e) => {
                                    localStorage.setItem('courseLang', e.target.value);
                                    location.reload();
                                });
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error(`Error loading ${filename}:`, error);
            });
    }

    // Cargar el header y el footer
    loadAndInclude('header.html', 'header');
    loadAndInclude('footer.html', 'footer');
}); 