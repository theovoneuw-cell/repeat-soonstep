(() => {
window.__t = window.__t || {}; const T = window.__t; T.etapes = []; T.erreurs = [];
window.onerror = (m,u,l) => T.erreurs.push(m+" @"+l);
const $ = s => document.querySelector(s);
const ok = (n,c,d) => T.etapes.push((c?"✓ ":"✗ ")+n+(d?" — "+d:""));
const enLecture = () => $("#icPlay").innerHTML.indexOf("M6 5h4v14H6z") >= 0;
if(enLecture()) $("#btnPlay").click();
// on choisit le morceau d'essai
$("#tabLib").click();
const p = [...document.querySelectorAll("#tracks .track")].find(x => /Essai automatique/.test(x.textContent));
ok("morceau d'essai retrouvé après rechargement", !!p, p ? p.textContent.trim() : "absent");
if(p) p.click();
$("#tabSet").click();
ok("tempo conservé", $("#bpm").value === "120", $("#bpm").value + " bpm");
ok("calage conservé", /se pose sur le temps/.test($("#snapNote").textContent));
$("#tabLoop").click();
ok("passage par défaut en comptes ronds", /× 8 temps/.test($("#timeMeta").textContent), $("#timeMeta").textContent);
// mesure du compte et du départ
T.mesures = { chiffres: [], ech: [] };
new MutationObserver(() => { if($("#overlay").classList.contains("on"))
  T.mesures.chiffres.push({ n:$("#ovNum").textContent, t:Math.round(performance.now()-T.mesures.t0) });
}).observe($("#ovNum"), {childList:true, characterData:true, subtree:true});
$("#tabSet").click(); [...$("#countChips").children].find(c=>c.dataset.v==="4").click(); $("#tabLoop").click();
T.mesures.t0 = performance.now();
$("#btnPlay").click();
const poll = setInterval(() => { const t = Math.round(performance.now()-T.mesures.t0);
  T.mesures.ech.push([t, $("#timeNow").textContent]); if(t > 3400) clearInterval(poll); }, 10);
return "lecture lancée";
})()
