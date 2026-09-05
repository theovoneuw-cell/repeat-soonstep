(() => {
  const out = { support: !!navigator.wakeLock, appels: 0, liberations: 0, erreurs: [] };
  window.onerror = (m,u,l) => out.erreurs.push(m+"@"+l);
  const vrai = navigator.wakeLock.request.bind(navigator.wakeLock);
  navigator.wakeLock.request = async type => {
    out.appels++;
    const s = await vrai(type);
    const rel = s.release.bind(s);
    s.release = () => { out.liberations++; return rel(); };
    return s;
  };
  window.__v = out;
  const $ = s => document.querySelector(s);
  $("#tabLib").click();
  const demo = [...document.querySelectorAll("#tracks .track")].find(x => /Démo/.test(x.textContent));
  if(!demo) return "démo introuvable";
  demo.click();
  $("#tabLoop").click();
  if($("#icPlay").innerHTML.indexOf("M6 5h4v14H6z") >= 0) $("#btnPlay").click();
  out.avant = out.appels;
  $("#btnPlay").click();
  return "lecture de la démo lancée";
})()
