import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { AlertOctagon, Wrench, CloudRain, Users, Info, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function CancellationCausesChart({ data }) {
  const totalCancelled = data ? data.reduce((acc, curr) => acc + curr.value, 0) : 0;

  if (!data || totalCancelled === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col items-center justify-center h-80 text-center">
        <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-400 mb-2">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-neutral-800">Sin cancelaciones</p>
        <p className="text-xs text-neutral-500 mt-0.5">No hay vuelos cancelados registrados para los filtros elegidos.</p>
      </div>
    );
  }

  const causeIcons = {
    'Técnica': Wrench,
    'Clima': CloudRain,
    'Baja Demanda': Users
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">Causas de Cancelación</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
              {totalCancelled} Vuelos Cancelados
            </span>
          </div>
        </div>
        <p className="text-xs text-neutral-600 font-medium mt-0.5">
          Desglose de motivos operativos y comerciales de cancelación
        </p>
      </div>

      {/* Chart */}
      <div className="h-48 w-full my-3">
        {totalCancelled === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-neutral-600">
            No se registran vuelos cancelados en este rango.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0EBE1" />
              <XAxis 
                type="number" 
                tick={{ fill: '#78716C', fontSize: 11 }}
                axisLine={{ stroke: '#E7E2D9' }}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: '#44403C', fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                width={85}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    const pct = totalCancelled > 0 ? ((d.value / totalCancelled) * 100).toFixed(1) : 0;
                    return (
                      <div className="bg-neutral-900 text-white p-2.5 rounded-2xl shadow-xl text-xs space-y-1 border border-neutral-800">
                        <p className="font-bold text-coral-400">{d.name}</p>
                        <p className="text-stone-300">
                          Vuelos cancelados: <span className="font-bold text-white">{d.value}</span> ({pct}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Cause Breakdown Pills */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100">
        {data.map((cause) => {
          const Icon = causeIcons[cause.name] || AlertOctagon;
          const pct = totalCancelled > 0 ? Math.round((cause.value / totalCancelled) * 100) : 0;
          return (
            <div key={cause.name} className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5" style={{ color: cause.color }} />
                <span className="text-[11px] font-semibold text-neutral-700 truncate">{cause.name}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-neutral-900">{cause.value}</span>
                <span className="text-[10px] text-neutral-600 font-semibold">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Revenue/Ops Recommendation */}
      <div className="mt-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-950">Insight de Revenue & Operaciones:</p>
          <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
            Las cancelaciones por "Baja Demanda" representan una oportunidad inmediata para reasignar aviones de menor porte (Downsizing a ATR 72) o ajustar frecuencias semanales.
          </p>
        </div>
      </div>
    </div>
  );
}
