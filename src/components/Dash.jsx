import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import DashboardContent from './DashboardContent.jsx';
import Subagencias from './Subagencias.jsx';
import CargaTucuman from './CargaTucuman.jsx';
import Ventas from './Ventas.jsx';
import Vidriera from './Vidriera.jsx';
import Reportes from './Reportes.jsx';
import Auditoria from './Auditoria.jsx';
import Insumos from './Insumos.jsx';

import Declaracion from './Declaracion.jsx';
import Recaudacion from './Recaudacion.jsx';


const NAV = [
  { id:'dashboard',   label:'Dashboard',       icon:'LayoutDashboard' },
  { id:'carga',       label:'Carga Diaria',     icon:'ClipboardList',   badge:'PRINCIPAL' },
  { id:'recaudacion', label:'Recaudación',      icon:'Calculator' },
  { id:'reportes',    label:'Reportes',         icon:'FileBarChart2' },
  { id:'declaracion', label:'Declaración',      icon:'FileText' },
  { id:'vidriera',    label:'Vidriera',         icon:'Tv2' },
  
  { id:'subagencias', label:'Subagencias',      icon:'Users' },
  { id:'ventas',      label:'Ventas',           icon:'BarChart2' },
  { id:'insumos',     label:'Insumos',          icon:'Package' },
  { id:'auditoria',   label:'Auditoría',        icon:'ShieldCheck' },
];

const CONTENT = {
  dashboard:   <DashboardContent/>,
  carga:       <CargaTucuman/>,
  recaudacion: <Recaudacion/>,
  reportes:    <Reportes/>,
  declaracion: <Declaracion/>,
  vidriera:    <Vidriera/>,

  subagencias: <Subagencias/>,
  ventas:      <Ventas/>,
  insumos:     <Insumos/>,
  auditoria:   <Auditoria/>,
};

export default function Dash() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-60 bg-[#0f172a] text-slate-300 flex flex-col shrink-0 shadow-2xl z-10">
        <div className="p-5 border-b border-slate-800/50 mb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Icons.LayoutDashboard size={14} className="text-white"/>
            </div>
            <div>
              <h1 className="text-[10px] font-black italic tracking-tighter text-white uppercase leading-tight">
                Gestión Loterías<br/><span className="text-blue-400">Concesión N° 26</span>
              </h1>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto py-2">
          {NAV.map(item => {
            const Ico = Icons[item.icon];
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={()=>setActive(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${isActive?'bg-blue-600 text-white shadow-lg shadow-blue-900/30':'hover:bg-slate-800 hover:text-white'}`}>
                <Ico size={14} className="shrink-0"/>
                <span className="text-[10px] font-black uppercase tracking-widest flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${isActive?'bg-white/20 text-white':'bg-blue-600 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-[10px] font-black text-white">ML</div>
            <div>
              <div className="text-[10px] font-black text-white">MARTIN LOPEZ B.</div>
              <div className="text-[9px] text-slate-500">Administrador</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-7 shrink-0">
          <div className="text-left">
            <div className="font-black text-slate-800 uppercase text-sm tracking-tighter">
              {NAV.find(n=>n.id===active)?.label}
            </div>
            <div className="text-[10px] text-slate-400">
              {new Date().toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-all">
              <Icons.Bell size={16} className="text-slate-500"/>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"/>
            </button>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"/>
              <span className="text-[10px] font-black text-green-700">Online</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {CONTENT[active]}
          </div>
        </main>
      </div>
    </div>
  );
}
