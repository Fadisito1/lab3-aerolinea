# AeroPulse - Dashboard de Revenue & Operaciones de Rutas (Aerolínea Virtual)

MVP de Dashboard para el **Gerente de Revenue & Operaciones de Rutas (Gerente Comercial Aéreo)**, desarrollado con **React + Vite**, estilizado con **Tailwind CSS** y gráficos interactivos con **Recharts**.

Inspirado en la interfaz de referencia con estética minimalista, fondo crema/hueso, esquinas redondeadas amplias (`rounded-3xl`), sombras suaves y acentos cromáticos semánticos.

---

## 🚀 Cómo ejecutar el proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrirá la aplicación en `http://localhost:3000`.

3. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 📊 Arquitectura de Datos (`src/data/mockData.js`)

Basado estrictamente en la especificación de `estructura_datos.md`:

- **Usuarios (4):** María Londoño (`revenue_manager`), Carlos Benítez (`admin`), Valentina Gómez (`ops_analyst`), Andrés Restrepo (`ops_analyst`).
- **Aeropuertos (8):** MDE, BOG, CTG, CLO, BAQ, SMR, MIA, MAD con tiempos de turnaround objetivo.
- **Aeronaves (6):** 2x Airbus A320 (180 asientos), 2x Airbus A321 (220 asientos), 2x ATR 72-600 (70 asientos, 1 en mantenimiento).
- **Rutas (12):** Troncales nacionales (MDE-BOG, BOG-CTG, BOG-CLO, etc.) e internacionales (BOG-MIA, MDE-MIA, BOG-MAD) con distancias reales en km.
- **Vuelos (72):** Distribuidos en los últimos 90 días con ~8.3% cancelados y ~78% de puntualidad (OTP).
- **Reservas:** Generadas programáticamente asegurando que `seats_sold` y `revenue` de cada vuelo correspondan exactamente a la suma de sus reservas confirmadas.
- **Decisiones (7):** Decisiones estratégicas del gerente (Upsizing, Downsizing, precios dinámicos y turnarounds).

---

## 🧮 Fórmulas y Cálculos Dinámicos

Ningún KPI es texto estático; todos se recalculan en tiempo real al aplicar filtros:

1. **Factor de Ocupación (Load Factor):**
   $$\frac{\sum \text{seats\_sold}}{\sum \text{seats\_capacity}} \times 100$$
   *(solo vuelos 'completed' o 'scheduled', excluyendo 'cancelled')*

2. **RASK (Revenue per Available Seat Kilometer):**
   $$\frac{\sum \text{revenue}}{\sum (\text{seats\_capacity} \times \text{distance\_km})}$$
   *(vuelos no cancelados, expresado en USD/ASK)*

3. **Tasa de Cancelaciones:**
   $$\frac{\text{vuelos 'cancelled'}}{\text{total de vuelos}} \times 100$$

4. **Puntualidad (OTP ≤ 15 min):**
   $$\frac{\text{vuelos 'completed' con retraso salida } \le 15 \text{ y llegada } \le 15}{\text{total vuelos 'completed'}} \times 100$$

5. **Ingresos por Ruta:**
   $\sum \text{revenue}$ agrupado por `route_id`.

6. **Reservas por Estado:**
   Conteo y monto agrupado por `confirmed`, `waitlist` y `cancelled`.

7. **Causas de Cancelación:**
   Conteo agrupado por `tecnica`, `clima` y `baja_demanda`.

8. **Turnaround Promedio por Aeropuerto:**
   $\text{avg}(\text{turnaround\_min})$ comparado contra la meta de escala de cada aeropuerto.

---

## 🎨 Componentes Principales

- **`Sidebar.jsx`**: Barra lateral moderna con logo, navegación, módulos de revenue y cápsula de perfil de usuario.
- **`Header.jsx`**: Saludo personalizado estilo SETO con micro-ilustración y tarjetas de acceso directo a decisiones.
- **`FiltersBar.jsx`**: Selectores reactivos para rango de fechas, rutas/regiones, modelo de aeronave y estado.
- **`KPICard.jsx`**: Tarjetas de métrica clave con barras de progreso, metas y tooltip con la fórmula matemática exacta.
- **`RevenueByRouteChart.jsx`**: Gráfico de barras interactivo con toggle para ingresos ($) u ocupación (%).
- **`BookingsByStatusChart.jsx`**: Gráfico de dona con total de reservas al centro y desglose de confirmadas, en espera y canceladas.
- **`RevenueTimelineChart.jsx`**: Gráfico de área dual para ingresos y factor de ocupación a lo largo del tiempo.
- **`CancellationCausesChart.jsx`**: Gráfico de causas con diagnósticos para decisiones de downsizing y ajuste de frecuencias.
- **`TurnaroundChart.jsx`**: Comparación de tiempos reales de escala frente a la meta del aeropuerto.
- **`FlightsTable.jsx`**: Tabla completa de vuelos con badges de alerta automática para subocupación (<70%), retrasos críticos (>15m) y cancelaciones con causa.
- **`DecisionsPanel.jsx` & `DecisionModal.jsx`**: Gestor interactivo para proponer y aplicar decisiones gerenciales.
- **`FloatingChat.jsx`**: Ventana de chat flotante conectada al webhook del Agente de IA de n8n, enviando en cada interacción el mensaje, sessionId persistido y el contexto en tiempo real con datos compactos:
  - `vista_actual`: módulo abierto en pantalla.
  - `filtros_activos`: fechas, ruta/región, avión y estado.
  - `kpis`: métricas globales recalculadas.
  - `rutas`: listado de todas las rutas del filtro ordenadas de menor a mayor ocupación (`ocupacion_pct`, `ingresos_usd`, `rask`, `vuelos_totales`, `vuelos_cancelados`, `otp_pct`).
  - `vuelos_con_mas_retraso`: Top 5 vuelos más retrasados.
  - `causas_cancelacion`: conteo por causa (`tecnica`, `clima`, `baja_demanda`).
  - `reservas_por_estado`: conteo de `confirmadas`, `lista_espera` y `canceladas`.
- **`MarkdownRenderer.jsx`**: Formateador ligero y seguro para renderizar respuestas con formato Markdown (`**negrita**`, listas, etc.).
- **`config.js`**: Archivo de configuración centralizado con las URLs de webhooks y constantes globales.
