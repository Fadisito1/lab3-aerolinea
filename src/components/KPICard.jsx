import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function KPICard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  subtext, 
  formula,
  status = 'default', // 'positive' (green), 'warning' (yellow/coral), 'alert' (rose), 'info' (blue)
  icon: Icon,
  progress,
  progressTarget
}) {
  const statusStyles = {
    positive: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      iconBg: 'bg-emerald-100 text-emerald-600',
      accentColor: 'text-emerald-600',
      barColor: 'bg-emerald-500'
    },
    warning: {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
      iconBg: 'bg-amber-100 text-amber-600',
      accentColor: 'text-amber-600',
      barColor: 'bg-amber-500'
    },
    alert: {
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/60',
      iconBg: 'bg-rose-100 text-rose-600',
      accentColor: 'text-rose-600',
      barColor: 'bg-rose-500'
    },
    info: {
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
      iconBg: 'bg-blue-100 text-blue-600',
      accentColor: 'text-blue-600',
      barColor: 'bg-blue-500'
    },
    coral: {
      badgeBg: 'bg-coral-50 text-coral-700 border-coral-200/60',
      iconBg: 'bg-coral-100 text-coral-600',
      accentColor: 'text-coral-600',
      barColor: 'bg-coral-500'
    },
    default: {
      badgeBg: 'bg-stone-100 text-stone-700 border-stone-200/60',
      iconBg: 'bg-stone-100 text-stone-600',
      accentColor: 'text-neutral-900',
      barColor: 'bg-neutral-900'
    }
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/70 shadow-card hover:shadow-float transition-all relative overflow-hidden group">
      {/* Top row: Label & Icon */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-neutral-500 tracking-tight flex items-center gap-1.5">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${style.iconBg} transition-transform group-hover:scale-105`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Metric Value */}
      <div className="flex items-baseline gap-1 my-1">
        {prefix && <span className="text-xl font-bold text-neutral-400">{prefix}</span>}
        <span className="text-3xl font-extrabold text-neutral-900 tracking-tight">{value}</span>
        {suffix && <span className="text-base font-semibold text-neutral-500">{suffix}</span>}
      </div>

      {/* Progress bar if applicable */}
      {typeof progress === 'number' && (
        <div className="my-2.5">
          <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${style.barColor}`} 
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          {progressTarget && (
            <div className="flex justify-between items-center text-[10px] text-neutral-600 font-medium mt-1">
              <span>Actual: {Number(progress.toFixed(1))}%</span>
              <span>Meta: {progressTarget}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Subtitle & Formula Note */}
      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
        <span className="text-neutral-600 font-medium truncate">{subtext}</span>
        {formula && (
          <div className="group/hint relative shrink-0 cursor-help ml-2">
            <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-600 font-mono transition-colors">
              <Info className="w-2.5 h-2.5" />
              <span>fó</span>
            </span>
            <div className="absolute bottom-full right-0 mb-1.5 hidden group-hover/hint:block z-30 w-52 p-2 bg-neutral-900 text-white text-[10px] leading-tight rounded-xl shadow-xl pointer-events-none font-sans">
              <p className="font-semibold text-coral-400 mb-0.5">Fórmula de cálculo:</p>
              <p className="font-mono text-stone-300">{formula}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
