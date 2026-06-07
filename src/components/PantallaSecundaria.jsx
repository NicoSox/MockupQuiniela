import React, { useState, useEffect, useRef } from 'react';
import { Monitor, ExternalLink, Plus, Trash2, ChevronDown, ChevronUp, Play, Pause, Eye } from 'lucide-react';

// ── Datos iniciales (hardcoded del Excel) ──────────────────────────────────
const SORTEOS_INIT = [
  { id: 1, nombre: 'MATUTINA',   nro: '4686',  hora: '11:30',
    premios: ['1234','5678','9101','1121','3141','5161','7181','9202','1222','3242','5262','7282','9303','1323','3343','5363','7383','9404','1424','3444'],
    masJugados:   ['0013','0022','0045','0069','0070'],
    masSalidores: ['0015','0033','0021','0044','0060'],
    masAtrasados: ['0007','0088','0123','0999','1002'],
  },
  { id: 2, nombre: 'VESPERTINA', nro: '9448',  hora: '14:00',
    premios: ['2345','6789','1011','2122','3141','4151','5161','6171','7181','8191','9202','1022','1222','1323','1424','1525','1626','1727','1828','1929'],
    masJugados:   ['0013','0022','0045','0069','0070'],
    masSalidores: ['0015','0033','0021','0044','0060'],
    masAtrasados: ['0007','0088','0123','0999','1002'],
  },
  { id: 3, nombre: 'SIESTA',     nro: '1381',  hora: '16:00',
    premios: ['3456','7890','1121','2232','3343','4454','5565','6676','7787','8898','9909','1010','1111','1212','1313','1414','1515','1616','1717','1818'],
    masJugados:   ['0013','0022','0045','0069','0070'],
    masSalidores: ['0015','0033','0021','0044','0060'],
    masAtrasados: ['0007','0088','0123','0999','1002'],
  },
  { id: 4, nombre: 'TARDE',      nro: '5391',  hora: '18:00',
    premios: ['4567','8901','1232','2343','3454','4565','5676','6787','7898','8909','9010','1011','1112','1213','1314','1415','1516','1617','1718','1819'],
    masJugados:   ['0013','0022','0045','0069','0070'],
    masSalidores: ['0015','0033','0021','0044','0060'],
    masAtrasados: ['0007','0088','0123','0999','1002'],
  },
  { id: 5, nombre: 'NOCTURNA',   nro: '18218', hora: '22:00',
    premios: ['4457','9707','2870','1347','4951','9435','5993','3496','4687','8305','5347','3096','4946','2160','9459','5898','1817','0772','2115','8425'],
    masJugados:   ['0013','0022','0045','0069','0070'],
    masSalidores: ['0015','0033','0021','0044','0060'],
    masAtrasados: ['0007','0088','0123','0999','1002'],
  },
];

// Tandas que rota la pantalla secundaria: { tipo, duracion en segundos }
const TANDAS = [
  { tipo: 'extracto',      label: 'Extracto completo',   duracion: 20 },
  { tipo: 'masJugados',    label: 'Más jugados',         duracion: 12 },
  { tipo: 'masSalidores',  label: 'Más salidores',       duracion: 12 },
  { tipo: 'masAtrasados',  label: 'Más atrasados',       duracion: 12 },
];

// ── Genera el HTML completo de la pantalla secundaria ──────────────────────
function generarHTML(sorteos, sorteoIdx, tandaIdx) {
  const s = sorteos[sorteoIdx];
  const t = TANDAS[tandaIdx];
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Pantalla Sorteos</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#0a0f1e; font-family:'Courier New',monospace; color:#fff; height:100vh; overflow:hidden; display:flex; flex-direction:column; }
    #hdr { background:#0d2b6b; padding:10px 28px; display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #e02020; flex-shrink:0; }
    #hdr-left h1 { font-size:22px; font-weight:900; letter-spacing:2px; text-transform:uppercase; }
    #hdr-left p  { font-size:11px; color:#93c5fd; margin-top:2px; }
    #hdr-right { text-align:right; }
    #reloj { font-size:26px; font-weight:900; color:#fbbf24; font-family:'Courier New',monospace; }
    #fecha { font-size:11px; color:#93c5fd; text-transform:capitalize; }
    #sorteo-bar { background:#1e3a8a; padding:10px 28px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
    #sorteo-bar .sb-item { text-align:center; }
    #sorteo-bar .sb-lbl { font-size:10px; color:#93c5fd; letter-spacing:2px; text-transform:uppercase; }
    #sorteo-bar .sb-val { font-size:28px; font-weight:900; }
    #sorteo-bar .nro-val { color:#fbbf24; font-family:'Courier New',monospace; }
    #sorteo-bar .hora-val { color:#4ade80; }
    #tanda-lbl { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:#6b7280; text-align:center; padding:6px; background:#111827; flex-shrink:0; }
    #content { flex:1; display:flex; align-items:center; justify-content:center; padding:14px 20px; overflow:hidden; }

    /* EXTRACTO */
    .grid-premios { display:grid; grid-template-columns:repeat(10,1fr); gap:8px; width:100%; }
    .premio-card { background:#111827; border:1px solid #1e3a8a; border-radius:9px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px 4px; }
    .premio-card.top1 { background:#1e3a8a; border:2px solid #fbbf24; }
    .premio-card.top3 { background:#1e2d5a; border:1px solid #60a5fa; }
    .premio-pos { font-size:10px; color:#6b7280; font-weight:700; margin-bottom:3px; }
    .premio-num { font-weight:900; letter-spacing:2px; font-family:'Courier New',monospace; }
    .top1 .premio-num { font-size:28px; color:#fbbf24; }
    .top3 .premio-num { font-size:24px; color:#93c5fd; }
    .premio-num-normal { font-size:20px; color:#e2e8f0; }

    /* TANDA NÚMEROS */
    .tanda-panel { width:100%; display:flex; flex-direction:column; align-items:center; gap:18px; }
    .tanda-titulo { font-size:18px; font-weight:900; letter-spacing:4px; text-transform:uppercase; }
    .tanda-nums { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; }
    .tanda-num { font-family:'Courier New',monospace; font-weight:900; font-size:52px; padding:14px 24px; border-radius:12px; letter-spacing:3px; }
    .tanda-num-rank { font-size:12px; font-weight:700; letter-spacing:1px; margin-top:4px; text-align:center; }

    .jugados-color  { background:#fbbf2420; color:#fbbf24; border:2px solid #fbbf2440; }
    .salidores-color { background:#60a5fa20; color:#60a5fa; border:2px solid #60a5fa40; }
    .atrasados-color { background:#f8717120; color:#f87171; border:2px solid #f8717140; }

    /* Barra de tandas */
    #barra-tandas { background:#0f172a; border-top:1px solid #1e3a8a; display:flex; padding:6px 20px; gap:10px; flex-shrink:0; }
    .tanda-tab { flex:1; text-align:center; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:4px; border-radius:6px; color:#4b5563; }
    .tanda-tab.activa { background:#1e3a8a; color:#93c5fd; }

    /* Progreso */
    #progreso-bar { height:3px; background:#1e3a8a; flex-shrink:0; }
    #progreso-fill { height:3px; background:#3b82f6; width:0%; transition:width 0.1s linear; }
  </style>
</head>
<body>
  <div id="hdr">
    <div id="hdr-left">
      <h1>Lotería de Tucumán</h1>
      <p>Concesión N° 26 — LOPEZ BERTELLI, MARTIN</p>
    </div>
    <div id="hdr-right">
      <div id="reloj">--:--:--</div>
      <div id="fecha"></div>
    </div>
  </div>

  <div id="sorteo-bar">
    <div class="sb-item"><div class="sb-lbl">Extracto</div><div class="sb-val">${s.nombre}</div></div>
    <div class="sb-item"><div class="sb-lbl">Sorteo N°</div><div class="sb-val nro-val">${Number(s.nro).toLocaleString('es-AR')}</div></div>
    <div class="sb-item"><div class="sb-lbl">Hora</div><div class="sb-val hora-val">${s.hora} hs</div></div>
  </div>

  <div id="tanda-lbl">— — —</div>
  <div id="progreso-bar"><div id="progreso-fill"></div></div>

  <div id="content"></div>

  <div id="barra-tandas">
    ${TANDAS.map((t, i) => `<div class="tanda-tab" id="tab-${i}">${t.label}</div>`).join('')}
  </div>

  <script>
    const sorteo = ${JSON.stringify(s)};
    const tandas = ${JSON.stringify(TANDAS)};
    let tandaActual = ${tandaIdx};
    let progreso = 0;
    let intervaloProgreso = null;

    function pad(n) { return String(n).padStart(4,'0'); }

    function renderExtracto() {
      document.getElementById('tanda-lbl').textContent = 'EXTRACTO DE PREMIOS';
      const premios = sorteo.premios;
      let html = '<div class="grid-premios">';
      premios.forEach((n, i) => {
        const cls = i===0 ? 'top1' : i<3 ? 'top3' : '';
        const numCls = i===0 ? '' : i<3 ? '' : 'premio-num-normal';
        html += \`<div class="premio-card \${cls}">
          <div class="premio-pos">\${i+1}°</div>
          <div class="premio-num \${numCls}">\${pad(n)}</div>
        </div>\`;
      });
      html += '</div>';
      document.getElementById('content').innerHTML = html;
    }

    function renderTanda(tipo) {
      const configs = {
        masJugados:   { titulo:'★  Números más jugados', nums: sorteo.masJugados,   cls:'jugados-color',   label:'JUGADO' },
        masSalidores: { titulo:'↑  Números más salidores', nums: sorteo.masSalidores, cls:'salidores-color', label:'SALIDOR' },
        masAtrasados: { titulo:'⏳  Números más atrasados', nums: sorteo.masAtrasados, cls:'atrasados-color', label:'ATRASADO' },
      };
      const cfg = configs[tipo];
      document.getElementById('tanda-lbl').textContent = cfg.titulo.replace(/[★↑⏳]\s+/,'').toUpperCase();
      let html = \`<div class="tanda-panel"><div class="tanda-titulo" style="color:\${cfg.cls.includes('jugados')?'#fbbf24':cfg.cls.includes('salidores')?'#60a5fa':'#f87171'}">\${cfg.titulo}</div><div class="tanda-nums">\`;
      cfg.nums.forEach((n, i) => {
        html += \`<div><div class="tanda-num \${cfg.cls}">\${pad(n)}</div><div class="tanda-num-rank" style="color:#6b7280">\${i+1}° \${cfg.label}</div></div>\`;
      });
      html += '</div></div>';
      document.getElementById('content').innerHTML = html;
    }

    function actualizarTabs() {
      tandas.forEach((_, i) => {
        const el = document.getElementById('tab-'+i);
        if (el) el.className = 'tanda-tab' + (i===tandaActual ? ' activa' : '');
      });
    }

    function mostrarTanda(idx) {
      tandaActual = idx;
      const t = tandas[idx];
      if (t.tipo === 'extracto') renderExtracto();
      else renderTanda(t.tipo);
      actualizarTabs();
      // progreso
      if (intervaloProgreso) clearInterval(intervaloProgreso);
      progreso = 0;
      const fill = document.getElementById('progreso-fill');
      const step = 100 / (t.duracion * 10); // cada 100ms
      intervaloProgreso = setInterval(() => {
        progreso = Math.min(100, progreso + step);
        fill.style.width = progreso + '%';
        if (progreso >= 100) {
          clearInterval(intervaloProgreso);
          mostrarTanda((tandaActual + 1) % tandas.length);
        }
      }, 100);
    }

    function tick() {
      const ahora = new Date();
      document.getElementById('reloj').textContent = ahora.toLocaleTimeString('es-AR', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
      document.getElementById('fecha').textContent = ahora.toLocaleDateString('es-AR', {weekday:'long',day:'numeric',month:'long',year:'numeric'});
    }

    tick();
    setInterval(tick, 1000);
    mostrarTanda(tandaActual);
  <\/script>
</body>
</html>`;
}

// ── Componente editor de un sorteo ─────────────────────────────────────────
function EditorSorteo({ sorteo, onChange }) {
  const [open, setOpen] = useState(false);

  const updatePremio = (i, val) => {
    const arr = [...sorteo.premios];
    arr[i] = val.replace(/\D/g, '').slice(0, 5);
    onChange({ ...sorteo, premios: arr });
  };

  const updateNums = (campo, i, val) => {
    const arr = [...sorteo[campo]];
    arr[i] = val.replace(/\D/g, '').slice(0, 5);
    onChange({ ...sorteo, [campo]: arr });
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-all">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="font-black text-sm text-slate-800 uppercase tracking-widest">{sorteo.nombre}</span>
          <span className="text-xs text-slate-400 font-mono">#{sorteo.nro} · {sorteo.hora}</span>
        </div>
        {open ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
      </button>

      {open && (
        <div className="p-4 space-y-4 bg-white">
          {/* Info básica */}
          <div className="grid grid-cols-3 gap-3">
            {[['Nombre', 'nombre', 'text'], ['N° Sorteo', 'nro', 'number'], ['Hora', 'hora', 'text']].map(([lbl, campo, tipo]) => (
              <div key={campo}>
                <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">{lbl}</label>
                <input type={tipo} value={sorteo[campo]}
                  onChange={e => onChange({ ...sorteo, [campo]: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>
            ))}
          </div>

          {/* Premios */}
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Extracto — 20 premios (el 1° es el 1er premio)</label>
            <div className="grid grid-cols-10 gap-1.5">
              {sorteo.premios.map((n, i) => (
                <div key={i} className="text-center">
                  <div className={`text-[9px] font-black mb-0.5 ${i===0?'text-yellow-600':i<3?'text-blue-500':'text-slate-400'}`}>{i+1}°</div>
                  <input value={n} onChange={e => updatePremio(i, e.target.value)} maxLength={5}
                    className={`w-full text-center font-mono font-black text-xs border rounded-lg py-2 outline-none focus:ring-2 ${i===0?'border-yellow-300 bg-yellow-50 focus:ring-yellow-400 text-yellow-700':i<3?'border-blue-200 bg-blue-50 focus:ring-blue-400':'border-slate-200 focus:ring-slate-300'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Números especiales */}
          {[
            { campo: 'masJugados',   label: '⭐ Más jugados',   color: 'yellow' },
            { campo: 'masSalidores', label: '📈 Más salidores', color: 'blue' },
            { campo: 'masAtrasados', label: '⏳ Más atrasados', color: 'red' },
          ].map(({ campo, label, color }) => (
            <div key={campo}>
              <label className={`text-[10px] font-black uppercase block mb-2 text-${color}-600`}>{label} (5 números)</label>
              <div className="flex gap-2">
                {sorteo[campo].map((n, i) => (
                  <div key={i} className="flex-1">
                    <div className="text-[9px] text-slate-400 text-center mb-0.5">{i+1}°</div>
                    <input value={n} onChange={e => updateNums(campo, i, e.target.value)} maxLength={5}
                      className={`w-full text-center font-mono font-black text-sm border rounded-lg py-2 outline-none focus:ring-2 border-${color}-200 bg-${color}-50 focus:ring-${color}-300`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Preview inline (escala 50%) ────────────────────────────────────────────
function PreviewInline({ sorteos, sorteoIdx }) {
  const [tandaIdx, setTandaIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTandaIdx(0);
    setProgreso(0);
  }, [sorteoIdx]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const duracion = TANDAS[tandaIdx].duracion;
    const step = 100 / (duracion * 10);
    intervalRef.current = setInterval(() => {
      setProgreso(p => {
        if (p + step >= 100) {
          setTandaIdx(t => (t + 1) % TANDAS.length);
          return 0;
        }
        return p + step;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [tandaIdx, sorteoIdx]);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const s = sorteos[sorteoIdx];
  const tanda = TANDAS[tandaIdx];
  const hora = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const fecha = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

  const pad = (n) => String(n).padStart(4, '0');

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: '#0a0f1e', color: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ background: '#0d2b6b', padding: '8px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e02020', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>LOTERÍA DE TUCUMÁN</div>
          <div style={{ fontSize: 8, color: '#93c5fd' }}>Concesión N° 26 — LOPEZ BERTELLI, MARTIN</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#fbbf24' }}>{hora}</div>
          <div style={{ fontSize: 8, color: '#93c5fd', textTransform: 'capitalize' }}>{fecha}</div>
        </div>
      </div>

      {/* Sorteo bar */}
      <div style={{ background: '#1e3a8a', padding: '5px 18px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
        <div><div style={{ fontSize: 7, color: '#93c5fd', letterSpacing: 2 }}>EXTRACTO</div><div style={{ fontSize: 16, fontWeight: 900 }}>{s.nombre}</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 7, color: '#93c5fd' }}>SORTEO N°</div><div style={{ fontSize: 16, fontWeight: 900, color: '#fbbf24' }}>{Number(s.nro).toLocaleString('es-AR')}</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 7, color: '#93c5fd' }}>HORA</div><div style={{ fontSize: 16, fontWeight: 900, color: '#4ade80' }}>{s.hora} hs</div></div>
      </div>

      {/* Tanda label */}
      <div style={{ background: '#111827', textAlign: 'center', fontSize: 8, letterSpacing: 4, color: '#6b7280', padding: '3px', flexShrink: 0, textTransform: 'uppercase' }}>
        {tanda.tipo === 'extracto' ? 'EXTRACTO DE PREMIOS' : tanda.label.toUpperCase()}
      </div>

      {/* Barra de progreso */}
      <div style={{ height: 2, background: '#1e3a8a', flexShrink: 0 }}>
        <div style={{ height: 2, background: '#3b82f6', width: `${progreso}%`, transition: 'width 0.1s linear' }}></div>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', overflow: 'hidden' }}>
        {tanda.tipo === 'extracto' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: 4, width: '100%' }}>
            {s.premios.map((n, i) => (
              <div key={i} style={{
                background: i === 0 ? '#1e3a8a' : i < 3 ? '#1e2d5a' : '#111827',
                border: i === 0 ? '1.5px solid #fbbf24' : i < 3 ? '1px solid #60a5fa' : '1px solid #1e3a8a',
                borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px 2px'
              }}>
                <div style={{ fontSize: 7, color: '#6b7280', fontWeight: 700 }}>{i + 1}°</div>
                <div style={{ fontSize: i < 3 ? 14 : 11, fontWeight: 900, color: i === 0 ? '#fbbf24' : i < 3 ? '#93c5fd' : '#e2e8f0', letterSpacing: 1 }}>{pad(n)}</div>
              </div>
            ))}
          </div>
        )}
        {tanda.tipo !== 'extracto' && (() => {
          const cfg = {
            masJugados:   { color: '#fbbf24', bg: '#fbbf2420', label: '★ MÁS JUGADOS' },
            masSalidores: { color: '#60a5fa', bg: '#60a5fa20', label: '↑ MÁS SALIDORES' },
            masAtrasados: { color: '#f87171', bg: '#f8717120', label: '⏳ MÁS ATRASADOS' },
          }[tanda.tipo];
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: cfg.color, textTransform: 'uppercase' }}>{cfg.label}</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                {s[tanda.tipo].map((n, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ background: cfg.bg, color: cfg.color, fontFamily: "'Courier New',monospace", fontWeight: 900, fontSize: 24, padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${cfg.color}40` }}>{pad(n)}</div>
                    <div style={{ fontSize: 8, color: '#6b7280', marginTop: 3 }}>{i + 1}°</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Barra de tandas */}
      <div style={{ background: '#0f172a', borderTop: '1px solid #1e3a8a', display: 'flex', padding: '4px 12px', gap: 6, flexShrink: 0 }}>
        {TANDAS.map((t, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center', fontSize: 7, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
            padding: '3px', borderRadius: 4, background: i === tandaIdx ? '#1e3a8a' : 'transparent',
            color: i === tandaIdx ? '#93c5fd' : '#4b5563'
          }}>{t.label}</div>
        ))}
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function PantallaSecundaria() {
  const [sorteos, setSorteos] = useState(SORTEOS_INIT);
  const [sorteoIdx, setSorteoIdx] = useState(4); // Nocturna por defecto
  const [tabActiva, setTabActiva] = useState('preview'); // 'preview' | 'editor'

  const updateSorteo = (idx, nuevo) => {
    setSorteos(prev => prev.map((s, i) => i === idx ? nuevo : s));
  };

  const abrirVentana = () => {
    const html = generarHTML(sorteos, sorteoIdx, 0);
    const w = window.open('', '_blank', 'width=1280,height=720,toolbar=no,menubar=no,scrollbars=no');
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Monitor size={22} className="text-indigo-600"/> Pantalla Secundaria
          </h2>
          <p className="text-xs text-slate-400 mt-1">Display para TV / monitor de mostrador — carrusel automático por tanda</p>
        </div>
        <button onClick={abrirVentana}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow">
          <ExternalLink size={14}/> Abrir en Monitor
        </button>
      </div>

      {/* Tabs preview / editor */}
      <div className="flex gap-2">
        {[['preview','👁 Preview'],['editor','✏️ Editar datos']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTabActiva(id)}
            className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${tabActiva===id?'bg-slate-800 text-white border-slate-800':'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
            {lbl}
          </button>
        ))}
      </div>

      {/* Selector de sorteo */}
      <div className="flex gap-2">
        {sorteos.map((s, i) => (
          <button key={i} onClick={() => setSorteoIdx(i)}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${sorteoIdx===i?'bg-indigo-600 text-white border-indigo-600 shadow':'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
            <div>{s.nombre}</div>
            <div className={`text-[9px] mt-0.5 ${sorteoIdx===i?'text-indigo-200':'text-slate-400'}`}>#{s.nro} · {s.hora}</div>
          </button>
        ))}
      </div>

      {tabActiva === 'preview' && (
        <>
          {/* Info de tandas */}
          <div className="bg-slate-800 text-white rounded-xl p-4 flex items-center gap-6">
            <div className="text-xs font-black text-slate-400 uppercase">Rotación automática:</div>
            {TANDAS.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-xs font-bold text-slate-300">{t.label}</span>
                <span className="text-[10px] text-slate-500">{t.duracion}s</span>
                {i < TANDAS.length - 1 && <span className="text-slate-600">→</span>}
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl" style={{ aspectRatio: '16/9' }}>
            <PreviewInline sorteos={sorteos} sorteoIdx={sorteoIdx} />
          </div>
          <p className="text-xs text-slate-400 text-center">Preview en tiempo real · El carrusel se ejecuta igual en la ventana del monitor</p>
        </>
      )}

      {tabActiva === 'editor' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            Editá los datos de cada sorteo. Los cambios se reflejan instantáneamente en la preview y en la ventana del monitor al abrirla.
          </div>
          {sorteos.map((s, i) => (
            <EditorSorteo key={s.id} sorteo={s} onChange={nuevo => updateSorteo(i, nuevo)} />
          ))}
        </div>
      )}
    </div>
  );
}
