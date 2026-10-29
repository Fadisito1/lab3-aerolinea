import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Plane, 
  CalendarCheck2, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Sliders, 
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenDecisionModal, user }) {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard General', icon: LayoutDashboard },
    { id: 'routes', label: 'Rutas & Revenue', icon: Compass },
    { id: 'flights', label: 'Vuelos & Puntualidad', icon: Plane },
    { id: 'fleet', label: 'Gestión de Flota', icon: Layers },
    { id: 'turnaround', label: 'Tiempos de Escala (OTP)', icon: Clock },
  ];

  const toolsItems = [
    { id: 'reassignment', label: 'Reasignar Flota (Upsize/Downsize)', icon: Sliders },
    { id: 'pricing', label: 'Precios Dinámicos', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-cream-sidebar border-r border-stone-200/60 flex flex-col justify-between p-4 min-h-screen select-none">
      <div className="space-y-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-sm shadow-black/10">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-neutral-900 tracking-tight text-lg">AEROPULSE</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-coral-100 text-coral-600">v1.2</span>
            </div>
            <p className="text-[11px] text-neutral-600 font-medium tracking-tight">Revenue & Operations</p>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase px-3 mb-2">Módulos</p>
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm shadow-black/10'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-coral-400' : 'text-neutral-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tactical Decision Tools */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase">Decisiones Gerenciales</span>
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
          </div>
          {toolsItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onOpenDecisionModal(item.id)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50 transition-all text-left"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-3.5 h-3.5 text-neutral-600" />
                  <span className="truncate">{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile Card (similar to SETO visual style) */}
      <div className="pt-4 border-t border-stone-200/60">
        <div className="p-3 bg-white/70 backdrop-blur-sm rounded-3xl border border-stone-200/70 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
              alt={user?.full_name || "Manager"}
              className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-neutral-900 truncate">{user?.full_name || "María Londoño"}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] text-neutral-600 font-medium truncate capitalize">
                  {user?.role ? user.role.replace('_', ' ') : 'Revenue Manager'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenDecisionModal()}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-coral-400" />
            <span>Registrar Decisión</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
