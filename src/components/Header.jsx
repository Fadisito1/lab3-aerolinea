import React from 'react';
import { Sparkles, Sliders, TrendingUp, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Header({ 
  user, 
  onQuickAction,
  kpis 
}) {
  const quickActions = [
    {
      id: 'fleet_reassignment',
      title: 'Reasignar Flota',
      desc: 'Upsizing en rutas de alta demanda (>90%) o downsizing en subocupadas',
      icon: Sliders,
      badge: 'Capacidad'
    },
    {
      id: 'dynamic_pricing',
      title: 'Optimizar Precios',
      desc: 'Ajuste dinámico de tarifas base para maximizar Yield y RASK',
      icon: TrendingUp,
      badge: 'Revenue'
    },
    {
      id: 'turnaround_adjustment',
      title: 'Tiempos de Escala',
      desc: 'Reducir minutos de escala para elevar la puntualidad OTP (>80%)',
      icon: Clock,
      badge: 'Operaciones'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Greeting Banner (Inspired by SETO Visual Layout) */}
      <div className="text-center py-4 relative">
        {/* Subtle decorative glow/flower in background matching the image */}
        <div className="inline-flex items-center justify-center mb-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-coral-200 via-amber-100 to-rose-200 blur-md opacity-70 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-coral-500 drop-shadow-sm" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          ¡Bienvenida, {user?.full_name?.split(' ')[0] || 'María'}!
        </h1>
        <p className="text-sm text-neutral-600 font-medium mt-1 max-w-xl mx-auto">
          Control de ingresos, factor de ocupación, puntualidad y decisiones de flota en tiempo real.
        </p>
      </div>

      {/* Quick Action Suggestion Cards (Matching 3-card layout from SETO reference) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onQuickAction(action.id)}
              className="bg-white/80 hover:bg-white p-4 rounded-3xl border border-stone-200/70 shadow-card hover:shadow-float transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-2xl bg-stone-50 group-hover:bg-coral-50 text-neutral-700 group-hover:text-coral-600 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-neutral-600 group-hover:bg-coral-100 group-hover:text-coral-700 transition-colors">
                    {action.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 group-hover:text-coral-600 transition-colors">
                  {action.title}
                </h4>
                <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                  {action.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-coral-600 font-semibold">
                <span>Tomar acción</span>
                <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
