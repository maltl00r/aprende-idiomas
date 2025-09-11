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
                        const sidebarToggleBtn = document.getElementById('sidebar-toggle');
                        const sidebar = document.getElementById('module-sidebar');
                        const closeSidebarBtn = document.getElementById('close-sidebar');
                        const sidebarOverlay = document.getElementById('sidebar-overlay');
                        
                        function toggleSidebar(isVisible) {
                            if (isVisible) {
                                sidebar.classList.add('active');
                                sidebarOverlay.classList.add('active');
                            } else {
                                sidebar.classList.remove('active');
                                sidebarOverlay.classList.remove('active');
                            }
                        }

                        // Ocultar el selector de idioma en páginas que no son el index
                        if (!isIndexPage && langSelectorContainer) {
                            langSelectorContainer.style.display = 'none';
                        }
                        
                        // Manejo del sidebar, botón y overlay
                        if (isIndexPage) {
                            if (sidebarToggleBtn) sidebarToggleBtn.style.display = 'none';
                            if (sidebar) sidebar.style.display = 'none';
                        } else {
                            if (sidebarToggleBtn) {
                                sidebarToggleBtn.style.display = 'flex';
                                sidebarToggleBtn.addEventListener('click', () => toggleSidebar(true));
                            }
                            if (closeSidebarBtn) {
                                closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
                            }
                            if (sidebarOverlay) {
                                sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
                            }
                            // Cargar la lista de módulos
                            loadModuleList();
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

    function loadModuleList() {
        const lang = localStorage.getItem('courseLang') || 'fr';
        const courseFile = `course_${lang}.json`;
        
        // Objeto para traducir los tipos de módulo
        const moduleTypeTranslations = {
            'flashcards': 'Flashcards',
            'audio': 'Audio',
            'quiz': 'Examen',
            'reading': 'Lectura',
            'video': 'Video',
            'dragdrop': 'Arrastrar y Soltar',
            'cloze': 'Completar',
            'markdown': 'Documento'
        };

        const urlParams = new URLSearchParams(window.location.search);
        const currentModuleId = urlParams.get('mod') || urlParams.get('id');

        fetch(courseFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${courseFile}`);
                }
                return response.json();
            })
            .then(data => {
                const moduleList = document.getElementById('module-list');
                if (moduleList) {
                    moduleList.innerHTML = '';
                    data.modules.forEach((mod, index) => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        
                        const linkMap = {
                            flashcards: `flashcards.html?mod=${mod.id}&lang=${lang}`,
                            audio:       `audio.html?id=${mod.id}&lang=${lang}`,
                            quiz:        `quiz.html?id=${mod.id}&lang=${lang}`,
                            reading:     `reading.html?id=${mod.id}&lang=${lang}`,
                            video:       `video.html?id=${mod.id}&lang=${lang}`,
                            dragdrop:    `dragdrop.html?id=${mod.id}&lang=${lang}`,
                            cloze:       `cloze.html?mod=${mod.id}&lang=${lang}`,
                            markdown:    `markdown.html?id=${mod.id}&lang=${lang}`
                        };
                        
                        link.href = linkMap[mod.type] || '#';
                        link.textContent = `${index + 1}. ${mod.name}`;

                        // Compara el ID del módulo en la lista con el ID del módulo actual en la URL
                        if (mod.id === currentModuleId) {
                            link.classList.add('current');
                        }
                        
                        const typeSpan = document.createElement('span');
                        typeSpan.classList.add('module-type-tag');
                        
                        // Usa el objeto de traducción para obtener el texto correcto
                        typeSpan.textContent = moduleTypeTranslations[mod.type] || 'Tipo Desconocido';
                        
                        link.appendChild(typeSpan);
                        
                        listItem.appendChild(link);
                        moduleList.appendChild(listItem);
                    });
                }
            })
            .catch(error => {
                console.error(`Error loading course data:`, error);
            });
    }

    // Cargar el header y el footer
    loadAndInclude('header.html', 'header');
    loadAndInclude('footer.html', 'footer');
});