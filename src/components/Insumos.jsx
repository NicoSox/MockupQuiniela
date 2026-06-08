import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const DIAS_MES = 25; // días hábiles diciembre 2025

const ROLLOS = [
  { sub:'001', nombre:'ALMARAZ, Patricia B.',
    vend:[342,228,251,333,293,307,0,0,260,339,376,389,309,0,278,365,309,336,255,342,0,439,451,363,0,467,470,0,371,466,393],
    anu: [4,1,3,9,5,2,0,0,3,7,2,0,2,0,6,3,0,2,0,0,0,4,1,4,0,6,1,0,0,3,5],
    prem:[8,4,4,5,9,9,0,0,8,4,7,18,10,0,6,7,4,8,2,8,0,9,12,5,0,16,9,0,6,11,9],
    totVend:8732, totAnu:73, totPrem:198, rollos:21.86 },
  { sub:'002', nombre:'LOPEZ, Jorge José',
    vend:[774,705,807,712,751,1022,0,0,801,770,820,903,1155,0,936,982,934,1009,1093,976,0,963,1076,694,0,940,1129,0,976,1005,984],
    anu: [10,0,3,2,10,2,0,0,1,1,3,3,1,0,7,3,5,2,6,5,0,6,10,2,0,2,9,0,5,3,2],
    prem:[19,14,24,4,13,37,0,0,11,16,21,22,28,0,23,17,9,22,24,19,0,10,18,7,0,21,27,0,36,14,30],
    totVend:22917,totAnu:103,totPrem:486,rollos:57.37 },
  { sub:'003', nombre:'MOLINA, Sandra I.',
    vend:[360,324,251,307,363,386,0,0,376,385,411,474,452,0,444,396,421,473,498,403,0,426,435,334,0,354,363,0,346,356,355],
    anu: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    prem:[8,8,8,7,8,13,0,0,12,4,17,22,10,0,8,18,4,14,15,9,0,10,12,12,0,18,9,0,13,9,10],
    totVend:9693, totAnu:0,  totPrem:278,rollos:24.27 },
  { sub:'004', nombre:'LOPEZ BERTELLI, R.',
    vend:[453,261,324,297,352,473,0,0,337,356,302,495,557,0,436,331,337,390,402,448,0,383,548,416,0,510,530,0,604,568,487],
    anu: [0,2,1,0,1,5,0,0,1,0,1,3,4,0,4,1,0,0,1,2,0,1,1,1,0,2,1,0,3,3,0],
    prem:[6,6,10,5,10,9,0,0,8,6,12,30,19,0,10,5,3,19,9,8,0,9,27,16,0,20,17,0,29,9,18],
    totVend:10597,totAnu:38, totPrem:320,rollos:26.54 },
  { sub:'005', nombre:'MEDINA, Fátima C.',
    vend:[272,215,221,149,164,250,0,0,196,214,207,296,311,0,250,258,299,282,225,234,0,242,323,228,0,324,306,0,467,357,322],
    anu: [2,2,1,1,6,0,0,0,6,0,3,2,1,0,5,1,1,0,1,1,0,2,2,2,0,5,2,0,1,3,2],
    prem:[8,2,5,2,3,10,0,0,6,6,6,10,10,0,5,9,4,18,8,6,0,4,7,3,0,5,14,0,7,11,6],
    totVend:6612, totAnu:52, totPrem:175,rollos:16.56 },
  { sub:'006', nombre:'PARSONS, Mónica B.',
    vend:[523,439,399,344,351,453,0,0,422,418,410,515,607,0,589,426,478,454,449,552,0,556,585,557,0,593,590,0,503,607,706],
    anu: [9,8,6,4,5,5,0,0,3,2,8,2,8,0,7,3,1,2,4,8,0,6,5,5,0,6,5,0,6,4,1],
    prem:[20,23,22,9,17,12,0,0,10,21,19,32,34,0,24,22,14,28,19,20,0,36,36,29,0,37,14,0,21,23,36],
    totVend:12526,totAnu:123,totPrem:578,rollos:31.41 },
  { sub:'007', nombre:'LOPEZ, Rodrigo J.',
    vend:[575,437,456,401,548,718,0,0,470,463,456,507,566,0,435,454,553,532,602,572,0,519,587,590,0,615,611,0,557,580,667],
    anu: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    prem:[12,6,13,5,14,20,0,0,12,14,10,10,9,0,13,13,8,8,14,4,0,10,20,10,0,16,12,0,15,13,24],
    totVend:13471,totAnu:0,  totPrem:305,rollos:33.72 },
  { sub:'008', nombre:'ARANDA, Carlos A.',
    vend:[132,143,156,139,140,93,0,0,121,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    anu: [3,0,2,1,0,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    prem:[0,7,5,5,8,4,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    totVend:1056, totAnu:11, totPrem:32, rollos:2.65 },
  { sub:'009', nombre:'RIARTE, Virginia L.',
    vend:[253,218,319,295,250,342,0,0,271,313,260,365,326,0,315,310,315,299,388,358,0,298,351,219,0,282,334,0,322,359,286],
    anu: [4,4,1,1,2,1,0,0,3,5,1,2,1,0,2,3,1,6,2,0,0,2,4,3,0,0,0,0,1,1,0],
    prem:[8,4,11,6,8,21,0,0,3,6,3,14,10,0,8,9,5,15,13,11,0,3,10,3,0,12,7,0,13,6,13],
    totVend:7648, totAnu:50, totPrem:222,rollos:19.16 },
  { sub:'011', nombre:'PELEGRINA, Ana Rosa',
    vend:[327,213,247,246,281,280,0,0,223,206,191,213,254,0,257,241,265,209,238,263,0,240,248,218,0,294,258,0,206,221,259],
    anu: [3,1,1,0,2,3,0,0,2,0,4,2,1,0,2,0,3,1,5,2,0,1,1,2,0,1,2,0,1,2,4],
    prem:[3,6,7,2,4,20,0,0,6,7,1,14,8,0,7,10,6,1,5,3,0,4,9,6,0,12,3,0,8,4,4],
    totVend:6098, totAnu:46, totPrem:160,rollos:15.27 },
  { sub:'012', nombre:'DIAZ, Darío F.',
    vend:[405,335,363,318,356,467,0,0,414,370,358,519,567,0,521,439,351,395,393,458,0,379,520,440,0,507,508,0,528,434,423],
    anu: [3,5,2,2,4,5,0,0,5,5,3,2,0,0,10,8,1,6,5,4,0,2,6,2,0,2,1,0,4,1,2],
    prem:[10,7,15,13,15,20,0,0,11,10,10,30,8,0,26,10,1,11,11,15,0,9,21,10,0,21,23,0,19,11,13],
    totVend:10768,totAnu:90, totPrem:350,rollos:26.98 },
  { sub:'013', nombre:'DIP, Silvia M.',
    vend:[434,373,322,290,324,359,0,0,394,328,256,381,415,0,377,372,377,381,399,347,0,363,398,399,0,431,354,0,410,388,393],
    anu: [2,6,3,5,3,6,0,0,5,0,2,8,2,0,8,8,3,3,4,6,0,1,4,1,0,4,3,0,5,3,6],
    prem:[8,4,7,8,6,6,0,0,14,5,6,13,4,0,9,5,2,10,5,1,0,3,10,12,0,7,4,0,14,6,9],
    totVend:9265, totAnu:101,totPrem:178,rollos:23.20 },
  { sub:'014', nombre:'MARTINEZ, Julio C.',
    vend:[243,260,165,204,197,326,0,0,221,170,267,257,204,0,193,194,194,223,200,212,0,277,279,235,0,216,246,0,236,320,316],
    anu: [3,2,1,0,0,1,0,0,0,0,2,1,1,0,8,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0],
    prem:[7,2,5,8,7,5,0,0,2,4,4,3,5,0,4,6,2,3,6,3,0,3,5,5,0,8,6,0,5,8,7],
    totVend:5855, totAnu:24, totPrem:123,rollos:14.66 },
  { sub:'016', nombre:'PAVELKA, Julio',
    vend:[375,307,339,104,394,478,0,0,455,447,389,150,325,0,395,268,395,459,346,442,0,427,420,295,0,459,389,0,418,282,334],
    anu: [1,3,0,3,1,2,0,0,1,1,4,0,4,0,3,2,1,5,1,0,0,7,3,0,0,1,2,0,2,0,1],
    prem:[11,2,7,9,7,8,0,0,9,5,15,8,8,0,6,6,5,18,7,2,0,4,11,9,0,13,7,0,22,5,10],
    totVend:9092, totAnu:48, totPrem:214,rollos:22.77 },
  { sub:'017', nombre:'DELGADO, Estela V.',
    vend:[102,134,151,0,118,133,0,0,159,105,179,150,227,0,180,163,165,119,89,130,0,166,138,171,0,107,117,0,146,132,115],
    anu: [0,2,0,0,0,0,0,0,2,1,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
    prem:[0,4,4,3,2,9,0,0,7,3,3,8,10,0,5,4,0,4,1,2,0,3,3,5,0,5,6,0,3,3,4],
    totVend:3396, totAnu:11, totPrem:101,rollos:8.51 },
];

// Entregas hardcodeadas de ejemplo
const ENTREGAS_INIT = {
  '001': [{ id:1, fecha:'2025-12-01', cantidad:30, nota:'Inicio de mes' }, { id:2, fecha:'2025-12-15', cantidad:15, nota:'' }],
  '002': [{ id:1, fecha:'2025-12-01', cantidad:70, nota:'Inicio de mes' }],
  '003': [{ id:1, fecha:'2025-12-01', cantidad:30, nota:'' }],
  '004': [{ id:1, fecha:'2025-12-01', cantidad:30, nota:'' }],
  '005': [{ id:1, fecha:'2025-12-01', cantidad:20, nota:'' }],
  '006': [{ id:1, fecha:'2025-12-01', cantidad:40, nota:'' }],
  '007': [{ id:1, fecha:'2025-12-01', cantidad:40, nota:'' }],
  '008': [{ id:1, fecha:'2025-12-01', cantidad:5,  nota:'' }],
  '009': [{ id:1, fecha:'2025-12-01', cantidad:25, nota:'' }],
  '011': [{ id:1, fecha:'2025-12-01', cantidad:20, nota:'' }],
  '012': [{ id:1, fecha:'2025-12-01', cantidad:30, nota:'' }],
  '013': [{ id:1, fecha:'2025-12-01', cantidad:28, nota:'' }],
  '014': [{ id:1, fecha:'2025-12-01', cantidad:18, nota:'' }],
  '016': [{ id:1, fecha:'2025-12-01', cantidad:28, nota:'' }],
  '017': [{ id:1, fecha:'2025-12-01', cantidad:12, nota:'' }],
};

const ALERTA_DIAS = 3; // alerta si quedan menos de 3 días de stock

function calcStock(sub, entregas) {
  const totalEntregado = (entregas[sub.sub] || []).reduce((a, e) => a + Number(e.cantidad), 0);
  const consumido = sub.rollos;
  const stockActual = totalEntregado - consumido;
  const promDiario = sub.rollos / DIAS_MES;
  const diasRestantes = promDiario > 0 ? stockActual / promDiario : 999;
  return { totalEntregado, consumido, stockActual, promDiario, diasRestantes };
}

function estadoColor(dias) {
  if (dias <= 0)           return { bg: 'bg-red-100 border-red-300',    txt: 'text-red-700',    icon: <AlertTriangle size={14} className="text-red-600"/>,    label: 'SIN STOCK' };
  if (dias <= ALERTA_DIAS) return { bg: 'bg-orange-100 border-orange-300', txt: 'text-orange-700', icon: <AlertTriangle size={14} className="text-orange-500"/>, label: 'STOCK BAJO' };
  if (dias <= 7)           return { bg: 'bg-yellow-50 border-yellow-200',  txt: 'text-yellow-700', icon: <Clock size={14} className="text-yellow-500"/>,         label: 'ATENCION' };
  return                          { bg: 'bg-green-50 border-green-200',    txt: 'text-green-700',  icon: <CheckCircle size={14} className="text-green-500"/>,    label: 'OK' };
}

function ModalEntrega({ sub, entregas, onClose, onSave }) {
  const [nuevaCant, setNuevaCant] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState(new Date().toISOString().split('T')[0]);
  const lista = entregas[sub.sub] || [];

  const agregar = () => {
    if (!nuevaCant) return;
    const nueva = { id: Date.now(), fecha: nuevaFecha, cantidad: Number(nuevaCant), nota: nuevaNota };
    onSave(sub.sub, [...lista, nueva]);
    setNuevaCant(''); setNuevaNota('');
  };

  const eliminar = (id) => onSave(sub.sub, lista.filter(e => e.id !== id));

  const { stockActual, diasRestantes, promDiario } = calcStock(sub, entregas);
  const estado = estadoColor(diasRestantes);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="font-black text-sm">Sub {sub.sub} — {sub.nombre}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Historial de entregas y stock</div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl font-black">✕</button>
        </div>

        {/* Estado stock */}
        <div className={`mx-4 mt-4 rounded-xl p-3 border flex items-center justify-between ${estado.bg}`}>
          <div className="flex items-center gap-2">
            {estado.icon}
            <div>
              <div className={`font-black text-xs ${estado.txt}`}>{estado.label}</div>
              <div className="text-[10px] text-slate-500">
                Stock actual: <span className="font-black">{stockActual.toFixed(1)} rollos</span> ·
                Promedio: <span className="font-black">{promDiario.toFixed(2)} rollos/día</span>
              </div>
            </div>
          </div>
          <div className={`text-right font-black text-lg ${estado.txt}`}>
            {diasRestantes > 0 ? `${diasRestantes.toFixed(1)} días` : 'Agotado'}
          </div>
        </div>

        {/* Historial */}
        <div className="px-4 mt-4">
          <div className="text-[10px] font-black text-slate-500 uppercase mb-2">Historial de entregas</div>
          {lista.length === 0 ? (
            <div className="text-xs text-slate-400 text-center py-3">Sin entregas registradas</div>
          ) : (
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {lista.map(e => (
                <div key={e.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">{e.fecha}</span>
                    <span className="font-black text-blue-700 text-sm">{e.cantidad} rollos</span>
                    {e.nota && <span className="text-[10px] text-slate-400 italic">{e.nota}</span>}
                  </div>
                  <button onClick={() => eliminar(e.id)}
                    className="text-red-400 hover:text-red-600 text-xs font-black px-2">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nueva entrega */}
        <div className="px-4 mt-4 pb-4">
          <div className="text-[10px] font-black text-slate-500 uppercase mb-2">Registrar nueva entrega</div>
          <div className="flex gap-2">
            <input type="date" value={nuevaFecha} onChange={e => setNuevaFecha(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:ring-2 focus:ring-blue-400 outline-none"/>
            <input type="number" min="1" placeholder="Cant. rollos" value={nuevaCant}
              onChange={e => setNuevaCant(e.target.value)}
              className="w-28 border border-blue-200 bg-blue-50 rounded-lg px-2 py-2 text-xs font-bold text-blue-700 focus:ring-2 focus:ring-blue-400 outline-none"/>
            <input type="text" placeholder="Nota (opcional)" value={nuevaNota}
              onChange={e => setNuevaNota(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-2 py-2 text-xs focus:ring-2 focus:ring-blue-400 outline-none"/>
            <button onClick={agregar}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-black text-xs hover:bg-blue-700">
              <Plus size={13}/> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Insumos() {
  const [entregas, setEntregas]     = useState(ENTREGAS_INIT);
  const [modalSub, setModalSub]     = useState(null);
  const [vista, setVista]           = useState('stock');
  const [tipoDet, setTipoDet]       = useState('vend');
  const [soloAlertas, setSoloAlertas] = useState(false);

  const saveEntregas = (subId, nuevaLista) => {
    setEntregas(prev => ({ ...prev, [subId]: nuevaLista }));
  };

  // Calcular stock de todas las subs
  const conStock = ROLLOS.map(r => {
    const s = calcStock(r, entregas);
    const est = estadoColor(s.diasRestantes);
    return { ...r, ...s, estado: est };
  });

  // Ordenar: primero los críticos
  const ordenados = [...conStock].sort((a, b) => a.diasRestantes - b.diasRestantes);
  const filtrados = soloAlertas ? ordenados.filter(r => r.diasRestantes <= 7) : ordenados;

  const alertas = conStock.filter(r => r.diasRestantes <= ALERTA_DIAS).length;
  const atencion = conStock.filter(r => r.diasRestantes > ALERTA_DIAS && r.diasRestantes <= 7).length;

  const DIAS_LABELS = Array.from({length:31},(_,i)=>(i+1).toString().padStart(2,'0'));

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Package size={22} className="text-orange-600"/> Insumos — Rollos
          </h2>
          <p className="text-xs text-slate-400 mt-1">Stock, consumo y entregas por subagencia — Diciembre 2025</p>
        </div>
        <div className="flex gap-2">
          {[['stock','📦 Stock'],['detalle','📊 Detalle diario']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setVista(id)}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${vista===id?'bg-slate-800 text-white border-slate-800':'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Alertas globales */}
      {(alertas > 0 || atencion > 0) && (
        <div className="grid grid-cols-2 gap-3">
          {alertas > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-600 shrink-0"/>
              <div>
                <div className="font-black text-red-700 text-sm">{alertas} subagencia{alertas>1?'s':''} con stock crítico</div>
                <div className="text-[10px] text-red-500">Menos de {ALERTA_DIAS} días de stock — entregar urgente</div>
              </div>
            </div>
          )}
          {atencion > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-3">
              <Clock size={20} className="text-yellow-600 shrink-0"/>
              <div>
                <div className="font-black text-yellow-700 text-sm">{atencion} subagencia{atencion>1?'s':''} con stock bajo</div>
                <div className="text-[10px] text-yellow-600">Entre 3 y 7 días de stock restante</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ VISTA STOCK ══ */}
      {vista === 'stock' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-black text-slate-800 text-[10px] uppercase tracking-widest">
              Stock actual por subagencia — hacé clic en una fila para registrar entregas
            </span>
            <button onClick={()=>setSoloAlertas(p=>!p)}
              className={`px-3 py-1.5 rounded-lg font-black text-[10px] uppercase transition-all border ${soloAlertas?'bg-orange-500 text-white border-orange-500':'bg-white text-slate-600 border-slate-200 hover:border-orange-300'}`}>
              {soloAlertas ? '✕ Ver todas' : '⚠ Solo alertas'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-xs w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[10px]">
                  <th className="p-2.5 text-left">Sub</th>
                  <th className="p-2.5 text-left">Nombre</th>
                  <th className="p-2.5 text-right">Total entregado</th>
                  <th className="p-2.5 text-right">Consumido (mes)</th>
                  <th className="p-2.5 text-right">Stock actual</th>
                  <th className="p-2.5 text-right">Prom. diario</th>
                  <th className="p-2.5 text-center">Días restantes</th>
                  <th className="p-2.5 text-center">Estado</th>
                  <th className="p-2.5 text-center">Entregas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados.map((r, i) => (
                  <tr key={r.sub}
                    onClick={() => setModalSub(r)}
                    className={`cursor-pointer transition-all hover:bg-blue-50/40 ${i%2===0?'bg-white':'bg-slate-50'}`}>
                    <td className="p-2.5 font-black font-mono text-blue-700">{r.sub}</td>
                    <td className="p-2.5 text-slate-700">{r.nombre}</td>
                    <td className="p-2.5 text-right font-mono font-black text-blue-700">
                      {r.totalEntregado} rollos
                    </td>
                    <td className="p-2.5 text-right font-mono text-slate-500">
                      {r.consumido.toFixed(1)} rollos
                    </td>
                    <td className="p-2.5 text-right font-mono font-black">
                      <span className={r.stockActual <= 0 ? 'text-red-600' : r.stockActual <= 5 ? 'text-orange-500' : 'text-green-600'}>
                        {r.stockActual.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-mono text-slate-400">
                      {r.promDiario.toFixed(2)}/día
                    </td>
                    <td className="p-2.5 text-center">
                      <span className={`font-black text-sm ${r.estado.txt}`}>
                        {r.diasRestantes > 0 ? r.diasRestantes.toFixed(1) : '0'}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[9px] font-black ${r.estado.bg} ${r.estado.txt}`}>
                        {r.estado.icon}
                        {r.estado.label}
                      </div>
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">
                        {(entregas[r.sub]||[]).length} entrega{(entregas[r.sub]||[]).length!==1?'s':''}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ VISTA DETALLE DIARIO ══ */}
      {vista === 'detalle' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Detalle diario — todas las subagencias</span>
            <div className="flex gap-2">
              {[['vend','Vendidos','bg-blue-600'],['anu','Anulados','bg-orange-500'],['prem','Premiados','bg-green-600']].map(([id,lbl,color])=>(
                <button key={id} onClick={()=>setTipoDet(id)}
                  className={`px-3 py-1.5 rounded-lg font-black text-[10px] uppercase text-white transition-all ${tipoDet===id?color:'bg-slate-300'}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="text-[9px] border-collapse" style={{minWidth:900}}>
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-2 text-left sticky left-0 bg-slate-800 z-10 w-20">Sub</th>
                  {DIAS_LABELS.map(d=><th key={d} className="p-1 text-center w-8 font-mono">{d}</th>)}
                  <th className="p-2 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ROLLOS.map((r,i)=>{
                  const datos = tipoDet==='vend'?r.vend:tipoDet==='anu'?r.anu:r.prem;
                  const tot   = tipoDet==='vend'?r.totVend:tipoDet==='anu'?r.totAnu:r.totPrem;
                  const maxVal = Math.max(...datos);
                  const cls = tipoDet==='vend'?'text-blue-700':tipoDet==='anu'?'text-orange-500':'text-green-600';
                  return (
                    <tr key={r.sub} className={i%2===0?'bg-white':'bg-slate-50'}>
                      <td className="p-2 sticky left-0 bg-inherit z-10">
                        <span className="font-black font-mono text-blue-700">{r.sub}</span>
                        <span className="ml-1 text-[8px] text-slate-400">{r.nombre.split(',')[0]}</span>
                      </td>
                      {datos.map((v,di)=>{
                        const intensity = maxVal>0?v/maxVal:0;
                        return (
                          <td key={di}
                            style={{background: v>0&&tipoDet==='vend'?`rgba(37,99,235,${intensity*0.12})`:'transparent'}}
                            className={`p-1 text-center font-mono ${v===0?'text-slate-200':`${cls} font-black`}`}>
                            {v||''}
                          </td>
                        );
                      })}
                      <td className={`p-2 text-right font-mono font-black ${cls}`}>{tot||'—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal entrega */}
      {modalSub && (
        <ModalEntrega
          sub={modalSub}
          entregas={entregas}
          onClose={()=>setModalSub(null)}
          onSave={(subId, lista) => { saveEntregas(subId, lista); setModalSub(prev=>({...prev})); }}
        />
      )}
    </div>
  );
}
