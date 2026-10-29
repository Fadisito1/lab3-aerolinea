import React, { useState, useMemo } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plane, 
  SlidersHorizontal,
  DollarSign,
  TrendingDown
} from 'lucide-react';

export default function FlightsTable({ 
  flights, 
  routes, 
  aircrafts, 
  onSelectFlight 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [alertFilter, setAlertFilter] = useState('all'); // 'all', 'low_occupancy', 'delayed', 'cancelled'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const routesMap = useMemo(() => new Map(routes.map(r => [r.id, r])), [routes]);
  const aircraftsMap = useMemo(() => new Map(aircrafts.map(a => [a.id, a])), [aircrafts]);

  // Procesar vuelos con datos enriquecidos y banderas de alerta
  const enrichedFlights = useMemo(() => {
    return flights.map(flight => {
      const route = routesMap.get(flight.route_id);
      const aircraft = aircraftsMap.get(flight.aircraft_id);
      const occupancyRate = flight.seats_capacity > 0 
        ? Math.round((flight.seats_sold / flight.seats_capacity) * 100) 
        : 0;

      const isCancelled = flight.status === 'cancelled';
      const isDelayed = !isCancelled && (
        (flight.departure_delay_min !== null && flight.departure_delay_min > 15) ||
        (flight.arrival_delay_min !== null && flight.arrival_delay_min > 15)
      );
      const isLowOccupancy = !isCancelled && occupancyRate < 70;

      let alertType = 'optimal';
      if (isCancelled) alertType = 'cancelled';
      else if (isLowOccupancy && isDelayed) alertType = 'critical_both';
      else if (isLowOccupancy) alertType = 'low_occupancy';
      else if (isDelayed) alertType = 'delayed';

      return {
        ...flight,
        route,
        aircraft,
        occupancyRate,
        isCancelled,
        isDelayed,
        isLowOccupancy,
        alertType
      };
    });
  }, [flights, routesMap, aircraftsMap]);

  // Filtrado por búsqueda y alerta
  const filteredList = useMemo(() => {
    return enrichedFlights.filter(f => {
      // Búsqueda
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        f.flight_number.toLowerCase().includes(searchLower) ||
        (f.route && f.route.code.toLowerCase().includes(searchLower)) ||
        (f.aircraft && f.aircraft.model.toLowerCase().includes(searchLower)) ||
        (f.aircraft && f.aircraft.registration.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;

      // Filtro de alerta
      if (alertFilter === 'low_occupancy') return f.isLowOccupancy;
      if (alertFilter === 'delayed') return f.isDelayed;
      if (alertFilter === 'cancelled') return f.isCancelled;

      return true;
    });
  }, [enrichedFlights, searchTerm, alertFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage]);

  const formatDate = (isoString) => {
    if (!isoString) return '--';
    const date = new Date(isoString);
    return date.toLocaleString('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-card space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">Registro de Vuelos Recientes</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-neutral-600">
              {filteredList.length} Vuelos
            </span>
          </div>
          <p className="text-xs text-neutral-600 font-medium mt-0.5">
            Monitoreo en tiempo real con detección de alertas de subocupación y demoras
          </p>
        </div>

        {/* Search & Alert Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar vuelo o ruta..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-stone-50 hover:bg-stone-100 text-neutral-800 text-xs rounded-2xl pl-8 pr-3 py-2 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 w-48 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Quick Alert Filters */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/60 text-xs font-semibold">
            <button
              onClick={() => { setAlertFilter('all'); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                alertFilter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => { setAlertFilter('low_occupancy'); setCurrentPage(1); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
                alertFilter === 'low_occupancy' ? 'bg-amber-50 text-amber-800 shadow-xs' : 'text-neutral-600 hover:text-amber-800'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <span>&lt;70% Ocup.</span>
            </button>
            <button
              onClick={() => { setAlertFilter('delayed'); setCurrentPage(1); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
                alertFilter === 'delayed' ? 'bg-rose-50 text-rose-800 shadow-xs' : 'text-neutral-600 hover:text-rose-800'
              }`}
            >
              <Clock className="w-3 h-3 text-rose-500" />
              <span>Demoras &gt;15m</span>
            </button>
            <button
              onClick={() => { setAlertFilter('cancelled'); setCurrentPage(1); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
                alertFilter === 'cancelled' ? 'bg-stone-200 text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <XCircle className="w-3 h-3 text-neutral-500" />
              <span>Cancelados</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-50/90 text-neutral-600 font-semibold border-b border-stone-200 uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3.5">Vuelo / Aeronave</th>
              <th className="py-3 px-3.5">Ruta</th>
              <th className="py-3 px-3.5">Salida (Prog / Real)</th>
              <th className="py-3 px-3.5">Puntualidad</th>
              <th className="py-3 px-3.5">Ocupación</th>
              <th className="py-3 px-3.5">Ingresos</th>
              <th className="py-3 px-3.5">Estado</th>
              <th className="py-3 px-3.5 text-right">Alerta / Diagnóstico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-medium text-neutral-700">
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-neutral-500 space-y-1">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mb-1" />
                    <p className="text-sm font-bold text-neutral-800">Sin resultados</p>
                    <p className="text-xs text-neutral-500">Ningún vuelo coincide con los filtros o búsqueda activa.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedList.map(f => {
                return (
                  <tr 
                    key={f.id} 
                    className="hover:bg-stone-50/70 transition-colors"
                  >
                    {/* Flight & Aircraft */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-stone-100 flex items-center justify-center text-neutral-700 shrink-0">
                          <Plane className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900">{f.flight_number}</span>
                          <p className="text-[10px] text-neutral-600 font-normal">
                            {f.aircraft ? `${f.aircraft.model} (${f.aircraft.registration})` : f.aircraft_id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-neutral-900">{f.route ? f.route.code : f.route_id}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          f.route?.region === 'internacional' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-neutral-600'
                        }`}>
                          {f.route?.region === 'internacional' ? 'INT' : 'NAC'}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-600">{f.route?.distance_km} km</span>
                    </td>

                    {/* Departure times */}
                    <td className="py-3 px-3.5">
                      <div>
                        <span className="text-neutral-800">{formatDate(f.scheduled_departure)}</span>
                        {f.actual_departure && (
                          <p className="text-[10px] text-neutral-600">
                            Real: {formatDate(f.actual_departure).split(',')[1] || formatDate(f.actual_departure)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Delays & OTP */}
                    <td className="py-3 px-3.5">
                      {f.status === 'cancelled' ? (
                        <span className="text-stone-400">--</span>
                      ) : f.departure_delay_min === null ? (
                        <span className="text-blue-600 text-[11px] font-semibold">Programado</span>
                      ) : f.departure_delay_min <= 15 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{f.departure_delay_min > 0 ? `+${f.departure_delay_min}m` : 'A tiempo'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>+{f.departure_delay_min}m demora</span>
                        </span>
                      )}
                    </td>

                    {/* Occupancy */}
                    <td className="py-3 px-3.5">
                      {f.status === 'cancelled' ? (
                        <span className="text-stone-400 text-[11px]">0% (Cancelado)</span>
                      ) : (
                        <div className="space-y-1 w-28">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className={`font-bold ${f.occupancyRate < 70 ? 'text-rose-600' : 'text-neutral-900'}`}>
                              {f.occupancyRate}%
                            </span>
                            <span className="text-neutral-600 text-[10px] font-medium">
                              {f.seats_sold}/{f.seats_capacity}
                            </span>
                          </div>
                          <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                f.occupancyRate < 70 ? 'bg-rose-500' : f.occupancyRate < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${Math.min(100, f.occupancyRate)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Revenue */}
                    <td className="py-3 px-3.5">
                      <span className="font-bold text-neutral-900">
                        ${f.revenue.toLocaleString()} USD
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5">
                      {f.status === 'completed' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                          Completado
                        </span>
                      )}
                      {f.status === 'scheduled' && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                          Programado
                        </span>
                      )}
                      {f.status === 'cancelled' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">
                          Cancelado
                        </span>
                      )}
                    </td>

                    {/* Alert / Diagnosis Pill */}
                    <td className="py-3 px-3.5 text-right">
                      {f.status === 'cancelled' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 font-semibold text-[11px] border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-500" />
                          <span className="capitalize">Causa: {f.cancellation_cause?.replace('_', ' ') || 'Operativa'}</span>
                        </span>
                      ) : f.alertType === 'critical_both' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 font-semibold text-[11px] border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                          <span>Subocupado & Retrasado</span>
                        </span>
                      ) : f.alertType === 'low_occupancy' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200">
                          <TrendingDown className="w-3 h-3 text-amber-500" />
                          <span>Subocupado (&lt;70%)</span>
                        </span>
                      ) : f.alertType === 'delayed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>Retraso Crítico</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Óptimo</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 text-xs text-neutral-600">
        <div>
          Página <span className="font-bold text-neutral-900">{currentPage}</span> de {totalPages}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-xl border border-stone-200/80 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-700" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-xl border border-stone-200/80 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4 text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
