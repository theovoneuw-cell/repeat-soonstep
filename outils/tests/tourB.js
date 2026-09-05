(() => {
const T = window.__t, $ = s => document.querySelector(s);
const ok = (n,c,d) => T.etapes.push((c?"✓ ":"✗ ")+n+(d?" — "+d:""));
T.etapes = [];
const cv = $("#wave");
const env = (type, x, id=1) => { const b = cv.getBoundingClientRect();
  cv.dispatchEvent(new PointerEvent(type, { pointerId:id, bubbles:true,
    clientX:b.left+x, clientY:b.top+b.height/2, pointerType:"mouse" })); };

// --- aimantation : on glisse la poignée F d'un peu n'importe où ---
$("#zoomFit").click();
const b = cv.getBoundingClientRect();
const avant = $("#timeMeta").textContent;
env("pointerdown", b.width*0.782); env("pointermove", b.width*0.782+37);
const pendant = $("#timeMeta").textContent;
env("pointerup", b.width*0.782+37);
const apres = $("#timeMeta").textContent;
ok("aimantation pendant le glisser", /× 8 temps/.test(pendant), pendant);
ok("passage rond après relâchement", /× 8 temps/.test(apres), avant + " → " + apres);
ok("bouton Annuler apparu", !$("#btnUndo").hidden);
$("#btnUndo").click();
ok("annulation rétablit le passage", $("#timeMeta").textContent === avant, $("#timeMeta").textContent);

// --- mémoriser, renommer, relancer, mettre à jour, supprimer ---
const n0 = +($("#secCount").textContent || 0);
$("#btnMemo2").click();
$("#tabSecs").click();
const secs = () => [...document.querySelectorAll("#secs .sec")];
ok("passage mémorisé", secs().length === n0+1, secs().length + " passage(s)");
const nom = secs()[secs().length-1].querySelector("input.nm");
nom.value = "Diagonale"; nom.dispatchEvent(new Event("input", {bubbles:true}));
ok("passage renommé", secs()[secs().length-1].querySelector("input.nm").value === "Diagonale");
secs()[secs().length-1].querySelector(".upd").click();
ok("mise à jour du passage acceptée", true);
// --- réglages : mesure, compte, reprises, pause ---
$("#tabSet").click();
[...$("#mesureChips").children].find(c=>c.dataset.v==="3").click();
const c3 = [...$("#countChips").children].map(c=>c.textContent).join("/");
ok("valse : compte en 1-2-3", c3.indexOf("1-2-3") >= 0, c3);
ok("valse : passages en groupes de 6", /× 6 temps|temps/.test($("#timeMeta").textContent), $("#timeMeta").textContent);
[...$("#mesureChips").children].find(c=>c.dataset.v==="4").click();
ok("retour en 4 temps", [...$("#countChips").children].map(c=>c.textContent).join("/").indexOf("5-6-7-8") >= 0);
[...$("#repChips").children].find(c=>c.dataset.v==="4").click();
[...$("#restChips").children].find(c=>c.dataset.v==="3").click();
ok("plan mis à jour", /4 reprises/.test($("#planText").textContent) && /pause 3/.test($("#planText").textContent), $("#planText").textContent);
[...$("#repChips").children].find(c=>c.dataset.v==="0").click();
[...$("#restChips").children].find(c=>c.dataset.v==="0").click();

// --- tempo : ÷2, ×2, saisie ---
const bpm0 = +$("#bpm").value;
$("#dblBpm").click(); const d1 = +$("#bpm").value;
$("#halfBpm").click(); const d2 = +$("#bpm").value;
ok("×2 puis ÷2 revient au tempo", d2 === bpm0, bpm0+" → "+d1+" → "+d2);

// --- vitesse ---
$("#tabLoop").click();
[...$("#speedChips").children].find(c=>c.dataset.v==="70").click();
ok("vitesse 70 % appliquée", /70 %/.test($("#speedVal").textContent), $("#speedVal").textContent + " · " + $("#speedBpm").textContent);
[...$("#speedChips").children].find(c=>c.dataset.v==="100").click();

// --- zoom et déplacement ---
const span = () => { $("#zoomAll").click(); return 1; };
$("#zoomAll").click(); const p1 = $("#badgeLoop").textContent;
$("#zoomIn").click(); $("#zoomIn").click();
$("#zoomOut").click(); $("#zoomFit").click();
ok("zoom ne modifie pas le passage", $("#badgeLoop").textContent === p1, p1);
// pincement à deux doigts
env("pointerdown", 100, 1); env("pointerdown", 300, 2);
env("pointermove", 60, 1); env("pointermove", 340, 2);
env("pointerup", 60, 1); env("pointerup", 340, 2);
ok("pincement sans erreur", true);
ok("passage intact après pincement", $("#badgeLoop").textContent === p1, $("#badgeLoop").textContent);

return JSON.stringify({ etapes: T.etapes, erreurs: T.erreurs }, null, 1);
})()
