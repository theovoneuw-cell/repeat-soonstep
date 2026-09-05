(() => {
window.__t = { etapes: [], erreurs: [] };
const T = window.__t;
window.onerror = (m,u,l) => T.erreurs.push(m + " @" + l);
window.addEventListener("unhandledrejection", e => T.erreurs.push("rejet: " + (e.reason && e.reason.message || e.reason)));
const $ = s => document.querySelector(s);
const ok = (nom, cond, detail) => T.etapes.push((cond ? "✓ " : "✗ ") + nom + (detail ? " — " + detail : ""));

// --- fabrique un mp3-like : un wav de 40 s à 120 bpm avec 0,35 s de blanc ---
function wav(){
  const sr = 22050, bpm = 120, beat = 60/bpm, blanc = 0.35, dur = 40;
  const n = Math.ceil(sr*dur), d = new Float32Array(n);
  const add = (t, len, fn) => { const i0 = Math.round(t*sr), i1 = Math.min(n, i0 + Math.round(len*sr));
    for(let i=i0; i<i1; i++) d[i] += fn((i-i0)/sr); };
  for(let b=0; blanc + b*beat < dur-1; b++){
    const t = blanc + b*beat;
    if(b % 4 === 0 || b % 4 === 2) add(t, .4, x => Math.sin(2*Math.PI*(52+90*Math.exp(-x*30))*x)*Math.exp(-x*8)*.9);
    if(b % 4 === 1 || b % 4 === 3) add(t, .18, x => (Math.random()*2-1)*Math.exp(-x*25)*.4);
    add(t, .05, x => (Math.random()*2-1)*Math.exp(-x*90)*.12);
    add(t + beat/2, .05, x => (Math.random()*2-1)*Math.exp(-x*90)*.09);
    if(b % 4 === 0) add(t, beat*3.6, x => Math.sin(2*Math.PI*110*x)*Math.min(1,x*80)*Math.exp(-x*2)*.4);
  }
  const buf = new ArrayBuffer(44 + n*2), v = new DataView(buf);
  const str = (o,s) => { for(let i=0;i<s.length;i++) v.setUint8(o+i, s.charCodeAt(i)); };
  str(0,"RIFF"); v.setUint32(4, 36+n*2, true); str(8,"WAVEfmt ");
  v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,sr,true); v.setUint32(28,sr*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true);
  str(36,"data"); v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++){ const s = Math.max(-1, Math.min(1, d[i])); v.setInt16(44+i*2, s<0?s*0x8000:s*0x7FFF, true); }
  return new File([buf], "Essai automatique 120.wav", { type: "audio/wav" });
}

T.avant = document.querySelectorAll("#tracks .track").length;
const dt = new DataTransfer();
dt.items.add(wav());
$("#drop").dispatchEvent(new DragEvent("drop", { bubbles: true, dataTransfer: dt }));
ok("dépôt du fichier accepté", true);
return "import lancé";
})()
