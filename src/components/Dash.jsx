import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import DashboardContent from './DashboardContent.jsx';
import Subagencias from './Subagencias.jsx';
import CargaTucuman from './CargaTucuman.jsx';
import Ventas from './Ventas.jsx';
import Reportes from './Reportes.jsx';
import Auditoria from './Auditoria.jsx';
import Comunicacion from './Comunicacion.jsx';
import Insumos from './Insumos.jsx';
import Declaracion from './Declaracion.jsx';
import Recaudacion from './Recaudacion.jsx';
import PantallaSecundaria from './PantallaSecundaria.jsx';

const NAV = [
  { id: 'dashboard',   label: 'Dashboard',       icon: 'LayoutDashboard' },
  { id: 'recaudacion', label: 'Recaudación',      icon: 'Calculator',      badge: 'NUEVO' },
  { id: 'ventas',      label: 'Ventas',           icon: 'BarChart2' },
  { id: 'subagencias', label: 'Subagencias',      icon: 'Users' },
  { id: 'pantalla',    label: 'Pantalla Cliente', icon: 'Monitor',         badge: 'NUEVO' },
  { id: 'declaracion', label: 'Declaración',      icon: 'FileText' },
  { id: 'carga',       label: 'Carga Tucumán',    icon: 'ClipboardList' },
  { id: 'reportes',    label: 'Reportes',         icon: 'FileBarChart2' },
  { id: 'insumos',     label: 'Insumos',          icon: 'Package' },
  { id: 'auditoria',   label: 'Auditoría',        icon: 'ShieldCheck' },
  { id: 'comunicacion',label: 'Comunicación',     icon: 'MessageSquare' },
];

const LABELS = {
  dashboard: 'Dashboard',
  recaudacion: 'Recaudación Diaria',
  ventas: 'Ventas',
  subagencias: 'Subagencias',
  sorteos: 'Sorteos',
  pantalla: 'Pantalla Cliente',
  declaracion: 'Declaración Jurada',
  carga: 'Carga Tucumán',
  reportes: 'Reportes',
  insumos: 'Insumos',
  auditoria: 'Auditoría',
  comunicacion: 'Comunicación',
};

export default function Dash() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':    return <DashboardContent />;
      case 'recaudacion':  return <Recaudacion />;
      case 'ventas':       return <Ventas />;
      case 'subagencias':  return <Subagencias />;
      case 'sorteos':      return <Sorteos />;
      case 'pantalla':     return <PantallaSecundaria />;
      case 'declaracion':  return <Declaracion />;
      case 'carga':        return <CargaTucuman />;
      case 'reportes':     return <Reportes />;
      case 'insumos':      return <Insumos />;
      case 'auditoria':    return <Auditoria />;
      case 'comunicacion': return <Comunicacion />;
      default:             return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col shrink-0 shadow-2xl z-10">
        <div className="p-6 border-b border-slate-800/50 mb-2 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Icons.LayoutDashboard size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-xs font-black italic tracking-tighter text-white uppercase leading-tight">
                Sistema Gestión<br/><span className="text-blue-400">Loterías</span>
              </h1>
              <p className="text-[9px] text-slate-500 mt-0.5">Concesión N° 26</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto py-2">
          {NAV.map((item) => {
            const IconComp = Icons[item.icon];
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComp size={16} className="shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs font-black text-white">ML</div>
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="text-left">
            <div className="font-black text-slate-800 uppercase text-base tracking-tighter">
              {LABELS[activeTab]}
            </div>
            <div className="text-xs text-slate-400">
              {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-all">
              <Icons.Bell size={18} className="text-slate-500"/>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
              <span className="text-xs font-black text-green-700">Online</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
