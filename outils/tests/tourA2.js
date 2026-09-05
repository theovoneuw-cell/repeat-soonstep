(() => {
  const T = window.__t, $ = s => document.querySelector(s);
  const ok = (n,c,d) => T.etapes.push((c?"✓ ":"✗ ")+n+(d?" — "+d:""));
  const pistes = [...document.querySelectorAll("#tracks .track")];
  ok("morceau ajouté à la bibliothèque", pistes.length === T.avant + 1, pistes.length + " pistes");
  ok("morceau sélectionné après import", $("#trackName").textContent.indexOf("Essai") >= 0, $("#trackName").textContent);
  $("#tabSet").click();
  const bpm = +$("#bpm").value;
  ok("tempo détecté à 120", Math.abs(bpm-120) <= 1, bpm + " bpm");
  ok("blanc de départ repéré", /blanc de départ/.test($("#bpmNote").textContent), ($("#bpmNote").textContent.match(/blanc[^·]*/)||[""])[0].trim());
  ok("calage actif", /se calent|se pose sur le temps/.test($("#snapNote").textContent));
  ok("mesure proposée en 4 temps", [...$("#mesureChips").children].find(c=>c.dataset.v==="4").classList.contains("on"));
  $("#tabLoop").click();
  ok("passage initial en comptes ronds", /× 8 temps/.test($("#timeMeta").textContent), $("#timeMeta").textContent);
  return JSON.stringify({ etapes: T.etapes, erreurs: T.erreurs }, null, 1);
})()
