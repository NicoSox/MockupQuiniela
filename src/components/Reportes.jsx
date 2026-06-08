import React, { useState } from 'react';
import { FileBarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';

// Datos de las hojas VTA MATU/VESP/SIES/TARD/NOCT del Excel — Diciembre 2025
const SUBS = ['CENTRAL','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016','017'];

const VTA = {
  M: [
    {d:'01',vals:[287500,175400,361950,150500,201950,111500,185600,236950,43000,99700,0,83800,137600,169600,129500,0,171300,29300]},
    {d:'02',vals:[177950,129400,246310,131000,113600,62800,170350,157600,53900,98300,0,71700,61250,159000,144400,0,124900,29500]},
    {d:'03',vals:[436750,125800,305100,104100,93900,50900,126500,161250,82200,75800,0,52800,88300,121850,82400,0,161900,45850]},
    {d:'04',vals:[274900,197100,263350,135800,94300,114500,141900,159650,66300,137900,0,57700,97200,140200,98400,0,167050,23550]},
    {d:'05',vals:[415100,190350,358350,162000,137850,61100,134300,132550,34100,70600,0,66200,88750,111950,72800,0,162000,61900]},
    {d:'06',vals:[361900,84850,477115,160600,227400,131300,161700,330550,50300,109800,0,82400,131800,189000,60900,0,123100,47800]},
    {d:'09',vals:[550700,141850,378120,157200,104950,75700,204350,207950,59500,158600,0,107600,102700,160900,99500,0,152600,33100]},
    {d:'10',vals:[599100,104100,308150,129600,90700,99600,77700,211150,33600,90800,0,72400,93700,207500,62700,0,199800,27600]},
    {d:'11',vals:[446650,114900,302800,183500,104500,83400,176700,157450,0,119400,0,58500,76300,151500,144050,0,121550,47800]},
    {d:'12',vals:[532550,136400,348600,179400,108050,157500,184800,248050,0,133900,0,58900,122000,162300,86700,0,154400,54900]},
    {d:'13',vals:[488000,208100,418550,265400,190150,109000,219250,276450,0,149000,0,89100,166430,225000,80200,0,120900,75000]},
    {d:'15',vals:[408700,99300,496100,180500,162150,96600,218700,180600,0,87900,0,92000,143150,181700,102400,0,210900,59700]},
    {d:'16',vals:[499900,142500,406420,193000,110000,131500,145300,181550,0,126100,0,76400,152500,156100,119400,0,139100,65900]},
    {d:'17',vals:[435200,172050,404410,186100,115900,155550,181450,251800,0,130000,0,68700,106650,147000,70700,0,101900,68000]},
    {d:'18',vals:[459000,162400,524150,220600,99400,121600,214700,240000,0,162400,0,87600,160100,166900,132400,0,118500,47900]},
    {d:'19',vals:[441100,107000,399650,200400,111150,95300,197300,310850,0,180800,0,70800,107350,193000,86400,0,134300,43200]},
    {d:'20',vals:[424500,129400,491210,237200,125100,93800,202450,261850,0,128100,0,78900,136450,219600,46200,0,83900,33400]},
    {d:'22',vals:[653750,142750,514350,211900,129050,142700,226550,212900,0,146600,0,77100,115600,161900,101050,0,168850,116900]},
    {d:'23',vals:[540550,152300,466350,203600,160850,77400,210700,244900,0,156500,0,106500,107500,257200,118100,0,138100,37400]},
    {d:'24',vals:[437050,166600,578635,200900,172300,188950,180450,356900,0,85100,0,66600,163850,208900,99350,0,69400,50650]},
    {d:'26',vals:[463850,160200,409550,115500,229400,146600,210350,270500,0,183700,0,96900,192550,255100,103100,0,219900,99700]},
    {d:'27',vals:[502250,161950,395050,160000,271350,117200,197450,262300,0,158000,0,77200,134100,242300,88300,0,186000,31200]},
    {d:'29',vals:[518550,148900,482800,153300,192900,203600,191490,258200,0,147500,0,83300,162150,253100,110000,0,122800,28100]},
    {d:'30',vals:[479700,145900,533200,163400,295650,128000,240700,290200,0,191000,0,101700,145600,226100,128700,0,247400,48100]},
    {d:'31',vals:[443050,120750,498150,147600,218200,118300,210000,358600,0,195700,0,103700,163950,220950,108600,0,183950,36200]},
  ],
};

const SORTEOS_NAMES = ['Matutina','Vespertina','Siesta','Tarde','Nocturna'];

// Totales por día para el gráfico de línea
const totalesPorDia = VTA.M.map(d => ({
  dia: d.d,
  Matutina: d.vals.reduce((a,v)=>a+v,0),
}));

const fmt = n => '$'+Number(n).toLocaleString('es-AR');

export default function Reportes() {
  const [turno, setTurno] = useState('M');
  const [subFiltro, setSubFiltro] = useState('TODAS');
  const data = VTA[turno] || VTA.M;

  // Para el turno seleccionado, suma por subagencia (columna)
  const totalPorSub = SUBS.map((s,i) => ({
    sub: s,
    total: data.reduce((a,d)=>a+(d.vals[i]||0),0)
  })).filter(s=>s.sub!=='CENTRAL'&&s.sub!=='010'&&s.sub!=='015'&&s.sub!=='008').sort((a,b)=>b.total-a.total);

  // Para el gráfico de barras: top 8 subs
  const chartData = totalPorSub.slice(0,8).map(s=>({sub:s.sub, total:s.total}));

  return (
    <div className="space-y-5 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <FileBarChart2 size={22} className="text-indigo-600"/> Reportes — Diciembre 2025
          </h2>
          <p className="text-xs text-slate-400 mt-1">Planilla de totales mensuales por subagencia y turno</p>
        </div>
        <div className="flex gap-2">
          {['M','V','S','T','N'].map((t,i)=>(
            <button key={t} onClick={()=>setTurno(t)}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${turno===t?'bg-slate-800 text-white border-slate-800':'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {SORTEOS_NAMES[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico top subagencias */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="font-black text-slate-800 text-xs uppercase mb-3">Top subagencias — {SORTEOS_NAMES[['M','V','S','T','N'].indexOf(turno)]} (total mensual)</div>
        <div style={{height:180}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="sub" tick={{fontSize:10}}/>
              <YAxis tick={{fontSize:9}} tickFormatter={v=>'$'+(v/1000).toFixed(0)+'k'}/>
              <Tooltip formatter={v=>fmt(v)}/>
              <Bar dataKey="total" fill="#2563eb" radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla planilla mensual */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
          <span className="font-black text-slate-800 text-xs uppercase tracking-widest">
            Planilla Mensual — {SORTEOS_NAMES[['M','V','S','T','N'].indexOf(turno)]} · Diciembre 2025
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="text-[10px] border-collapse" style={{minWidth: 900}}>
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-2 text-center sticky left-0 bg-slate-800 z-10 w-10">Día</th>
                {SUBS.filter(s=>s!=='CENTRAL'&&s!=='010'&&s!=='015').map(s=>(
                  <th key={s} className="p-2 text-right font-mono">{s}</th>
                ))}
                <th className="p-2 text-right text-green-300">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((d,i)=>{
                const subs_filtrados = SUBS.filter(s=>s!=='CENTRAL'&&s!=='010'&&s!=='015');
                const total = d.vals.filter((_,idx)=>SUBS[idx]!=='CENTRAL'&&SUBS[idx]!=='010'&&SUBS[idx]!=='015').reduce((a,v)=>a+v,0);
                return (
                  <tr key={d.d} className={`${i%2===0?'bg-white':'bg-slate-50'} hover:bg-blue-50/20`}>
                    <td className="p-2 text-center font-black text-blue-700 sticky left-0 bg-inherit z-10">{d.d}</td>
                    {subs_filtrados.map((s,si)=>{
                      const realIdx = SUBS.indexOf(s);
                      const val = d.vals[realIdx]||0;
                      return <td key={s} className={`p-1.5 text-right font-mono ${val===0?'text-slate-200':val>300000?'text-blue-700 font-black':''}`}>{val?val.toLocaleString():''}</td>;
                    })}
                    <td className="p-1.5 text-right font-mono font-black text-green-700">{total.toLocaleString()}</td>
                  </tr>
                );
              })}
              {/* Totales */}
              <tr className="bg-blue-900 text-white font-black">
                <td className="p-2 text-center sticky left-0 bg-blue-900 z-10">TOT</td>
                {SUBS.filter(s=>s!=='CENTRAL'&&s!=='010'&&s!=='015').map(s=>{
                  const realIdx = SUBS.indexOf(s);
                  const tot = data.reduce((a,d)=>a+(d.vals[realIdx]||0),0);
                  return <td key={s} className="p-1.5 text-right font-mono text-blue-100">{tot.toLocaleString()}</td>;
                })}
                <td className="p-1.5 text-right font-mono text-green-300">
                  {data.reduce((a,d)=>a+d.vals.filter((_,i)=>SUBS[i]!=='CENTRAL'&&SUBS[i]!=='010'&&SUBS[i]!=='015').reduce((b,v)=>b+v,0),0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
