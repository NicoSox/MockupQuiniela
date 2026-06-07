import React, { useState } from 'react';
import { ClipboardList, Save, CheckCircle, ChevronDown, ChevronUp, FileCheck, DollarSign, Banknote, TrendingDown, TrendingUp } from 'lucide-react';

// ── Constantes ─────────────────────────────────────────────────────────────
const SUBAGENCIAS = [
  { id: '001', nombre: 'ALMARAZ, Patricia B.' },
  { id: '002', nombre: 'LOPEZ, Jorge José' },
  { id: '003', nombre: 'MOLINA, Sandra I.' },
  { id: '004', nombre: 'LOPEZ BERTELLI, Ramiro' },
  { id: '005', nombre: 'MEDINA, Fátima C.' },
  { id: '006', nombre: 'PARSONS, Mónica B.' },
  { id: '007', nombre: 'LOPEZ, Rodrigo J.' },
  { id: '008', nombre: 'ARANDA, Carlos A.' },
  { id: '009', nombre: 'RIARTE, Virginia L.' },
  { id: '010', nombre: 'VACANTE' },
  { id: '011', nombre: 'PELEGRINA, Ana Rosa' },
  { id: '012', nombre: 'DIAZ, Darío F.' },
  { id: '013', nombre: 'DIP, Silvia M.' },
  { id: '014', nombre: 'MARTINEZ, Julio C.' },
  { id: '015', nombre: 'VACANTE' },
  { id: '016', nombre: 'PAVELKA, Julio' },
  { id: '017', nombre: 'DELGADO, Estela V.' },
];

const SORTEOS = [
  { id: 'M', nombre: 'MATUTINA',   hora: '11:30', nro: '4686'  },
  { id: 'V', nombre: 'VESPERTINA', hora: '14:00', nro: '9448'  },
  { id: 'S', nombre: 'SIESTA',     hora: '16:00', nro: '1381'  },
  { id: 'T', nombre: 'TARDE',      hora: '18:00', nro: '5391'  },
  { id: 'N', nombre: 'NOCTURNA',   hora: '22:00', nro: '18218' },
];

const DENOMINACIONES = [20000, 10000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
const TURNOS_CAJA = ['MAT', 'VEP', 'TAR', 'NOC'];

// ── Datos iniciales hardcodeados del Excel 26/12/2025 ──────────────────────
const initLoteria = () => {
  const base = {};
  SUBAGENCIAS.forEach(s => {
    base[s.id] = {};
    SORTEOS.forEach(so => {
      base[s.id][so.id] = { apuestas: '', tickets: '', importe: '', premios: '', validado: false };
    });
  });
  // Cargar algunos datos de ejemplo del Excel
  const ej = {
    '001': { M:{apuestas:1302,tickets:1302,importe:163900,premios:39000}, N:{apuestas:454,tickets:454,importe:56800,premios:0} },
    '005': { M:{apuestas:893,tickets:893,importe:111500,premios:94500},   V:{apuestas:966,tickets:966,importe:120700,premios:27000} },
    '006': { M:{apuestas:1485,tickets:1485,importe:185600,premios:360000},V:{apuestas:1279,tickets:1279,importe:159850,premios:121500} },
    '007': { M:{apuestas:1896,tickets:1896,importe:236950,premios:148500},V:{apuestas:1472,tickets:1472,importe:183950,premios:112500} },
    '013': { M:{apuestas:1357,tickets:1357,importe:169600,premios:135000},V:{apuestas:1600,tickets:1600,importe:200000,premios:67500} },
    '016': { M:{apuestas:1371,tickets:1371,importe:171300,premios:562500},V:{apuestas:1183,tickets:1183,importe:147900,premios:540000} },
  };
  Object.entries(ej).forEach(([sub, turnos]) => {
    Object.entries(turnos).forEach(([t, d]) => {
      base[sub][t] = { ...base[sub][t], ...d };
    });
  });
  return base;
};

const initCaja = () => {
  const c = {};
  DENOMINACIONES.forEach(d => { TURNOS_CAJA.forEach(t => { c[`${d}_${t}`] = ''; }); });
  // Datos apertura del Excel
  const ap = { '20000_MAT':80,'10000_MAT':180,'2000_MAT':332,'1000_MAT':193,'500_MAT':151,'200_MAT':68,'100_MAT':100,'50_MAT':2,'10_MAT':3 };
  Object.entries(ap).forEach(([k, v]) => { c[k] = v; });
  return c;
};

const num = v => Number(v) || 0;
const fmt = n => n ? '$' + num(n).toLocaleString('es-AR') : '—';

// ── Sección 1: Datos Lotería ───────────────────────────────────────────────
function SeccionLoteria({ datos, onChange }) {
  const [subIdx, setSubIdx] = useState(0);
  const sub = SUBAGENCIAS[subIdx];
  const isVac = sub.nombre === 'VACANTE';
  const subData = datos[sub.id] || {};

  const set = (sorteoId, campo, val) => {
    onChange({
      ...datos,
      [sub.id]: { ...subData, [sorteoId]: { ...subData[sorteoId], [campo]: val } }
    });
  };

  const toggleValidado = (sorteoId) => {
    const cur = subData[sorteoId] || {};
    set(sorteoId, 'validado', !cur.validado);
  };

  const totalImporte = SORTEOS.reduce((a, s) => a + num((subData[s.id] || {}).importe), 0);
  const totalPremios = SORTEOS.reduce((a, s) => a + num((subData[s.id] || {}).premios), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
          <FileCheck size={15} className="text-blue-600"/> Datos Sistema Lotería
        </span>
        <span className="text-[10px] text-slate-400">Ingresá los datos tal como aparecen en el sistema de Lotería de Tucumán</span>
      </div>

      {/* Selector subagencia — tabs horizontales */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white">
        {SUBAGENCIAS.map((s, i) => {
          const hasData = !isVac && Object.values(datos[s.id] || {}).some(r => num(r.importe) > 0);
          return (
            <button key={s.id} onClick={() => setSubIdx(i)}
              className={`shrink-0 px-3 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${
                i === subIdx
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}>
              <div className="flex items-center gap-1.5">
                {hasData && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                <span>{s.id}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Nombre subagencia */}
      <div className="px-6 py-3 bg-blue-900 text-white flex items-center justify-between">
        <div>
          <span className="font-black text-sm">{sub.id} — {sub.nombre}</span>
        </div>
        {!isVac && (
          <div className="flex gap-6 text-right text-xs">
            <div><span className="text-blue-300">Importe total: </span><span className="font-black font-mono">{fmt(totalImporte)}</span></div>
            <div><span className="text-blue-300">Premios total: </span><span className="font-black font-mono text-yellow-300">{fmt(totalPremios)}</span></div>
          </div>
        )}
      </div>

      {isVac ? (
        <div className="p-8 text-center text-slate-400 text-sm">Subagencia vacante — sin datos</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase text-[10px]">
                <th className="p-3 text-left">N° Sorteo</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-right">Cant. Apuestas</th>
                <th className="p-3 text-right">Tickets Vendidos</th>
                <th className="p-3 text-right">Importe Neto Ventas</th>
                <th className="p-3 text-right">Premios Pagados</th>
                <th className="p-3 text-center">Validación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SORTEOS.map(so => {
                const r = subData[so.id] || {};
                return (
                  <tr key={so.id} className="hover:bg-slate-50 transition-all">
                    <td className="p-3 font-mono font-black text-blue-700">{so.nro}</td>
                    <td className="p-3">
                      <div className="font-black text-slate-800">{so.nombre}</div>
                      <div className="text-[9px] text-slate-400">{so.hora} hs</div>
                    </td>
                    <td className="p-3 text-right">
                      <input type="number" min="0" value={r.apuestas || ''}
                        onChange={e => set(so.id, 'apuestas', e.target.value)}
                        placeholder="0"
                        className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50" />
                    </td>
                    <td className="p-3 text-right">
                      <input type="number" min="0" value={r.tickets || ''}
                        onChange={e => set(so.id, 'tickets', e.target.value)}
                        placeholder="0"
                        className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50" />
                    </td>
                    <td className="p-3 text-right">
                      <input type="number" min="0" value={r.importe || ''}
                        onChange={e => set(so.id, 'importe', e.target.value)}
                        placeholder="0.00"
                        className="w-28 border border-green-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold text-green-700 focus:ring-2 focus:ring-green-400 outline-none bg-green-50" />
                    </td>
                    <td className="p-3 text-right">
                      <input type="number" min="0" value={r.premios || ''}
                        onChange={e => set(so.id, 'premios', e.target.value)}
                        placeholder="0.00"
                        className="w-28 border border-yellow-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold text-yellow-700 focus:ring-2 focus:ring-yellow-400 outline-none bg-yellow-50" />
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => toggleValidado(so.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mx-auto transition-all ${r.validado ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-slate-300 hover:border-green-400'}`}>
                        <CheckCircle size={14}/>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-800 text-white font-black text-xs">
                <td className="p-3" colSpan={2}>TOTAL SUBAGENCIA</td>
                <td className="p-3 text-right font-mono">{SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).apuestas),0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono">{SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).tickets),0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-green-300">{fmt(totalImporte)}</td>
                <td className="p-3 text-right font-mono text-yellow-300">{fmt(totalPremios)}</td>
                <td className="p-3 text-center text-slate-400 text-[10px]">
                  {SORTEOS.filter(s=>(subData[s.id]||{}).validado).length}/{SORTEOS.length} validados
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Sección 2: Caja ────────────────────────────────────────────────────────
function SeccionCaja({ caja, onChange }) {
  const [open, setOpen] = useState(false);

  const set = (key, val) => onChange({ ...caja, [key]: val });

  const totalPorTurno = (t) => DENOMINACIONES.reduce((a, d) => a + num(caja[`${d}_${t}`]) * d, 0);
  const totalGeneral = TURNOS_CAJA.reduce((a, t) => a + totalPorTurno(t), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
        <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
          <Banknote size={15} className="text-green-600"/> Detalle de Billetes en Caja
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono font-black text-green-700 text-sm">{fmt(totalGeneral)}</span>
          {open ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </div>
      </button>

      {open && (
        <div className="overflow-x-auto p-4">
          <table className="text-xs border-collapse mx-auto" style={{ minWidth: 480 }}>
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-2 text-left">Denominación</th>
                {TURNOS_CAJA.map(t => <th key={t} className="p-2 text-center w-20">{t}</th>)}
                <th className="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DENOMINACIONES.map((d, i) => {
                const sub = TURNOS_CAJA.reduce((a, t) => a + num(caja[`${d}_${t}`]) * d, 0);
                return (
                  <tr key={d} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-2 font-mono font-black text-slate-700">${d.toLocaleString()} x</td>
                    {TURNOS_CAJA.map(t => (
                      <td key={t} className="p-1 text-center">
                        <input type="number" min="0" value={caja[`${d}_${t}`] || ''}
                          onChange={e => set(`${d}_${t}`, e.target.value)}
                          placeholder="0"
                          className="w-16 border border-slate-200 rounded px-1 py-1 text-center font-mono text-xs focus:ring-1 focus:ring-blue-400 outline-none" />
                      </td>
                    ))}
                    <td className="p-2 text-right font-mono font-black text-green-700">{sub ? fmt(sub) : '—'}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-800 text-white font-black">
                <td className="p-2">TOTAL</td>
                {TURNOS_CAJA.map(t => (
                  <td key={t} className="p-2 text-right font-mono text-xs">{fmt(totalPorTurno(t))}</td>
                ))}
                <td className="p-2 text-right font-mono text-green-300">{fmt(totalGeneral)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Sección 3: Flujo ───────────────────────────────────────────────────────
function SeccionFlujo({ flujo, onChange }) {
  const [open, setOpen] = useState(false);
  const set = (campo, val) => onChange({ ...flujo, [campo]: val });

  const totalGastos  = ['martin','premios','libreria','limpieza','soda','varios'].reduce((a, k) => a + num(flujo[k]), 0);
  const totalEntradas = ['depositos','prest_palp','prest_telekino','prest_menores','impuestos','otros'].reduce((a, k) => a + num(flujo[k]), 0);
  const saldoPrevio  = num(flujo.saldo_prem_ant) + num(flujo.saldo_efec_ant);
  const saldoDia     = totalEntradas + saldoPrevio - totalGastos;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
        <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
          <DollarSign size={15} className="text-yellow-600"/> Movimientos de Caja — DEBEN / PAGAN
        </span>
        <div className="flex items-center gap-4">
          <span className={`font-mono font-black text-sm ${saldoDia >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt(saldoDia)}</span>
          {open ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </div>
      </button>

      {open && (
        <div className="p-6 space-y-6">
          {/* Saldo anterior */}
          <div className="bg-slate-800 text-white rounded-xl p-4 flex flex-wrap gap-6 items-center">
            <div className="text-xs font-black text-slate-400 uppercase">Saldo día anterior</div>
            {[['Premios acumulados','saldo_prem_ant','text-yellow-400'],['Efectivo en caja','saldo_efec_ant','text-green-400']].map(([lbl,k,c])=>(
              <div key={k} className="flex items-center gap-2">
                <label className="text-xs text-slate-400">{lbl}</label>
                <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                  placeholder="0.00"
                  className={`w-36 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-right font-mono font-bold outline-none focus:ring-2 focus:ring-slate-500 ${c}`}/>
              </div>
            ))}
            <div className="ml-auto text-right">
              <div className="text-[10px] text-slate-400">Total saldo anterior</div>
              <div className="text-lg font-black">{fmt(saldoPrevio)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* DEBEN */}
            <div>
              <h4 className="text-xs font-black text-red-600 uppercase mb-3 flex items-center gap-1"><TrendingDown size={13}/> DEBEN / SALIDA</h4>
              <div className="space-y-2">
                {[['martin','Martín Gastos'],['premios','Premios'],['libreria','Librería'],['limpieza','Limpieza'],['soda','Soda / Agua'],['varios','Gastos Varios']].map(([k,lbl])=>(
                  <div key={k} className="flex items-center gap-3">
                    <label className="text-xs text-slate-500 w-32">{lbl}</label>
                    <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                      placeholder="0.00"
                      className="flex-1 border border-red-100 rounded-lg px-3 py-1.5 text-right font-mono text-xs focus:ring-1 focus:ring-red-300 outline-none bg-red-50"/>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-slate-200 text-xs font-black">
                  <span>SUB TOTAL</span><span className="font-mono text-red-600">{fmt(totalGastos)}</span>
                </div>
              </div>
            </div>

            {/* PAGAN */}
            <div>
              <h4 className="text-xs font-black text-green-600 uppercase mb-3 flex items-center gap-1"><TrendingUp size={13}/> PAGAN / ENTRADA</h4>
              <div className="space-y-2">
                {[['depositos','Depósitos'],['prest_palp','Préstamo Palpar'],['prest_telekino','Préstamo Telekino'],['prest_menores','Préstamo Jgos. Menores'],['impuestos','Impuestos'],['otros','Otros']].map(([k,lbl])=>(
                  <div key={k} className="flex items-center gap-3">
                    <label className="text-xs text-slate-500 w-32">{lbl}</label>
                    <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                      placeholder="0.00"
                      className="flex-1 border border-green-100 rounded-lg px-3 py-1.5 text-right font-mono text-xs focus:ring-1 focus:ring-green-300 outline-none bg-green-50"/>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-slate-200 text-xs font-black">
                  <span>TOTAL</span><span className="font-mono text-green-600">{fmt(totalEntradas)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Saldo del día */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {l:'Total Ingreso', v:fmt(totalEntradas+saldoPrevio), c:'text-green-400'},
              {l:'Total Egreso',  v:fmt(totalGastos),               c:'text-red-400'},
              {l:'Saldo del Día', v:fmt(saldoDia),                  c:'text-white'},
            ].map(k=>(
              <div key={k.l} className="bg-slate-800 text-white rounded-xl p-4 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-black">{k.l}</div>
                <div className={`text-lg font-black font-mono ${k.c}`}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function CargaTucuman() {
  const [fecha, setFecha]     = useState('2025-12-26');
  const [loteria, setLoteria] = useState(initLoteria);
  const [caja, setCaja]       = useState(initCaja);
  const [flujo, setFlujo]     = useState({
    saldo_prem_ant:'3234613', saldo_efec_ant:'6675360',
    premios:'4920571', depositos:'10002769', otros:'4021',
    martin:'', libreria:'', limpieza:'', soda:'', varios:'',
    prest_palp:'', prest_telekino:'', prest_menores:'', impuestos:'',
  });
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => { setGuardado(true); setTimeout(()=>setGuardado(false), 2000); };

  // KPIs generales
  const totalImporte = SUBAGENCIAS.reduce((a,s)=>
    a + SORTEOS.reduce((b,so)=>b+num((loteria[s.id]?.[so.id]||{}).importe),0), 0);
  const totalPremios = SUBAGENCIAS.reduce((a,s)=>
    a + SORTEOS.reduce((b,so)=>b+num((loteria[s.id]?.[so.id]||{}).premios),0), 0);
  const subsCargadas = SUBAGENCIAS.filter(s=>
    s.nombre!=='VACANTE' && SORTEOS.some(so=>num((loteria[s.id]?.[so.id]||{}).importe)>0)
  ).length;

  return (
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <ClipboardList size={22} className="text-blue-600"/> Carga Diaria
          </h2>
          <p className="text-xs text-slate-400 mt-1">Datos del sistema Lotería + movimientos de caja del día</p>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Fecha</label>
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-400 outline-none"/>
          </div>
          <button onClick={handleGuardar}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow transition-all ${guardado?'bg-green-600 text-white':'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {guardado?<CheckCircle size={15}/>:<Save size={15}/>}
            {guardado?'Guardado':'Guardar todo'}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {l:'Subag. con datos', v:`${subsCargadas} / 15`, c:'text-blue-700', bg:'bg-blue-50 border-blue-100'},
          {l:'Total ventas del día', v:fmt(totalImporte), c:'text-green-700', bg:'bg-green-50 border-green-100'},
          {l:'Total premios del día', v:fmt(totalPremios), c:'text-yellow-700', bg:'bg-yellow-50 border-yellow-100'},
        ].map(k=>(
          <div key={k.l} className={`rounded-xl p-4 border text-center ${k.bg}`}>
            <div className="text-[10px] text-slate-400 font-black uppercase mb-1">{k.l}</div>
            <div className={`text-xl font-black ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Las 3 secciones */}
      <SeccionLoteria datos={loteria} onChange={setLoteria}/>
      <SeccionCaja    caja={caja}     onChange={setCaja}/>
      <SeccionFlujo   flujo={flujo}   onChange={setFlujo}/>
    </div>
  );
}
