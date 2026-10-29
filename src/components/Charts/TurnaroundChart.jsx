import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function TurnaroundChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col items-center justify-center h-80 text-center">
        <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-400 mb-2">
          <Clock className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-neutral-800">Sin resultados</p>
        <p className="text-xs text-neutral-500 mt-0.5">No hay datos de escalas para los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">Tiempos de Escala (Turnaround)</h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              Operaciones OTP
            </span>
          </div>
          <p className="text-xs text-neutral-600 font-medium mt-0.5">
            Turnaround promedio real (min) vs Meta del aeropuerto
          </p>
        </div>
      </div>

      {/* Bar Chart comparing actual vs target */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE1" />
            <XAxis 
              dataKey="iata" 
              tick={{ fill: '#78716C', fontSize: 11, fontWeight: 600 }}
              axisLine={{ stroke: '#E7E2D9' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#78716C', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}m`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  const isOver = d.diff > 0;
                  return (
                    <div className="bg-neutral-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-neutral-800">
                      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-1">
                        <span className="font-bold text-coral-400">{d.city} ({d.iata})</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isOver ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}>
                          {isOver ? `+${d.diff} min retraso` : 'En meta'}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-400">Promedio Real:</span>
                        <span className="font-bold text-white">{d.actual} min</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-400">Meta Aeropuerto:</span>
                        <span className="font-semibold text-blue-400">{d.target} min</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="actual" name="Tiempo Real" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => {
                const isOver = entry.diff > 3;
                return <Cell key={`cell-${index}`} fill={isOver ? '#EF4444' : '#3B82F6'} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Meta indicator */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-neutral-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            En tiempo objetivo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            Excede meta (&gt;3 min)
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-neutral-600" />
          avg(turnaround_min) vs target_turnaround_min
        </span>
      </div>
    </div>
  );
}
