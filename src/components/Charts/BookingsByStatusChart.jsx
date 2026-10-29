import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { BookmarkCheck, Users, Info } from 'lucide-react';

export default function BookingsByStatusChart({ data }) {
  const totalBookings = data ? data.reduce((acc, curr) => acc + curr.value, 0) : 0;

  if (!data || totalBookings === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col items-center justify-center h-80 text-center">
        <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-400 mb-2">
          <Users className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-neutral-800">Sin resultados</p>
        <p className="text-xs text-neutral-500 mt-0.5">No hay reservas registradas para los filtros elegidos.</p>
      </div>
    );
  }

  const colors = {
    'Confirmadas': '#10B981',    // Emerald
    'Lista de Espera': '#F59E0B',// Amber
    'Canceladas': '#EF4444'      // Rose
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900 tracking-tight">Reservas por Estado</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-neutral-600">
            {totalBookings} Total
          </span>
        </div>
        <p className="text-xs text-neutral-600 font-medium mt-0.5">
          Conteo y volumen financiero según estado de reserva
        </p>
      </div>

      {/* Donut Chart with Centered Total */}
      <div className="relative h-60 w-full my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  const pct = totalBookings > 0 ? ((d.value / totalBookings) * 100).toFixed(1) : 0;
                  return (
                    <div className="bg-neutral-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 border border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                        <span className="font-bold text-white">{d.name}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-stone-300">
                        <span>Reservas:</span>
                        <span className="font-bold text-white">{d.value} ({pct}%)</span>
                      </div>
                      {d.amount > 0 && (
                        <div className="flex justify-between gap-4 text-stone-300">
                          <span>Volumen USD:</span>
                          <span className="font-bold text-emerald-400">${d.amount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={92}
              paddingAngle={4}
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={3}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || colors[entry.name] || '#9CA3AF'} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-neutral-900 leading-none">{totalBookings}</span>
          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider mt-1">Reservas</span>
        </div>
      </div>

      {/* Custom Legend Cards */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100">
        {data.map((item) => {
          const pct = totalBookings > 0 ? Math.round((item.value / totalBookings) * 100) : 0;
          return (
            <div key={item.name} className="p-2 rounded-2xl bg-stone-50/80 border border-stone-100 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[11px] font-semibold text-neutral-600 truncate">{item.name}</span>
              </div>
              <p className="text-base font-bold text-neutral-900">{item.value}</p>
              <p className="text-[10px] text-neutral-600 font-medium">{pct}% del total</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-neutral-600">
        <span>* Solo 'confirmed' computan en asientos vendidos</span>
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-neutral-600" />
          Conteo por booking.status
        </span>
      </div>
    </div>
  );
}
