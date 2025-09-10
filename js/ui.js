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
      cloze:       `cloze.html?id=${id}&lang=${currentLang}`
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
          type === 'dragdrop' ? 'Arrastrar y soltar' : 
          type === 'cloze' ? 'Completar oración' : ''
        }</span>
        ${score != null ? `<span> Puntuación: ${score}%</span>` : ''}
      </div>
      <div class=\"module-actions\">
        <a class=\"btn-complete\" href=\"${link}\">Abrir</a>
      </div>
    `;
    return el;
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
          link.href = `${moduleType}.html?id=${modId}&lang=${lang}`;
        }
      }
    });
  }

  return {
    moduleCard,
    updateGlobalProgress,
    renderModulesSeparated
  };
})();