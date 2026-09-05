(() => {
const T = window.__t, $ = s => document.querySelector(s);
const ok = (n,c,d) => T.etapes.push((c?"✓ ":"✗ ")+n+(d?" — "+d:""));
const ch = T.mesures.chiffres.filter((c,i,a) => i===0 || c.n !== a[i-1].n);
const ts = ch.map(c=>c.t), ec = ts.slice(1).map((t,i)=>t-ts[i]);
const theorique = 60/120*1000;
ok("compte 5-6-7-8 affiché", ch.map(c=>c.n).join("-") === "5-6-7-8", ch.map(c=>c.n).join("-"));
ok("compte régulier", ec.every(e => Math.abs(e-theorique) < 25), ec.join(" / ") + " ms pour " + theorique + " attendus");
// départ réel, par régression sur l'horloge
const e = T.mesures.ech.map(([t,v]) => { const m = v.match(/(\d+):(\d+\.\d)/); return m ? [t, +m[1]*60+parseFloat(m[2])] : null; }).filter(Boolean);
const av = e.filter(([t,s]) => s > 0.15 && t > 1200);
let ecart = null;
if(av.length > 5){
  const n = av.length, sx = av.reduce((a,p)=>a+p[0],0)/n, sy = av.reduce((a,p)=>a+p[1],0)/n;
  let num=0, den=0; for(const [x,y] of av){ num+=(x-sx)*(y-sy); den+=(x-sx)*(x-sx); }
  const depart = sx - sy/(num/den);
  ecart = Math.round(depart - (80 + 4*theorique));
}
ok("musique à l'heure après le 8", ecart !== null && Math.abs(ecart) < 60, ecart === null ? "non mesurable" : ecart + " ms d'écart");
ok("lecture en cours", $("#icPlay").innerHTML.indexOf("M6 5h4v14H6z") >= 0);
$("#btnPlay").click();
ok("arrêt", $("#icPlay").innerHTML.indexOf("M8 5v14l11-7z") >= 0);
return JSON.stringify({ etapes: T.etapes, erreurs: T.erreurs }, null, 1);
})()
