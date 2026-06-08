import React, { useState } from 'react';
import { ClipboardList, Save, CheckCircle, ChevronDown, ChevronUp, Banknote, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

// ─── Constantes ────────────────────────────────────────────────────────────
const SUBAGENCIAS = [
  { id:'001', nombre:'ALMARAZ, Patricia Beatriz' },
  { id:'002', nombre:'LOPEZ, Jorge José' },
  { id:'003', nombre:'MOLINA, Sandra Isabel' },
  { id:'004', nombre:'LOPEZ BERTELLI, Ramiro' },
  { id:'005', nombre:'MEDINA, Fátima Cecilia' },
  { id:'006', nombre:'PARSONS, Mónica Beatriz' },
  { id:'007', nombre:'LOPEZ, Rodrigo Javier' },
  { id:'008', nombre:'ARANDA, Carlos A.' },
  { id:'009', nombre:'RIARTE, Virginia Luján' },
  { id:'010', nombre:'VACANTE' },
  { id:'011', nombre:'PELEGRINA, Ana Rosa' },
  { id:'012', nombre:'DIAZ, Darío F. Martín' },
  { id:'013', nombre:'DIP, Silvia Marisel' },
  { id:'014', nombre:'MARTINEZ, Julio César' },
  { id:'015', nombre:'VACANTE' },
  { id:'016', nombre:'PAVELKA, Julio' },
  { id:'017', nombre:'DELGADO, Estela del Valle' },
];

const SORTEOS = [
  { id:'M', nombre:'MATUTINA',   hora:'11:30', nro:'4686'  },
  { id:'V', nombre:'VESPERTINA', hora:'14:00', nro:'9448'  },
  { id:'S', nombre:'SIESTA',     hora:'16:00', nro:'1381'  },
  { id:'T', nombre:'TARDE',      hora:'18:00', nro:'5391'  },
  { id:'N', nombre:'NOCTURNA',   hora:'22:00', nro:'18218' },
];

const DENOMINACIONES = [20000,10000,2000,1000,500,200,100,50,20,10,5,2,1];

// ─── Datos hardcodeados del Excel 26/12/2025 ──────────────────────────────
// Planilla: { sub: { turno: { vend, anu, prem, cobPremios, cobEfectivo, cobMonedas } } }
// Los campos de carga manual son exactamente los que pide el sistema Lotería:
// nroSorteo, tipo, cantApuestas, ticketsVendidos, importeNeto, premiosPagados + validado
const LOTERIA_INIT = (() => {
  const base = {};
  SUBAGENCIAS.forEach(s => {
    base[s.id] = {};
    SORTEOS.forEach(so => {
      base[s.id][so.id] = { apuestas:'', tickets:'', importe:'', premios:'', validado:false };
    });
  });
  // Datos de ejemplo del Excel día 26
  const ej = {
    '001':{ M:{apuestas:1302,tickets:1302,importe:184650,premios:329000}, V:{apuestas:474,tickets:474,importe:59200,premios:0}, N:{apuestas:932,tickets:932,importe:116550,premios:0} },
    '002':{ M:{apuestas:625,tickets:625,importe:78100,premios:52500},     V:{apuestas:437,tickets:437,importe:54600,premios:0} },
    '003':{ M:{apuestas:2234,tickets:2234,importe:279200,premios:108500}, V:{apuestas:1136,tickets:1136,importe:142000,premios:0} },
    '005':{ M:{apuestas:1173,tickets:1173,importe:146600,premios:346500}, V:{apuestas:1730,tickets:1730,importe:216300,premios:0} },
    '006':{ M:{apuestas:1683,tickets:1683,importe:210350,premios:834750}, V:{apuestas:1852,tickets:1852,importe:231550,premios:0} },
    '007':{ M:{apuestas:2164,tickets:2164,importe:270500,premios:495600}, V:{apuestas:2065,tickets:2065,importe:258100,premios:0} },
    '009':{ M:{apuestas:1470,tickets:1470,importe:183700,premios:361900}, V:{apuestas:1514,tickets:1514,importe:189300,premios:0} },
    '011':{ M:{apuestas:775,tickets:775,importe:96900,premios:350600},    V:{apuestas:722,tickets:722,importe:90200,premios:0} },
    '012':{ M:{apuestas:1540,tickets:1540,importe:192550,premios:449925}, V:{apuestas:1206,tickets:1206,importe:150700,premios:0} },
    '013':{ M:{apuestas:2041,tickets:2041,importe:255100,premios:133000}, V:{apuestas:2043,tickets:2043,importe:255400,premios:0} },
    '014':{ M:{apuestas:825,tickets:825,importe:103100,premios:637000},   V:{apuestas:386,tickets:386,importe:48200,premios:0} },
    '016':{ M:{apuestas:1759,tickets:1759,importe:219900,premios:1173800},V:{apuestas:1357,tickets:1357,importe:169600,premios:0} },
    '017':{ M:{apuestas:798,tickets:798,importe:99700,premios:1065000},   V:{apuestas:145,tickets:145,importe:18100,premios:0} },
  };
  Object.entries(ej).forEach(([sub,ts]) => {
    Object.entries(ts).forEach(([t,d]) => { base[sub][t] = {...base[sub][t],...d}; });
  });
  return base;
})();

// Detalle billetes apertura del Excel
const CAJA_INIT = (() => {
  const c = {};
  DENOMINACIONES.forEach(d => c[`${d}_AP`] = '');
  const ap = {'20000_AP':100,'10000_AP':121,'2000_AP':176,'1000_AP':850,'500_AP':86,'200_AP':41,'100_AP':85,'50_AP':1};
  Object.entries(ap).forEach(([k,v]) => c[k] = v);
  return c;
})();

// Flujo init con datos del Excel 26/12
const FLUJO_INIT = {
  saldoPremAnt: '3185613', saldoEfecAnt: '7077970',
  premios: '8772445', depositos: '8772445', otros: '4344',
  martin:'', libreria:'', limpieza:'', soda:'', varios:'',
  prest_palp:'', prest_telekino:'', prest_menores:'', impuestos:'',
};

const num = v => Number(v)||0;
const fmt = n => n ? '$'+num(n).toLocaleString('es-AR') : '—';

// ─── Sección Lotería ────────────────────────────────────────────────────────
function SeccionLoteria({ datos, onChange }) {
  const [subIdx, setSubIdx] = useState(0);
  const sub = SUBAGENCIAS[subIdx];
  const isVac = sub.nombre === 'VACANTE';
  const subData = datos[sub.id] || {};

  const set = (sId, campo, val) =>
    onChange({ ...datos, [sub.id]: { ...subData, [sId]: { ...subData[sId], [campo]: val } } });

  const totImporte = SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).importe),0);
  const totPremios = SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).premios),0);
  const hayDatos = s => num((subData[s]||{}).importe) > 0 || num((subData[s]||{}).premios) > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="font-black text-slate-800 uppercase text-xs tracking-widest">
          📋 Datos del Sistema Lotería — por Subagencia
        </span>
        <span className="text-[10px] text-slate-400">Ingresá los datos tal como aparecen en el sistema de Lotería</span>
      </div>

      {/* Tabs subagencias */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white">
        {SUBAGENCIAS.map((s,i) => {
          const tiene = s.nombre !== 'VACANTE' && SORTEOS.some(so => hayDatos(so.id) && i === subIdx ? false : num((datos[s.id]?.[so.id]||{}).importe)>0);
          return (
            <button key={s.id} onClick={()=>setSubIdx(i)}
              className={`shrink-0 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${i===subIdx?'border-blue-600 text-blue-700 bg-blue-50':'border-transparent text-slate-400 hover:text-slate-700'}`}>
              <div className="flex items-center gap-1">
                {tiene && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"/>}
                {s.id}
              </div>
            </button>
          );
        })}
      </div>

      {/* Header subagencia */}
      <div className="px-5 py-2.5 bg-blue-900 text-white flex items-center justify-between">
        <span className="font-black text-sm">{sub.id} — {sub.nombre}</span>
        {!isVac && (
          <div className="flex gap-5 text-xs">
            <span className="text-blue-300">Ventas: <span className="font-black text-white">{fmt(totImporte)}</span></span>
            <span className="text-blue-300">Premios: <span className="font-black text-yellow-300">{fmt(totPremios)}</span></span>
          </div>
        )}
      </div>

      {isVac ? (
        <div className="p-6 text-center text-slate-400 text-sm">Vacante — sin datos</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase text-[10px]">
                <th className="p-2.5 text-left">N° Sorteo</th>
                <th className="p-2.5 text-left">Tipo</th>
                <th className="p-2.5 text-right">Cant. Apuestas</th>
                <th className="p-2.5 text-right">Tickets Vendidos</th>
                <th className="p-2.5 text-right">Importe Neto $</th>
                <th className="p-2.5 text-right">Premios Pagados $</th>
                <th className="p-2.5 text-center">✓</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SORTEOS.map(so => {
                const r = subData[so.id] || {};
                return (
                  <tr key={so.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-black text-blue-700">{so.nro}</td>
                    <td className="p-2.5">
                      <div className="font-black text-slate-800">{so.nombre}</div>
                      <div className="text-[9px] text-slate-400">{so.hora} hs</div>
                    </td>
                    <td className="p-2 text-right">
                      <input type="number" min="0" value={r.apuestas||''}
                        onChange={e=>set(so.id,'apuestas',e.target.value)} placeholder="0"
                        className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none"/>
                    </td>
                    <td className="p-2 text-right">
                      <input type="number" min="0" value={r.tickets||''}
                        onChange={e=>set(so.id,'tickets',e.target.value)} placeholder="0"
                        className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none"/>
                    </td>
                    <td className="p-2 text-right">
                      <input type="number" min="0" value={r.importe||''}
                        onChange={e=>set(so.id,'importe',e.target.value)} placeholder="0.00"
                        className="w-28 border border-green-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold text-green-700 bg-green-50 focus:ring-2 focus:ring-green-400 outline-none"/>
                    </td>
                    <td className="p-2 text-right">
                      <input type="number" min="0" value={r.premios||''}
                        onChange={e=>set(so.id,'premios',e.target.value)} placeholder="0.00"
                        className="w-28 border border-yellow-200 rounded-lg px-2 py-1.5 text-right font-mono font-bold text-yellow-700 bg-yellow-50 focus:ring-2 focus:ring-yellow-400 outline-none"/>
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={()=>set(so.id,'validado',!r.validado)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mx-auto transition-all ${r.validado?'bg-green-500 border-green-500 text-white':'border-slate-300 hover:border-green-400'}`}>
                        <CheckCircle size={13}/>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-800 text-white text-xs font-black">
                <td className="p-2.5" colSpan={2}>TOTAL</td>
                <td className="p-2.5 text-right font-mono">{SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).apuestas),0).toLocaleString()}</td>
                <td className="p-2.5 text-right font-mono">{SORTEOS.reduce((a,s)=>a+num((subData[s.id]||{}).tickets),0).toLocaleString()}</td>
                <td className="p-2.5 text-right font-mono text-green-300">{fmt(totImporte)}</td>
                <td className="p-2.5 text-right font-mono text-yellow-300">{fmt(totPremios)}</td>
                <td className="p-2.5 text-center text-slate-400 text-[10px]">{SORTEOS.filter(s=>(subData[s.id]||{}).validado).length}/{SORTEOS.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Sección Caja ───────────────────────────────────────────────────────────
function SeccionCaja({ caja, onChange }) {
  const [open, setOpen] = useState(false);
  const set = (k,v) => onChange({...caja,[k]:v});
  const total = DENOMINACIONES.reduce((a,d)=>a+num(caja[`${d}_AP`])*d, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={()=>setOpen(p=>!p)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
        <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
          <Banknote size={14} className="text-green-600"/> Detalle de Billetes — Apertura de Caja
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono font-black text-green-700 text-sm">{fmt(total)}</span>
          {open ? <ChevronDown size={14}/> : <ChevronDown size={14}/>}
        </div>
      </button>
      {open && (
        <div className="p-4 overflow-x-auto">
          <table className="text-xs border-collapse mx-auto">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-2 text-left">Denominación</th>
                <th className="p-2 text-center w-24">Cantidad</th>
                <th className="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DENOMINACIONES.map((d,i) => {
                const sub = num(caja[`${d}_AP`])*d;
                return (
                  <tr key={d} className={i%2===0?'bg-white':'bg-slate-50'}>
                    <td className="p-2 font-mono font-black text-slate-700">${d.toLocaleString()} x</td>
                    <td className="p-1 text-center">
                      <input type="number" min="0" value={caja[`${d}_AP`]||''}
                        onChange={e=>set(`${d}_AP`,e.target.value)} placeholder="0"
                        className="w-20 border border-slate-200 rounded px-2 py-1 text-center font-mono text-xs focus:ring-1 focus:ring-blue-400 outline-none"/>
                    </td>
                    <td className="p-2 text-right font-mono font-black text-green-700">{sub?fmt(sub):'—'}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-800 text-white font-black">
                <td className="p-2" colSpan={2}>TOTAL APERTURA</td>
                <td className="p-2 text-right font-mono text-green-300">{fmt(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Sección Flujo ──────────────────────────────────────────────────────────
function SeccionFlujo({ flujo, onChange }) {
  const [open, setOpen] = useState(false);
  const set = (k,v) => onChange({...flujo,[k]:v});

  const totalGastos   = ['martin','premios','libreria','limpieza','soda','varios'].reduce((a,k)=>a+num(flujo[k]),0);
  const totalEntradas = ['depositos','prest_palp','prest_telekino','prest_menores','impuestos','otros'].reduce((a,k)=>a+num(flujo[k]),0);
  const saldoPrevio   = num(flujo.saldoPremAnt) + num(flujo.saldoEfecAnt);
  // El saldo del día se calcula automáticamente en Recaudación
  const saldoDia = totalEntradas + saldoPrevio - totalGastos;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button onClick={()=>setOpen(p=>!p)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
        <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
          <DollarSign size={14} className="text-yellow-600"/> Movimientos de Caja — DEBEN / PAGAN
        </span>
        <div className="flex items-center gap-3">
          <span className={`font-mono font-black text-sm ${saldoDia>=0?'text-green-600':'text-red-600'}`}>{fmt(saldoDia)}</span>
          {open ? <ChevronDown size={14}/> : <ChevronDown size={14}/>}
        </div>
      </button>
      {open && (
        <div className="p-5 space-y-5">
          {/* Saldo anterior */}
          <div className="bg-slate-800 text-white rounded-xl p-4 flex flex-wrap gap-5 items-center">
            <div className="text-[10px] font-black text-slate-400 uppercase">Saldo día anterior</div>
            {[['Premios acumulados','saldoPremAnt','text-yellow-400'],['Efectivo en caja','saldoEfecAnt','text-green-400']].map(([lbl,k,c])=>(
              <div key={k} className="flex items-center gap-2">
                <label className="text-xs text-slate-400">{lbl}</label>
                <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                  placeholder="0.00"
                  className={`w-32 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-right font-mono font-bold outline-none focus:ring-2 focus:ring-slate-500 ${c}`}/>
              </div>
            ))}
            <div className="ml-auto text-right">
              <div className="text-[10px] text-slate-400">Total anterior</div>
              <div className="text-base font-black">{fmt(saldoPrevio)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* DEBEN */}
            <div>
              <h4 className="text-[10px] font-black text-red-600 uppercase mb-2 flex items-center gap-1"><TrendingDown size={12}/> DEBEN / SALIDA</h4>
              {[['premios','Premios'],['martin','Martín Gastos'],['libreria','Librería'],['limpieza','Limpieza'],['soda','Soda / Agua'],['varios','Gastos Varios']].map(([k,lbl])=>(
                <div key={k} className="flex items-center gap-2 mb-1.5">
                  <label className="text-xs text-slate-500 w-28">{lbl}</label>
                  <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                    placeholder="0.00"
                    className="flex-1 border border-red-100 rounded-lg px-2 py-1.5 text-right font-mono text-xs focus:ring-1 focus:ring-red-300 outline-none bg-red-50"/>
                </div>
              ))}
              <div className="flex justify-between pt-1.5 border-t border-slate-200 text-xs font-black mt-1">
                <span>SUB TOTAL</span><span className="font-mono text-red-600">{fmt(totalGastos)}</span>
              </div>
            </div>
            {/* PAGAN */}
            <div>
              <h4 className="text-[10px] font-black text-green-600 uppercase mb-2 flex items-center gap-1"><TrendingUp size={12}/> PAGAN / ENTRADA</h4>
              {[['depositos','Depósitos'],['prest_palp','Prest. Palpar'],['prest_telekino','Prest. Telekino'],['prest_menores','Prest. Jgos. Menores'],['impuestos','Impuestos'],['otros','Otros']].map(([k,lbl])=>(
                <div key={k} className="flex items-center gap-2 mb-1.5">
                  <label className="text-xs text-slate-500 w-28">{lbl}</label>
                  <input type="number" min="0" value={flujo[k]||''} onChange={e=>set(k,e.target.value)}
                    placeholder="0.00"
                    className="flex-1 border border-green-100 rounded-lg px-2 py-1.5 text-right font-mono text-xs focus:ring-1 focus:ring-green-300 outline-none bg-green-50"/>
                </div>
              ))}
              <div className="flex justify-between pt-1.5 border-t border-slate-200 text-xs font-black mt-1">
                <span>TOTAL</span><span className="font-mono text-green-600">{fmt(totalEntradas)}</span>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="grid grid-cols-3 gap-3">
            {[{l:'Total Ingreso',v:fmt(totalEntradas+saldoPrevio),c:'text-green-400'},
              {l:'Total Egreso',v:fmt(totalGastos),c:'text-red-400'},
              {l:'Saldo del Día',v:fmt(saldoDia),c:'text-white'}].map(k=>(
              <div key={k.l} className="bg-slate-800 text-white rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-black">{k.l}</div>
                <div className={`text-base font-black font-mono ${k.c}`}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Principal ──────────────────────────────────────────────────────────────
export default function CargaTucuman() {
  const [fecha, setFecha]     = useState('2025-12-26');
  const [loteria, setLoteria] = useState(LOTERIA_INIT);
  const [caja, setCaja]       = useState(CAJA_INIT);
  const [flujo, setFlujo]     = useState(FLUJO_INIT);
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => { setGuardado(true); setTimeout(()=>setGuardado(false),2000); };

  const totalVentas  = SUBAGENCIAS.reduce((a,s)=>a+SORTEOS.reduce((b,so)=>b+num((loteria[s.id]?.[so.id]||{}).importe),0),0);
  const totalPremios = SUBAGENCIAS.reduce((a,s)=>a+SORTEOS.reduce((b,so)=>b+num((loteria[s.id]?.[so.id]||{}).premios),0),0);
  const subsCargadas = SUBAGENCIAS.filter(s=>s.nombre!=='VACANTE'&&SORTEOS.some(so=>num((loteria[s.id]?.[so.id]||{}).importe)>0)).length;

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <ClipboardList size={22} className="text-blue-600"/> Carga Diaria
          </h2>
          <p className="text-xs text-slate-400 mt-1">Datos del sistema Lotería + movimientos de caja</p>
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

      <div className="grid grid-cols-3 gap-3">
        {[{l:'Subag. cargadas',v:`${subsCargadas} / 15`,c:'text-blue-700',bg:'bg-blue-50 border-blue-100'},
          {l:'Total ventas',v:fmt(totalVentas),c:'text-green-700',bg:'bg-green-50 border-green-100'},
          {l:'Total premios',v:fmt(totalPremios),c:'text-yellow-700',bg:'bg-yellow-50 border-yellow-100'}].map(k=>(
          <div key={k.l} className={`rounded-xl p-4 border text-center ${k.bg}`}>
            <div className="text-[10px] text-slate-400 font-black uppercase mb-1">{k.l}</div>
            <div className={`text-xl font-black ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>

      <SeccionLoteria datos={loteria} onChange={setLoteria}/>
      <SeccionCaja    caja={caja}     onChange={setCaja}/>
      <SeccionFlujo   flujo={flujo}   onChange={setFlujo}/>
    </div>
  );
}
