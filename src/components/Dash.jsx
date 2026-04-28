import React, { useState } from 'react';
import * as Icons from 'lucide-react';
// IMPORTAMOS LOS COMPONENTES DE LAS PÁGINAS
import DashboardContent from './DashboardContent.jsx'; // Asumiendo que moviste el gráfico aquí
import Subagencias from './Subagencias.jsx';
import CargaTucuman from './CargaTucuman.jsx';


import Ventas from './Ventas.jsx';
import Reportes from './Reportes.jsx';
import Auditoria from './Auditoria.jsx';
import Comunicacion from './Comunicacion.jsx';
import Insumos from './Insumos.jsx';
import Sorteos from './Sorteos.jsx';
import Declaracion from './Declaracion.jsx';

export default function Dash() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'ventas': return <Ventas />;
      case 'subagencias': return <Subagencias />;
      case 'reportes': return <Reportes />;
      case 'auditoria': return <Auditoria />;
      case 'insumos': return <Insumos />;
      case 'sorteos': return <Sorteos />;
      case 'declaracion': return <Declaracion />;
      case 'carga': return <CargaTucuman />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f172a] text-slate-300 flex flex-col shrink-0 shadow-2xl z-10">
        <div className="p-8 border-b border-slate-800/50 mb-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icons.LayoutDashboard size={18} className="text-white" />
            </div>
            <h1 className="text-sm font-black italic tracking-tighter text-white leading-tight uppercase">
              Sistema Gestión<br/><span className="text-blue-500">Loterías</span>
            </h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
            { id: 'ventas', label: 'Ventas', icon: 'BarChart2' },
            { id: 'subagencias', label: 'Subagencias', icon: 'Users' },
            { id: 'reportes', label: 'Reportes', icon: 'FileBarChart2' },
            { id: 'auditoria', label: 'Auditoría', icon: 'ShieldCheck' },
            { id: 'insumos', label: 'Insumos', icon: 'Package' },
            { id: 'sorteos', label: 'Sorteos', icon: 'Gift' },
            { id: 'declaracion', label: 'Declaración', icon: 'FileText' },
            { id: 'carga', label: 'Carga Tucumán', icon: 'ClipboardList' },
          ].map((item) => {
            const IconComp = Icons[item.icon];
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                  activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComp size={18} />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
          <div className="text-left font-black text-slate-800 uppercase text-lg tracking-tighter">
            {activeTab}
          </div>
          {/* Estado online propio siempre visible */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs font-black text-green-700">Online</span>
            <span className="text-xs text-slate-500 ml-2">(admin)</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}