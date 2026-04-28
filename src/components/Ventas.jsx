
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, Cell } from 'recharts';
import * as Icons from 'lucide-react';

const ventasRanking = [
  { nombre: 'Agencia 026', total: 140000, color: '#ef4444', principal: true },
  { nombre: 'Sub 101', total: 123000, color: '#2563eb' },
  { nombre: 'Sub 102', total: 109000, color: '#60a5fa' },
  { nombre: 'Sub 103', total: 90000, color: '#818cf8' },
  { nombre: 'Sub 104', total: 79000, color: '#fbbf24' },
];

// Números de sorteo reales (desfasados) proporcionados por el usuario
// Matutina 4.686, Vespertina 9.448, Siesta 1.381, Tarde 5.391, Nocturna 18.218
const ventasPorSorteo = [
  { sorteo: 'Matutina', sorteoNumber: 4686, BarrioNorte: 25000, YerbaBuena: 21000, PlazaIndep: 18000, BandaRioSali: 16000, Agencia026: 30000 },
  { sorteo: 'Vespertina', sorteoNumber: 9448, BarrioNorte: 30000, YerbaBuena: 27000, PlazaIndep: 22000, BandaRioSali: 19000, Agencia026: 34000 },
  { sorteo: 'Siesta', sorteoNumber: 1381, BarrioNorte: 18000, YerbaBuena: 15000, PlazaIndep: 12000, BandaRioSali: 11000, Agencia026: 15000 },
  { sorteo: 'Tarde', sorteoNumber: 5391, BarrioNorte: 22000, YerbaBuena: 20000, PlazaIndep: 17000, BandaRioSali: 15000, Agencia026: 26000 },
  { sorteo: 'Nocturna', sorteoNumber: 18218, BarrioNorte: 28000, YerbaBuena: 26000, PlazaIndep: 21000, BandaRioSali: 18000, Agencia026: 35000 },
];

const ventasHistorico = [
  { dia: 'Lun', total: 80000 },
  { dia: 'Mar', total: 95000 },
  { dia: 'Mie', total: 110000 },
  { dia: 'Jue', total: 120000 },
  { dia: 'Vie', total: 105000 },
  { dia: 'Sab', total: 130000 },
  { dia: 'Dom', total: 123000 },
];

export default function Ventas() {
  // Agencia principal
  const agencia = { nombre: 'Agencia 026', m: 30000, v: 34000, s: 15000, t: 26000, n: 35000 };
  // Subagencias con nombres realistas
  const subagencias = [
    { nombre: 'Sub 101', m: 25000, v: 30000, s: 18000, t: 22000, n: 28000 },
    { nombre: 'Sub 102', m: 21000, v: 27000, s: 15000, t: 20000, n: 26000 },
    { nombre: 'Sub 103', m: 18000, v: 22000, s: 12000, t: 17000, n: 21000 },
    { nombre: 'Sub 104', m: 16000, v: 19000, s: 11000, t: 15000, n: 18000 },
  ];

  return (
    <div className="space-y-10">
      <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-4 flex items-center gap-2"><Icons.BarChart2 className="text-blue-600"/> Ventas - Comparativas y Análisis</h2>

      {/* Ranking */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.Users size={16}/> Ranking</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={ventasRanking} layout="vertical" margin={{ left: 30, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="nombre" type="category" width={110} tick={{fontWeight:'bold',fontSize:12}} />
            <Bar dataKey="total" radius={[0, 12, 12, 0]}>
              {ventasRanking.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
            <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 mt-2 text-xs">
          {/* Agencia principal */}
          <span className="flex items-center gap-1 font-black text-blue-700">
            <span className="w-3 h-3 rounded-full inline-block" style={{background:'#ef4444'}}></span>
            Agencia 026 <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Principal</span>
          </span>
          {/* Subagencias */}
          {ventasRanking.filter(s=>!s.principal).map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full inline-block" style={{background:s.color}}></span>{s.nombre}
            </span>
          ))}
        </div>
      </section>

      {/* Comparativa por sorteo y subagencia */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.PieChart size={16}/> Ventas por Sorteo y Subagencia</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ventasPorSorteo.map(s => ({...s, label: `${s.sorteo} #${s.sorteoNumber}`}))} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{fontWeight:'bold',fontSize:12}} />
            <YAxis tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
            <Legend />
            <Bar dataKey="BarrioNorte" fill="#2563eb" name="Barrio Norte" />
            <Bar dataKey="YerbaBuena" fill="#60a5fa" name="Yerba Buena" />
            <Bar dataKey="PlazaIndep" fill="#818cf8" name="Plaza Indep." />
            <Bar dataKey="BandaRioSali" fill="#fbbf24" name="Banda Río Salí" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Tendencia histórica */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.LineChart size={16}/> Tendencia Semanal</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={ventasHistorico}>
            <defs>
              <linearGradient id="colorTotalVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
            <YAxis tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
            <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTotalVentas)" />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* Tabla de ventas detallada */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.Table2 size={16}/> Detalle de Ventas por Subagencia y Sorteo</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-700">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-2">Subagencia</th>
                <th className="p-2">Matutina</th>
                <th className="p-2">Vespertina</th>
                <th className="p-2">Siesta</th>
                <th className="p-2">Tarde</th>
                <th className="p-2">Nocturna</th>
                <th className="p-2">Total Día</th>
              </tr>
              <tr className="text-xs text-slate-500">
                <td className="p-2">&nbsp;</td>
                <td className="p-2">Sorteo #{ventasPorSorteo.find(s=>s.sorteo==='Matutina')?.sorteoNumber}</td>
                <td className="p-2">Sorteo #{ventasPorSorteo.find(s=>s.sorteo==='Vespertina')?.sorteoNumber}</td>
                <td className="p-2">Sorteo #{ventasPorSorteo.find(s=>s.sorteo==='Siesta')?.sorteoNumber}</td>
                <td className="p-2">Sorteo #{ventasPorSorteo.find(s=>s.sorteo==='Tarde')?.sorteoNumber}</td>
                <td className="p-2">Sorteo #{ventasPorSorteo.find(s=>s.sorteo==='Nocturna')?.sorteoNumber}</td>
                <td className="p-2">&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {/* Agencia principal */}
              <tr className="bg-slate-100 font-black border-b-2 border-blue-400">
                <td className="p-2 font-black text-blue-700">{agencia.nombre} <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Principal</span></td>
                <td className="p-2 text-right">${agencia.m.toLocaleString()}</td>
                <td className="p-2 text-right">${agencia.v.toLocaleString()}</td>
                <td className="p-2 text-right">${agencia.s.toLocaleString()}</td>
                <td className="p-2 text-right">${agencia.t.toLocaleString()}</td>
                <td className="p-2 text-right">${agencia.n.toLocaleString()}</td>
                <td className="p-2 text-right font-black text-blue-700">${(agencia.m+agencia.v+agencia.s+agencia.t+agencia.n).toLocaleString()}</td>
              </tr>
              {/* Subagencias */}
              {subagencias.map((s, i) => (
                <tr key={i} className="even:bg-slate-50">
                  <td className="p-2 font-bold">{s.nombre}</td>
                  <td className="p-2 text-right">${s.m.toLocaleString()}</td>
                  <td className="p-2 text-right">${s.v.toLocaleString()}</td>
                  <td className="p-2 text-right">${s.s.toLocaleString()}</td>
                  <td className="p-2 text-right">${s.t.toLocaleString()}</td>
                  <td className="p-2 text-right">${s.n.toLocaleString()}</td>
                  <td className="p-2 text-right font-black text-blue-700">${(s.m+s.v+s.s+s.t+s.n).toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-black">
                <td className="p-2">Consolidado</td>
                <td className="p-2 text-right">${[agencia,...subagencias].reduce((a,b)=>a+b.m,0).toLocaleString()}</td>
                <td className="p-2 text-right">${[agencia,...subagencias].reduce((a,b)=>a+b.v,0).toLocaleString()}</td>
                <td className="p-2 text-right">${[agencia,...subagencias].reduce((a,b)=>a+b.s,0).toLocaleString()}</td>
                <td className="p-2 text-right">${[agencia,...subagencias].reduce((a,b)=>a+b.t,0).toLocaleString()}</td>
                <td className="p-2 text-right">${[agencia,...subagencias].reduce((a,b)=>a+b.n,0).toLocaleString()}</td>
                <td className="p-2 text-right text-blue-700">${[agencia,...subagencias].reduce((a,b)=>a+(b.m+b.v+b.s+b.t+b.n),0).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
