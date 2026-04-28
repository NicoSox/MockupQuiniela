import React from 'react';

export default function Comunicacion() {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-4">Comunicación Interna</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <h4 className="text-xs font-black text-blue-700 mb-2">Mensajes recientes</h4>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Admin → Sub 004</span><span className="text-xs text-slate-400">10:10</span></li>
            <li className="flex justify-between"><span>Sub 012 → Admin</span><span className="text-xs text-slate-400">09:55</span></li>
          </ul>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <h4 className="text-xs font-black text-blue-700 mb-2">Historial</h4>
          <ul className="space-y-2">
            <li>Mensaje de prueba 1</li>
            <li>Mensaje de prueba 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
