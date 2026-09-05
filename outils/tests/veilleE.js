(() => {
  const out = window.__v, $ = s => document.querySelector(s);
  out.avant_reprise = out.appels;
  $("#btnPlay").click();                                  // relance
  document.dispatchEvent(new Event("visibilitychange"));  // simule un retour d'arrière-plan
  document.dispatchEvent(new Event("visibilitychange"));
  out.apres_double_visibilite = out.appels;
  setTimeout(() => { $("#btnPlay").click(); }, 1500);
  return "test de reprise";
})()
