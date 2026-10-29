import React from 'react';
import { Calendar, Compass, Plane, CheckCircle2, RotateCcw, Filter, AlertCircle, Sparkles } from 'lucide-react';

export default function FiltersBar({
  filters,
  setFilters,
  routes,
  aircrafts,
  totalFlightsCount,
  filteredFlightsCount
}) {
  const dateRanges = [
    { value: 'all', label: 'Todo el historial (90 días)' },
    { value: '7d', label: 'Últimos 7 días' },
    { value: '15d', label: 'Últimos 15 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '60d', label: 'Últimos 60 días' },
    { value: 'scheduled', label: 'Solo futuros / programados' }
  ];

  const uniqueModels = Array.from(new Set(aircrafts.map(a => a.model)));

  const handleReset = () => {
    setFilters({
      dateRange: 'all',
      routeOrRegion: 'all',
      aircraftModel: 'all',
      status: 'all'
    });
  };

  const isFiltered = 
    filters.dateRange !== 'all' || 
    filters.routeOrRegion !== 'all' || 
    filters.aircraftModel !== 'all' || 
    filters.status !== 'all';

  return (
    <div className="bg-white rounded-3xl p-4 lg:p-5 border border-stone-200/80 shadow-card sticky top-3 z-30 backdrop-blur-md bg-white/95">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* Header Indicator & Match Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-coral-400 flex items-center justify-center shrink-0 shadow-sm shadow-black/10">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Filtros Globales</span>
              {isFiltered && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-100 text-coral-700 animate-pulse">
                  Filtros activos
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-neutral-600 font-medium">Coinciden:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-xl ${
                filteredFlightsCount > 0 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                  : 'bg-rose-50 text-rose-700 border border-rose-200/60'
              }`}>
                {filteredFlightsCount} de {totalFlightsCount} vuelos
              </span>
            </div>
          </div>
        </div>

        {/* 4 Interactive Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1 max-w-4xl">
          
          {/* 1. Rango de Fechas (scheduled_departure) */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              1. Rango de Fechas
            </label>
            <div className="relative">
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 text-neutral-800 text-xs font-semibold rounded-2xl pl-8 pr-7 py-2.5 border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all cursor-pointer truncate"
              >
                {dateRanges.map(dr => (
                  <option key={dr.value} value={dr.value}>{dr.label}</option>
                ))}
              </select>
              <Calendar className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Ruta o Región (nacional / internacional) */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              2. Ruta o Región
            </label>
            <div className="relative">
              <select
                value={filters.routeOrRegion}
                onChange={(e) => setFilters(prev => ({ ...prev, routeOrRegion: e.target.value }))}
                className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 text-neutral-800 text-xs font-semibold rounded-2xl pl-8 pr-7 py-2.5 border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all cursor-pointer truncate"
              >
                <option value="all">Todas las Rutas & Regiones</option>
                <optgroup label="Filtrar por Región">
                  <option value="region:nacional">Solo Región Nacional</option>
                  <option value="region:internacional">Solo Región Internacional</option>
                </optgroup>
                <optgroup label="Rutas Específicas">
                  {routes.map(r => (
                    <option key={r.id} value={`route:${r.id}`}>
                      {r.code} ({r.region === 'internacional' ? 'Internacional' : 'Nacional'})
                    </option>
                  ))}
                </optgroup>
              </select>
              <Compass className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Modelo de Aeronave */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              3. Modelo de Aeronave
            </label>
            <div className="relative">
              <select
                value={filters.aircraftModel}
                onChange={(e) => setFilters(prev => ({ ...prev, aircraftModel: e.target.value }))}
                className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 text-neutral-800 text-xs font-semibold rounded-2xl pl-8 pr-7 py-2.5 border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all cursor-pointer truncate"
              >
                <option value="all">Todos los Modelos</option>
                {uniqueModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              <Plane className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Estado del Vuelo */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              4. Estado del Vuelo
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 text-neutral-800 text-xs font-semibold rounded-2xl pl-8 pr-7 py-2.5 border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all cursor-pointer truncate"
              >
                <option value="all">Todos los Estados</option>
                <option value="completed">Completados (completed)</option>
                <option value="scheduled">Programados (scheduled)</option>
                <option value="cancelled">Cancelados (cancelled)</option>
              </select>
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end self-end xl:self-center">
          <button
            onClick={handleReset}
            disabled={!isFiltered}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              isFiltered 
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200/80 shadow-xs cursor-pointer' 
                : 'bg-stone-100 text-neutral-600 border-stone-200/60 opacity-60 cursor-not-allowed'
            }`}
            title="Restablecer todos los filtros a sus valores predeterminados"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar filtros</span>
          </button>
        </div>

      </div>
    </div>
  );
}
