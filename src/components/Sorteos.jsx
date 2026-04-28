// Extractos de premios por día/sorteo
// Extractos de los 5 sorteos del día actual (ejemplo)
const FECHA_HOY = '2026-04-27';
const extractosEjemplo = [
  {
    fecha: FECHA_HOY,
    sorteo: 'Matutina',
    sorteoNro: 4686,
    hora: '11:30',
    premios: [1234, 5678, 9101, 1121, 3141, 5161, 7181, 9202, 1222, 3242, 5262, 7282, 9303, 1323, 3343, 5363, 7383, 9404, 1424, 3444]
  },
  {
    fecha: FECHA_HOY,
    sorteo: 'Vespertina',
    sorteoNro: 9448,
    hora: '14:00',
    premios: [2345, 6789, 1011, 2122, 3141, 4151, 5161, 6171, 7181, 8191, 9202, 1022, 1222, 1323, 1424, 1525, 1626, 1727, 1828, 1929]
  },
  {
    fecha: FECHA_HOY,
    sorteo: 'Siesta',
    sorteoNro: 1381,
    hora: '16:00',
    premios: [3456, 7890, 1121, 2232, 3343, 4454, 5565, 6676, 7787, 8898, 9909, 1010, 1111, 1212, 1313, 1414, 1515, 1616, 1717, 1818]
  },
  {
    fecha: FECHA_HOY,
    sorteo: 'Tarde',
    sorteoNro: 5391,
    hora: '18:00',
    premios: [4567, 8901, 1232, 2343, 3454, 4565, 5676, 6787, 7898, 8909, 9010, 1011, 1112, 1213, 1314, 1415, 1516, 1617, 1718, 1819]
  },
  {
    fecha: FECHA_HOY,
    sorteo: 'Nocturno',
    sorteoNro: 18218,
    hora: '22:00',
    premios: [4457, 9707, 2870, 1347, 4951, 9435, 5993, 3496, 4687, 8305, 5347, 3096, 4946, 2160, 9459, 5898, 1817, 772, 2115, 8425]
  }
];
import React, { useState } from 'react';
import { Star, TrendingUp, Edit2, Monitor, X, CheckCircle } from 'lucide-react';

// Datos reales/relevantes de la Lotería de Tucumán (ejemplo)
const inicialSorteos = [
  { numero: 101, sorteo: 'MATUTINA', ap: 120, neto: 25000, premios: 8000, ganadores: 5, numeros: [12, 34, 56, 78, 90] },
  { numero: 102, sorteo: 'VESPERTINA', ap: 110, neto: 27000, premios: 9000, ganadores: 4, numeros: [21, 43, 65, 87, 9] },
  { numero: 103, sorteo: 'SIESTA', ap: 90, neto: 18000, premios: 6000, ganadores: 3, numeros: [7, 14, 28, 35, 49] },
  { numero: 104, sorteo: 'TARDE', ap: 100, neto: 22000, premios: 7000, ganadores: 4, numeros: [3, 6, 9, 12, 15] },
  { numero: 105, sorteo: 'NOCTURNA', ap: 130, neto: 28000, premios: 9500, ganadores: 6, numeros: [5, 10, 20, 25, 50] },
];

const inicialDestacados = {
  masJugados: [13, 22, 45, 69, 70], // Ejemplo: números más jugados reales
  masSalidores: [15, 33, 21, 44, 60], // Ejemplo: números más salidores reales
  masAtrasados: [7, 88, 123, 999, 1002], // Ejemplo: números más atrasados reales
};

export default function Sorteos() {
  const [extractos, setExtractos] = useState(extractosEjemplo);
  const [extractoIdx, setExtractoIdx] = useState(0);
  const [editandoExtracto, setEditandoExtracto] = useState(false);
  const [premiosEdit, setPremiosEdit] = useState([]);
  const [sorteos, setSorteos] = useState(inicialSorteos);
  const [destacados, setDestacados] = useState(inicialDestacados);
  const [modal, setModal] = useState(null); // { tipo: 'sorteo'|'jugados'|'salidores', idx }
  const [inputNums, setInputNums] = useState('');

  // Abrir modal para editar números ganadores
  const abrirEditarSorteo = (idx) => {
    setInputNums(sorteos[idx].numeros.join(', '));
    setModal({ tipo: 'sorteo', idx });
  };
  // Abrir modal para editar destacados
  const abrirEditarDestacados = (tipo) => {
    setInputNums(destacados[tipo].join(', '));
    setModal({ tipo });
  };
  // Guardar cambios
  const guardar = () => {
    const nums = inputNums.split(',').map(n=>parseInt(n.trim(),10)).filter(n=>!isNaN(n));
    if (modal.tipo === 'sorteo') {
      setSorteos(sorteos.map((s,i)=>i===modal.idx?{...s, numeros: nums}:s));
    } else {
      setDestacados({ ...destacados, [modal.tipo]: nums });
    }
    setModal(null);
    setInputNums('');
  };

  // Botón para "transmitir" a pantalla secundaria (simulado)
  const transmitirPantalla = () => {
    alert('Transmisión a pantalla secundaria iniciada. (Simulación)');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-4">Gestión de Sorteos</h2>

      {/* Cartel de números destacados (publicidad) */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 flex items-center gap-4 shadow relative">
          <Star size={28} className="text-yellow-500" />
          <div>
            <div className="text-xs text-yellow-700 font-black uppercase mb-1 flex items-center gap-2">
              Números más jugados
              <button onClick={()=>abrirEditarDestacados('masJugados')} className="ml-1 text-yellow-600 hover:text-yellow-800"><Edit2 size={14}/></button>
            </div>
            <div className="flex gap-2 text-lg font-black text-yellow-700 tracking-widest">
              {destacados.masJugados.map((n,i)=>(
                <span key={i} className="bg-yellow-200 px-2 py-1 rounded-lg shadow-inner">{n.toString().padStart(4, '0')}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 flex items-center gap-4 shadow relative">
          <TrendingUp size={28} className="text-blue-500" />
          <div>
            <div className="text-xs text-blue-700 font-black uppercase mb-1 flex items-center gap-2">
              Números más salidores
              <button onClick={()=>abrirEditarDestacados('masSalidores')} className="ml-1 text-blue-600 hover:text-blue-800"><Edit2 size={14}/></button>
            </div>
            <div className="flex gap-2 text-lg font-black text-blue-700 tracking-widest">
              {destacados.masSalidores.map((n,i)=>(
                <span key={i} className="bg-blue-200 px-2 py-1 rounded-lg shadow-inner">{n.toString().padStart(4, '0')}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-red-50 border-l-4 border-red-400 rounded-lg p-4 flex items-center gap-4 shadow relative">
          <CheckCircle size={28} className="text-red-500" />
          <div>
            <div className="text-xs text-red-700 font-black uppercase mb-1 flex items-center gap-2">
              Números más atrasados
              <button onClick={()=>abrirEditarDestacados('masAtrasados')} className="ml-1 text-red-600 hover:text-red-800"><Edit2 size={14}/></button>
            </div>
            <div className="flex gap-2 text-lg font-black text-red-700 tracking-widest">
              {destacados.masAtrasados.map((n,i)=>(
                <span key={i} className="bg-red-200 px-2 py-1 rounded-lg shadow-inner">{n.toString().padStart(4, '0')}</span>
              ))}
            </div>
          </div>
        </div>
        <button onClick={transmitirPantalla} className="absolute right-0 top-0 mt-2 mr-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow"><Monitor size={14}/> Transmitir pantalla</button>
      </div>


      {/* Extracto de premios editable y seleccionable */}
      <section className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200 shadow-lg mb-6 max-w-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-2">
          <div className="font-black text-slate-800 text-lg flex items-center gap-2">
            <span>Extracto Sorteo N° <span className="text-blue-700">{extractos[extractoIdx].sorteoNro.toLocaleString()}</span> — {extractos[extractoIdx].sorteo}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="text-xs text-slate-500">{new Date(extractos[extractoIdx].fecha).toLocaleDateString()} - {extractos[extractoIdx].hora} hs</span>
            <select
              className="ml-2 border rounded px-2 py-1 text-xs"
              value={extractoIdx}
              onChange={e=>setExtractoIdx(Number(e.target.value))}
            >
              {extractos
                .map((ex, i) => ({...ex, idx: i}))
                .filter(ex => ex.fecha === FECHA_HOY)
                .map((ex, i) => (
                  <option key={ex.idx} value={ex.idx}>
                    {ex.sorteo} #{ex.sorteoNro} - {new Date(ex.fecha).toLocaleDateString()}
                  </option>
                ))}
            </select>
            <button
              className="ml-2 px-2 py-1 rounded bg-blue-600 text-white text-xs font-black hover:bg-blue-700"
              onClick={()=>{
                setEditandoExtracto(true);
                setPremiosEdit([...extractos[extractoIdx].premios]);
              }}
            >Editar</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-white rounded-xl p-4 border border-blue-100 shadow-inner">
          {/* 10 filas, 2 columnas */}
          <div>
            {[...Array(10)].map((_,i) => (
              <div key={i} className="flex items-center gap-2 border-b border-slate-100 py-1">
                <span className="w-6 text-xs font-black text-slate-500">{i+1}°</span>
                <span className="font-mono text-lg font-black text-blue-700">{extractos[extractoIdx].premios[i].toString().padStart(4,'0')}</span>
              </div>
            ))}
          </div>
          <div>
            {[...Array(10)].map((_,i) => (
              <div key={i+10} className="flex items-center gap-2 border-b border-slate-100 py-1">
                <span className="w-6 text-xs font-black text-slate-500">{i+11}°</span>
                <span className="font-mono text-lg font-black text-blue-700">{extractos[extractoIdx].premios[i+10].toString().padStart(4,'0')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal edición extracto */}
        {editandoExtracto && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full">
              <div className="font-black text-blue-700 mb-2">Editar premios del extracto</div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(20)].map((_,i)=>(
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 text-xs font-black text-slate-500">{i+1}°</span>
                    <input
                      className="border rounded px-2 py-1 w-20 font-mono text-blue-700 text-lg"
                      maxLength={4}
                      value={premiosEdit[i]?.toString().padStart(4,'0')}
                      onChange={e=>{
                        const val = e.target.value.replace(/\D/g,'').slice(0,4);
                        const arr = [...premiosEdit];
                        arr[i] = val ? parseInt(val,10) : 0;
                        setPremiosEdit(arr);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-1 rounded bg-slate-200 text-slate-700 font-black" onClick={()=>setEditandoExtracto(false)}>Cancelar</button>
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white font-black hover:bg-blue-700"
                  onClick={()=>{
                    const nuevos = [...extractos];
                    nuevos[extractoIdx].premios = premiosEdit.map(n=>isNaN(n)?0:n);
                    setExtractos(nuevos);
                    setEditandoExtracto(false);
                  }}
                >Guardar</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tabla de sorteos con números ganadores y edición en caliente */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs text-slate-700">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-2">N° Sorteo</th>
              <th className="p-2">Sorteo</th>
              <th className="p-2">Apuestas</th>
              <th className="p-2">Importe Neto</th>
              <th className="p-2">Premios Pagados</th>
              <th className="p-2">Tickets Ganadores</th>
              <th className="p-2">Números Ganadores</th>
              <th className="p-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {sorteos.map((s, i) => (
              <tr key={i} className="even:bg-slate-50">
                <td className="p-2 font-mono font-bold text-blue-700">{s.numero}</td>
                <td className="p-2">{s.sorteo}</td>
                <td className="p-2 text-right">{s.ap}</td>
                <td className="p-2 text-right">${s.neto.toLocaleString()}</td>
                <td className="p-2 text-right">${s.premios.toLocaleString()}</td>
                <td className="p-2 text-right">{s.ganadores}</td>
                <td className="p-2 text-center">
                  <span className="flex gap-1 justify-center">
                    {s.numeros.map((n,ni)=>(
                      <span key={ni} className="bg-slate-200 px-2 py-0.5 rounded text-xs font-black text-blue-700">
                        {n.toString().padStart(4, '0')}
                      </span>
                    ))}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <button onClick={()=>abrirEditarSorteo(i)} className="text-blue-600 hover:text-blue-800"><Edit2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-black shadow hover:bg-blue-700">Navegar Sorteos</button>
        <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-black shadow">Automatizar Avance</button>
      </div>

      {/* Modal de edición */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xs relative">
            <button onClick={()=>setModal(null)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"><X size={18}/></button>
            <div className="mb-4 font-black text-slate-800 text-lg flex items-center gap-2">
              <Edit2 size={18}/>
              {modal.tipo==='sorteo' ? `Editar números ganadores (${sorteos[modal.idx].sorteo})` : modal.tipo==='masJugados' ? 'Editar más jugados' : 'Editar más salidores'}
            </div>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-4 text-lg tracking-widest text-center"
              value={inputNums}
              onChange={e=>setInputNums(e.target.value)}
              placeholder="Ej: 12, 34, 56, 78, 90"
              autoFocus
            />
            <button onClick={guardar} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-black flex items-center justify-center gap-2">
              <CheckCircle size={18}/> Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
