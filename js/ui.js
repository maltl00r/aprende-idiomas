const UI = (() => {

  function moduleCard({id, name, type, completed, score, thumbnail}) {
    const el = document.createElement('article');
    el.className = `module-card ${type}`;
    if (completed) el.classList.add('completed');
    
    // Obtener el idioma guardado del localStorage
    const currentLang = localStorage.getItem('courseLang') || 'fr'; 

    const linkMap = {
      flashcards: `flashcards.html?mod=${id}&lang=${currentLang}`,
      audio:       `audio.html?id=${id}&lang=${currentLang}`,
      quiz:        `quiz.html?id=${id}&lang=${currentLang}`,
      reading:     `reading.html?id=${id}&lang=${currentLang}`,
      video:       `video.html?id=${id}&lang=${currentLang}`,
      dragdrop:    `dragdrop.html?id=${id}&lang=${currentLang}`,
      cloze:       `cloze.html?mod=${id}&lang=${currentLang}`,
      markdown:    `markdown.html?id=${id}&lang=${currentLang}`
    };
    const link = linkMap[type] || '#';

    const displayThumb = thumbnail ? `<img src=\"${thumbnail}\" alt=\"${name}\" class=\"module-thumb\">` : '';

    el.innerHTML = `
      ${displayThumb}
      <h3 class=\"module-name\">${name}</h3>
      <div class=\"module-meta\">
        <span>${
          type === 'flashcards' ? 'Flashcards' :
          type === 'audio' ? 'Audio' :
          type === 'quiz' ? 'Examen' :
          type === 'reading' ? 'Lectura' :
          type === 'video' ? 'Video' :
          type === 'dragdrop' ? 'Arrastrar y Soltar' :
          type === 'cloze' ? 'Completar' :
          type === 'markdown' ? 'Documento' :
          'Módulo'
        }</span>
        ${score ? `<span>Puntaje: ${score}</span>` : ''}
      </div>
      <div class=\"module-actions\">
        <a class=\"btn-complete\" href=\"${link}\">Abrir</a>
      </div>
    `;
    return el;
  }

  // Nueva función para obtener la URL del módulo
  function getModuleUrl(module) {
    const currentLang = localStorage.getItem('courseLang') || 'fr'; 
    const linkMap = {
      flashcards: `flashcards.html?mod=${module.id}&lang=${currentLang}`,
      audio:      `audio.html?id=${module.id}&lang=${currentLang}`,
      quiz:       `quiz.html?id=${module.id}&lang=${currentLang}`,
      reading:    `reading.html?id=${module.id}&lang=${currentLang}`,
      video:      `video.html?id=${module.id}&lang=${currentLang}`,
      dragdrop:   `dragdrop.html?id=${module.id}&lang=${currentLang}`,
      cloze:      `cloze.html?mod=${module.id}&lang=${currentLang}`,
      markdown:   `markdown.html?id=${module.id}&lang=${currentLang}`
    };
    return linkMap[module.type] || '#';
  }

  // Nueva función para renderizar los botones de navegación
  function renderNavigationButtons(containerId, course, currentModule) {
    const container = document.getElementById(containerId);
    if (!container || !course || !currentModule) return;

    const modules = course.modules;
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);

    const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
    const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

    container.innerHTML = '';

    if (prevModule) {
      const link = getModuleUrl(prevModule);
      const thumb = prevModule.thumbnail ? `<img src="${prevModule.thumbnail}" alt="${prevModule.name}" class="nav-link-image">` : '';
      const buttonHtml = `
        <a href="${link}" class="nav-link previous">
          <span class="nav-link-icon">👈</span>
          ${thumb}
          <div class="nav-meta">
            <span>Módulo Anterior</span>
            <h4>${prevModule.name}</h4>
          </div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', buttonHtml);
    } else {
      container.insertAdjacentHTML('beforeend', '<div class="nav-link-placeholder"></div>');
    }

    if (nextModule) {
      const link = getModuleUrl(nextModule);
      const thumb = nextModule.thumbnail ? `<img src="${nextModule.thumbnail}" alt="${nextModule.name}" class="nav-link-image">` : '';
      const buttonHtml = `
        <a href="${link}" class="nav-link next">
          <span class="nav-link-icon">👉</span>
          ${thumb}
          <div class="nav-meta">
            <span>Siguiente Módulo</span>
            <h4>${nextModule.name}</h4>
          </div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', buttonHtml);
    } else {
      container.insertAdjacentHTML('beforeend', '<div class="nav-link-placeholder"></div>');
    }
  }

  function updateGlobalProgress(percent){
    const fill = document.getElementById('globalProgressFill');
    const label = document.getElementById('globalProgressText');
    if(fill) fill.style.width = percent + '%';
    if(label) label.textContent = percent + '% completado';
  }

  function renderModulesSeparated(modules, modulesGrid, completedGrid){
    modulesGrid.innerHTML = '';
    completedGrid.innerHTML = '';
    modules.forEach(mod => {
      const card = moduleCard(mod);
      if (mod.completed) {
        completedGrid.appendChild(card);
      } else {
        modulesGrid.appendChild(card);
      }
    });
  }

  function updateModuleLinks() {
    const lang = localStorage.getItem('courseLang') || 'fr';
    const links = document.querySelectorAll('.module-card .btn-complete');
    links.forEach(link => {
      const url = new URL(link.href);
      const params = new URLSearchParams(url.search);
      const modId = params.get('mod') || params.get('id');
      if (modId) {
        // Asumiendo que el tipo está en el className
        const moduleType = link.closest('.module-card').classList[1];
        if (moduleType) {
          const newUrl = UI.getModuleUrl({ id: modId, type: moduleType });
          link.href = newUrl;
        }
      }
    });
  }

  return {
    moduleCard,
    updateGlobalProgress,
    renderModulesSeparated,
    updateModuleLinks,
    renderNavigationButtons
  };
})();

