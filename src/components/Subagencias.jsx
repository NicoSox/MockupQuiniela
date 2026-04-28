
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const subagencias = [
  { id: '004', zona: 'Barrio Norte', estado: 'online', ventas: [25000, 30000, 18000, 22000, 28000], tickets: [120, 140, 90, 110, 130], premios: [8000, 9000, 6000, 7000, 8500], comision: 0.08 },
  { id: '012', zona: 'Yerba Buena', estado: 'online', ventas: [21000, 27000, 15000, 20000, 26000], tickets: [110, 130, 80, 100, 120], premios: [7000, 8500, 5000, 6000, 8000], comision: 0.08 },
  { id: '014', zona: 'Plaza Independencia', estado: 'offline', ventas: [18000, 22000, 12000, 17000, 21000], tickets: [100, 120, 70, 90, 110], premios: [6000, 7000, 4000, 5000, 7000], comision: 0.08 },
  { id: '022', zona: 'Banda del Río Salí', estado: 'online', ventas: [16000, 19000, 11000, 15000, 18000], tickets: [90, 110, 60, 80, 100], premios: [5000, 6000, 3000, 4000, 6000], comision: 0.08 },
];

const sorteos = [
  { numero: 101, nombre: 'Matutina' },
  { numero: 102, nombre: 'Vespertina' },
  { numero: 103, nombre: 'Siesta' },
  { numero: 104, nombre: 'Tarde' },
  { numero: 105, nombre: 'Nocturna' },
];


export default function Subagencias() {
  const [selected, setSelected] = useState(subagencias[0].id);
  const [expand, setExpand] = useState(null);
  const sub = subagencias.find(s => s.id === selected);

  // Resumen general
  const totalVentas = sub.ventas.reduce((a, b) => a + b, 0);
  const totalTickets = sub.tickets.reduce((a, b) => a + b, 0);
  const totalPremios = sub.premios.reduce((a, b) => a + b, 0);
  const comisionAgenciero = Math.round(totalVentas * sub.comision);
  const gananciaSubagente = totalVentas - totalPremios - comisionAgenciero;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
      {/* Selector de subagencia */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
        <h3 className="font-black text-slate-800 uppercase tracking-tighter mb-2 flex items-center gap-2"><Icons.Users size={18}/> Subagencias</h3>
        <ul className="space-y-2">
          {subagencias.map(s => (
            <li key={s.id}>
              <button onClick={()=>setSelected(s.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${selected===s.id?'bg-blue-50 text-blue-700 font-black':'hover:bg-slate-100'}`}>
                <span className={`w-2 h-2 rounded-full ${s.estado==='online'?'bg-green-500':'bg-slate-400'}`}></span>
                <span className="text-xs">SUB {s.id}</span>
                <span className="text-[10px] text-slate-400">{s.zona}</span>
                {s.estado==='online' && <Icons.Wifi size={12} className="text-green-500"/>}
                {s.estado!=='online' && <Icons.AlertTriangle size={12} className="text-orange-500"/>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle de subagencia seleccionada */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h4 className="text-lg font-black text-blue-700 flex items-center gap-2">SUB {sub.id} <span className="text-xs text-slate-400">{sub.zona}</span></h4>
            <span className={`text-xs font-black ${sub.estado==='online'?'text-green-600':'text-orange-500'}`}>{sub.estado.toUpperCase()}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-slate-500 flex items-center gap-1"><Icons.Package size={14}/> Stock: <b>{sub.stock || '-'}</b></span>
            <span className="text-xs text-slate-500 flex items-center gap-1"><Icons.Mail size={14}/> Mensajes: <b>{sub.mensajes || 0}</b></span>
          </div>
        </div>

        {/* Gráfico de ventas de la subagencia */}
        <div>
          <h5 className="text-xs font-black text-blue-700 mb-1 flex items-center gap-1"><Icons.BarChart2 size={14}/> Ventas por sorteo</h5>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={sorteos.map((s, i) => ({ numero: s.numero, sorteo: s.nombre, ventas: sub.ventas[i] }))}>
              <defs>
                <linearGradient id="colorVentasSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="sorteo" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
              <YAxis tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
              <Area type="monotone" dataKey="ventas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorVentasSub)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resumen general y desglose */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 mb-2">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-col text-xs font-black text-blue-900">
              <span>Ventas: <b className="text-blue-700">${totalVentas.toLocaleString()}</b></span>
              <span>Tickets: <b>{totalTickets}</b></span>
              <span>Premios: <b className="text-green-700">${totalPremios.toLocaleString()}</b></span>
            </div>
            <div className="flex flex-col text-xs font-black text-blue-900">
              <span>Comisión Agenciero: <b className="text-orange-700">${comisionAgenciero.toLocaleString()}</b></span>
              <span>Ganancia Subagente: <b className="text-blue-700">${gananciaSubagente.toLocaleString()}</b></span>
            </div>
            <button
              className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-black shadow hover:bg-blue-700 transition-all"
              onClick={()=>setExpand(expand===sub.id?null:sub.id)}
            >
              {expand===sub.id ? 'Ocultar Desglose' : 'Ver Desglose'}
            </button>
          </div>
          {expand===sub.id && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-slate-700 border border-slate-200 rounded-xl">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2">Sorteo</th>
                    <th className="p-2 text-right">Ventas</th>
                    <th className="p-2 text-right">Tickets</th>
                    <th className="p-2 text-right">Premios</th>
                    <th className="p-2 text-right">Comisión</th>
                    <th className="p-2 text-right">Ganancia</th>
                  </tr>
                </thead>
                <tbody>
                  {sorteos.map((s, i) => {
                    const v = sub.ventas[i];
                    const t = sub.tickets[i];
                    const p = sub.premios[i];
                    const c = Math.round(v * sub.comision);
                    const g = v - p - c;
                    return (
                      <tr key={s.numero} className="even:bg-slate-50">
                        <td className="p-2 font-black text-blue-700">{s.nombre}</td>
                        <td className="p-2 text-right">${v.toLocaleString()}</td>
                        <td className="p-2 text-right">{t}</td>
                        <td className="p-2 text-right">${p.toLocaleString()}</td>
                        <td className="p-2 text-right">${c.toLocaleString()}</td>
                        <td className="p-2 text-right">${g.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Alertas y actividad */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h5 className="text-xs font-black text-orange-700 mb-1 flex items-center gap-1"><Icons.AlertCircle size={14}/> Alertas</h5>
            {sub.alertas && sub.alertas.length === 0 ? (
              <span className="text-xs text-green-600">Sin alertas recientes</span>
            ) : (
              <ul className="text-xs text-orange-600 list-disc ml-4">
                {sub.alertas && sub.alertas.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            )}
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-black text-slate-700 mb-1 flex items-center gap-1"><Icons.History size={14}/> Actividad Reciente</h5>
            <ul className="text-xs text-slate-500 list-disc ml-4">
              <li>Última carga: N° {sorteos[sub.ventas.lastIndexOf(Math.max(...sub.ventas))].numero} - {sorteos[sub.ventas.lastIndexOf(Math.max(...sub.ventas))].nombre} (${Math.max(...sub.ventas).toLocaleString()})</li>
              <li>Estado: {sub.estado==='online'?'Operativa':'Sin conexión'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}