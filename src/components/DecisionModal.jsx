import React, { useState } from 'react';
import { X, Sparkles, Sliders, TrendingUp, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function DecisionModal({ 
  isOpen, 
  onClose, 
  onSaveDecision, 
  routes, 
  defaultType = 'fleet_reassignment',
  currentUser 
}) {
  const [type, setType] = useState(defaultType);
  const [routeId, setRouteId] = useState(routes[0]?.id || 'r1');
  const [description, setDescription] = useState('');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [status, setStatus] = useState('proposed');

  if (!isOpen) return null;

  const decisionTypes = [
    { id: 'fleet_reassignment', label: 'Reasignación de Flota (Upsize / Downsize)', icon: Sliders },
    { id: 'dynamic_pricing', label: 'Precios Dinámicos (Yield Management)', icon: TrendingUp },
    { id: 'frequency_change', label: 'Ajuste de Frecuencias Semanales', icon: Calendar },
    { id: 'turnaround_adjustment', label: 'Optimización de Turnaround / Escalas', icon: Clock }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !expectedImpact) return;

    const newDecision = {
      id: `d${Date.now()}`,
      type,
      route_id: routeId,
      owner_id: currentUser?.id || 'u1',
      description,
      expected_impact: expectedImpact,
      status,
      created_at: new Date().toISOString()
    };

    onSaveDecision(newDecision);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 border border-stone-200/80 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-coral-50 text-coral-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Registrar Decisión Gerencial</h3>
              <p className="text-xs text-neutral-600">Acción de Revenue & Operaciones de Rutas</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Tipo de Decisión */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Tipo de Decisión
            </label>
            <div className="grid grid-cols-2 gap-2">
              {decisionTypes.map(dt => {
                const Icon = dt.icon;
                const isSelected = type === dt.id;
                return (
                  <button
                    type="button"
                    key={dt.id}
                    onClick={() => setType(dt.id)}
                    className={`flex items-start gap-2 p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected 
                        ? 'border-coral-500 bg-coral-50/50 text-coral-950 font-semibold shadow-xs' 
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-neutral-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-coral-600' : 'text-neutral-600'}`} />
                    <span className="leading-tight">{dt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ruta Afectada */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Ruta Objeto de la Decisión
            </label>
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-2.5 text-neutral-800 font-semibold focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500"
            >
              {routes.map(r => (
                <option key={r.id} value={r.id}>
                  {r.code} - {r.region.toUpperCase()} ({r.weekly_frequency} vuelos/sem, base ${r.base_fare} USD)
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Descripción / Justificación Operativa
            </label>
            <textarea
              rows={2}
              required
              placeholder="Ej: Reemplazar Airbus A320 por A321 en vuelos pico por sobre-demanda sostenida..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500"
            />
          </div>

          {/* Impacto Esperado */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Impacto Esperado (KPI / Financiero)
            </label>
            <input
              type="text"
              required
              placeholder="Ej: +9% Load Factor y +$16,500 USD de ingresos semanales"
              value={expectedImpact}
              onChange={(e) => setExpectedImpact(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500"
            />
          </div>

          {/* Estado de la Decisión */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Estado Inicial
            </label>
            <div className="flex gap-2">
              {[
                { id: 'proposed', label: 'Propuesta' },
                { id: 'applied', label: 'Aplicada Inmediata' }
              ].map(st => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setStatus(st.id)}
                  className={`flex-1 py-2 rounded-xl text-center font-semibold transition-all ${
                    status === st.id 
                      ? 'bg-neutral-900 text-white shadow-xs' 
                      : 'bg-stone-100 text-neutral-600 hover:bg-stone-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-neutral-700 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold transition-all shadow-md shadow-coral-500/20"
            >
              Guardar Decisión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
