import React from 'react';
import { 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Clock4, 
  XCircle, 
  Plus,
  ArrowRight
} from 'lucide-react';

export default function DecisionsPanel({ 
  decisions, 
  routes, 
  users, 
  onOpenModal,
  onUpdateStatus 
}) {
  const routesMap = new Map(routes.map(r => [r.id, r]));
  const usersMap = new Map(users.map(u => [u.id, u]));

  const getTypeIcon = (type) => {
    switch (type) {
      case 'fleet_reassignment': return Sliders;
      case 'dynamic_pricing': return TrendingUp;
      case 'frequency_change': return Calendar;
      case 'turnaround_adjustment': return Clock;
      default: return Sparkles;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'applied':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Aplicada
          </span>
        );
      case 'proposed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            <Clock4 className="w-2.5 h-2.5" />
            Propuesta
          </span>
        );
      case 'dismissed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold">
            <XCircle className="w-2.5 h-2.5" />
            Descartada
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/70 shadow-card flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Decisiones del Gerente</h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-coral-100 text-coral-600">
              {decisions.length}
            </span>
          </div>
          <p className="text-[11px] text-neutral-600">Historial de acciones comerciales & operativas</p>
        </div>

        <button
          onClick={() => onOpenModal()}
          className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 transition-colors"
          title="Nueva Decisión"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Decisions List */}
      <div className="space-y-3 overflow-y-auto max-h-[640px] pr-1">
        {decisions.map(d => {
          const Icon = getTypeIcon(d.type);
          const route = routesMap.get(d.route_id);
          const owner = usersMap.get(d.owner_id);

          return (
            <div 
              key={d.id} 
              className="p-3.5 rounded-2xl bg-stone-50/90 border border-stone-100 hover:border-stone-200 transition-all space-y-2 group"
            >
              {/* Top row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-coral-500 shrink-0 shadow-xs">
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-xs text-neutral-900">
                    {route ? route.code : d.route_id}
                  </span>
                </div>
                {getStatusBadge(d.status)}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-700 leading-snug">
                {d.description}
              </p>

              {/* Impact */}
              <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 font-medium">
                <span className="font-bold text-emerald-950">Impacto: </span>
                {d.expected_impact}
              </div>

              {/* Footer with Owner & Action to change status */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-600">
                <span>Por: {owner?.full_name || 'Gerencia'}</span>
                {d.status === 'proposed' && (
                  <button
                    onClick={() => onUpdateStatus(d.id, 'applied')}
                    className="text-coral-600 hover:text-coral-700 font-bold flex items-center gap-0.5 hover:underline"
                  >
                    <span>Aplicar</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Button at bottom (matching SETO image) */}
      <div className="pt-2">
        <button
          onClick={() => onOpenModal()}
          className="w-full py-2.5 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-coral-400" />
          <span>Proponer Nueva Decisión</span>
        </button>
      </div>
    </div>
  );
}
