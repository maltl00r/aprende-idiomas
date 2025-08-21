const UI = (() => {

  function moduleCard({id, name, type, completed, score, thumbnail}) {
    const el = document.createElement('article');
    el.className = `module-card ${type}`;
    if (completed) el.classList.add('completed');

    const linkMap = {
      flashcards: `flashcards.html?id=${id}`,
      audio:       `audio.html?id=${id}`,
      quiz:        `quiz.html?id=${id}`,
      reading:     `reading.html?id=${id}`,
      video:       `video.html?id=${id}`,
      dragdrop:    `dragdrop.html?id=${id}` // <-- añadido
    };
    const link = linkMap[type] || '#';

    const displayThumb = thumbnail ? `<img src="${thumbnail}" alt="${name}" class="module-thumb">` : '';

    el.innerHTML = `
      ${displayThumb}
      <h3 class="module-name">${name}</h3>
      <div class="module-meta">
        <span>${
          type === 'flashcards' ? 'Flashcards' :
          type === 'audio' ? 'Audio' :
          type === 'quiz' ? 'Examen' :
          type === 'reading' ? 'Lectura' :
          type === 'video' ? 'Video' :
          type === 'dragdrop' ? 'Drag & Drop' : ''
        }</span>
        ${score != null ? `<span> Puntuación: ${score}%</span>` : ''}
      </div>
      <div class="module-actions">
        <a class="btn-complete" href="${link}">Abrir</a>
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
      (mod.completed ? completedGrid : modulesGrid).appendChild(card);
    });
  }

  return { moduleCard, updateGlobalProgress, renderModulesSeparated };
})();
