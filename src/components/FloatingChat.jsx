import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  AlertCircle, 
  RotateCcw,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { CONFIG } from '../config';
import MarkdownRenderer from './MarkdownRenderer';

// Generar y persistir un ID único por sesión usando crypto.randomUUID()
const getSessionId = () => {
  try {
    let sid = sessionStorage.getItem('aeropulse_chat_session_id');
    if (!sid) {
      sid = (typeof crypto !== 'undefined' && crypto.randomUUID) 
        ? crypto.randomUUID() 
        : 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('aeropulse_chat_session_id', sid);
    }
    return sid;
  } catch (e) {
    return 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  }
};

export default function FloatingChat({ 
  kpis, 
  filters, 
  filteredFlights = [], 
  routes = [], 
  activeTab = 'dashboard', 
  totalFlightsCount 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy tu **Copiloto de IA de Revenue & Operaciones**. Analizo en tiempo real los KPIs de ocupación, RASK, cancelaciones y puntualidad de AeroPulse con los filtros activos en tu pantalla. ¿En qué decisión de ruta o flota te puedo asistir hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sessionId = useRef(getSessionId()).current;

  // Auto-scroll al recibir o enviar mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      // Auto enfoque al abrir
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const quickPrompts = [
    "¿Qué ruta tiene menor ocupación?",
    "¿Cuál es el RASK actual y cómo mejorarlo?",
    "¿Cuáles son las causas de cancelación?"
  ];

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMessageId = `msg_${Date.now()}`;
    const newUserMsg = {
      id: userMessageId,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsLoading(true);

    // 1. Mapeo del nombre del módulo actual (vista_actual)
    const tabNames = {
      dashboard: 'Dashboard General',
      routes: 'Rutas & Revenue',
      flights: 'Vuelos & Puntualidad',
      fleet: 'Gestión de Flota',
      turnaround: 'Tiempos de Escala (OTP)'
    };
    const vista_actual = tabNames[activeTab] || activeTab || 'Dashboard General';

    // 2. Cálculo de rutas del filtro actual ordenadas de menor a mayor ocupación
    let matchingRoutes = routes;
    if (filters.routeOrRegion?.startsWith('region:')) {
      const targetRegion = filters.routeOrRegion.replace('region:', '');
      matchingRoutes = routes.filter(r => r.region === targetRegion);
    } else if (filters.routeOrRegion?.startsWith('route:')) {
      const targetRouteId = filters.routeOrRegion.replace('route:', '');
      matchingRoutes = routes.filter(r => r.id === targetRouteId);
    }

    const rutasCalculadas = matchingRoutes.map(route => {
      const rFlights = filteredFlights.filter(f => f.route_id === route.id);
      const vuelos_totales = rFlights.length;
      const vuelos_cancelados = rFlights.filter(f => f.status === 'cancelled').length;

      const operatingFlights = rFlights.filter(f => f.status === 'completed' || f.status === 'scheduled');
      const soldSeats = operatingFlights.reduce((acc, f) => acc + (f.seats_sold || 0), 0);
      const capSeats = operatingFlights.reduce((acc, f) => acc + (f.seats_capacity || 0), 0);
      const ocupacion_pct = capSeats > 0 ? Number(((soldSeats / capSeats) * 100).toFixed(1)) : 0;

      const ingresos_usd = operatingFlights.reduce((acc, f) => acc + (f.revenue || 0), 0);
      const ask = capSeats * route.distance_km;
      const rask = ask > 0 ? Number((ingresos_usd / ask).toFixed(4)) : 0;

      const completedFlights = rFlights.filter(f => f.status === 'completed');
      const onTimeFlights = completedFlights.filter(f => {
        const depOk = f.departure_delay_min !== null && f.departure_delay_min <= 15;
        const arrOk = f.arrival_delay_min !== null && f.arrival_delay_min <= 15;
        return depOk && arrOk;
      }).length;
      const otp_pct = completedFlights.length > 0 
        ? Number(((onTimeFlights / completedFlights.length) * 100).toFixed(1)) 
        : 0;

      return {
        codigo: route.code,
        ocupacion_pct,
        ingresos_usd,
        rask,
        vuelos_totales,
        vuelos_cancelados,
        otp_pct
      };
    }).sort((a, b) => a.ocupacion_pct - b.ocupacion_pct); // Ordenado de menor a mayor ocupación

    // 3. Top 5 vuelos con mayor retraso
    const routesMap = new Map(routes.map(r => [r.id, r]));
    const vuelos_con_mas_retraso = [...filteredFlights]
      .filter(f => f.status !== 'cancelled' && (
        (f.departure_delay_min !== null && f.departure_delay_min > 0) || 
        (f.arrival_delay_min !== null && f.arrival_delay_min > 0)
      ))
      .map(f => {
        const delay = Math.max(f.departure_delay_min || 0, f.arrival_delay_min || 0);
        const route = routesMap.get(f.route_id);
        return {
          numero_vuelo: f.flight_number,
          ruta: route ? route.code : f.route_id,
          minutos_retraso: delay
        };
      })
      .sort((a, b) => b.minutos_retraso - a.minutos_retraso)
      .slice(0, 5);

    // 4. Causas de cancelación sobre los vuelos filtrados
    const causas_cancelacion = {
      tecnica: 0,
      clima: 0,
      baja_demanda: 0
    };
    filteredFlights.forEach(f => {
      if (f.status === 'cancelled') {
        if (f.cancellation_cause === 'tecnica') causas_cancelacion.tecnica++;
        else if (f.cancellation_cause === 'clima') causas_cancelacion.clima++;
        else if (f.cancellation_cause === 'baja_demanda') causas_cancelacion.baja_demanda++;
      }
    });

    // 5. Reservas por estado
    const reservas_por_estado = {
      confirmadas: kpis.bookingsByStatus?.find(b => b.name === 'Confirmadas')?.value || 0,
      lista_espera: kpis.bookingsByStatus?.find(b => b.name === 'Lista de Espera')?.value || 0,
      canceladas: kpis.bookingsByStatus?.find(b => b.name === 'Canceladas')?.value || 0
    };

    // Preparar el payload con el contexto ampliado y compacto
    const payload = {
      message: text.trim(),
      sessionId: sessionId,
      contexto: {
        vista_actual,
        filtros_activos: {
          rango_fechas: filters.dateRange,
          ruta_o_region: filters.routeOrRegion,
          modelo_aeronave: filters.aircraftModel,
          estado_vuelo: filters.status,
          vuelos_coincidentes: totalFlightsCount
        },
        kpis: {
          factor_ocupacion_pct: kpis.loadFactor,
          rask: kpis.rask,
          tasa_cancelaciones_pct: kpis.cancellationRate,
          otp_pct: kpis.otp,
          ingresos_usd: kpis.totalRevenue,
          asientos_vendidos: kpis.totalSeatsSold,
          capacidad_total: kpis.totalSeatsCapacity
        },
        rutas: rutasCalculadas,
        vuelos_con_mas_retraso,
        causas_cancelacion,
        reservas_por_estado
      }
    };

    try {
      const response = await fetch(CONFIG.N8N_AI_AGENT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      
      // Obtener el campo 'response' según la especificación
      const rawText = data?.response || data?.output || data?.text;
      const assistantText = typeof rawText === 'string' 
        ? rawText 
        : typeof rawText === 'object' 
          ? JSON.stringify(rawText, null, 2) 
          : 'No se recibió respuesta en el campo esperado.';

      const newAssistantMsg = {
        id: `msg_bot_${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAssistantMsg]);
      if (!isOpen) setHasUnread(true);

    } catch (error) {
      console.error('Error al conectar con webhook n8n:', error);
      const errorMsg = {
        id: `msg_err_${Date.now()}`,
        sender: 'assistant',
        isError: true,
        text: 'No pude conectar con el asistente, intenta de nuevo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      if (!isOpen) setHasUnread(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón Flotante Redondo Abajo a la Derecha */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar chat de IA" : "Abrir chat de IA"}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            isOpen 
              ? 'bg-neutral-900 text-white rotate-90 scale-95 hover:bg-neutral-800' 
              : 'bg-gradient-to-tr from-coral-600 via-coral-500 to-amber-500 text-white hover:scale-105 hover:shadow-coral-500/30'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              {/* Badge pulsante cuando hay mensajes o sugerencia */}
              {hasUnread && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full animate-ping" />
              )}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </>
          )}
        </button>
      </div>

      {/* Panel del Chat Flotante */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-40 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] bg-cream-50/95 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header del Chat */}
          <div className="px-5 py-4 bg-white/80 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 to-amber-400 flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-neutral-900">Agente de IA n8n</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-coral-100 text-coral-700">
                    En vivo
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 font-medium">Copiloto Revenue & Ops</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-neutral-600 transition-colors"
                title="Minimizar chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Pill Banner (Informa que el agente conoce los filtros activos) */}
          <div className="px-4 py-1.5 bg-stone-100/90 border-b border-stone-200/60 text-[10px] text-neutral-700 flex items-center justify-between">
            <span className="truncate">
              📊 Contexto sincronizado: <strong>{kpis.loadFactor}%</strong> Ocup. | RASK: <strong>${kpis.rask.toFixed(4)}</strong>
            </span>
            <span className="text-emerald-700 font-bold shrink-0 ml-1">● Conectado</span>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-coral-100 text-coral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                      isAssistant
                        ? msg.isError
                          ? 'bg-rose-50 border border-rose-200 text-rose-800'
                          : 'bg-white border border-stone-200/80 text-neutral-800'
                        : 'bg-neutral-900 text-white'
                    }`}
                  >
                    {msg.isError ? (
                      <div className="flex items-start gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold">{msg.text}</p>
                          <button
                            onClick={() => handleSendMessage(messages[messages.length - 2]?.text)}
                            className="mt-1.5 text-[10px] font-bold text-coral-600 hover:underline flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reintentar</span>
                          </button>
                        </div>
                      </div>
                    ) : isAssistant ? (
                      <MarkdownRenderer content={msg.text} />
                    ) : (
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}

                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isAssistant ? 'text-neutral-500' : 'text-neutral-300'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indicador de "Escribiendo..." */}
            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-600 text-xs py-1">
                <div className="w-7 h-7 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200/80 rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-1.5">
                  <span className="text-xs text-neutral-600 font-medium">escribiendo</span>
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (Sugerencias Rápidas) */}
          <div className="px-3 pt-2 pb-1 border-t border-stone-200/60 bg-white/50 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                disabled={isLoading}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-coral-50 hover:text-coral-700 hover:border-coral-200 text-[11px] font-semibold text-neutral-700 border border-stone-200 transition-all shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box y Botón Enviar */}
          <div className="p-3 bg-white border-t border-stone-200/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Pregunta al agente sobre rutas, flota o RASK..."
                value={inputMessage}
                disabled={isLoading}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-neutral-800 text-xs rounded-2xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-2xl bg-neutral-900 hover:bg-neutral-800 disabled:bg-stone-200 text-white disabled:text-stone-400 flex items-center justify-center transition-all shrink-0 shadow-xs"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4 text-coral-400" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
