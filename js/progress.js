const Progress = (() => {
  function getKey() {
    const currentLang = localStorage.getItem('courseLang') || 'fr';
    return `${currentLang}_platform_progress_v2`;
  }

  function _load(){
    try{
      const raw = localStorage.getItem(getKey());
      return raw ? JSON.parse(raw) : { modules: {} };
    }catch(e){
      return { modules: {} };
    }
  }

  function _save(state){
    localStorage.setItem(getKey(), JSON.stringify(state));
  }

  function getModuleState(id){
    const s = _load();
    return s.modules[id] || null;
  }

  function markCompleted(id){
    const s = _load();
    s.modules[id] = s.modules[id] || {};
    s.modules[id].completed = true;
    _save(s);
  }

  function setScore(id, score){
    const s = _load();
    s.modules[id] = s.modules[id] || {};
    s.modules[id].score = score;
    _save(s);
  }

  function resetModule(id){
    const s = _load();
    delete s.modules[id];
    _save(s);
  }

  function getGlobalProgress(course){
    const s = _load();
    const total = course.modules.length;
    const completed = course.modules.reduce((acc, m) => acc + (s.modules[m.id] && s.modules[m.id].completed ? 1 : 0), 0);
    return {
      total,
      completed,
      totalPercent: total > 0 ? Math.floor((completed / total) * 100) : 0
    };
  }
  
  return {
    getModuleState,
    markCompleted,
    setScore,
    resetModule,
    getGlobalProgress
  };
})();