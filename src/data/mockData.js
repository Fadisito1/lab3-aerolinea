/**
 * MOCK DATA & GENERATION ENGINE
 * Basado estrictamente en estructura_datos.md para Aerolínea Virtual (AeroPulse).
 * Cumple con todas las reglas de generación y relaciones de entidades.
 */

// 1. Usuarios (Equipo comercial y operaciones)
export const mockUsers = [
  {
    id: "u1",
    full_name: "María Londoño",
    email: "maria.londono@aeropulse.com",
    role: "revenue_manager",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "active"
  },
  {
    id: "u2",
    full_name: "Carlos Benítez",
    email: "carlos.benitez@aeropulse.com",
    role: "admin",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "active"
  },
  {
    id: "u3",
    full_name: "Valentina Gómez",
    email: "valentina.gomez@aeropulse.com",
    role: "ops_analyst",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    status: "active"
  },
  {
    id: "u4",
    full_name: "Andrés Restrepo",
    email: "andres.restrepo@aeropulse.com",
    role: "ops_analyst",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "active"
  }
];

// 2. Aeropuertos (8 aeropuertos)
export const mockAirports = [
  {
    id: "ap1",
    iata_code: "MDE",
    name: "Aeropuerto José María Córdova",
    city: "Medellín",
    country: "Colombia",
    target_turnaround_min: 45
  },
  {
    id: "ap2",
    iata_code: "BOG",
    name: "Aeropuerto Internacional El Dorado",
    city: "Bogotá",
    country: "Colombia",
    target_turnaround_min: 50
  },
  {
    id: "ap3",
    iata_code: "CTG",
    name: "Aeropuerto Rafael Núñez",
    city: "Cartagena",
    country: "Colombia",
    target_turnaround_min: 40
  },
  {
    id: "ap4",
    iata_code: "CLO",
    name: "Aeropuerto Alfonso Bonilla Aragón",
    city: "Cali",
    country: "Colombia",
    target_turnaround_min: 45
  },
  {
    id: "ap5",
    iata_code: "BAQ",
    name: "Aeropuerto Ernesto Cortissoz",
    city: "Barranquilla",
    country: "Colombia",
    target_turnaround_min: 40
  },
  {
    id: "ap6",
    iata_code: "SMR",
    name: "Aeropuerto Simón Bolívar",
    city: "Santa Marta",
    country: "Colombia",
    target_turnaround_min: 35
  },
  {
    id: "ap7",
    iata_code: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    country: "Estados Unidos",
    target_turnaround_min: 60
  },
  {
    id: "ap8",
    iata_code: "MAD",
    name: "Aeropuerto Adolfo Suárez Madrid-Barajas",
    city: "Madrid",
    country: "España",
    target_turnaround_min: 75
  }
];

// 3. Aeronaves (Flota - 3 modelos, 6 aeronaves, 1 en mantenimiento)
export const mockAircrafts = [
  {
    id: "ac1",
    registration: "HK-5001",
    model: "Airbus A320",
    capacity_seats: 180,
    fuel_cost_per_km: 4.2,
    status: "active"
  },
  {
    id: "ac2",
    registration: "HK-5002",
    model: "Airbus A320",
    capacity_seats: 180,
    fuel_cost_per_km: 4.2,
    status: "active"
  },
  {
    id: "ac3",
    registration: "HK-5101",
    model: "Airbus A321",
    capacity_seats: 220,
    fuel_cost_per_km: 4.8,
    status: "active"
  },
  {
    id: "ac4",
    registration: "HK-5102",
    model: "Airbus A321",
    capacity_seats: 220,
    fuel_cost_per_km: 4.8,
    status: "active"
  },
  {
    id: "ac5",
    registration: "HK-4201",
    model: "ATR 72-600",
    capacity_seats: 70,
    fuel_cost_per_km: 2.1,
    status: "active"
  },
  {
    id: "ac6",
    registration: "HK-4202",
    model: "ATR 72-600",
    capacity_seats: 70,
    fuel_cost_per_km: 2.1,
    status: "maintenance" // En mantenimiento como especifica la regla
  }
];

// 4. Rutas (12 rutas: nacionales e internacionales, distancias reales aproximadas)
export const mockRoutes = [
  {
    id: "r1",
    code: "MDE-BOG",
    origin_airport_id: "ap1",
    destination_airport_id: "ap2",
    distance_km: 240,
    region: "nacional",
    weekly_frequency: 28,
    base_fare: 68,
    status: "active",
    demand_profile: "high" // Alta demanda persistente
  },
  {
    id: "r2",
    code: "BOG-MDE",
    origin_airport_id: "ap2",
    destination_airport_id: "ap1",
    distance_km: 240,
    region: "nacional",
    weekly_frequency: 28,
    base_fare: 68,
    status: "active",
    demand_profile: "high"
  },
  {
    id: "r3",
    code: "BOG-CTG",
    origin_airport_id: "ap2",
    destination_airport_id: "ap3",
    distance_km: 660,
    region: "nacional",
    weekly_frequency: 21,
    base_fare: 92,
    status: "active",
    demand_profile: "high"
  },
  {
    id: "r4",
    code: "MDE-CTG",
    origin_airport_id: "ap1",
    destination_airport_id: "ap3",
    distance_km: 470,
    region: "nacional",
    weekly_frequency: 14,
    base_fare: 84,
    status: "active",
    demand_profile: "medium"
  },
  {
    id: "r5",
    code: "BOG-CLO",
    origin_airport_id: "ap2",
    destination_airport_id: "ap4",
    distance_km: 300,
    region: "nacional",
    weekly_frequency: 21,
    base_fare: 65,
    status: "active",
    demand_profile: "medium"
  },
  {
    id: "r6",
    code: "MDE-CLO",
    origin_airport_id: "ap1",
    destination_airport_id: "ap4",
    distance_km: 330,
    region: "nacional",
    weekly_frequency: 14,
    base_fare: 62,
    status: "active",
    demand_profile: "low" // Ruta subocupada
  },
  {
    id: "r7",
    code: "BOG-BAQ",
    origin_airport_id: "ap2",
    destination_airport_id: "ap5",
    distance_km: 710,
    region: "nacional",
    weekly_frequency: 14,
    base_fare: 85,
    status: "active",
    demand_profile: "medium"
  },
  {
    id: "r8",
    code: "MDE-SMR",
    origin_airport_id: "ap1",
    destination_airport_id: "ap6",
    distance_km: 575,
    region: "nacional",
    weekly_frequency: 10,
    base_fare: 79,
    status: "active",
    demand_profile: "medium"
  },
  {
    id: "r9",
    code: "BOG-MIA",
    origin_airport_id: "ap2",
    destination_airport_id: "ap7",
    distance_km: 2430,
    region: "internacional",
    weekly_frequency: 14,
    base_fare: 310,
    status: "active",
    demand_profile: "high" // Alta demanda internacional
  },
  {
    id: "r10",
    code: "MDE-MIA",
    origin_airport_id: "ap1",
    destination_airport_id: "ap7",
    distance_km: 2240,
    region: "internacional",
    weekly_frequency: 7,
    base_fare: 325,
    status: "active",
    demand_profile: "high"
  },
  {
    id: "r11",
    code: "BOG-MAD",
    origin_airport_id: "ap2",
    destination_airport_id: "ap8",
    distance_km: 8020,
    region: "internacional",
    weekly_frequency: 7,
    base_fare: 690,
    status: "active",
    demand_profile: "medium"
  },
  {
    id: "r12",
    code: "CLO-CTG",
    origin_airport_id: "ap4",
    destination_airport_id: "ap3",
    distance_km: 740,
    region: "nacional",
    weekly_frequency: 7,
    base_fare: 78,
    status: "active",
    demand_profile: "low" // Ruta subocupada (candidata a downsizing)
  }
];

// 6. Pasajeros (20 pasajeros con diferentes niveles de lealtad)
export const mockPassengers = [
  { id: "p1", full_name: "Alejandro Morales", email: "a.morales@gmail.com", nationality: "Colombia", loyalty_tier: "platinum", created_at: "2024-01-15T10:00:00Z" },
  { id: "p2", full_name: "Camila Torres", email: "ctorres@outlook.com", nationality: "Colombia", loyalty_tier: "gold", created_at: "2024-02-11T12:30:00Z" },
  { id: "p3", full_name: "Juan David Ramírez", email: "jdramirez@yahoo.com", nationality: "Colombia", loyalty_tier: "silver", created_at: "2024-03-01T09:15:00Z" },
  { id: "p4", full_name: "Sofia Navarro", email: "s.navarro@gmail.com", nationality: "Colombia", loyalty_tier: "none", created_at: "2024-04-10T14:20:00Z" },
  { id: "p5", full_name: "Mateo Ospina", email: "mospina@corp.co", nationality: "Colombia", loyalty_tier: "gold", created_at: "2024-01-20T16:45:00Z" },
  { id: "p6", full_name: "Laura Herrera", email: "l.herrera@gmail.com", nationality: "Colombia", loyalty_tier: "platinum", created_at: "2023-11-05T08:00:00Z" },
  { id: "p7", full_name: "Michael Smith", email: "msmith@usmail.com", nationality: "Estados Unidos", loyalty_tier: "gold", created_at: "2024-05-18T11:10:00Z" },
  { id: "p8", full_name: "David Chen", email: "dchen@global.net", nationality: "Estados Unidos", loyalty_tier: "silver", created_at: "2024-02-22T15:00:00Z" },
  { id: "p9", full_name: "Elena García", email: "egarcia@madrid.es", nationality: "España", loyalty_tier: "platinum", created_at: "2023-09-12T17:30:00Z" },
  { id: "p10", full_name: "Pablo Fernández", email: "pfernandez@iberia.es", nationality: "España", loyalty_tier: "none", created_at: "2024-06-03T10:40:00Z" },
  { id: "p11", full_name: "Isabella Castro", email: "icastro@gmail.com", nationality: "Colombia", loyalty_tier: "silver", created_at: "2024-04-05T13:25:00Z" },
  { id: "p12", full_name: "Santiago Vargas", email: "svargas@avian.co", nationality: "Colombia", loyalty_tier: "none", created_at: "2024-03-19T07:50:00Z" },
  { id: "p13", full_name: "Valeria Mendoza", email: "vmendoza@hotmail.com", nationality: "Colombia", loyalty_tier: "gold", created_at: "2024-02-28T18:15:00Z" },
  { id: "p14", full_name: "Daniel Rincón", email: "drincon@tech.io", nationality: "Colombia", loyalty_tier: "none", created_at: "2024-05-12T09:05:00Z" },
  { id: "p15", full_name: "Jessica Miller", email: "jmiller@travel.com", nationality: "Estados Unidos", loyalty_tier: "platinum", created_at: "2023-12-01T12:00:00Z" },
  { id: "p16", full_name: "Gabriel Silva", email: "gsilva@bogota.co", nationality: "Colombia", loyalty_tier: "silver", created_at: "2024-06-15T14:40:00Z" },
  { id: "p17", full_name: "Lucía Paredes", email: "lparedes@cali.co", nationality: "Colombia", loyalty_tier: "none", created_at: "2024-01-30T10:10:00Z" },
  { id: "p18", full_name: "Felipe Cardona", email: "fcardona@medellin.co", nationality: "Colombia", loyalty_tier: "gold", created_at: "2024-03-25T16:20:00Z" },
  { id: "p19", full_name: "Sarah Williams", email: "swilliams@florida.us", nationality: "Estados Unidos", loyalty_tier: "silver", created_at: "2024-04-20T11:55:00Z" },
  { id: "p20", full_name: "Carlos Mario Duque", email: "cmduque@empresas.co", nationality: "Colombia", loyalty_tier: "platinum", created_at: "2023-10-14T08:30:00Z" }
];

// Generador pseudoaleatorio con semilla fija para determinismo y reproducibilidad
class SeededRandom {
  constructor(seed = 123456789) {
    this.seed = seed;
  }
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min, max) {
    return min + this.next() * (max - min);
  }
  rangeInt(min, max) {
    return Math.floor(this.range(min, max + 1));
  }
  choice(array) {
    return array[this.rangeInt(0, array.length - 1)];
  }
}

/**
 * Función generadora de Vuelos y Reservas
 * Cumple con las especificaciones de estructura_datos.md:
 * - Al menos 60 vuelos distribuidos en los últimos 3 meses (generamos 72 vuelos)
 * - ~8% cancelados (con causas: 'tecnica', 'clima', 'baja_demanda')
 * - Retrasos variados (~75-80% puntual OTP <= 15 min)
 * - Rutas claramente subocupadas (ej: CLO-CTG ~50-60%) y sobre-demandadas (ej: MDE-BOG, BOG-MIA ~90-95%)
 * - Reservas generadas dinámicamente:
 *   - seats_sold = suma exacta de passengers_count de reservas 'confirmed'
 *   - revenue = suma exacta de amount de reservas 'confirmed'
 *   - Incluye reservas 'waitlist' y 'cancelled' que NO suman a seats_sold ni revenue
 */
export function generateFlightsAndBookings() {
  const rng = new SeededRandom(42);
  const flights = [];
  const bookings = [];

  const activeAircrafts = mockAircrafts.filter(a => a.status === 'active');
  const now = new Date();
  
  // Total de 72 vuelos distribuidos en los últimos 90 días hasta los próximos 5 días
  const totalFlights = 72;
  let bookingIdCounter = 1;

  for (let i = 1; i <= totalFlights; i++) {
    const flightId = `f${i}`;
    const flightNumber = `AV${100 + (i % 899)}`;
    
    // Seleccionar ruta cíclicamente para tener buena representatividad en todas las 12 rutas
    const route = mockRoutes[(i - 1) % mockRoutes.length];
    
    // Seleccionar avión compatible (rutas internacionales usan A321 o A320; rutas cortas ATR o A320)
    let eligibleAircrafts;
    if (route.region === 'internacional') {
      eligibleAircrafts = activeAircrafts.filter(a => a.model !== 'ATR 72-600');
    } else if (route.demand_profile === 'low') {
      eligibleAircrafts = activeAircrafts;
    } else {
      eligibleAircrafts = activeAircrafts.filter(a => a.capacity_seats >= 180);
    }
    const aircraft = rng.choice(eligibleAircrafts);
    const capacitySeats = aircraft.capacity_seats;

    // Fecha programada distribuida en los últimos 90 días
    // i va de 1 a 72; los primeros son más antiguos, los últimos recientes o próximos
    const daysAgo = Math.floor(88 - (i * 1.25));
    const schedDep = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    schedDep.setHours(6 + ((i * 3) % 16), (i * 15) % 60, 0, 0);

    // Duración de vuelo estimada basada en distancia (velocidad aprox 700 km/h + 30 min maniobra)
    const flightDurationMin = Math.round((route.distance_km / 700) * 60 + 30);
    const schedArr = new Date(schedDep.getTime() + flightDurationMin * 60 * 1000);

    // Estado del vuelo:
    // ~8% cancelados (aprox 6 de 72 vuelos)
    // Los vuelos futuros (daysAgo < 0) son 'scheduled'
    // Los demás son 'completed'
    let status = 'completed';
    let cancellationCause = null;
    let depDelayMin = null;
    let arrDelayMin = null;
    let turnaroundMin = null;
    let actualDep = null;
    let actualArr = null;

    const isCancelledIndex = [8, 21, 35, 49, 63, 68].includes(i); // 6 vuelos cancelados = 8.3%

    if (daysAgo < -1) {
      status = 'scheduled';
      turnaroundMin = null;
    } else if (isCancelledIndex) {
      status = 'cancelled';
      const causes = ['tecnica', 'clima', 'baja_demanda'];
      cancellationCause = causes[i % causes.length];
      depDelayMin = null;
      arrDelayMin = null;
      turnaroundMin = null;
    } else {
      status = 'completed';
      // Puntualidad: ~78% dentro de 15 minutos (OTP positivo)
      const isDelayed = (i % 5 === 0); // 20% retrasados
      if (isDelayed) {
        depDelayMin = rng.rangeInt(18, 65);
        arrDelayMin = depDelayMin + rng.rangeInt(-10, 15);
      } else {
        depDelayMin = rng.rangeInt(-5, 12);
        arrDelayMin = rng.rangeInt(-10, 14);
      }

      actualDep = new Date(schedDep.getTime() + depDelayMin * 60 * 1000).toISOString();
      actualArr = new Date(schedArr.getTime() + arrDelayMin * 60 * 1000).toISOString();

      // Turnaround previo (minutos en escala)
      const originAirport = mockAirports.find(ap => ap.id === route.origin_airport_id);
      const targetTurnaround = originAirport ? originAirport.target_turnaround_min : 45;
      turnaroundMin = Math.max(25, Math.round(targetTurnaround + rng.range(-8, 14)));
    }

    // Determinar ocupación esperada según perfil de ruta
    let targetLoadFactor;
    if (route.demand_profile === 'high') {
      targetLoadFactor = rng.range(0.88, 0.98); // 88% - 98%
    } else if (route.demand_profile === 'medium') {
      targetLoadFactor = rng.range(0.72, 0.86); // 72% - 86%
    } else {
      targetLoadFactor = rng.range(0.46, 0.64); // 46% - 64% subocupada
    }

    // Si el vuelo fue cancelado por 'baja_demanda', la ocupación era crítica (<35%)
    if (status === 'cancelled' && cancellationCause === 'baja_demanda') {
      targetLoadFactor = rng.range(0.20, 0.32);
    }

    // Generar reservas correspondientes a este vuelo (número determinista de iteraciones, sin bucles while)
    let currentFlightConfirmedSeats = 0;
    let currentFlightConfirmedRevenue = 0;

    if (status === 'cancelled') {
      // Para vuelos cancelados: generar entre 2 y 4 reservas con status 'cancelled'
      // No suman a seats_sold ni revenue
      const cancelCount = rng.rangeInt(2, 4);
      for (let k = 0; k < cancelCount; k++) {
        const passenger = rng.choice(mockPassengers);
        const partySize = rng.rangeInt(1, 3);
        const bookingAmount = Math.round(route.base_fare * partySize * rng.range(0.95, 1.15));
        const bookingCreatedDate = new Date(schedDep.getTime() - rng.rangeInt(5, 30) * 24 * 60 * 60 * 1000);

        bookings.push({
          id: `b${bookingIdCounter++}`,
          booking_code: `CX${rng.rangeInt(10000, 99999)}${String.fromCharCode(65 + (bookingIdCounter % 26))}`,
          flight_id: flightId,
          passenger_id: passenger.id,
          agent_id: rng.choice(mockUsers).id,
          status: 'cancelled',
          fare_class: 'economy',
          passengers_count: partySize,
          amount: bookingAmount,
          currency: "USD",
          created_at: bookingCreatedDate.toISOString(),
          cancelled_at: schedDep.toISOString()
        });
      }
    } else {
      // Para vuelos completados o programados:
      // Generar reservas con número fijo determinista de iteraciones
      const targetSoldSeats = Math.max(1, Math.round(capacitySeats * targetLoadFactor));
      let remainingSeats = targetSoldSeats;
      const numBookings = Math.max(1, Math.round(targetSoldSeats / 2.2));

      for (let k = 0; k < numBookings && remainingSeats > 0; k++) {
        const isLast = (k === numBookings - 1);
        const partySize = isLast ? remainingSeats : Math.min(rng.rangeInt(1, 4), remainingSeats);
        if (partySize <= 0) break;

        remainingSeats -= partySize;
        const passenger = rng.choice(mockPassengers);
        const agent = rng.choice(mockUsers);

        // Clase tarifaria
        const fareRand = rng.next();
        let fareClass = 'economy';
        let multiplier = 1.0;
        if (fareRand > 0.88) {
          fareClass = 'business';
          multiplier = 2.4;
        } else if (fareRand > 0.70) {
          fareClass = 'premium';
          multiplier = 1.45;
        }

        const bookingAmount = Math.round(route.base_fare * multiplier * partySize * rng.range(0.92, 1.15));
        const bookingCreatedDate = new Date(schedDep.getTime() - rng.rangeInt(2, 45) * 24 * 60 * 60 * 1000);

        bookings.push({
          id: `b${bookingIdCounter++}`,
          booking_code: `BK${rng.rangeInt(10000, 99999)}${String.fromCharCode(65 + (bookingIdCounter % 26))}`,
          flight_id: flightId,
          passenger_id: passenger.id,
          agent_id: agent.id,
          status: 'confirmed',
          fare_class: fareClass,
          passengers_count: partySize,
          amount: bookingAmount,
          currency: "USD",
          created_at: bookingCreatedDate.toISOString(),
          cancelled_at: null
        });

        currentFlightConfirmedSeats += partySize;
        currentFlightConfirmedRevenue += bookingAmount;
      }
    }

    // Generar algunas reservas en 'waitlist' (lista de espera para vuelos casi llenos)
    if (targetLoadFactor > 0.85 && status !== 'cancelled') {
      const waitlistCount = rng.rangeInt(1, 3);
      for (let w = 0; w < waitlistCount; w++) {
        const passenger = rng.choice(mockPassengers);
        const partySize = rng.rangeInt(1, 2);
        bookings.push({
          id: `b${bookingIdCounter++}`,
          booking_code: `WL${rng.rangeInt(10000, 99999)}`,
          flight_id: flightId,
          passenger_id: passenger.id,
          agent_id: rng.choice(mockUsers).id,
          status: 'waitlist',
          fare_class: 'economy',
          passengers_count: partySize,
          amount: Math.round(route.base_fare * partySize),
          currency: "USD",
          created_at: new Date(schedDep.getTime() - rng.rangeInt(1, 5) * 24 * 60 * 60 * 1000).toISOString(),
          cancelled_at: null
        });
      }
    }

    // Generar algunas reservas canceladas previamente por los usuarios
    const userCancelCount = rng.rangeInt(0, 2);
    for (let c = 0; c < userCancelCount; c++) {
      const passenger = rng.choice(mockPassengers);
      const partySize = rng.rangeInt(1, 3);
      bookings.push({
        id: `b${bookingIdCounter++}`,
        booking_code: `CX${rng.rangeInt(10000, 99999)}`,
        flight_id: flightId,
        passenger_id: passenger.id,
        agent_id: rng.choice(mockUsers).id,
        status: 'cancelled',
        fare_class: 'economy',
        passengers_count: partySize,
        amount: Math.round(route.base_fare * partySize),
        currency: "USD",
        created_at: new Date(schedDep.getTime() - rng.rangeInt(10, 30) * 24 * 60 * 60 * 1000).toISOString(),
        cancelled_at: new Date(schedDep.getTime() - rng.rangeInt(1, 9) * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    // Crear el registro de vuelo con consistencia matemática
    // Si fue cancelado, seats_sold = 0 y revenue = 0 (o lo que quedó facturado según reglas)
    const finalSeatsSold = (status === 'cancelled') ? 0 : currentFlightConfirmedSeats;
    const finalRevenue = (status === 'cancelled') ? 0 : currentFlightConfirmedRevenue;

    flights.push({
      id: flightId,
      flight_number: flightNumber,
      route_id: route.id,
      aircraft_id: aircraft.id,
      scheduled_departure: schedDep.toISOString(),
      actual_departure: actualDep,
      scheduled_arrival: schedArr.toISOString(),
      actual_arrival: actualArr,
      status: status,
      departure_delay_min: depDelayMin,
      arrival_delay_min: arrDelayMin,
      turnaround_min: turnaroundMin,
      seats_capacity: capacitySeats,
      seats_sold: finalSeatsSold,
      revenue: finalRevenue,
      cancellation_cause: cancellationCause
    });
  }

  // Ordenar vuelos de más recientes a más antiguos para la tabla
  flights.sort((a, b) => new Date(b.scheduled_departure) - new Date(a.scheduled_departure));

  return { flights, bookings };
}

// 8. Tabla de Decisiones (Acciones tomadas por el Gerente de Revenue & Operaciones)
export const initialDecisions = [
  {
    id: "d1",
    type: "fleet_reassignment",
    route_id: "r1", // MDE-BOG
    owner_id: "u1", // María Londoño
    description: "Upsizing: Cambiar A320 por A321 en ruta troncal MDE-BOG por alta demanda sostenida (>94%)",
    expected_impact: "+8.2% capacidad ofertada y +$18,400 USD de ingresos semanales",
    status: "applied",
    created_at: "2026-10-15T09:30:00Z"
  },
  {
    id: "d2",
    type: "dynamic_pricing",
    route_id: "r9", // BOG-MIA
    owner_id: "u1",
    description: "Ajuste dinámico: Incrementar tarifa base un 12% en vuelos de fin de semana por saturación",
    expected_impact: "+14.5% Yield por asiento y control de lista de espera",
    status: "applied",
    created_at: "2026-10-18T14:15:00Z"
  },
  {
    id: "d3",
    type: "fleet_reassignment",
    route_id: "r12", // CLO-CTG
    owner_id: "u1",
    description: "Downsizing: Reemplazar Airbus A320 por ATR 72-600 en CLO-CTG debido a ocupación subóptima (51%)",
    expected_impact: "Ahorro de $12,600 USD en combustible mensual y optimización de Factor de Ocupación a 86%",
    status: "proposed",
    created_at: "2026-10-22T11:00:00Z"
  },
  {
    id: "d4",
    type: "frequency_change",
    route_id: "r3", // BOG-CTG
    owner_id: "u1",
    description: "Añadir 3 frecuencias semanales nocturnas de jueves a domingo por alta demanda vacacional",
    expected_impact: "+$22,500 USD facturación proyectada con factor >85%",
    status: "proposed",
    created_at: "2026-10-24T16:45:00Z"
  },
  {
    id: "d5",
    type: "turnaround_adjustment",
    route_id: "r2", // BOG-MDE
    owner_id: "u3", // Valentina Gómez (Ops)
    description: "Nuevo protocolo de desembarque simultáneo por puertas delantera y trasera en BOG",
    expected_impact: "Reducción de turnaround promedio de 53 min a 44 min y +5% en puntualidad OTP",
    status: "applied",
    created_at: "2026-10-20T08:20:00Z"
  },
  {
    id: "d6",
    type: "dynamic_pricing",
    route_id: "r6", // MDE-CLO
    owner_id: "u1",
    description: "Tarifa promocional 'Madrugador' con 18% descuento en salidas previas a las 07:00 AM",
    expected_impact: "Estimular demanda temprana y elevar ocupación del 54% al 70%",
    status: "dismissed",
    created_at: "2026-10-12T10:00:00Z"
  },
  {
    id: "d7",
    type: "frequency_change",
    route_id: "r11", // BOG-MAD
    owner_id: "u1",
    description: "Consolidar 1 vuelo semanal en temporada baja para optimizar costo por asiento-km",
    expected_impact: "+0.008 USD en RASK y reducción de costos operativos en un 14%",
    status: "proposed",
    created_at: "2026-10-26T15:10:00Z"
  }
];

// Generar una única instancia de vuelos y reservas al iniciar
const generated = generateFlightsAndBookings();
export const mockFlights = generated.flights;
export const mockBookings = generated.bookings;

/**
 * CÁLCULO DINÁMICO DE KPIS Y FÓRMULAS
 * Estrictamente implementado según la sección "KPIs y fórmulas" de estructura_datos.md
 */
export function calculateDashboardKPIs(filteredFlights, allRoutes, filteredBookings, allAirports) {
  const routesMap = new Map(allRoutes.map(r => [r.id, r]));
  const airportsMap = new Map(allAirports.map(a => [a.id, a]));

  const totalFlightsCount = filteredFlights.length;
  if (totalFlightsCount === 0) {
    return {
      loadFactor: 0,
      rask: 0,
      cancellationRate: 0,
      otp: 0,
      totalRevenue: 0,
      totalSeatsSold: 0,
      totalSeatsCapacity: 0,
      revenueByRoute: [],
      bookingsByStatus: [
        { name: 'Confirmadas', value: 0, count: 0, color: '#10B981' },
        { name: 'Lista de Espera', value: 0, count: 0, color: '#F59E0B' },
        { name: 'Canceladas', value: 0, count: 0, color: '#EF4444' }
      ],
      cancellationCauses: [
        { name: 'Técnica', value: 0, color: '#F97316' },
        { name: 'Clima', value: 0, color: '#3B82F6' },
        { name: 'Baja Demanda', value: 0, color: '#EF4444' }
      ],
      timeSeriesData: [],
      turnaroundByAirport: []
    };
  }

  // 1. Factor de Ocupación (Load Factor)
  // Fórmula: sum(seats_sold) / sum(seats_capacity) * 100, solo vuelos con status 'completed' o 'scheduled' (excluir 'cancelled')
  const validOperatingFlights = filteredFlights.filter(f => f.status === 'completed' || f.status === 'scheduled');
  const sumSeatsSold = validOperatingFlights.reduce((acc, f) => acc + (f.seats_sold || 0), 0);
  const sumSeatsCapacity = validOperatingFlights.reduce((acc, f) => acc + (f.seats_capacity || 0), 0);
  const loadFactor = sumSeatsCapacity > 0 ? (sumSeatsSold / sumSeatsCapacity) * 100 : 0;

  // 2. RASK (Revenue per Available Seat Kilometer)
  // Fórmula: sum(revenue) / sum(seats_capacity * distance_km), vuelos no cancelados
  let sumRevenue = 0;
  let sumAsk = 0; // Available Seat Kilometers (ASK)
  validOperatingFlights.forEach(f => {
    const route = routesMap.get(f.route_id);
    const distanceKm = route ? route.distance_km : 0;
    sumRevenue += (f.revenue || 0);
    sumAsk += (f.seats_capacity * distanceKm);
  });
  const rask = sumAsk > 0 ? (sumRevenue / sumAsk) : 0; // Expresado en USD por ASK (típicamente $0.05 a $0.18)

  // 3. Tasa de Cancelaciones
  // Fórmula: vuelos cancelled / total de vuelos * 100
  const cancelledFlights = filteredFlights.filter(f => f.status === 'cancelled');
  const cancellationRate = totalFlightsCount > 0 ? (cancelledFlights.length / totalFlightsCount) * 100 : 0;

  // 4. Puntualidad (OTP - On-Time Performance)
  // Fórmula: vuelos completed con departure_delay_min <= 15 Y arrival_delay_min <= 15 / vuelos completed * 100
  const completedFlights = filteredFlights.filter(f => f.status === 'completed');
  const onTimeFlights = completedFlights.filter(f => {
    const depOk = (f.departure_delay_min !== null && f.departure_delay_min <= 15);
    const arrOk = (f.arrival_delay_min !== null && f.arrival_delay_min <= 15);
    return depOk && arrOk;
  });
  const otp = completedFlights.length > 0 ? (onTimeFlights.length / completedFlights.length) * 100 : 0;

  // 5. Ingresos por Ruta
  // Fórmula: sum(revenue) agrupado por route_id
  const routeRevenueMap = {};
  allRoutes.forEach(r => {
    routeRevenueMap[r.id] = {
      route_id: r.id,
      code: r.code,
      region: r.region,
      revenue: 0,
      flightsCount: 0,
      seatsSold: 0,
      capacity: 0,
      loadFactor: 0
    };
  });

  filteredFlights.forEach(f => {
    if (routeRevenueMap[f.route_id]) {
      routeRevenueMap[f.route_id].revenue += (f.revenue || 0);
      routeRevenueMap[f.route_id].flightsCount += 1;
      if (f.status !== 'cancelled') {
        routeRevenueMap[f.route_id].seatsSold += (f.seats_sold || 0);
        routeRevenueMap[f.route_id].capacity += (f.seats_capacity || 0);
      }
    }
  });

  const revenueByRoute = Object.values(routeRevenueMap)
    .map(item => ({
      ...item,
      loadFactor: item.capacity > 0 ? Math.round((item.seatsSold / item.capacity) * 100) : 0
    }))
    .filter(item => item.flightsCount > 0 || item.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue);

  // 6. Reservas por Estado
  // Conteo de reservas agrupado por status (confirmed / waitlist / cancelled)
  // Filtrar reservas que pertenecen a los vuelos filtrados
  const filteredFlightIds = new Set(filteredFlights.map(f => f.id));
  const relevantBookings = filteredBookings.filter(b => filteredFlightIds.has(b.flight_id));

  let countConfirmed = 0;
  let countWaitlist = 0;
  let countCancelled = 0;
  let amountConfirmed = 0;
  let amountWaitlist = 0;
  let amountCancelled = 0;

  relevantBookings.forEach(b => {
    if (b.status === 'confirmed') {
      countConfirmed++;
      amountConfirmed += (b.amount || 0);
    } else if (b.status === 'waitlist') {
      countWaitlist++;
      amountWaitlist += (b.amount || 0);
    } else if (b.status === 'cancelled') {
      countCancelled++;
      amountCancelled += (b.amount || 0);
    }
  });

  const bookingsByStatus = [
    { name: 'Confirmadas', value: countConfirmed, amount: amountConfirmed, color: '#10B981' },
    { name: 'Lista de Espera', value: countWaitlist, amount: amountWaitlist, color: '#F59E0B' },
    { name: 'Canceladas', value: countCancelled, amount: amountCancelled, color: '#EF4444' }
  ];

  // 7. Causas de Cancelación
  // Conteo de vuelos 'cancelled' agrupado por cancellation_cause ('tecnica', 'clima', 'baja_demanda')
  let countTecnica = 0;
  let countClima = 0;
  let countBajaDemanda = 0;

  cancelledFlights.forEach(f => {
    if (f.cancellation_cause === 'tecnica') countTecnica++;
    else if (f.cancellation_cause === 'clima') countClima++;
    else if (f.cancellation_cause === 'baja_demanda') countBajaDemanda++;
  });

  const cancellationCauses = [
    { name: 'Técnica', value: countTecnica, color: '#F97316' },
    { name: 'Clima', value: countClima, color: '#3B82F6' },
    { name: 'Baja Demanda', value: countBajaDemanda, color: '#EF4444' }
  ];

  // 8. Evolución de ingresos y ocupación en el tiempo (agrupado por semanas o bloques de 7 días)
  const timeBuckets = {};
  filteredFlights.forEach(f => {
    const d = new Date(f.scheduled_departure);
    // Agrupar por semana o intervalo de 7 días
    const dateKey = d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    if (!timeBuckets[dateKey]) {
      timeBuckets[dateKey] = {
        date: dateKey,
        rawDate: d.getTime(),
        revenue: 0,
        seatsSold: 0,
        seatsCapacity: 0,
        flightsCount: 0
      };
    }
    timeBuckets[dateKey].revenue += (f.revenue || 0);
    timeBuckets[dateKey].flightsCount += 1;
    if (f.status !== 'cancelled') {
      timeBuckets[dateKey].seatsSold += (f.seats_sold || 0);
      timeBuckets[dateKey].seatsCapacity += (f.seats_capacity || 0);
    }
  });

  const timeSeriesData = Object.values(timeBuckets)
    .sort((a, b) => a.rawDate - b.rawDate)
    .map(item => ({
      date: item.date,
      revenue: item.revenue,
      loadFactor: item.seatsCapacity > 0 ? Math.round((item.seatsSold / item.seatsCapacity) * 100) : 0,
      flights: item.flightsCount
    }));

  // 9. Turnaround promedio por aeropuerto de origen vs objetivo
  const airportTurnaroundMap = {};
  allAirports.forEach(ap => {
    airportTurnaroundMap[ap.id] = {
      iata: ap.iata_code,
      name: ap.city,
      targetTurnaround: ap.target_turnaround_min,
      totalMinutes: 0,
      count: 0
    };
  });

  completedFlights.forEach(f => {
    if (f.turnaround_min !== null && f.turnaround_min > 0) {
      const route = routesMap.get(f.route_id);
      if (route && airportTurnaroundMap[route.origin_airport_id]) {
        airportTurnaroundMap[route.origin_airport_id].totalMinutes += f.turnaround_min;
        airportTurnaroundMap[route.origin_airport_id].count += 1;
      }
    }
  });

  const turnaroundByAirport = Object.values(airportTurnaroundMap)
    .filter(item => item.count > 0)
    .map(item => ({
      iata: item.iata,
      city: item.name,
      target: item.targetTurnaround,
      actual: Math.round(item.totalMinutes / item.count),
      diff: Math.round(item.totalMinutes / item.count) - item.targetTurnaround
    }))
    .sort((a, b) => b.diff - a.diff);

  return {
    loadFactor: Number(loadFactor.toFixed(1)),
    rask: Number(rask.toFixed(4)), // RASK en USD (ej. 0.0842 $/ASK)
    cancellationRate: Number(cancellationRate.toFixed(1)),
    otp: Number(otp.toFixed(1)),
    totalRevenue: sumRevenue,
    totalSeatsSold: sumSeatsSold,
    totalSeatsCapacity: sumSeatsCapacity,
    revenueByRoute,
    bookingsByStatus,
    cancellationCauses,
    timeSeriesData,
    turnaroundByAirport
  };
}
