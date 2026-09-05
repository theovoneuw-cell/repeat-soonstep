(() => {
  const out = window.__v, $ = s => document.querySelector(s);
  out.enLecture = $("#icPlay").innerHTML.indexOf("M6 5h4v14H6z") >= 0;
  out.apres_lecture = out.appels;
  $("#btnPlay").click();
  return "arrêt demandé";
})()
