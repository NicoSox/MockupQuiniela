import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, FileText, Banknote, DollarSign, CheckCircle, AlertCircle, Printer } from 'lucide-react';

// Datos del Excel 26/12/2025 — generados automáticamente desde Carga Diaria
// En la app real este componente recibe props del estado global
const SUBS = [
  {id:'001',n:'ALMARAZ, Patricia B.'},  {id:'002',n:'LOPEZ, Jorge José'},
  {id:'003',n:'MOLINA, Sandra I.'},     {id:'004',n:'LOPEZ BERTELLI, R.'},
  {id:'005',n:'MEDINA, Fátima C.'},     {id:'006',n:'PARSONS, Mónica B.'},
  {id:'007',n:'LOPEZ, Rodrigo J.'},     {id:'008',n:'ARANDA, Carlos A.'},
  {id:'009',n:'RIARTE, Virginia L.'},   {id:'010',n:'VACANTE'},
  {id:'011',n:'PELEGRINA, Ana Rosa'},   {id:'012',n:'DIAZ, Darío F.'},
  {id:'013',n:'DIP, Silvia M.'},        {id:'014',n:'MARTINEZ, Julio C.'},
  {id:'015',n:'VACANTE'},               {id:'016',n:'PAVELKA, Julio'},
  {id:'017',n:'DELGADO, Estela V.'},
];

// Planilla completa del Excel 26/12
// { id, M/V/S/T/N: { v:vendidos, a:anulados, p:premiados, pm:$premios, ef:efectivo, mn:monedas } }
const PLANILLA = [
  {id:'001',M:{v:462200,a:1,p:3,pm:329000,ef:132900,mn:0,dif:300},  V:{v:59200,a:1,p:1,pm:0,ef:59200,mn:0},   S:{v:2300,a:0,p:0,pm:0,ef:2300,mn:0},    T:{v:99500,a:1,p:0,pm:0,ef:99500,mn:0},   N:{v:116550,a:0,p:0,pm:0,ef:116550,mn:0}},
  {id:'002',M:{v:78100,a:0,p:2,pm:52500,ef:183000,mn:0,dif:-100},   V:{v:54600,a:0,p:0,pm:0,ef:54600,mn:0},   S:{v:0,a:0,p:0,pm:0,ef:0,mn:0},          T:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           N:{v:102700,a:0,p:2,pm:0,ef:102700,mn:0}},
  {id:'003',M:{v:279200,a:1,p:5,pm:108500,ef:347500,mn:0,dif:0},    V:{v:142000,a:0,p:1,pm:0,ef:142000,mn:0}, S:{v:23500,a:0,p:0,pm:0,ef:23500,mn:0},   T:{v:7400,a:0,p:0,pm:0,ef:7400,mn:0},    N:{v:3900,a:0,p:0,pm:0,ef:3900,mn:0}},
  {id:'004',M:{v:0,a:0,p:0,pm:70000,ef:0,mn:0,dif:-70000},          V:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           S:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           T:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           N:{v:0,a:0,p:0,pm:0,ef:0,mn:0}},
  {id:'005',M:{v:146600,a:3,p:2,pm:346500,ef:370600,mn:0,dif:0},    V:{v:216300,a:1,p:1,pm:0,ef:216300,mn:0}, S:{v:67600,a:1,p:1,pm:0,ef:67600,mn:0},   T:{v:127300,a:0,p:0,pm:0,ef:127300,mn:0}, N:{v:159300,a:0,p:1,pm:0,ef:159300,mn:0}},
  {id:'006',M:{v:210350,a:1,p:6,pm:834750,ef:193700,mn:0,dif:-50},  V:{v:231550,a:2,p:5,pm:0,ef:231550,mn:0}, S:{v:107800,a:2,p:3,pm:0,ef:107800,mn:0}, T:{v:160000,a:1,p:0,pm:0,ef:160000,mn:0}, N:{v:318700,a:0,p:6,pm:0,ef:318700,mn:0}},
  {id:'007',M:{v:270500,a:0,p:4,pm:495600,ef:585100,mn:0,dif:0},    V:{v:258100,a:0,p:2,pm:0,ef:258100,mn:0}, S:{v:155300,a:0,p:1,pm:0,ef:155300,mn:0}, T:{v:140900,a:0,p:1,pm:0,ef:140900,mn:0}, N:{v:255900,a:0,p:0,pm:0,ef:255900,mn:0}},
  {id:'008',M:{v:0,a:0,p:0,pm:0,ef:0,mn:0,dif:0},                   V:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           S:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           T:{v:0,a:0,p:0,pm:0,ef:0,mn:0},           N:{v:0,a:0,p:0,pm:0,ef:0,mn:0}},
  {id:'009',M:{v:183700,a:0,p:3,pm:361900,ef:219000,mn:0,dif:0},    V:{v:189300,a:0,p:2,pm:0,ef:189300,mn:0}, S:{v:43400,a:0,p:0,pm:0,ef:43400,mn:0},   T:{v:48700,a:0,p:1,pm:0,ef:48700,mn:0},   N:{v:115800,a:0,p:1,pm:0,ef:115800,mn:0}},
  {id:'010',M:{v:0,a:0,p:0,pm:0,ef:0,mn:0,dif:0},V:{v:0,a:0,p:0,pm:0,ef:0,mn:0},S:{v:0,a:0,p:0,pm:0,ef:0,mn:0},T:{v:0,a:0,p:0,pm:0,ef:0,mn:0},N:{v:0,a:0,p:0,pm:0,ef:0,mn:0}},
  {id:'011',M:{v:96900,a:0,p:1,pm:350600,ef:42000,mn:6000,dif:0},   V:{v:90200,a:1,p:4,pm:0,ef:90200,mn:0},   S:{v:58450,a:0,p:3,pm:0,ef:58450,mn:0},   T:{v:60650,a:0,p:0,pm:0,ef:60650,mn:0},   N:{v:92400,a:0,p:4,pm:0,ef:92400,mn:0}},
  {id:'012',M:{v:192550,a:0,p:2,pm:449925,ef:248800,mn:0,dif:-25},  V:{v:150700,a:1,p:2,pm:0,ef:150700,mn:0}, S:{v:73650,a:1,p:5,pm:0,ef:73650,mn:0},   T:{v:99700,a:0,p:5,pm:0,ef:99700,mn:0},   N:{v:182100,a:0,p:4,pm:0,ef:182100,mn:0}},
  {id:'013',M:{v:255100,a:2,p:2,pm:133000,ef:896900,mn:0,dif:0},    V:{v:255400,a:0,p:2,pm:0,ef:255400,mn:0}, S:{v:155900,a:2,p:2,pm:0,ef:155900,mn:0}, T:{v:120200,a:0,p:1,pm:0,ef:120200,mn:0}, N:{v:243300,a:0,p:0,pm:0,ef:243300,mn:0}},
  {id:'014',M:{v:103100,a:0,p:3,pm:637000,ef:0,mn:0,dif:0},         V:{v:48200,a:0,p:3,pm:0,ef:48200,mn:0},   S:{v:38200,a:0,p:1,pm:0,ef:38200,mn:0},   T:{v:40100,a:0,p:1,pm:0,ef:40100,mn:0},   N:{v:81900,a:0,p:0,pm:0,ef:81900,mn:0}},
  {id:'015',M:{v:0,a:0,p:0,pm:0,ef:0,mn:0,dif:0},V:{v:0,a:0,p:0,pm:0,ef:0,mn:0},S:{v:0,a:0,p:0,pm:0,ef:0,mn:0},T:{v:0,a:0,p:0,pm:0,ef:0,mn:0},N:{v:0,a:0,p:0,pm:0,ef:0,mn:0}},
  {id:'016',M:{v:219900,a:0,p:4,pm:1173800,ef:0,mn:0,dif:0},        V:{v:169600,a:1,p:4,pm:0,ef:169600,mn:0}, S:{v:113800,a:0,p:4,pm:0,ef:113800,mn:0}, T:{v:103200,a:0,p:1,pm:0,ef:103200,mn:0}, N:{v:148500,a:0,p:0,pm:0,ef:148500,mn:0}},
  {id:'017',M:{v:99700,a:0,p:5,pm:1065000,ef:0,mn:0,dif:0},         V:{v:18100,a:0,p:0,pm:0,ef:18100,mn:0},   S:{v:14900,a:0,p:0,pm:0,ef:14900,mn:0},   T:{v:9100,a:0,p:0,pm:0,ef:9100,mn:0},    N:{v:31100,a:0,p:0,pm:0,ef:31100,mn:0}},
];

const TURNOS = ['M','V','S','T','N'];
const TNM = {M:'Mat.',V:'Ves.',S:'Sie.',T:'Tar.',N:'Noc.'};
const fmt = n => n?'$'+Number(n).toLocaleString('es-AR'):'—';
const sum = (arr,fn) => arr.reduce((a,r)=>a+(fn(r)||0),0);
const n = v => Number(v)||0;

export default function Recaudacion() {
  const [open, setOpen] = useState({planilla:true,flujo:false,caja:false,arqueo:false});
  const tog = s => setOpen(p=>({...p,[s]:!p[s]}));

  // Todo calculado automáticamente
  const grandV  = TURNOS.reduce((a,t)=>a+sum(PLANILLA,r=>r[t]?.v),0);
  const grandA  = TURNOS.reduce((a,t)=>a+sum(PLANILLA,r=>r[t]?.a),0);
  const grandP  = TURNOS.reduce((a,t)=>a+sum(PLANILLA,r=>r[t]?.p),0);
  const grandPM = sum(PLANILLA,r=>TURNOS.reduce((a,t)=>a+(r[t]?.pm||0),0));
  const grandEF = sum(PLANILLA,r=>TURNOS.reduce((a,t)=>a+(r[t]?.ef||0),0));
  const grandMN = sum(PLANILLA,r=>TURNOS.reduce((a,t)=>a+(r[t]?.mn||0),0));

  // Datos del flujo (vienen de Carga Diaria)
  const saldoPremAnt = 3185613;
  const saldoEfecAnt = 7077970;
  const saldoAnterior = saldoPremAnt + saldoEfecAnt;
  const totalDeben = 8776789;
  const totalPagan = 17549234;
  const saldoDia   = totalPagan - totalDeben; // calculado

  // Arqueo
  const totalCajaCierre = 13022913;
  const diferenciaCaja  = 19.47;

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Calculator size={22} className="text-blue-600"/> Recaudación Diaria
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Planilla calculada automáticamente · 26 / Dic / 2025
            <span className="ml-2 bg-blue-100 text-blue-700 font-black px-2 py-0.5 rounded-full text-[10px]">Solo lectura — editá en Carga Diaria</span>
          </p>
        </div>
        <button onClick={()=>window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-700 shadow">
          <Printer size={14}/> Imprimir
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-2">
        {[
          {l:'Saldo anterior',   v:fmt(saldoAnterior), c:'text-slate-700',  bg:'bg-slate-50 border-slate-200'},
          {l:'Tickets vendidos', v:grandV.toLocaleString(), c:'text-blue-700', bg:'bg-blue-50 border-blue-100'},
          {l:'Tickets anulados', v:grandA.toLocaleString(), c:'text-orange-600', bg:'bg-orange-50 border-orange-100'},
          {l:'Tickets premiados',v:grandP.toLocaleString(), c:'text-green-700', bg:'bg-green-50 border-green-100'},
          {l:'$ Premios',        v:fmt(grandPM), c:'text-yellow-700', bg:'bg-yellow-50 border-yellow-100'},
          {l:'$ Efectivo',       v:fmt(grandEF), c:'text-slate-700',  bg:'bg-slate-50 border-slate-200'},
        ].map(k=>(
          <div key={k.l} className={`rounded-xl p-3 border text-center ${k.bg}`}>
            <div className="text-[9px] text-slate-400 font-black uppercase mb-0.5">{k.l}</div>
            <div className={`text-sm font-black ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* ═══ PLANILLA ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('planilla')} className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <FileText size={14} className="text-blue-600"/> Planilla por Subagencia — Vendidos / Anulados / Premiados / Cobrado / Diferencia
          </span>
          {open.planilla?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
        </button>
        {open.planilla && (
          <div className="overflow-x-auto">
            <table className="text-[10px] w-full border-collapse" style={{minWidth:1000}}>
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white p-2 text-left sticky left-0 z-10" rowSpan={2}>Sub</th>
                  <th className="bg-blue-700 text-white p-1 text-center border-l border-blue-600" colSpan={5}>VENDIDOS ($)</th>
                  <th className="bg-orange-700 text-white p-1 text-center border-l border-orange-600" colSpan={5}>ANULADOS</th>
                  <th className="bg-green-700 text-white p-1 text-center border-l border-green-600" colSpan={5}>PREMIADOS</th>
                  <th className="bg-slate-600 text-white p-1 text-center border-l border-slate-500">$ Premios</th>
                  <th className="bg-slate-600 text-white p-1 text-center">$ Efectivo</th>
                  <th className="bg-slate-600 text-white p-1 text-center">$ Monedas</th>
                  <th className="bg-red-800 text-white p-1 text-center">DIFER.</th>
                </tr>
                <tr className="text-[9px]">
                  {TURNOS.map(t=><th key={`v${t}`} className="bg-blue-800 text-blue-100 p-1 text-center">{TNM[t]}</th>)}
                  {TURNOS.map(t=><th key={`a${t}`} className="bg-orange-800 text-orange-100 p-1 text-center border-l border-orange-700">{TNM[t]}</th>)}
                  {TURNOS.map(t=><th key={`p${t}`} className="bg-green-800 text-green-100 p-1 text-center border-l border-green-700">{TNM[t]}</th>)}
                  <th className="bg-slate-600 p-1 border-l border-slate-500" colSpan={4}/>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PLANILLA.map((r,i)=>{
                  const sub = SUBS.find(s=>s.id===r.id);
                  const isVac = sub.n==='VACANTE';
                  const totPM = TURNOS.reduce((a,t)=>a+(r[t]?.pm||0),0);
                  const totEF = TURNOS.reduce((a,t)=>a+(r[t]?.ef||0),0);
                  const totMN = TURNOS.reduce((a,t)=>a+(r[t]?.mn||0),0);
                  const dif   = r.M?.dif || 0;
                  return (
                    <tr key={r.id} className={`${isVac?'opacity-25':i%2===0?'bg-white':'bg-slate-50'} hover:bg-blue-50/20`}>
                      <td className="p-1.5 sticky left-0 bg-inherit z-10">
                        <span className="font-black font-mono text-blue-700 text-[10px]">{r.id}</span>
                        <span className="ml-1 text-[8px] text-slate-400">{sub.n.split(',')[0]}</span>
                      </td>
                      {TURNOS.map(t=><td key={`v${t}`} className="p-1 text-right font-mono">{r[t]?.v?r[t].v.toLocaleString():''}</td>)}
                      {TURNOS.map(t=><td key={`a${t}`} className="p-1 text-right font-mono border-l border-slate-200 text-orange-500">{r[t]?.a||''}</td>)}
                      {TURNOS.map(t=><td key={`p${t}`} className="p-1 text-right font-mono border-l border-slate-200 text-green-600">{r[t]?.p||''}</td>)}
                      <td className="p-1 text-right font-mono border-l border-slate-200 text-yellow-700">{totPM?fmt(totPM):''}</td>
                      <td className="p-1 text-right font-mono text-slate-600">{totEF?fmt(totEF):''}</td>
                      <td className="p-1 text-right font-mono text-slate-400">{totMN?fmt(totMN):''}</td>
                      <td className={`p-1 text-right font-mono font-black ${dif>0?'text-green-600':dif<0?'text-red-600':'text-slate-300'}`}>
                        {dif?fmt(dif):'—'}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-blue-900 text-white font-black text-[10px]">
                  <td className="p-2 sticky left-0 bg-blue-900 z-10">TOTAL</td>
                  {TURNOS.map(t=><td key={`tv${t}`} className="p-1 text-right font-mono">{sum(PLANILLA,r=>r[t]?.v).toLocaleString()}</td>)}
                  {TURNOS.map(t=><td key={`ta${t}`} className="p-1 text-right font-mono text-orange-300">{sum(PLANILLA,r=>r[t]?.a)||''}</td>)}
                  {TURNOS.map(t=><td key={`tp${t}`} className="p-1 text-right font-mono text-green-300">{sum(PLANILLA,r=>r[t]?.p)||''}</td>)}
                  <td className="p-1 text-right font-mono text-yellow-300">{fmt(grandPM)}</td>
                  <td className="p-1 text-right font-mono text-green-200">{fmt(grandEF)}</td>
                  <td className="p-1 text-right font-mono">{fmt(grandMN)}</td>
                  <td className="p-1 text-right font-mono text-red-300">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ FLUJO ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('flujo')} className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <DollarSign size={14} className="text-yellow-600"/> Flujo de Caja — DEBEN / PAGAN
          </span>
          {open.flujo?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
        </button>
        {open.flujo && (
          <div className="p-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black text-red-600 uppercase mb-2">DEBEN / SALIDA</h4>
              {[['Premios','$8.772.445'],['Martín Gastos','$0'],['Librería','$0'],['Limpieza','$0'],['Soda','$0'],['Gastos Varios','$0']].map(([l,v])=>(
                <div key={l} className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-xs text-slate-500">{l}</span><span className="font-mono font-black text-xs">{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-black text-xs border-t-2 border-slate-800 mt-1">
                <span>SUB TOTAL</span><span className="font-mono text-red-600">$8.776.789</span>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-green-600 uppercase mb-2">PAGAN / ENTRADA</h4>
              {[['Depósitos','$8.772.445'],['Prest. Palpar','$0'],['Prest. Telekino','$0'],['Prest. Jgos. Menores','$0'],['Impuestos','$0'],['Otros','$4.344']].map(([l,v])=>(
                <div key={l} className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-xs text-slate-500">{l}</span><span className="font-mono font-black text-xs">{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-black text-xs border-t-2 border-slate-800 mt-1">
                <span>TOTAL</span><span className="font-mono text-green-600">$17.549.234</span>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-4 gap-3">
              {[
                {l:'Saldo Anterior',v:fmt(saldoAnterior),c:'text-slate-300'},
                {l:'Total Ingreso',  v:'$17.549.234',     c:'text-green-400'},
                {l:'Total Egreso',   v:'$8.776.789',      c:'text-red-400'},
                {l:'Saldo del Día',  v:fmt(saldoDia),     c:'text-white'},
              ].map(k=>(
                <div key={k.l} className="bg-slate-800 text-white rounded-xl p-3 text-center">
                  <div className="text-[9px] text-slate-400 uppercase font-black">{k.l}</div>
                  <div className={`text-sm font-black font-mono ${k.c}`}>{k.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ DETALLE CAJA ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('caja')} className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <Banknote size={14} className="text-green-600"/> Detalle de Caja — Apertura y Cierre
          </span>
          {open.caja?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
        </button>
        {open.caja && (
          <div className="p-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black text-slate-600 uppercase mb-2">Apertura de Caja</h4>
              <table className="text-xs w-full border-collapse">
                <thead><tr className="bg-slate-700 text-white"><th className="p-1.5 text-left">Denom.</th><th className="p-1.5 text-center">Cant.</th><th className="p-1.5 text-right">Total</th></tr></thead>
                <tbody>
                  {[[20000,100],[10000,121],[2000,176],[1000,850],[500,86],[200,41],[100,85],[50,1]].map(([d,c])=>(
                    <tr key={d} className="border-b border-slate-100 even:bg-slate-50">
                      <td className="p-1.5 font-mono">${d.toLocaleString()} x</td>
                      <td className="p-1.5 text-center font-black">{c}</td>
                      <td className="p-1.5 text-right font-mono text-green-700">{fmt(d*c)}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800 text-white font-black">
                    <td className="p-1.5" colSpan={2}>SUB-TOTAL</td>
                    <td className="p-1.5 text-right font-mono">$4.471.750</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-600 uppercase mb-2">Cierre de Caja</h4>
              <table className="text-xs w-full border-collapse">
                <thead><tr className="bg-slate-700 text-white"><th className="p-1.5 text-left">Denom.</th><th className="p-1.5 text-center">Cant.</th><th className="p-1.5 text-right">Total</th></tr></thead>
                <tbody>
                  {[[20000,350],[10000,182],[2000,103],[1000,93],[500,475],[200,110],[100,232],[50,1437],[20,506],[10,363]].map(([d,c])=>(
                    <tr key={d} className="border-b border-slate-100 even:bg-slate-50">
                      <td className="p-1.5 font-mono">${d.toLocaleString()} x</td>
                      <td className="p-1.5 text-center font-black">{c}</td>
                      <td className="p-1.5 text-right font-mono text-green-700">{fmt(d*c)}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-700 text-white font-black"><td className="p-1.5" colSpan={2}>SUB-TOTAL EFECTIVO</td><td className="p-1.5 text-right font-mono">$9.487.300</td></tr>
                  <tr className="bg-yellow-700 text-white font-black"><td className="p-1.5" colSpan={2}>+ Premios</td><td className="p-1.5 text-right font-mono">$420.000</td></tr>
                  <tr className="bg-blue-800 text-white font-black"><td className="p-1.5" colSpan={2}>+ Bol. s/Premios</td><td className="p-1.5 text-right font-mono">$3.115.613</td></tr>
                  <tr className="bg-slate-800 text-white font-black"><td className="p-1.5" colSpan={2}>TOTAL CIERRE</td><td className="p-1.5 text-right font-mono text-green-300">$13.022.913</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ═══ ARQUEO ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('arqueo')} className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <CheckCircle size={14} className="text-purple-600"/> Arqueo de Caja al Cierre
          </span>
          {open.arqueo?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
        </button>
        {open.arqueo && (
          <div className="p-5 max-w-sm mx-auto space-y-2">
            {[['Total de Ingreso','$21.799.683','text-green-600'],['Total de Egreso','$8.776.789','text-red-600']].map(([l,v,c])=>(
              <div key={l} className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">{l}</span>
                <span className={`font-mono font-black ${c}`}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Total de Caja al Cierre</span>
              <span className="font-mono font-black">{fmt(totalCajaCierre)}</span>
            </div>
            <div className="flex justify-between py-3 border-b-2 border-slate-800">
              <span className="font-black text-slate-800">Saldo del Día</span>
              <span className="font-mono font-black text-lg text-blue-600">{fmt(saldoDia)}</span>
            </div>
            <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600"/>
                <span className="font-black text-sm">Diferencia de Caja</span>
              </div>
              <div className="text-right">
                <div className="font-mono font-black text-lg text-green-600">+${diferenciaCaja.toFixed(2)}</div>
                <div className="text-[10px] text-slate-400">(+) POSITIVO</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
