(() => {
const T = window.__t;
const e = T.mesures.ech.map(([t,v]) => { const m = v.match(/(\d+):(\d+\.\d)/); return m ? [t, +m[1]*60+parseFloat(m[2])] : null; }).filter(Boolean);
const base = e[0][1];                       // valeur figée pendant le compte = début du passage
let dernierPalier = 0;
for(let i=0;i<e.length;i++) if(e[i][1] === base) dernierPalier = i;
const av = e.slice(dernierPalier+1).filter(([t,s]) => s > base + 0.12);
if(av.length < 6) return JSON.stringify({ erreur:"trop peu d'échantillons", base, palier:dernierPalier, total:e.length });
const n = av.length, sx = av.reduce((a,p)=>a+p[0],0)/n, sy = av.reduce((a,p)=>a+p[1],0)/n;
let num=0, den=0; for(const [x,y] of av){ num+=(x-sx)*(y-sy); den+=(x-sx)*(x-sx); }
const pente = num/den;                       // s de lecture par ms
const depart = sx - (sy - base)/pente;       // instant où la lecture valait « base »
const attendu = 80 + 4*(60/120*1000);
return JSON.stringify({
  debut_passage: base + " s",
  vitesse_lecture: (pente*1000).toFixed(3) + " × temps réel",
  depart_mesure_ms: Math.round(depart),
  depart_attendu_ms: Math.round(attendu),
  ecart_ms: Math.round(depart - attendu),
  echantillons: n
}, null, 1);
})()
