const Progress = (() => {
  const KEY = 'french_platform_progress_v2';

  function _load(){
    try{
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : { modules: {} };
    }catch(e){
      return { modules: {} };
    }
  }

  function _save(state){
    localStorage.setItem(KEY, JSON.stringify(state));
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
    const completed = course.modules.reduce((acc, m) => acc + (s.modules[m.id]?.completed ? 1 : 0), 0);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, totalPercent: percent };
  }

  function completeAudioModule(id){
    markCompleted(id);
  }

  return {
    getModuleState,
    markCompleted,
    setScore,
    resetModule,
    getGlobalProgress,
    completeAudioModule
  };
})();
