import React, { useState } from 'react';
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
import { DollarSign, Percent, BarChart3, Info } from 'lucide-react';

export default function RevenueByRouteChart({ data }) {
  const [metric, setMetric] = useState('revenue'); // 'revenue' or 'loadFactor'

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex items-center justify-center h-80">
        <p className="text-sm text-neutral-600 font-medium">No hay datos para las rutas seleccionadas.</p>
      </div>
    );
  }

  // Ordenar según la métrica activa
  const displayData = [...data].sort((a, b) => 
    metric === 'revenue' ? b.revenue - a.revenue : b.loadFactor - a.loadFactor
  ).slice(0, 10); // Top 10 rutas

  const formatRevenue = (val) => `$${(val / 1000).toFixed(1)}k`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col justify-between">
      {/* Header with Title & Metric Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">Rendimiento por Ruta</h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-neutral-600">
              Top 10 Rutas
            </span>
          </div>
          <p className="text-xs text-neutral-600 font-medium mt-0.5">
            {metric === 'revenue' ? 'Ingresos acumulados en USD (sum of revenue)' : 'Factor de Ocupación promedio por ruta (%)'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/60 text-xs font-semibold">
          <button
            onClick={() => setMetric('revenue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              metric === 'revenue' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-coral-500" />
            <span>Ingresos</span>
          </button>
          <button
            onClick={() => setMetric('loadFactor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              metric === 'loadFactor' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ocupación</span>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayData}
            margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE1" />
            <XAxis 
              dataKey="code" 
              tick={{ fill: '#78716C', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#E7E2D9' }}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis 
              tick={{ fill: '#78716C', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={metric === 'revenue' ? formatRevenue : (v) => `${v}%`}
              domain={metric === 'revenue' ? ['auto', 'auto'] : [0, 100]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-neutral-800">
                      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-1">
                        <span className="font-bold text-sm text-coral-400">{d.code}</span>
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-neutral-800 text-stone-300">
                          {d.region}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-400">Ingresos Totales:</span>
                        <span className="font-bold text-emerald-400">${d.revenue.toLocaleString()} USD</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-400">Factor Ocupación:</span>
                        <span className="font-semibold text-white">{d.loadFactor}%</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-400">Vuelos Operados:</span>
                        <span className="font-semibold text-white">{d.flightsCount}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-[11px] text-stone-400 pt-1 border-t border-neutral-800">
                        <span>Asientos Vendidos:</span>
                        <span>{d.seatsSold} / {d.capacity}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey={metric === 'revenue' ? 'revenue' : 'loadFactor'} 
              radius={[6, 6, 2, 2]}
            >
              {displayData.map((entry, index) => {
                // Si la ocupación es menor a 65%, pintar en color de advertencia
                let barColor = metric === 'revenue' ? '#FF5733' : '#10B981';
                if (metric === 'loadFactor' && entry.loadFactor < 65) {
                  barColor = '#EF4444'; // Alerta de subocupación
                }
                return <Cell key={`cell-${index}`} fill={barColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-neutral-600">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-coral-500 inline-block"></span>
          Ingresos principales: Troncales MDE-BOG y BOG-MIA
        </span>
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-neutral-600" />
          Fórmula: sum(revenue) agrupado por ruta
        </span>
      </div>
    </div>
  );
}
