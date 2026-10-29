import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Line,
  Legend
} from 'recharts';
import { TrendingUp, Calendar, Info } from 'lucide-react';

export default function RevenueTimelineChart({ data }) {
  const [activeSeries, setActiveSeries] = useState('both'); // 'revenue', 'loadFactor', 'both'

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex items-center justify-center h-80">
        <p className="text-sm text-neutral-600 font-medium">No hay datos temporales disponibles.</p>
      </div>
    );
  }

  const formatCurrency = (val) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">Evolución de Ingresos & Ocupación en el Tiempo</h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-neutral-600">
              Tendencia Histórica
            </span>
          </div>
          <p className="text-xs text-neutral-600 font-medium mt-0.5">
            Relación temporal entre la facturación total y el Factor de Ocupación por fechas
          </p>
        </div>

        {/* Series Filter */}
        <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/60 text-xs font-semibold">
          <button
            onClick={() => setActiveSeries('both')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeSeries === 'both' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Ambos
          </button>
          <button
            onClick={() => setActiveSeries('revenue')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeSeries === 'revenue' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Solo Ingresos
          </button>
          <button
            onClick={() => setActiveSeries('loadFactor')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeSeries === 'loadFactor' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Solo Ocupación
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5733" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FF5733" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLoadFactor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE1" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#78716C', fontSize: 11 }}
              axisLine={{ stroke: '#E7E2D9' }}
              tickLine={false}
            />
            {/* Left Y Axis for Revenue */}
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#78716C', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              orientation="left"
              domain={['auto', 'auto']}
              hide={activeSeries === 'loadFactor'}
            />
            {/* Right Y Axis for Load Factor */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#10B981', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[40, 100]}
              hide={activeSeries === 'revenue'}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-neutral-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-neutral-800">
                      <p className="font-bold text-stone-300 border-b border-neutral-800 pb-1 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-coral-400" />
                        <span>Fecha: {label}</span>
                      </p>
                      {payload.map((entry, idx) => (
                        <div key={idx} className="flex justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-stone-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            {entry.name === 'revenue' ? 'Ingresos' : 'Factor Ocupación'}:
                          </span>
                          <span className="font-bold" style={{ color: entry.color }}>
                            {entry.name === 'revenue' ? `$${entry.value.toLocaleString()} USD` : `${entry.value}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />

            {(activeSeries === 'both' || activeSeries === 'revenue') && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="#FF5733"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            )}

            {(activeSeries === 'both' || activeSeries === 'loadFactor') && (
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="loadFactor"
                name="loadFactor"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLoadFactor)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-neutral-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-coral-500"></span>
            Ingresos ($ USD)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Factor de Ocupación (%)
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-neutral-600" />
          Agrupado por intervalo temporal
        </span>
      </div>
    </div>
  );
}
