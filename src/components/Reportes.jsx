import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line, Legend, PieChart, Pie } from 'recharts';
import * as Icons from 'lucide-react';

// Simulación de datos agregados para 7 años
const currentYear = 2026;
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

// Datos mensuales para años 2020 (más de 6 años atrás)
const historicoMensual2020 = [
  { mes: 'Ene', ventas: 600000, premios: 220000 },
  { mes: 'Feb', ventas: 650000, premios: 230000 },
  { mes: 'Mar', ventas: 700000, premios: 250000 },
  { mes: 'Abr', ventas: 750000, premios: 270000 },
  { mes: 'May', ventas: 800000, premios: 290000 },
  { mes: 'Jun', ventas: 850000, premios: 310000 },
  { mes: 'Jul', ventas: 900000, premios: 330000 },
  { mes: 'Ago', ventas: 950000, premios: 350000 },
  { mes: 'Sep', ventas: 1000000, premios: 370000 },
  { mes: 'Oct', ventas: 1050000, premios: 390000 },
  { mes: 'Nov', ventas: 1100000, premios: 410000 },
  { mes: 'Dic', ventas: 1150000, premios: 430000 },
];

// Datos semanales para años 2021-2026 (mockup: 52 semanas para año actual, 12 para otros)
const historicoSemanal = year => {
  const semanas = year === currentYear ? 52 : 12;
  return Array.from({length: semanas}, (_, i) => ({
    semana: String(i+1),
    ventas: 200000 + i*10000,
    premios: 70000 + i*3000
  }));
};

// Datos diarios para año actual (2026)
const historicoDiario = [
  { fecha: '01/04', ventas: 90000, premios: 35000 },
  { fecha: '02/04', ventas: 95000, premios: 37000 },
  { fecha: '03/04', ventas: 100000, premios: 39000 },
  { fecha: '04/04', ventas: 120000, premios: 41000 },
  { fecha: '05/04', ventas: 130000, premios: 95000 },
  { fecha: '06/04', ventas: 110000, premios: 35000 },
  { fecha: '07/04', ventas: 135000, premios: 42000 },
  { fecha: '08/04', ventas: 128000, premios: 40000 },
  { fecha: '09/04', ventas: 145000, premios: 45000 },
];

const historicoMensual = [
  { mes: 'Ene', ventas: 800000, premios: 320000 },
  { mes: 'Feb', ventas: 750000, premios: 310000 },
  { mes: 'Mar', ventas: 900000, premios: 350000 },
  { mes: 'Abr', ventas: 950000, premios: 370000 },
  { mes: 'May', ventas: 1000000, premios: 390000 },
  { mes: 'Jun', ventas: 1100000, premios: 410000 },
  { mes: 'Jul', ventas: 1200000, premios: 430000 },
  { mes: 'Ago', ventas: 1150000, premios: 420000 },
  { mes: 'Sep', ventas: 1250000, premios: 440000 },
  { mes: 'Oct', ventas: 1300000, premios: 450000 },
  { mes: 'Nov', ventas: 1350000, premios: 470000 },
  { mes: 'Dic', ventas: 1400000, premios: 480000 },
];

const subagencias = [
  { nombre: 'Barrio Norte', ganancia: 50000 },
  { nombre: 'Yerba Buena', ganancia: 42000 },
  { nombre: 'Plaza Indep.', ganancia: 39000 },
  { nombre: 'Banda Río Salí', ganancia: 31000 },
];

const distribucion = [
  { name: 'Ventas', value: 833000, color: '#2563eb' },
  { name: 'Premios', value: 358000, color: '#fbbf24' },
];


export default function Reportes() {
  // Selector de año y nivel de agregación
  const [anio, setAnio] = useState(currentYear);
  const [nivel, setNivel] = useState('diario');
  // Filtros flexibles
  const [rangoDias, setRangoDias] = useState(['01/04', '09/04']);
  const [rangoSemanas, setRangoSemanas] = useState(['1', '12']);
  const [rangoMeses, setRangoMeses] = useState(['Ene', 'Dic']);

  // Opciones para filtros (declaradas antes de usarse)
  const diasDisponibles = historicoDiario.map(d=>d.fecha);
  const semanasDisponibles = historicoSemanal(anio).map(d=>d.semana);
  const mesesDisponibles = historicoMensual2020.map(d=>d.mes);

  // Determinar niveles permitidos según año
  let nivelesDisponibles = [];
  if (anio === currentYear) nivelesDisponibles = ['diario', 'semanal', 'mensual'];
  else if (anio >= currentYear - 5) nivelesDisponibles = ['semanal', 'mensual'];
  else nivelesDisponibles = ['mensual'];

  // Si el nivel seleccionado no está disponible, ajustarlo
  React.useEffect(() => {
    if (!nivelesDisponibles.includes(nivel)) setNivel(nivelesDisponibles[0]);
    // eslint-disable-next-line
  }, [anio]);

  // Datos para el año y nivel seleccionado
  let datos = [];
  if (nivel === 'diario') datos = historicoDiario.filter(d => d.fecha >= rangoDias[0] && d.fecha <= rangoDias[1]);
  if (nivel === 'semanal') {
    const desde = parseInt(rangoSemanas[0], 10);
    const hasta = parseInt(rangoSemanas[1], 10);
    datos = historicoSemanal(anio).filter(d => {
      const n = parseInt(d.semana, 10);
      return n >= desde && n <= hasta;
    });
  }
  if (nivel === 'mensual') {
    const mesesIdx = mesesDisponibles.map((m, i) => ({m, i}));
    const idxDesde = mesesIdx.find(x=>x.m===rangoMeses[0])?.i ?? 0;
    const idxHasta = mesesIdx.find(x=>x.m===rangoMeses[1])?.i ?? (mesesDisponibles.length-1);
    datos = historicoMensual2020.filter((d, i) => i >= idxDesde && i <= idxHasta);
  }

  // Cálculos para insights
  const diasAtipicos = nivel === 'diario' ? datos.filter(d => d.premios/d.ventas > 0.7) : [];
  const mejor = datos.reduce((a,b)=>a.ventas-a.premios > b.ventas-b.premios?a:b);
  const peor = datos.reduce((a,b)=>a.ventas-a.premios < b.ventas-b.premios?a:b);
  const promedioVentas = Math.round(datos.reduce((acc, d) => acc + d.ventas, 0) / datos.length);
  const promedioPremios = Math.round(datos.reduce((acc, d) => acc + d.premios, 0) / datos.length);
  const maxVentas = Math.max(...datos.map(d=>d.ventas));
  const minVentas = Math.min(...datos.map(d=>d.ventas));

  // Ejes y labels según nivel
  const xKey = nivel === 'diario' ? 'fecha' : nivel === 'semanal' ? 'semana' : 'mes';
  const xLabel = nivel === 'diario' ? 'Día' : nivel === 'semanal' ? 'Semana' : 'Mes';

  // Handlers para filtros
  const handleRangoDias = (idx, val) => {
    const nuevo = [...rangoDias];
    nuevo[idx] = val;
    setRangoDias(nuevo);
  };
  const handleRangoSemanas = (idx, val) => {
    const nuevo = [...rangoSemanas];
    nuevo[idx] = val;
    setRangoSemanas(nuevo);
  };
  const handleRangoMeses = (idx, val) => {
    const nuevo = [...rangoMeses];
    nuevo[idx] = val;
    setRangoMeses(nuevo);
  };

  return (
    <div className="space-y-10">
      <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-4 flex items-center gap-2"><Icons.FileBarChart2 className="text-blue-600"/> Reportes Históricos</h2>

      {/* Selector de año, nivel y filtros flexibles */}
      <section className="flex flex-wrap gap-4 items-center mb-2">
        <div className="flex items-center gap-2">
          <Icons.CalendarRange size={16} className="text-blue-600"/>
          <span className="text-xs font-black text-slate-700">Año:</span>
        </div>
        <select value={anio} onChange={e=>setAnio(Number(e.target.value))} className="border border-slate-200 rounded-lg px-3 py-1 text-xs">
          {years.map(y=>(<option key={y} value={y}>{y}</option>))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-700">Nivel:</span>
          <select value={nivel} onChange={e=>setNivel(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1 text-xs">
            {nivelesDisponibles.map(n=>(<option key={n} value={n}>{n.charAt(0).toUpperCase()+n.slice(1)}</option>))}
          </select>
        </div>
        {/* Filtros flexibles */}
        {nivel === 'diario' && (
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-slate-700">Desde:</span>
            <select value={rangoDias[0]} onChange={e=>handleRangoDias(0, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {diasDisponibles.map(d=>(<option key={d} value={d}>{d}</option>))}
            </select>
            <span className="text-xs font-black text-slate-700">Hasta:</span>
            <select value={rangoDias[1]} onChange={e=>handleRangoDias(1, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {diasDisponibles.map(d=>(<option key={d} value={d}>{d}</option>))}
            </select>
          </div>
        )}
        {nivel === 'semanal' && (
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-slate-700">Semana desde:</span>
            <select value={rangoSemanas[0]} onChange={e=>handleRangoSemanas(0, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {semanasDisponibles.map(s=>(<option key={s} value={s}>{s}</option>))}
            </select>
            <span className="text-xs font-black text-slate-700">hasta</span>
            <select value={rangoSemanas[1]} onChange={e=>handleRangoSemanas(1, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {semanasDisponibles.map(s=>(<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        )}
        {nivel === 'mensual' && (
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-slate-700">Mes desde:</span>
            <select value={rangoMeses[0]} onChange={e=>handleRangoMeses(0, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {mesesDisponibles.map(m=>(<option key={m} value={m}>{m}</option>))}
            </select>
            <span className="text-xs font-black text-slate-700">hasta</span>
            <select value={rangoMeses[1]} onChange={e=>handleRangoMeses(1, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
              {mesesDisponibles.map(m=>(<option key={m} value={m}>{m}</option>))}
            </select>
          </div>
        )}
        <span className="text-xs text-slate-400">({nivel === 'diario' ? 'Detalle diario' : nivel === 'semanal' ? 'Solo semanal' : 'Solo mensual'})</span>
      </section>

      {/* Gráfico principal según nivel */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.LineChart size={16}/> Evolución {xLabel.toLowerCase()}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={datos} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xKey} tick={{fontWeight:'bold',fontSize:12}} />
            <YAxis tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#2563eb" strokeWidth={3} name="Ventas" />
            <Line type="monotone" dataKey="premios" stroke="#fbbf24" strokeWidth={3} name="Premios" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-2 text-xs">
          <span>Promedio ventas: <b className="text-blue-700">${promedioVentas.toLocaleString()}</b></span>
          <span>Promedio premios: <b className="text-yellow-600">${promedioPremios.toLocaleString()}</b></span>
          <span>Máx ventas: <b className="text-green-700">${maxVentas.toLocaleString()}</b></span>
          <span>Mín ventas: <b className="text-red-700">${minVentas.toLocaleString()}</b></span>
        </div>
      </section>

      {/* Insights y días atípicos (solo año actual y nivel diario) */}
      {nivel === 'diario' && anio === currentYear && (
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.AlertTriangle size={16}/> Días atípicos</h3>
            {diasAtipicos.length === 0 ? (
              <span className="text-xs text-green-600 font-black">No se detectaron días atípicos</span>
            ) : (
              <ul className="text-xs space-y-1">
                {diasAtipicos.map((d,i)=>(
                  <li key={i} className="text-orange-600 font-black">{d.fecha}: Premios altos (${d.premios.toLocaleString()})</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.Star size={16}/> Insights</h3>
            <ul className="text-xs space-y-1">
              <li><b className="text-blue-700">Mejor día:</b> {mejor.fecha || '-'} (Ganancia: <b>${(mejor.ventas-mejor.premios).toLocaleString()}</b>)</li>
              <li><b className="text-blue-700">Peor día:</b> {peor.fecha || '-'} (Ganancia: <b>${(peor.ventas-peor.premios).toLocaleString()}</b>)</li>
            </ul>
          </div>
        </section>
      )}

      {/* Insights semanales/mensuales para años anteriores o nivel semanal/mensual */}
      {(nivel !== 'diario' || anio !== currentYear) && (
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xs font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><Icons.Star size={16}/> Insights</h3>
            <ul className="text-xs space-y-1">
              <li><b className="text-blue-700">Mejor {xLabel.toLowerCase()}:</b> {mejor[xKey] || '-'} (Ganancia: <b>${(mejor.ventas-mejor.premios).toLocaleString()}</b>)</li>
              <li><b className="text-blue-700">Peor {xLabel.toLowerCase()}:</b> {peor[xKey] || '-'} (Ganancia: <b>${(peor.ventas-peor.premios).toLocaleString()}</b>)</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
