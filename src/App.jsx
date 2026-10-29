import React, { useState, useMemo } from 'react';
import { 
  Users, 
  TrendingUp, 
  Plane, 
  Clock, 
  AlertOctagon, 
  DollarSign, 
  BarChart3, 
  Sparkles,
  Percent,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

import { 
  mockUsers, 
  mockAirports, 
  mockAircrafts, 
  mockRoutes, 
  mockFlights, 
  mockBookings, 
  initialDecisions,
  calculateDashboardKPIs 
} from './data/mockData';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FiltersBar from './components/FiltersBar';
import KPICard from './components/KPICard';
import RevenueByRouteChart from './components/Charts/RevenueByRouteChart';
import BookingsByStatusChart from './components/Charts/BookingsByStatusChart';
import RevenueTimelineChart from './components/Charts/RevenueTimelineChart';
import CancellationCausesChart from './components/Charts/CancellationCausesChart';
import TurnaroundChart from './components/Charts/TurnaroundChart';
import FlightsTable from './components/FlightsTable';
import DecisionsPanel from './components/DecisionsPanel';
import DecisionModal from './components/DecisionModal';
import FloatingChat from './components/FloatingChat';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [decisions, setDecisions] = useState(initialDecisions);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [defaultDecisionType, setDefaultDecisionType] = useState('fleet_reassignment');

  // Filtros interactivos requeridos por la especificación
  const [filters, setFilters] = useState({
    dateRange: 'all',          // 'all', '30d', '7d', 'scheduled'
    routeOrRegion: 'all',      // 'all', 'region:nacional', 'region:internacional', 'route:r1'
    aircraftModel: 'all',      // 'all', 'Airbus A320', etc.
    status: 'all'              // 'all', 'completed', 'scheduled', 'cancelled'
  });

  const currentUser = mockUsers.find(u => u.role === 'revenue_manager') || mockUsers[0];
  const aircraftsMap = useMemo(() => new Map(mockAircrafts.map(a => [a.id, a])), []);
  const routesMap = useMemo(() => new Map(mockRoutes.map(r => [r.id, r])), []);

  // 1. Filtrar el conjunto de vuelos según los filtros aplicados
  const filteredFlights = useMemo(() => {
    const now = new Date();

    return mockFlights.filter(flight => {
      // Filtro 1: Rango de Fechas sobre scheduled_departure
      if (filters.dateRange !== 'all') {
        const flightDate = new Date(flight.scheduled_departure);
        const diffDays = (now.getTime() - flightDate.getTime()) / (1000 * 60 * 60 * 24);

        if (filters.dateRange === '7d' && (diffDays > 7 || diffDays < 0)) return false;
        if (filters.dateRange === '15d' && (diffDays > 15 || diffDays < 0)) return false;
        if (filters.dateRange === '30d' && (diffDays > 30 || diffDays < 0)) return false;
        if (filters.dateRange === '60d' && (diffDays > 60 || diffDays < 0)) return false;
        if (filters.dateRange === 'scheduled' && flight.status !== 'scheduled') return false;
      }

      // Filtro 2: Ruta o Región
      if (filters.routeOrRegion !== 'all') {
        const route = routesMap.get(flight.route_id);
        if (!route) return false;

        if (filters.routeOrRegion.startsWith('region:')) {
          const targetRegion = filters.routeOrRegion.replace('region:', '');
          if (route.region !== targetRegion) return false;
        } else if (filters.routeOrRegion.startsWith('route:')) {
          const targetRouteId = filters.routeOrRegion.replace('route:', '');
          if (flight.route_id !== targetRouteId) return false;
        }
      }

      // Filtro 3: Modelo de Aeronave
      if (filters.aircraftModel !== 'all') {
        const aircraft = aircraftsMap.get(flight.aircraft_id);
        if (!aircraft || aircraft.model !== filters.aircraftModel) return false;
      }

      // Filtro 4: Estado del Vuelo
      if (filters.status !== 'all') {
        if (flight.status !== filters.status) return false;
      }

      return true;
    });
  }, [filters, routesMap, aircraftsMap]);

  // 2. Cálculo dinámico estricto de todos los KPIs y fórmulas sobre el array filtrado
  const kpis = useMemo(() => {
    return calculateDashboardKPIs(filteredFlights, mockRoutes, mockBookings, mockAirports);
  }, [filteredFlights]);

  // Manejador para reiniciar todos los filtros
  const handleResetFilters = () => {
    setFilters({
      dateRange: 'all',
      routeOrRegion: 'all',
      aircraftModel: 'all',
      status: 'all'
    });
  };

  // Manejador para registrar nueva decisión
  const handleSaveDecision = (newDecision) => {
    setDecisions(prev => [newDecision, ...prev]);
  };

  const handleUpdateDecisionStatus = (id, newStatus) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleOpenDecisionModal = (type = 'fleet_reassignment') => {
    setDefaultDecisionType(type);
    setIsDecisionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col md:flex-row antialiased selection:bg-coral-100 selection:text-coral-700">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDecisionModal={handleOpenDecisionModal}
        user={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* BARRA SUPERIOR DE FILTROS GLOBALES (Siempre visible en la parte superior) */}
          <FiltersBar 
            filters={filters}
            setFilters={setFilters}
            routes={mockRoutes}
            aircrafts={mockAircrafts}
            totalFlightsCount={mockFlights.length}
            filteredFlightsCount={filteredFlights.length}
          />

          {/* Executive Header Banner */}
          <Header 
            user={currentUser} 
            onQuickAction={handleOpenDecisionModal}
            kpis={kpis}
          />

          {/* 1. TOP KPI CARDS (Calculados dinámicamente con fórmulas del documento) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Factor de Ocupación */}
            <KPICard 
              title="Factor de Ocupación"
              value={`${kpis.loadFactor}%`}
              subtext={`${kpis.totalSeatsSold.toLocaleString()} de ${kpis.totalSeatsCapacity.toLocaleString()} asientos`}
              formula="sum(seats_sold) / sum(seats_capacity) × 100"
              status={kpis.loadFactor >= 80 ? 'positive' : kpis.loadFactor >= 70 ? 'warning' : 'alert'}
              icon={Percent}
              progress={kpis.loadFactor}
              progressTarget="> 80%"
            />

            {/* KPI 2: RASK (Revenue per Available Seat Kilometer) */}
            <KPICard 
              title="RASK (Ingreso / Asiento-km)"
              value={`$${kpis.rask.toFixed(4)}`}
              suffix=" USD"
              subtext={`Ingresos: $${kpis.totalRevenue.toLocaleString()} USD`}
              formula="sum(revenue) / sum(seats_capacity × distance_km)"
              status="coral"
              icon={DollarSign}
            />

            {/* KPI 3: Tasa de Cancelaciones (Corregido: value y progress coinciden al 100%) */}
            <KPICard 
              title="Tasa de Cancelaciones"
              value={`${kpis.cancellationRate}%`}
              subtext={`${filteredFlights.filter(f => f.status === 'cancelled').length} vuelos cancelados`}
              formula="vuelos cancelled / total de vuelos × 100"
              status={kpis.cancellationRate <= 5 ? 'positive' : kpis.cancellationRate <= 10 ? 'warning' : 'alert'}
              icon={AlertOctagon}
              progress={kpis.cancellationRate}
              progressTarget="< 5.0%"
            />

            {/* KPI 4: Puntualidad (OTP) */}
            <KPICard 
              title="Puntualidad (OTP ≤ 15 min)"
              value={`${kpis.otp}%`}
              subtext="Vuelos operados dentro de margen"
              formula="completed con dep y arr delay ≤ 15m / total completed × 100"
              status={kpis.otp >= 80 ? 'positive' : kpis.otp >= 70 ? 'warning' : 'alert'}
              icon={Clock}
              progress={kpis.otp}
              progressTarget="≥ 80%"
            />
          </div>

          {/* Empty state si no hay vuelos coincidentes */}
          {filteredFlights.length === 0 && (
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-card text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">Sin resultados</h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                No se encontraron vuelos que coincidan con los filtros seleccionados. Ningún KPI produce errores o valores inválidos.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-coral-400" />
                <span>Restablecer filtros</span>
              </button>
            </div>
          )}

          {/* 2 & 3. CHARTS GRID (Recharts) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico 1: Ingresos por Ruta (Bar Chart) - Ocupa 2 columnas */}
            <div className="lg:col-span-2">
              <RevenueByRouteChart data={kpis.revenueByRoute} />
            </div>

            {/* Gráfico 2: Reservas por Estado (Donut Chart) */}
            <div className="lg:col-span-1">
              <BookingsByStatusChart data={kpis.bookingsByStatus} />
            </div>
          </div>

          {/* 4 & 5. LINE & CAUSES CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico 3: Evolución de Ingresos y Ocupación en el Tiempo (Line/Area Chart) */}
            <div className="lg:col-span-2">
              <RevenueTimelineChart data={kpis.timeSeriesData} />
            </div>

            {/* Gráfico 4: Causas de Cancelación */}
            <div className="lg:col-span-1">
              <CancellationCausesChart data={kpis.cancellationCauses} />
            </div>
          </div>

          {/* Extra Operational Chart: Turnaround por Aeropuerto vs Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TurnaroundChart data={kpis.turnaroundByAirport} />
            </div>

            {/* Panel de Decisiones Gerenciales */}
            <div className="lg:col-span-1">
              <DecisionsPanel 
                decisions={decisions}
                routes={mockRoutes}
                users={mockUsers}
                onOpenModal={handleOpenDecisionModal}
                onUpdateStatus={handleUpdateDecisionStatus}
              />
            </div>
          </div>

          {/* 6. TABLA DE VUELOS RECIENTES CON ALERTAS */}
          <div>
            <FlightsTable 
              flights={filteredFlights}
              routes={mockRoutes}
              aircrafts={mockAircrafts}
              onSelectFlight={() => {}}
            />
          </div>

        </div>
      </main>

      {/* Decision Registration Modal */}
      <DecisionModal 
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        onSaveDecision={handleSaveDecision}
        routes={mockRoutes}
        defaultType={defaultDecisionType}
        currentUser={currentUser}
      />

      {/* Floating AI Chat Window (Agente n8n) */}
      <FloatingChat 
        kpis={kpis}
        filters={filters}
        filteredFlights={filteredFlights}
        routes={mockRoutes}
        activeTab={activeTab}
        totalFlightsCount={filteredFlights.length}
      />
    </div>
  );
}
