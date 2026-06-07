import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, FileText, Banknote, DollarSign, CheckCircle, AlertCircle, Printer } from 'lucide-react';

// Datos del día 26/12/2025 (en app real vendrían del estado global de CargaTucuman)
const SUBAGENCIAS = [
  {id:'001',nombre:'ALMARAZ, Patricia B.'},  {id:'002',nombre:'LOPEZ, Jorge José'},
  {id:'003',nombre:'MOLINA, Sandra I.'},     {id:'004',nombre:'LOPEZ BERTELLI, Ramiro'},
  {id:'005',nombre:'MEDINA, Fátima C.'},     {id:'006',nombre:'PARSONS, Mónica B.'},
  {id:'007',nombre:'LOPEZ, Rodrigo J.'},     {id:'008',nombre:'ARANDA, Carlos A.'},
  {id:'009',nombre:'RIARTE, Virginia L.'},   {id:'010',nombre:'VACANTE'},
  {id:'011',nombre:'PELEGRINA, Ana Rosa'},   {id:'012',nombre:'DIAZ, Darío F.'},
  {id:'013',nombre:'DIP, Silvia M.'},        {id:'014',nombre:'MARTINEZ, Julio C.'},
  {id:'015',nombre:'VACANTE'},               {id:'016',nombre:'PAVELKA, Julio'},
  {id:'017',nombre:'DELGADO, Estela V.'},
];

const PLANILLA = [
  {id:'001',M:{v:163900,a:0,p:4,pm:39000,ef:124900},  V:{v:59400,a:1,p:1,pm:13500,ef:45900},   S:{v:5500,a:0,p:0,pm:0,ef:5500},     T:{v:46600,a:0,p:0,pm:0,ef:46600},   N:{v:56800,a:3,p:0,pm:0,ef:56800}},
  {id:'002',M:{v:123600,a:0,p:2,pm:49000,ef:74600},   V:{v:99500,a:2,p:0,pm:0,ef:99500},       S:{v:5700,a:2,p:0,pm:0,ef:5700},     T:{v:2600,a:0,p:0,pm:0,ef:2600},     N:{v:2500,a:1,p:0,pm:0,ef:2500}},
  {id:'003',M:{v:0,a:0,p:0,pm:0,ef:0},                V:{v:0,a:0,p:0,pm:0,ef:0},               S:{v:39000,a:0,p:0,pm:0,ef:39000},   T:{v:33750,a:0,p:0,pm:0,ef:33750},   N:{v:84950,a:0,p:0,pm:0,ef:84950}},
  {id:'004',M:{v:0,a:0,p:0,pm:119000,ef:0},           V:{v:0,a:0,p:0,pm:0,ef:0},               S:{v:0,a:0,p:0,pm:0,ef:0},           T:{v:0,a:0,p:0,pm:0,ef:0},           N:{v:0,a:0,p:0,pm:0,ef:0}},
  {id:'005',M:{v:111500,a:0,p:3,pm:94500,ef:17000},   V:{v:120700,a:1,p:1,pm:27000,ef:93700},  S:{v:39100,a:0,p:2,pm:63000,ef:0},   T:{v:70850,a:0,p:0,pm:0,ef:70850},   N:{v:105050,a:1,p:2,pm:73579,ef:31471}},
  {id:'006',M:{v:185600,a:0,p:12,pm:360000,ef:0},     V:{v:159850,a:4,p:4,pm:121500,ef:38350}, S:{v:69150,a:2,p:3,pm:94500,ef:0},   T:{v:98350,a:1,p:0,pm:0,ef:98350},   N:{v:229500,a:2,p:1,pm:106500,ef:0}},
  {id:'007',M:{v:236950,a:0,p:7,pm:148500,ef:88450},  V:{v:183950,a:0,p:4,pm:112500,ef:71450}, S:{v:100500,a:0,p:1,pm:31500,ef:69000},T:{v:130600,a:0,p:0,pm:0,ef:130600}, N:{v:242950,a:0,p:0,pm:0,ef:242950}},
  {id:'008',M:{v:43000,a:0,p:0,pm:0,ef:43000},        V:{v:40800,a:1,p:0,pm:0,ef:40800},       S:{v:2900,a:1,p:0,pm:0,ef:2900},     T:{v:28200,a:0,p:0,pm:0,ef:28200},   N:{v:102800,a:1,p:0,pm:0,ef:102800}},
  {id:'009',M:{v:99700,a:0,p:4,pm:54000,ef:45700},    V:{v:127900,a:2,p:0,pm:0,ef:127900},     S:{v:19800,a:2,p:4,pm:32100,ef:0},   T:{v:32700,a:0,p:0,pm:0,ef:32700},   N:{v:87200,a:0,p:0,pm:0,ef:87200}},
  {id:'010',M:{v:0,a:0,p:0,pm:0,ef:0},V:{v:0,a:0,p:0,pm:0,ef:0},S:{v:0,a:0,p:0,pm:0,ef:0},T:{v:0,a:0,p:0,pm:0,ef:0},N:{v:0,a:0,p:0,pm:0,ef:0}},
  {id:'011',M:{v:83800,a:0,p:0,pm:0,ef:83800},        V:{v:107100,a:0,p:2,pm:13500,ef:93600},  S:{v:46050,a:1,p:1,pm:11700,ef:34350},T:{v:50900,a:1,p:0,pm:0,ef:50900},   N:{v:74300,a:1,p:0,pm:0,ef:74300}},
  {id:'012',M:{v:137600,a:0,p:5,pm:126000,ef:11600},  V:{v:116250,a:0,p:3,pm:85500,ef:30750},  S:{v:84800,a:1,p:1,pm:27000,ef:57800},T:{v:85200,a:1,p:1,pm:52875,ef:32325},N:{v:148150,a:1,p:0,pm:0,ef:148150}},
  {id:'013',M:{v:169600,a:0,p:5,pm:135000,ef:34600},  V:{v:200000,a:0,p:2,pm:67500,ef:132500}, S:{v:139800,a:0,p:1,pm:27000,ef:112800},T:{v:117100,a:1,p:0,pm:0,ef:117100},N:{v:199150,a:1,p:0,pm:0,ef:199150}},
  {id:'014',M:{v:129500,a:0,p:5,pm:337500,ef:0},      V:{v:92700,a:1,p:1,pm:108000,ef:0},      S:{v:21400,a:0,p:1,pm:44500,ef:0},   T:{v:39500,a:0,p:0,pm:0,ef:39500},   N:{v:56000,a:2,p:0,pm:0,ef:56000}},
  {id:'015',M:{v:0,a:0,p:0,pm:0,ef:0},V:{v:0,a:0,p:0,pm:0,ef:0},S:{v:0,a:0,p:0,pm:0,ef:0},T:{v:0,a:0,p:0,pm:0,ef:0},N:{v:0,a:0,p:0,pm:0,ef:0}},
  {id:'016',M:{v:171300,a:0,p:8,pm:562500,ef:0},      V:{v:147900,a:0,p:2,pm:540000,ef:0},     S:{v:58500,a:0,p:1,pm:108000,ef:0},  T:{v:112100,a:0,p:0,pm:0,ef:112100},  N:{v:115900,a:1,p:0,pm:0,ef:115900}},
  {id:'017',M:{v:29300,a:0,p:0,pm:0,ef:29300},        V:{v:23700,a:0,p:0,pm:0,ef:23700},       S:{v:15000,a:0,p:0,pm:0,ef:15000},   T:{v:17800,a:0,p:0,pm:0,ef:17800},   N:{v:37800,a:0,p:0,pm:0,ef:37800}},
];

const TURNOS = ['M','V','S','T','N'];
const TURNO_NOM = {M:'Mat.',V:'Ves.',S:'Sie.',T:'Tar.',N:'Noc.'};

const fmt = n => n ? '$'+Number(n).toLocaleString('es-AR') : '—';
const sum = (arr, fn) => arr.reduce((a,r) => a + (fn(r)||0), 0);

export default function Recaudacion() {
  const [open, setOpen] = useState({ planilla:true, caja:false, flujo:false, arqueo:false });
  const tog = s => setOpen(p => ({...p,[s]:!p[s]}));

  // Totales planilla
  const grandV = TURNOS.reduce((a,t) => a + sum(PLANILLA, r=>r[t]?.v), 0);
  const grandA = TURNOS.reduce((a,t) => a + sum(PLANILLA, r=>r[t]?.a), 0);
  const grandP = TURNOS.reduce((a,t) => a + sum(PLANILLA, r=>r[t]?.p), 0);
  const grandPM= sum(PLANILLA, r=>TURNOS.reduce((a,t)=>a+(r[t]?.pm||0),0));
  const grandEF= sum(PLANILLA, r=>TURNOS.reduce((a,t)=>a+(r[t]?.ef||0),0));

  // Arqueo
  const totalCajaCierre = grandPM + grandEF;
  const saldoDia = 9062933;
  const diferencia = saldoDia - totalCajaCierre;

  return (
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Calculator size={22} className="text-blue-600"/> Recaudación Diaria
          </h2>
          <p className="text-xs text-slate-400 mt-1">Planilla generada automáticamente desde los datos cargados — 26 / Dic / 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs text-blue-600 font-bold">
            📋 Solo lectura — editá los datos en <span className="font-black">Carga Diaria</span>
          </div>
          <button onClick={()=>window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-700 shadow">
            <Printer size={14}/> Imprimir
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-3">
        {[
          {l:'Tickets vendidos', v:grandV.toLocaleString(), c:'text-blue-700', bg:'bg-blue-50 border-blue-100'},
          {l:'Tickets anulados', v:grandA.toLocaleString(), c:'text-orange-600', bg:'bg-orange-50 border-orange-100'},
          {l:'Tickets premiados', v:grandP.toLocaleString(), c:'text-green-700', bg:'bg-green-50 border-green-100'},
          {l:'$ Premios cobrados', v:fmt(grandPM), c:'text-yellow-700', bg:'bg-yellow-50 border-yellow-100'},
          {l:'$ Efectivo cobrado', v:fmt(grandEF), c:'text-slate-700', bg:'bg-slate-50 border-slate-200'},
        ].map(k=>(
          <div key={k.l} className={`rounded-xl p-3 border text-center ${k.bg}`}>
            <div className="text-[9px] text-slate-400 font-black uppercase mb-1">{k.l}</div>
            <div className={`text-base font-black ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* ═══ PLANILLA ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('planilla')} className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
            <FileText size={15} className="text-blue-600"/> Planilla por Subagencia y Turno
          </span>
          {open.planilla ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </button>
        {open.planilla && (
          <div className="overflow-x-auto">
            <table className="text-[10px] w-full border-collapse" style={{minWidth:900}}>
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white p-2 text-left sticky left-0 z-10" rowSpan={2}>Sub</th>
                  <th className="bg-blue-700 text-white p-1 text-center" colSpan={5}>VENDIDOS</th>
                  <th className="bg-orange-700 text-white p-1 text-center border-l border-orange-600" colSpan={5}>ANULADOS</th>
                  <th className="bg-green-700 text-white p-1 text-center border-l border-green-600" colSpan={5}>PREMIADOS</th>
                  <th className="bg-slate-600 text-white p-1 text-center border-l border-slate-500" colSpan={2}>COBRADO</th>
                </tr>
                <tr className="text-[9px]">
                  {TURNOS.map(t=><th key={`v${t}`} className="bg-blue-800 text-blue-100 p-1 text-center">{TURNO_NOM[t]}</th>)}
                  {TURNOS.map(t=><th key={`a${t}`} className="bg-orange-800 text-orange-100 p-1 text-center border-l border-orange-700">{TURNO_NOM[t]}</th>)}
                  {TURNOS.map(t=><th key={`p${t}`} className="bg-green-800 text-green-100 p-1 text-center border-l border-green-700">{TURNO_NOM[t]}</th>)}
                  <th className="bg-slate-600 text-slate-100 p-1 text-center border-l border-slate-500">$ Premios</th>
                  <th className="bg-slate-600 text-slate-100 p-1 text-center">$ Efectivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PLANILLA.map((r,i)=>{
                  const sub = SUBAGENCIAS.find(s=>s.id===r.id);
                  const isVac = sub.nombre==='VACANTE';
                  const totPM = TURNOS.reduce((a,t)=>a+(r[t]?.pm||0),0);
                  const totEF = TURNOS.reduce((a,t)=>a+(r[t]?.ef||0),0);
                  return (
                    <tr key={r.id} className={`${isVac?'opacity-30':i%2===0?'bg-white':'bg-slate-50'} hover:bg-blue-50/20`}>
                      <td className="p-2 sticky left-0 bg-inherit z-10">
                        <span className="font-black font-mono text-blue-700">{r.id}</span>
                        <span className="ml-1 text-[9px] text-slate-400">{sub.nombre.split(',')[0]}</span>
                      </td>
                      {TURNOS.map(t=><td key={`v${t}`} className="p-1 text-right font-mono">{r[t]?.v||''}</td>)}
                      {TURNOS.map(t=><td key={`a${t}`} className="p-1 text-right font-mono border-l border-slate-200 text-orange-500">{r[t]?.a||''}</td>)}
                      {TURNOS.map(t=><td key={`p${t}`} className="p-1 text-right font-mono border-l border-slate-200 text-green-600">{r[t]?.p||''}</td>)}
                      <td className="p-1 text-right font-mono border-l border-slate-200 text-yellow-700 text-[10px]">{totPM?fmt(totPM):''}</td>
                      <td className="p-1 text-right font-mono text-slate-600 text-[10px]">{totEF?fmt(totEF):''}</td>
                    </tr>
                  );
                })}
                <tr className="bg-blue-900 text-white font-black text-[10px]">
                  <td className="p-2 sticky left-0 bg-blue-900 z-10">TOTAL</td>
                  {TURNOS.map(t=><td key={`tv${t}`} className="p-1 text-right font-mono">{sum(PLANILLA,r=>r[t]?.v).toLocaleString()}</td>)}
                  {TURNOS.map(t=><td key={`ta${t}`} className="p-1 text-right font-mono text-orange-300">{sum(PLANILLA,r=>r[t]?.a)||''}</td>)}
                  {TURNOS.map(t=><td key={`tp${t}`} className="p-1 text-right font-mono text-green-300">{sum(PLANILLA,r=>r[t]?.p)||''}</td>)}
                  <td className="p-1 text-right font-mono text-yellow-300">{fmt(grandPM)}</td>
                  <td className="p-1 text-right font-mono text-green-300">{fmt(grandEF)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ FLUJO ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('flujo')} className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
            <DollarSign size={15} className="text-yellow-600"/> Flujo de Caja
          </span>
          {open.flujo ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </button>
        {open.flujo && (
          <div className="p-6 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-black text-red-600 uppercase mb-3">DEBEN / SALIDA</h4>
              {[['Premios','$4.920.571'],['Martín Gastos','$0'],['Librería','$0'],['Limpieza','$0'],['Soda','$0'],['Varios','$0']].map(([l,v])=>(
                <div key={l} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                  <span className="text-slate-500 text-xs">{l}</span>
                  <span className="font-mono font-black text-xs">{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-black text-xs border-t-2 border-slate-800 mt-1">
                <span>SUB TOTAL</span><span className="font-mono text-red-600">$4.920.571</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-green-600 uppercase mb-3">PAGAN / ENTRADA</h4>
              {[['Depósitos','$10.002.769'],['Prest. Palpar','$0'],['Prest. Telekino','$0'],['Prest. Menores','$0'],['Impuestos','$0'],['Otros','$4.021']].map(([l,v])=>(
                <div key={l} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                  <span className="text-slate-500 text-xs">{l}</span>
                  <span className="font-mono font-black text-xs">{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-black text-xs border-t-2 border-slate-800 mt-1">
                <span>TOTAL</span><span className="font-mono text-green-600">$14.927.361</span>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-4">
              {[{l:'Total Ingreso',v:'$14.927.361',c:'text-green-400'},{l:'Total Egreso',v:'$4.920.571',c:'text-red-400'},{l:'Saldo del Día',v:'$9.062.933',c:'text-white'}].map(k=>(
                <div key={k.l} className="bg-slate-800 text-white rounded-xl p-4 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-black">{k.l}</div>
                  <div className={`text-lg font-black ${k.c}`}>{k.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ ARQUEO ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={()=>tog('arqueo')} className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-all">
          <span className="font-black text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
            <Banknote size={15} className="text-purple-600"/> Arqueo de Caja al Cierre
          </span>
          {open.arqueo ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </button>
        {open.arqueo && (
          <div className="p-6 max-w-sm mx-auto space-y-2">
            {[['Premios en cartera',fmt(grandPM),'text-yellow-600'],['Efectivo en caja',fmt(grandEF),'text-green-600']].map(([l,v,c])=>(
              <div key={l} className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">{l}</span>
                <span className={`font-mono font-black ${c}`}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 border-b-2 border-slate-800">
              <span className="font-black text-slate-800">Total caja al cierre</span>
              <span className="font-mono font-black text-lg">{fmt(totalCajaCierre)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Saldo calculado del día</span>
              <span className="font-mono font-black text-blue-600">$9.062.933</span>
            </div>
            <div className={`flex items-center justify-between py-4 px-4 rounded-xl ${Math.abs(diferencia)<1?'bg-green-50 border border-green-200':'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {Math.abs(diferencia)<1?<CheckCircle size={16} className="text-green-600"/>:<AlertCircle size={16} className="text-red-500"/>}
                <span className="font-black text-sm">Diferencia de caja</span>
              </div>
              <div className="text-right">
                <div className={`font-mono font-black text-lg ${diferencia>=0?'text-green-600':'text-red-600'}`}>
                  {diferencia>=0?'+':''}{fmt(diferencia)}
                </div>
                <div className="text-[10px] text-slate-400">{diferencia>=0?'(+) POSITIVO':'(-) NEGATIVO'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
