import React, { useState } from 'react';
import * as Icons from 'lucide-react';


const SUBS = [
  { id: 'agencia', nombre: 'AGENCIA 026 (Principal)' },
  { id: '101', nombre: 'Subagencia 101 - GARCIA JUAN' },
  { id: '102', nombre: 'Subagencia 102 - PEREZ ANA' },
  { id: '103', nombre: 'Subagencia 103 - LOPEZ MARIO' },
  { id: '104', nombre: 'Subagencia 104 - AGENCIA 026' },
];

const SORTEOS = [
  {numero: 101, nombre: 'MATUTINA'},
  {numero: 102, nombre: 'VESPERTINA'},
  {numero: 103, nombre: 'SIESTA'},
  {numero: 104, nombre: 'TARDE'},
  {numero: 105, nombre: 'NOCTURNA'},
];

function CargaTucuman() {
  const [subagencia, setSubagencia] = useState('agencia');
  const [datos, setDatos] = useState(() => {
    // Un objeto por subagencia, cada uno con los sorteos y campos
    const base = {};
    SUBS.forEach(s => {
      base[s.id] = SORTEOS.map(sorteo => ({
        ...sorteo,
        apuestas: '',
        tickets: '',
        ventas: '',
        premios: ''
      }));
    });
    return base;
  });

  const handleInput = (field, idx, value) => {
    setDatos(prev => {
      const nuevo = { ...prev };
      nuevo[subagencia] = nuevo[subagencia].map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      );
      return nuevo;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-left">
      {/* Cabecera de la Terminal */}
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Terminal de Carga de Sorteos</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronizado con Lotería de Tucumán</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase">Sistema en Línea</span>
        </div>
      </div>

      {/* Selector de Subagencia */}
      <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <label className="font-black text-xs text-slate-700 uppercase tracking-widest mr-2">Subagencia:</label>
        <select
          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          value={subagencia}
          onChange={e => setSubagencia(e.target.value)}
        >
          {SUBS.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tabla de Datos */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
            <tr>
              <th className="p-6">N° Sorteo</th>
              <th className="p-6">Sorteo</th>
              <th className="p-6 text-right">Cantidad Apuestas</th>
              <th className="p-6 text-right">Tickets Vendidos</th>
              <th className="p-6 text-right">$ Importe Neto (Ventas)</th>
              <th className="p-6 text-right">$ Premios Pagados</th>
              <th className="p-6 text-center">Validación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {datos[subagencia].map((row, idx) => (
              <tr key={row.numero} className="hover:bg-blue-50/30 transition-all group">
                <td className="p-6 font-mono font-bold text-blue-700">{row.numero}</td>
                <td className="p-6">
                  <span className="font-black text-slate-700 text-sm">{row.nombre}</span>
                </td>
                <td className="p-6 text-right">
                  <input
                    type="number"
                    className="w-20 bg-slate-50 border border-slate-200 rounded-lg p-2 text-right font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0"
                    value={row.apuestas}
                    onChange={e => handleInput('apuestas', idx, e.target.value)}
                  />
                </td>
                <td className="p-6 text-right">
                  <input
                    type="number"
                    className="w-20 bg-slate-50 border border-slate-200 rounded-lg p-2 text-right font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0"
                    value={row.tickets}
                    onChange={e => handleInput('tickets', idx, e.target.value)}
                  />
                </td>
                <td className="p-6 text-right">
                  <input
                    type="text"
                    className="w-24 bg-green-50/50 border border-green-100 rounded-lg p-2 text-right font-mono font-bold text-green-700 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    placeholder="0.00"
                    value={row.ventas}
                    onChange={e => handleInput('ventas', idx, e.target.value)}
                  />
                </td>
                <td className="p-6 text-right">
                  <input
                    type="text"
                    className="w-24 bg-slate-50 border border-slate-200 rounded-lg p-2 text-right font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                    value={row.premios}
                    onChange={e => handleInput('premios', idx, e.target.value)}
                  />
                </td>
                <td className="p-6 text-center">
                  <button className="text-slate-300 group-hover:text-blue-500 transition-colors">
                    <Icons.FileCheck size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de Acciones */}
      <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        <div className="text-left">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Última Modificación</p>
          <p className="text-xs font-bold text-slate-600">Hoy, 10:15 AM por Admin_026</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-600 font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all">
            Cancelar
          </button>
          <button className="bg-blue-600 text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            Confirmar Carga Diaria
          </button>
        </div>
      </div>
    </div>
  );
}

export default CargaTucuman;