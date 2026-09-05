(() => { const $ = s => document.querySelector(s);
  return JSON.stringify({
    visibilite: document.visibilityState,
    enLecture: $("#icPlay").innerHTML.indexOf("M6 5h4v14H6z") >= 0,
    toast: $("#toast").textContent,
    piste: $("#trackName").textContent.slice(0,30),
    onglet: document.querySelector("#viewLib").hidden ? "Répéter" : "Musiques"
  }, null, 1); })()
