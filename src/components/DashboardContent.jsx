import React from 'react';
import * as Icons from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const resumenData = [
  {
    sub: '004', nombre: 'GARCIA JUAN', domicilio: 'San Martín 123', cuit: '20-12345678-9', afip: 'Inscripto',
    matutina: 12000, vespertina: 15000, siesta: 8000, tarde: 9000, nocturno: 11000,
    total: 55000, comision: 1925, dgr: 500, sicore: 350, autom: 1925
  },
  {
    sub: '012', nombre: 'PEREZ ANA', domicilio: 'Belgrano 456', cuit: '27-87654321-0', afip: 'Monotributo',
    matutina: 10000, vespertina: 12000, siesta: 7000, tarde: 8000, nocturno: 9000,
    total: 46000, comision: 1610, dgr: 420, sicore: 290, autom: 1610
  },
  {
    sub: '014', nombre: 'LOPEZ MARIO', domicilio: 'Mitre 789', cuit: '23-11223344-5', afip: 'Inscripto',
    matutina: 9000, vespertina: 11000, siesta: 6000, tarde: 7000, nocturno: 8000,
    total: 41000, comision: 1435, dgr: 380, sicore: 260, autom: 1435
  },
];

const sorteosSummary = [
  { name: 'Matutina', value: resumenData.reduce((s,x)=>s+x.matutina,0) },
  { name: 'Vespertina', value: resumenData.reduce((s,x)=>s+x.vespertina,0) },
  { name: 'Siesta', value: resumenData.reduce((s,x)=>s+x.siesta,0) },
  { name: 'Tarde', value: resumenData.reduce((s,x)=>s+x.tarde,0) },
  { name: 'Nocturno', value: resumenData.reduce((s,x)=>s+x.nocturno,0) },
];

export default function DashboardContent() {
  const totalVentas = resumenData.reduce((s,x)=>s+x.total,0);
  const totalComision = resumenData.reduce((s,x)=>s+x.comision,0);
  const activos = resumenData.length;
  const promedio = Math.round(totalVentas / activos);

  return (
    <div className="space-y-8 text-left">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Dashboard - Ventas por Subagencia</h2>
        <div className="text-xs text-slate-500 flex items-center gap-3">
          <span className="flex items-center gap-1"><Icons.Calendar size={14}/> 28/04/2026</span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-black">Ventas totales</div>
          <div className="text-2xl font-black text-blue-700">${totalVentas.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-black">Comisión total</div>
          <div className="text-2xl font-black text-slate-700">${totalComision.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-black">Subagencias activas</div>
          <div className="text-2xl font-black text-green-700">{activos}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-black">Promedio por sub</div>
          <div className="text-2xl font-black text-slate-700">${promedio.toLocaleString()}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="font-black text-slate-800">Ventas por Sorteo</div>
            <div className="text-xs text-slate-500">Valores en $</div>
          </div>
          <div style={{height: 180}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sorteosSummary}>
                <XAxis dataKey="name" tick={{fontSize:12}} />
                <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
                <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-[12px] text-slate-500">Últimas ventas consolidadas por turno</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="font-black text-slate-800">Top Subagencias</div>
            <button onClick={()=>alert('Ir a Declaración Jurada')} className="text-xs text-blue-600 font-black">Ver DJ</button>
          </div>
          <ul className="space-y-2">
            {resumenData
              .sort((a,b)=>b.total-a.total)
              .map((s, i)=> (
                <li key={s.sub} className="flex items-center justify-between">
                  <div>
                    <div className="font-black">SUB {s.sub} — {s.nombre}</div>
                    <div className="text-[12px] text-slate-500">CUIT: {s.cuit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-blue-700">${s.total.toLocaleString()}</div>
                    <div className="text-[12px] text-slate-500">Com: ${s.comision.toLocaleString()}</div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="font-black mb-2">Resumen rápido por turno</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-slate-700">
          {sorteosSummary.map(s => (
            <div key={s.name} className="bg-slate-50 p-3 rounded-lg text-center">
              <div className="font-black">{s.name}</div>
              <div className="text-blue-700">${s.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}