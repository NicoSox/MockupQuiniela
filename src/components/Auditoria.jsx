import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Info, User } from 'lucide-react';

const auditoriaData = [
  { id: 1, usuario: 'admin', fecha: '26/04/2026 10:15', numeroSorteo: 101, accion: 'Carga sorteo MATUTINA', estado: 'OK', detalle: 'Carga exitosa del sorteo matutino. No se detectaron anomalías.' },
  { id: 2, usuario: 'sub014', fecha: '26/04/2026 09:50', numeroSorteo: 101, accion: 'Alerta inactividad', estado: 'Alerta', detalle: 'La subagencia estuvo inactiva por más de 2 horas.' },
  { id: 3, usuario: 'admin', fecha: '26/04/2026 09:00', numeroSorteo: 101, accion: 'Apertura terminales', estado: 'OK', detalle: 'Apertura de terminales realizada correctamente.' },
  { id: 4, usuario: 'sub014', fecha: '25/04/2026 19:00', numeroSorteo: 104, accion: 'Intento acceso denegado', estado: 'Riesgo', detalle: 'Intento de acceso fuera de horario permitido.' },
  { id: 5, usuario: 'admin', fecha: '25/04/2026 18:30', numeroSorteo: 102, accion: 'Cierre sorteo VESPERTINA', estado: 'OK', detalle: 'Cierre exitoso del sorteo vespertino.' },
  { id: 6, usuario: 'sub014', fecha: '25/04/2026 17:00', numeroSorteo: 102, accion: 'Modificación datos', estado: 'Alerta', detalle: 'Modificación de datos sin autorización previa.' },
];

const usuarios = ['Todos', 'admin', 'sub014'];
const acciones = ['Todas', 'Carga sorteo MATUTINA', 'Alerta inactividad', 'Apertura terminales', 'Intento acceso denegado', 'Cierre sorteo VESPERTINA', 'Modificación datos'];
const estados = ['Todos', 'OK', 'Alerta', 'Riesgo'];

export default function Auditoria() {
  const [usuario, setUsuario] = useState('Todos');
  const [accion, setAccion] = useState('Todas');
  const [estado, setEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [detalleId, setDetalleId] = useState(null);

  const filtrados = auditoriaData.filter(a =>
    (usuario === 'Todos' || a.usuario === usuario) &&
    (accion === 'Todas' || a.accion === accion) &&
    (estado === 'Todos' || a.estado === estado) &&
    (
      a.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.accion.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.fecha.includes(busqueda)
    )
  );

  const resumen = {
    total: auditoriaData.length,
    ok: auditoriaData.filter(a => a.estado === 'OK').length,
    alerta: auditoriaData.filter(a => a.estado === 'Alerta').length,
    riesgo: auditoriaData.filter(a => a.estado === 'Riesgo').length,
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2 flex items-center gap-2">
        <Info size={22} className="text-blue-500" /> Auditoría Avanzada
      </h2>

      {/* Resumen */}
      <div className="flex gap-6 mb-2">
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg shadow">
          <User size={18} className="text-slate-500" />
          <span className="font-bold text-slate-700">Total:</span> {resumen.total}
        </div>
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
          <CheckCircle size={18} className="text-green-600" />
          <span className="font-bold text-green-700">OK:</span> {resumen.ok}
        </div>
        <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
          <AlertTriangle size={18} className="text-orange-500" />
          <span className="font-bold text-orange-700">Alertas:</span> {resumen.alerta}
        </div>
        <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-lg">
          <AlertTriangle size={18} className="text-red-500" />
          <span className="font-bold text-red-700">Riesgo:</span> {resumen.riesgo}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-end mb-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Usuario</label>
          <select className="border rounded px-2 py-1" value={usuario} onChange={e => setUsuario(e.target.value)}>
            {usuarios.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Acción</label>
          <select className="border rounded px-2 py-1" value={accion} onChange={e => setAccion(e.target.value)}>
            {acciones.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Estado</label>
          <select className="border rounded px-2 py-1" value={estado} onChange={e => setEstado(e.target.value)}>
            {estados.map(e => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-600 mb-1">Búsqueda</label>
          <div className="flex items-center border rounded px-2 py-1 bg-white">
            <Search size={16} className="text-slate-400 mr-2" />
            <input className="flex-1 outline-none" placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-sm text-slate-700 border rounded shadow">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-2">N° Sorteo</th>
              <th className="p-2">Usuario</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Acción</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 && (
              <tr><td colSpan={6} className="text-center text-slate-400 py-4">Sin resultados</td></tr>
            )}
            {filtrados.map(a => (
              <tr key={a.id} className="even:bg-slate-50 hover:bg-blue-50 cursor-pointer" onClick={() => setDetalleId(a.id)}>
                <td className="p-2 font-mono font-bold text-blue-700">{a.numeroSorteo}</td>
                <td className="p-2 font-mono">{a.usuario}</td>
                <td className="p-2">{a.fecha}</td>
                <td className="p-2">{a.accion}</td>
                <td className={`p-2 font-black ${a.estado==='OK'?'text-green-600':a.estado==='Alerta'?'text-orange-500':'text-red-600'}`}>{a.estado}</td>
                <td className="p-2 text-blue-600 underline">Ver detalle</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle */}
      {detalleId && (
        <div className="bg-slate-50 border-l-4 border-blue-400 p-4 rounded shadow max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-700">Detalle de registro</span>
            <button className="text-xs text-slate-500 hover:underline" onClick={() => setDetalleId(null)}>Cerrar</button>
          </div>
          <div className="text-slate-700 text-sm">
            <div><span className="font-bold">Usuario:</span> {auditoriaData.find(a => a.id === detalleId).usuario}</div>
            <div><span className="font-bold">Fecha:</span> {auditoriaData.find(a => a.id === detalleId).fecha}</div>
            <div><span className="font-bold">Acción:</span> {auditoriaData.find(a => a.id === detalleId).accion}</div>
            <div><span className="font-bold">Estado:</span> {auditoriaData.find(a => a.id === detalleId).estado}</div>
            <div className="mt-2"><span className="font-bold">Descripción:</span> {auditoriaData.find(a => a.id === detalleId).detalle}</div>
          </div>
        </div>
      )}
    </div>
  );
}
