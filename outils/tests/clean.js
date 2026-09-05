(() => {
  const p = [...document.querySelectorAll("#tracks .track")].find(x => /Essai automatique/.test(x.textContent));
  if(!p) return "déjà propre";
  p.querySelector(".kill").click();
  return "morceau d'essai supprimé · reste : " +
    [...document.querySelectorAll("#tracks .track")].map(x=>x.querySelector(".nm").textContent).join(" | ");
})()
