import React, { useState } from 'react';
import { PackagePlus, AlertTriangle, CheckCircle, PlusCircle } from 'lucide-react';

const inicial = [
  { sub: '004', stock: 10, consumo: 3, faltante: 0 },
  { sub: '012', stock: 8, consumo: 2, faltante: 0 },
  { sub: '014', stock: 6, consumo: 3, faltante: 1 },
  { sub: '022', stock: 8, consumo: 2, faltante: 0 },
];

export default function Insumos() {
  const [insumos, setInsumos] = useState(inicial);
  const [inputs, setInputs] = useState(Array(inicial.length).fill(''));

  // Permitir ingresar cantidad manual
  const agregarRollos = (idx) => {
    const cantidad = parseInt(inputs[idx], 10);
    if (!cantidad || cantidad < 1) return;
    const nuevos = insumos.map((i, iidx) => iidx===idx ? { ...i, stock: i.stock+cantidad, faltante: Math.max(0, i.faltante-cantidad) } : i);
    setInsumos(nuevos);
    setInputs(inputs.map((v, iidx) => iidx===idx ? '' : v));
  };

  const totalStock = insumos.reduce((a,b)=>a+b.stock,0);
  const totalFaltantes = insumos.reduce((a,b)=>a+b.faltante,0);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-4 flex items-center gap-2">
        <PackagePlus size={22} className="text-lime-600" /> Control de Insumos
      </h2>

      {/* Resumen visual */}
      <div className="flex gap-6 mb-2">
        <div className="flex items-center gap-2 bg-lime-100 px-4 py-2 rounded-lg shadow">
          <PackagePlus size={18} className="text-lime-600" />
          <span className="font-bold text-lime-700">Stock total:</span> {totalStock}
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow ${totalFaltantes>0?'bg-orange-100':'bg-green-100'}`}> 
          {totalFaltantes>0 ? <AlertTriangle size={18} className="text-orange-500" /> : <CheckCircle size={18} className="text-green-600" />}
          <span className={`font-bold ${totalFaltantes>0?'text-orange-700':'text-green-700'}`}>{totalFaltantes>0 ? `Faltantes: ${totalFaltantes}` : 'Sin faltantes'}</span>
        </div>
      </div>

      {/* Tabla editable */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700 border rounded shadow">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-2">Subagencia</th>
              <th className="p-2">Stock Rollos</th>
              <th className="p-2">Consumo Estimado</th>
              <th className="p-2">Faltantes</th>
              <th className="p-2">Agregar rollos</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((i, idx) => (
              <tr key={idx} className={`even:bg-slate-50 ${i.faltante>0?'bg-orange-50':''}`}>
                <td className="p-2 font-mono">{i.sub}</td>
                <td className="p-2 text-right font-black text-blue-700">{i.stock}</td>
                <td className="p-2 text-right">{i.consumo}</td>
                <td className={`p-2 text-right font-black ${i.faltante>0?'text-orange-500':'text-green-600'}`}>{i.faltante>0?i.faltante:'OK'}</td>
                <td className="p-2 text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <input
                      type="number"
                      min="1"
                      className="w-16 border rounded px-2 py-1 text-xs text-right"
                      value={inputs[idx]}
                      onChange={e => {
                        const val = e.target.value.replace(/^0+/, '');
                        setInputs(inputs.map((v, iidx) => iidx===idx ? val : v));
                      }}
                      placeholder="Nº"
                    />
                    <button
                      onClick={()=>agregarRollos(idx)}
                      className="flex items-center gap-1 bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full text-xs font-black shadow"
                    >
                      <PlusCircle size={14}/> Agregar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
