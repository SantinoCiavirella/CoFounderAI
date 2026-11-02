/*
  DATOS DE LA DEMO — Panadería La Espiga (negocio de ejemplo)
  ------------------------------------------------------------
  Todo lo que se ve en demo.html sale de este archivo: el negocio, los números,
  las alertas, el plan del día y las respuestas de los socios.

  Para cambiar un texto: editalo entre comillas, guardá y recargá la página.
  Todos los datos son FICTICIOS. No hay IA ni conexión a ningún servidor.

  Los montos van en pesos y sin puntos (28297000 = $28.297.000).
*/
window.DEMO_DATOS = {
  // ---------- El negocio de ejemplo (pantalla de bienvenida) ----------
  negocio: {
    nombre: "Panadería La Espiga",
    duena: "Lucía Fernández",
    iniciales: "LF",
    rubro: "Panadería y confitería",
    ubicacion: "CABA",
    equipo: "8 personas",
    condicionFiscal: "Responsable Inscripto",
    hoy: "1 de noviembre de 2026", // la "fecha de hoy" dentro de la demo
    descripcion:
      "Panadería de barrio con mostrador al público. Además le vende todas las semanas a bares, cafés, una rotisería, un catering y un hotel de la zona.",
    preocupacion:
      "Llegar tranquila a fin de año con el aguinaldo y que no me sigan subiendo los insumos.",
    // Lo que "cargó" Lucía en CoFounder (para que se entienda de dónde salen los números)
    cargo: [
      "Ventas, cantidad de tickets y clientes registrados de los últimos 12 meses",
      "Gastos de cada mes: insumos, sueldos, alquiler, impuestos y publicidad",
      "Plata disponible hoy: $18.600.000 entre caja, bancos y billeteras",
      "Lo que le deben sus clientes y lo que debe a proveedores",
    ],
  },

  // ---------- Historia de 12 meses (lo que cargó la dueña) ----------
  // tickets = ventas del mes en el mostrador y a mayoristas (≈ 180 por día)
  // clientes = clientes registrados (WhatsApp o cuenta corriente) que compraron ese mes
  // real = ventas descontada la inflación, en pesos de octubre 2026
  meses: [
    { mes: "nov 2025", corto: "nov", ventas: 22459000, tickets: 5805, clientes: 702, nuevos: 74, insumos: 7075000, sueldos: 7661000, alquiler: 1920000, impuestos: 1572000, otros: 1841000, publicidad: 324000, merma: 368000, real: 29092240 },
    { mes: "dic 2025", corto: "dic", ventas: 27620000, tickets: 6933, clientes: 708, nuevos: 71, insumos: 8700000, sueldos: 7661000, alquiler: 1920000, impuestos: 1933000, otros: 1901000, publicidad: 333000, merma: 435000, real: 34803051 },
    { mes: "ene 2026", corto: "ene", ventas: 20034000, tickets: 4875, clientes: 716, nuevos: 69, insumos: 6311000, sueldos: 7661000, alquiler: 1920000, impuestos: 1402000, otros: 1964000, publicidad: 342000, merma: 322000, real: 24532733 },
    { mes: "feb 2026", corto: "feb", ventas: 21788000, tickets: 5142, clientes: 731, nuevos: 96, insumos: 6885000, sueldos: 8363000, alquiler: 2090000, impuestos: 1525000, otros: 2030000, publicidad: 352000, merma: 337000, real: 25928671 },
    { mes: "mar 2026", corto: "mar", ventas: 24531000, tickets: 5589, clientes: 668, nuevos: 58, insumos: 7752000, sueldos: 8363000, alquiler: 2090000, impuestos: 1717000, otros: 2107000, publicidad: 364000, merma: 426000, real: 28233037 },
    { mes: "abr 2026", corto: "abr", ventas: 25934000, tickets: 5748, clientes: 684, nuevos: 62, insumos: 8221000, sueldos: 8363000, alquiler: 2090000, impuestos: 1815000, otros: 2171000, publicidad: 374000, merma: 444000, real: 29091392 },
    { mes: "may 2026", corto: "may", ventas: 27009000, tickets: 5850, clientes: 699, nuevos: 70, insumos: 8589000, sueldos: 8884000, alquiler: 2220000, impuestos: 1891000, otros: 2226000, publicidad: 382000, merma: 455000, real: 29674113 },
    { mes: "jun 2026", corto: "jun", ventas: 27792000, tickets: 5895, clientes: 712, nuevos: 73, insumos: 8838000, sueldos: 8884000, alquiler: 2220000, impuestos: 1945000, otros: 2277000, publicidad: 389000, merma: 460000, real: 29965040 },
    { mes: "jul 2026", corto: "jul", ventas: 28790000, tickets: 5970, clientes: 718, nuevos: 71, insumos: 9270000, sueldos: 8884000, alquiler: 2220000, impuestos: 2015000, otros: 2334000, publicidad: 397000, merma: 510000, real: 30402618 },
    { mes: "ago 2026", corto: "ago", ventas: 27745000, tickets: 5646, clientes: 709, nuevos: 66, insumos: 9073000, sueldos: 9400000, alquiler: 2350000, impuestos: 1942000, otros: 2384000, publicidad: 404000, merma: 526000, real: 28809326 },
    { mes: "sep 2026", corto: "sep", ventas: 27884000, tickets: 5553, clientes: 698, nuevos: 63, insumos: 9313000, sueldos: 9400000, alquiler: 2350000, impuestos: 1952000, otros: 2441000, publicidad: 412000, merma: 568000, real: 28413796 },
    { mes: "oct 2026", corto: "oct", ventas: 28297000, tickets: 5511, clientes: 689, nuevos: 61, insumos: 9876000, sueldos: 9400000, alquiler: 2350000, impuestos: 1981000, otros: 2500000, publicidad: 420000, merma: 652000, real: 28297000 },
  ],

  caja: 18600000,
  cajaEn30Dias: 22168225, // resultado de la proyección al 1 de diciembre

  // ---------- Puntajes de salud (de 0 a 100) ----------
  salud: {
    total: 55,
    variacion: "−5 vs. sep",
    estado: "En observación",
    areas: { finanzas: 53, marketing: 54, operaciones: 60 },
  },

  // ---------- Proyección de caja a 90 días (una fila por semana) ----------
  proyeccion: [
    { fecha: "01/11", base: 18600000, estres: 18600000, min: 18600000, max: 18600000 },
    { fecha: "08/11", base: 9608208, estres: 8692293, min: 7900000, max: 11300000 },
    { fecha: "15/11", base: 11903023, estres: 8603994, min: 9500000, max: 14300000 },
    { fecha: "22/11", base: 16934631, estres: 10679636, min: 14100000, max: 19800000 },
    { fecha: "29/11", base: 21238697, estres: 14024482, min: 17900000, max: 24600000 },
    { fecha: "06/12", base: 15488544, estres: 6855445, min: 11800000, max: 19200000 },
    { fecha: "13/12", base: 17082435, estres: 8080264, min: 13000000, max: 21200000 },
    { fecha: "20/12", base: 14236426, estres: 6037240, min: 9800000, max: 18600000 },
    { fecha: "27/12", base: 17962412, estres: 8268230, min: 13300000, max: 22700000 },
    { fecha: "03/01", base: 21612076, estres: 10781748, min: 16600000, max: 26600000 },
    { fecha: "10/01", base: 5529406, estres: -6043217, min: 268000, max: 10800000 },
    { fecha: "17/01", base: 9216715, estres: -3098202, min: 3700000, max: 14700000 },
    { fecha: "24/01", base: 10860302, estres: -1890352, min: 5100000, max: 16600000 },
    { fecha: "30/01", base: 13990996, estres: 605537, min: 8000000, max: 20000000 },
  ],

  // ---------- Lo que le deben y lo que debe ----------
  cobros: [
    { nombre: "Bar La Esquina de Pepe", monto: 1850000, estado: "Vencida hace 38 días", vencida: true },
    { nombre: "Catering Sabores del Sur", monto: 1540000, estado: "Vencida hace 52 días", vencida: true },
    { nombre: "Rotisería Los Nietos", monto: 930000, estado: "Vencida hace 33 días", vencida: true },
    { nombre: "Café del Parque (cuenta corriente)", monto: 1280000, estado: "Vence 10 nov", vencida: false },
    { nombre: "Hotel Boutique Almagro (desayunos)", monto: 2150000, estado: "Vence 17 nov", vencida: false },
  ],
  pagos: [
    { nombre: "Molinos La Pradera (harina)", monto: 4860000, estado: "Vence 7 nov" },
    { nombre: "Lácteos Don Tito (manteca y crema)", monto: 2240000, estado: "Vence 13 nov" },
    { nombre: "Distribuidora Azul (packaging)", monto: 780000, estado: "Vence 20 nov" },
    { nombre: "Frutas Secas del Valle (insumos pan dulce)", monto: 7600000, estado: "Vence 6 ene" },
  ],

  // ---------- Proveedores y distribuidores (compras de octubre) ----------
  // suba = cuánto aumentó lo que le cobra desde julio (la inflación fue 5,6%)
  proveedores: [
    { nombre: "Molinos La Pradera", que: "Harina", entrega: "2 veces por semana", condicion: "Paga a 15 días", monto: 3950000, suba: 9 },
    { nombre: "Lácteos Don Tito", que: "Manteca, crema y leche", entrega: "3 veces por semana", condicion: "Contado", monto: 2370000, suba: 7 },
    { nombre: "Distribuidora El Granero", que: "Azúcar, huevos y levadura", entrega: "Una vez por semana", condicion: "Paga a 7 días", monto: 1580000, suba: 5 },
    { nombre: "Distribuidora Azul", que: "Bolsas, cajas y papel", entrega: "Cada 15 días", condicion: "Paga a 30 días", monto: 996000, suba: 4 },
    { nombre: "Frutas Secas del Valle", que: "Frutas secas y chocolate", entrega: "Una vez por mes", condicion: "Paga a 30 días", monto: 980000, suba: 6 },
  ],

  // ---------- Plata para separar (reservas) ----------
  // total = lo que hay que juntar · cuando = fecha del pago · noviembre = lo que conviene separar este mes
  reservas: [
    { nombre: "Aguinaldo de diciembre", total: 4900000, cuando: "18 dic", noviembre: 3000000, detalle: "$693 mil por semana. Todavía no hay nada separado." },
    { nombre: "Frutas secas del pan dulce", total: 7600000, cuando: "6 ene", noviembre: 3800000, detalle: "La mitad en noviembre y la mitad en diciembre." },
    { nombre: "Vacaciones del equipo", total: 1600000, cuando: "ene y feb", noviembre: 530000, detalle: "Repartido en noviembre, diciembre y enero." },
    { nombre: "Fondo para imprevistos", total: 5000000, cuando: "Sin fecha", noviembre: 850000, detalle: "3% de lo que vendés, para el horno, las heladeras o una rotura." },
  ],
  reservaMesNormal: "En un mes sin aguinaldo ni compras de temporada, conviene separar unos $1,8 M: $817 mil para el aguinaldo, $133 mil para vacaciones y $850 mil para imprevistos. Es casi todo lo que La Espiga gana en un mes.",

  // ---------- Gastos fijos del mes (octubre) ----------
  gastosFijos: [
    { nombre: "Alquiler del local", monto: 2350000 },
    { nombre: "Luz (hornos y heladeras)", monto: 820000 },
    { nombre: "Gas", monto: 640000 },
    { nombre: "Contador", monto: 380000 },
    { nombre: "Mantenimiento y limpieza", monto: 300000 },
    { nombre: "Seguro del local", monto: 210000 },
    { nombre: "Agua", monto: 90000 },
    { nombre: "Internet y teléfono", monto: 60000 },
  ],

  // ---------- Calendario de pagos y cobros grandes (próximos 90 días) ----------
  calendario: [
    { fecha: "5 nov", concepto: "Sueldos y cargas sociales", tipo: "Sueldos", monto: -9400000 },
    { fecha: "7 nov", concepto: "Pago: Molinos La Pradera (harina)", tipo: "Proveedores", monto: -4860000 },
    { fecha: "10 nov", concepto: "Alquiler", tipo: "Alquiler", monto: -2350000 },
    { fecha: "10 nov", concepto: "Cobro: Café del Parque", tipo: "Cobranza", monto: 1280000 },
    { fecha: "13 nov", concepto: "Pago: Lácteos Don Tito (manteca y crema)", tipo: "Proveedores", monto: -2240000 },
    { fecha: "17 nov", concepto: "Cobro: Hotel Boutique Almagro", tipo: "Cobranza", monto: 2150000 },
    { fecha: "20 nov", concepto: "IVA e Ingresos Brutos", tipo: "Impuestos", monto: -2000000 },
    { fecha: "20 nov", concepto: "Pago: Distribuidora Azul (packaging)", tipo: "Proveedores", monto: -780000 },
    { fecha: "4 dic", concepto: "Sueldos y cargas sociales", tipo: "Sueldos", monto: -9600000 },
    { fecha: "10 dic", concepto: "Alquiler", tipo: "Alquiler", monto: -2400000 },
    { fecha: "18 dic", concepto: "Aguinaldo (2ª cuota)", tipo: "Aguinaldo", monto: -4900000 },
    { fecha: "20 dic", concepto: "IVA e Ingresos Brutos", tipo: "Impuestos", monto: -2000000 },
    { fecha: "6 ene", concepto: "Sueldos y cargas sociales", tipo: "Sueldos", monto: -9700000 },
    { fecha: "6 ene", concepto: "Pago: Frutas Secas del Valle (pan dulce)", tipo: "Proveedores", monto: -7600000 },
    { fecha: "10 ene", concepto: "Alquiler", tipo: "Alquiler", monto: -2500000 },
    { fecha: "20 ene", concepto: "IVA e Ingresos Brutos", tipo: "Impuestos", monto: -2000000 },
  ],

  // ---------- Última campaña propuesta por tu CMO (resultado de ejemplo) ----------
  campania: {
    nombre: "Volvé a La Espiga",
    fechas: "12 al 25 de octubre",
    que: "Mensaje por WhatsApp a 168 clientes que no compraban hace más de un mes, con 10% en la docena de facturas, más una historia de Instagram promocionada en el barrio.",
    resultados: [
      { nombre: "Ventas en esas 2 semanas", valor: "+7%", detalle: "vs. las 2 semanas anteriores" },
      { nombre: "Clientes que volvieron", valor: "31", detalle: "de 168 que recibieron el mensaje" },
      { nombre: "Clientes nuevos", valor: "9", detalle: "llegaron por Instagram" },
      { nombre: "Ventas extra", valor: "$840 mil", detalle: "con $45 mil de publicidad" },
    ],
    // Ventas por semana (las dos últimas son las de la campaña)
    semanas: [
      { semana: "14 sep", ventas: 6350000 },
      { semana: "21 sep", ventas: 6300000 },
      { semana: "28 sep", ventas: 6210000 },
      { semana: "5 oct", ventas: 6190000 },
      { semana: "12 oct", ventas: 6580000 },
      { semana: "19 oct", ventas: 6660000 },
    ],
    inicio: 4, // posición de la primera semana de campaña en la lista de arriba
  },

  // ---------- Números destacados de cada área (tarjetas de arriba) ----------
  // tono: "bien" | "atencion" | "riesgo" (opcional; siempre va con texto)
  indicadores: {
    finanzas: [
      { nombre: "Caja disponible hoy", valor: "$18,6 M", detalle: "Al 1 de noviembre" },
      { nombre: "Días de caja", valor: "21 días", detalle: "Lo recomendable: 45 días o más", tono: "riesgo" },
      { nombre: "Resultado de octubre", valor: "$1,8 M", detalle: "Margen neto 6,3%" },
      { nombre: "Punto de equilibrio", valor: "$25,3 M", detalle: "Vendés 12,1% por encima", tono: "bien" },
    ],
    marketing: [
      { nombre: "Ventas de octubre", valor: "$28,3 M", detalle: "+1,5% vs. septiembre" },
      { nombre: "Ventas reales (3 meses)", valor: "−6,9%", detalle: "Descontada la inflación", tono: "riesgo" },
      { nombre: "Ticket promedio", valor: "$5.135", detalle: "≈ 178 ventas por día · +0,8% real en 3 meses" },
      { nombre: "Costo por cliente nuevo", valor: "$6.885", detalle: "61 clientes nuevos en el mes", tono: "bien" },
    ],
    operaciones: [
      { nombre: "Margen bruto", valor: "65,1%", detalle: "Referencia para panaderías: 62%", tono: "bien" },
      { nombre: "Insumos sobre ventas", valor: "34,9%", detalle: "+2,7 puntos en 3 meses", tono: "atencion" },
      { nombre: "Merma", valor: "6,6%", detalle: "$652 mil perdidos en octubre", tono: "atencion" },
      { nombre: "Ventas por persona", valor: "$3,5 M", detalle: "Sueldos: 33,2% de las ventas" },
    ],
  },

  // ---------- Qué compone cada puntaje ----------
  // puntaje: de 0 a 100 · valor: lo que se muestra al lado
  componentes: {
    finanzas: [
      { nombre: "Días de caja", puntaje: 35, valor: "21 días", ayuda: "Cuántos días de gastos cubre la plata que tenés hoy. Lo recomendable es 45 días o más." },
      { nombre: "Margen neto (3 meses)", puntaje: 63, valor: "7,1%", ayuda: "Lo que queda de cada $100 vendidos después de pagar todos los gastos." },
      { nombre: "Caja proyectada a 90 días", puntaje: 67, valor: "Mínimo $5,5 M", ayuda: "El punto más bajo que tocaría la caja en la proyección." },
      { nombre: "Cobros vencidos", puntaje: 52, valor: "$4,3 M (15% de las ventas)", ayuda: "Facturas vencidas comparadas con lo que vendés en un mes." },
    ],
    marketing: [
      { nombre: "Ventas reales (3 meses)", puntaje: 28, valor: "−6,9%", ayuda: "Cuánto cambiaron las ventas descontando la inflación: si vendés más pesos pero menos productos, acá se ve." },
      { nombre: "Clientes registrados (3 meses)", puntaje: 39, valor: "−4,0%", ayuda: "Clientes que conocés por WhatsApp o cuenta corriente y que compraron en el mes." },
      { nombre: "Ticket promedio real", puntaje: 63, valor: "+0,8%", ayuda: "Cuánto gasta cada cliente por compra, descontando la inflación." },
      { nombre: "Costo de conseguir un cliente", puntaje: 100, valor: "$6.885", ayuda: "Lo que gastaste en publicidad dividido por los clientes nuevos del mes." },
    ],
    operaciones: [
      { nombre: "Margen bruto", puntaje: 82, valor: "65,1%", ayuda: "Lo que queda de las ventas después de pagar la mercadería e insumos." },
      { nombre: "Costo de insumos (tendencia)", puntaje: 37, valor: "+2,7 puntos", ayuda: "Cuánto creció el peso de los insumos sobre las ventas en los últimos 3 meses." },
      { nombre: "Merma", puntaje: 55, valor: "6,6% de los insumos", ayuda: "Mercadería que se pierde, se vence o se tira." },
      { nombre: "Sueldos sobre ventas", puntaje: 62, valor: "33,2%", ayuda: "Cuánto pesan los sueldos y cargas sobre lo que facturás." },
    ],
  },

  // ---------- Contexto macro (VALORES DE EJEMPLO, no se actualizan) ----------
  macro: [
    { nombre: "Inflación del mes", valor: "1,9%", detalle: "33,4% en el año" },
    { nombre: "Inflación esperada", valor: "21,1%", detalle: "≈ 1,6% por mes" },
    { nombre: "Dólar oficial", valor: "$1.560", detalle: "MEP $1.575 · blue $1.565" },
    { nombre: "Plazo fijo (TNA)", valor: "20,4%", detalle: "BADLAR 23,1%" },
    { nombre: "Tasa para descontar cheques", valor: "24,1%", detalle: "TAMAR (TNA)" },
    { nombre: "Riesgo país", valor: "787 pb", detalle: "Brecha cambiaria 0,3%" },
  ],

  // ---------- Alertas ----------
  // nivel: "alta" | "media" | "baja" · area: "finanzas" | "marketing" | "operaciones"
  // consulta: qué pregunta del chat abre el botón "Resolver con…"
  alertas: [
    { titulo: "Flujo de caja ajustado", nivel: "alta", area: "finanzas", texto: "La plata que tenés cubre 21 días de gastos. Lo recomendable es 45 días o más.", consejo: "Priorizá cobrar lo vencido y evitá compras de stock que no se vendan este mes.", base: "Caja al 1 nov y gastos de octubre", consulta: "cfo-aguinaldo" },
    { titulo: "Facturas por cobrar vencidas", nivel: "alta", area: "finanzas", texto: "3 clientes te deben $4.320.000 con pagos atrasados.", consejo: "Mandá recordatorios hoy y ofrecé un plan de pago corto.", base: "Cobros cargados, vencimientos al 1 nov", consulta: "cfo-cobrar" },
    { titulo: "Caja vulnerable a un trimestre malo", nivel: "media", area: "finanzas", texto: "Si las ventas caen 15% y los clientes pagan 30 días más tarde, la caja quedaría en rojo el 6 de enero.", consejo: "Armá un colchón de caja y revisá los plazos de cobro.", base: "Proyección a 90 días (escenario de estrés)", consulta: "cfo-aguinaldo" },
    { titulo: "Ventas reales en baja", nivel: "media", area: "marketing", texto: "Descontada la inflación, vendiste 6,9% menos que hace 3 meses.", consejo: "Probá una promoción en los días u horarios de menor venta.", base: "Ventas de julio a octubre, descontada la inflación", consulta: "cmo-promo" },
    { titulo: "Merma más alta de lo esperable", nivel: "media", area: "operaciones", texto: "Estás perdiendo 6,6% de los insumos ($652.000 en octubre).", consejo: "Ajustá la producción de cada día según lo que realmente se vende.", base: "Datos de octubre", consulta: "coo-merma" },
    { titulo: "Gasto en insumos en alza", nivel: "baja", area: "operaciones", texto: "Los insumos pasaron de 32,2% a 34,9% de tus ventas en 3 meses. Subieron 6,5% contra una inflación de 5,6%.", consejo: "Pedí precio a otro proveedor y revisá tus precios de venta.", base: "Datos de julio a octubre", consulta: "coo-proveedor" },
    { titulo: "Aguinaldo el 18 de diciembre", nivel: "baja", area: "finanzas", texto: "Vas a necesitar $4,9 M para pagarlo. Conviene separarlo de a poco.", consejo: "Reservá una parte fija por semana hasta la fecha de pago.", base: "Calendario legal del aguinaldo y sueldos de octubre", consulta: "cfo-aguinaldo" },
  ],

  // ---------- Plan de acción de hoy ----------
  plan: [
    { titulo: "Reclamar facturas vencidas", prioridad: "Alta", texto: "Mandá un recordatorio a los 3 clientes con pagos atrasados ($4,3 M).", socio: "cfo", minutos: 15, impacto: "Hasta $4,3 M de caja", consulta: "cfo-cobrar" },
    { titulo: "Separar la plata del aguinaldo", prioridad: "Alta", texto: "Reservá $693 mil por semana hasta el 18 de diciembre para juntar $4,9 M.", socio: "cfo", minutos: 20, impacto: "Llegás a fin de año sin ahogo de caja", consulta: "cfo-aguinaldo" },
    { titulo: "Repetir la campaña que funcionó", prioridad: "Alta", texto: "Mandá «Volvé a La Espiga» a los 140 clientes que todavía no volvieron. En octubre trajo +7% de ventas.", socio: "cmo", minutos: 20, impacto: "Más clientes de vuelta sin bajar precios", consulta: "cmo-campania" },
    { titulo: "Pedir precio a otro proveedor", prioridad: "Media", texto: "Tus insumos suben más que la inflación: pedí cotización a otro molino y usala para negociar.", socio: "coo", minutos: 25, impacto: "Cuidás el margen", consulta: "coo-proveedor" },
    { titulo: "Ajustar la producción por día", prioridad: "Media", texto: "Compará lo que producís con lo que vendés cada día y bajá la producción donde sobra.", socio: "coo", minutos: 15, impacto: "Menos merma, más margen", consulta: "coo-merma" },
  ],

  // ---------- Tus socios y sus respuestas de ejemplo ----------
  // Cada respuesta: parrafos (texto), pasos (lista numerada, opcional),
  // parrafosFinales (opcional) y estado (opcional: "atencion").
  socios: [
    {
      id: "cfo",
      rol: "Tu CFO",
      area: "Finanzas",
      descripcion: "Mira tu caja, tus márgenes y tus precios. Te avisa antes de que falte plata y te propone qué hacer.",
      recomendacion: "Reclamar facturas vencidas: mandá un recordatorio a los 3 clientes con pagos atrasados ($4,3 M).",
      dato: { nombre: "Caja proyectada a 30 días", valor: "$22,2 M" },
      alertas: 4,
      preguntas: [
        {
          id: "cfo-aguinaldo",
          pregunta: "¿Cómo llego al aguinaldo sin quedar en rojo?",
          estado: "atencion",
          estadoTexto: "Atención: la caja se ajusta en enero",
          parrafos: [
            "Hoy tenés $18,6 M, que cubren 21 días de gastos. El 18 de diciembre pagás el aguinaldo ($4,9 M) y el 6 de enero se juntan los sueldos con el pago de frutas secas del pan dulce ($7,6 M). Ahí la caja toca su punto más bajo: unos $5,5 M el 10 de enero.",
            "Es una estimación con los datos de ejemplo. Te propongo tres cosas:",
          ],
          pasos: [
            "Separar $693 mil por semana desde hoy hasta el 18 de diciembre.",
            "Reclamar esta semana los $4,3 M que te deben tres clientes.",
            "Pedirle a Frutas Secas del Valle pagar el pedido de enero en dos cuotas.",
          ],
        },
        {
          id: "cfo-cobrar",
          pregunta: "¿A quién le tengo que cobrar primero?",
          parrafos: ["Tenés $4,3 M vencidos en tres clientes. Te los ordeno por antigüedad:"],
          pasos: [
            "Catering Sabores del Sur: $1.540.000, vencida hace 52 días.",
            "Bar La Esquina de Pepe: $1.850.000, vencida hace 38 días.",
            "Rotisería Los Nietos: $930.000, vencida hace 33 días.",
          ],
          parrafosFinales: [
            "Empezá hoy por el catering: es la deuda más vieja. Un mensaje corto por WhatsApp y, si hace falta, ofrecé pagar en dos partes. Si cobrás las tres, con esos $4,3 M cubrís casi todo el aguinaldo.",
          ],
        },
        {
          id: "cfo-separar",
          pregunta: "¿Cuánto tengo que separar por mes?",
          parrafos: [
            "Noviembre es un mes pesado porque se juntan el aguinaldo y la compra del pan dulce. Este mes conviene separar unos $8,2 M:",
          ],
          pasos: [
            "Aguinaldo del 18 de diciembre: $3 M ($693 mil por semana).",
            "Frutas secas del pan dulce, que se pagan el 6 de enero: $3,8 M.",
            "Vacaciones del equipo: $530 mil.",
            "Fondo para imprevistos: $850 mil.",
          ],
          parrafosFinales: [
            "No sale todo de lo que ganás en el mes: una parte sale de los $18,6 M que tenés hoy. En un mes normal alcanza con unos $1,8 M. Te recomiendo abrir una cuenta aparte solo para esta plata, así no se mezcla con la caja del día.",
          ],
        },
        {
          id: "cfo-precios",
          pregunta: "¿Me conviene subir precios este mes?",
          parrafos: [
            "Tus insumos pasaron de 32,2% a 34,9% de lo que vendés en tres meses, y el ticket promedio subió apenas 0,8% descontada la inflación. O sea: los costos te están comiendo el margen.",
            "Una opción: subir entre 3% y 4% los productos que más harina y manteca llevan (pan, facturas, medialunas) y dejar quietos los que tus clientes más comparan con otras panaderías. Es una estimación con datos de ejemplo.",
            "Probalo dos semanas y mirá si bajan los tickets. Si no bajan, el aumento quedó bien.",
          ],
        },
      ],
    },
    {
      id: "cmo",
      rol: "Tu CMO",
      area: "Marketing",
      descripcion: "Te ayuda a conseguir clientes nuevos, a recuperar los que dejaron de venir y a saber qué ofertas funcionan.",
      recomendacion: "Repetir la campaña «Volvé a La Espiga» en noviembre: en octubre trajo 31 clientes de vuelta y +7% de ventas en dos semanas.",
      dato: { nombre: "Ventas con la última campaña", valor: "+7%" },
      alertas: 1,
      preguntas: [
        {
          id: "cmo-campania",
          pregunta: "¿Cómo le fue a la campaña que me propusiste?",
          parrafos: [
            "Bien. La campaña «Volvé a La Espiga» corrió del 12 al 25 de octubre: un mensaje por WhatsApp a 168 clientes que no compraban hace más de un mes, con 10% en la docena de facturas, más una historia de Instagram promocionada.",
          ],
          pasos: [
            "Volvieron a comprar 31 de esos 168 clientes (18%).",
            "Llegaron 9 clientes nuevos por Instagram.",
            "En esas dos semanas vendiste 7% más que en las dos anteriores: unos $840 mil extra.",
            "Te costó $45 mil de publicidad, más el descuento.",
          ],
          parrafosFinales: [
            "Mi propuesta: repetirla en noviembre con los 140 clientes que todavía no volvieron, y probar un producto distinto en la oferta para ver cuál atrae más.",
          ],
        },
        {
          id: "cmo-nuevos",
          pregunta: "¿Cómo consigo clientes nuevos este mes?",
          parrafos: [
            "Tus clientes nuevos bajaron de 71 en julio a 61 en octubre. Dos caminos para probar:",
          ],
          pasos: [
            "Mayoristas: ya le vendés a un bar, un café y un hotel. Llevá una caja de muestras a 5 cafés del barrio que todavía no te compran. Con que uno diga que sí, son unos $1,3 M por mes.",
            "Barrio: repetí la historia promocionada de Instagram que funcionó en octubre (trajo 9 clientes nuevos), apuntada a 1 km del local.",
          ],
          parrafosFinales: [
            "Anotá de dónde viene cada cliente nuevo así sabemos qué canal funciona mejor.",
          ],
        },
        {
          id: "cmo-promo",
          pregunta: "¿Qué promo lanzo esta semana?",
          parrafos: [
            "Descontada la inflación, La Espiga vende 6,9% menos que hace tres meses. Una promo bien apuntada ayuda a recuperar ventas sin bajar el precio de todo.",
            "Una opción para probar:",
          ],
          pasos: [
            "Un combo merienda a precio cerrado (media docena de medialunas y un budín) solo en los días y horarios en que menos vendés.",
            "Avisalo hoy por WhatsApp a quienes ya te compraron y en una historia de Instagram.",
            "Al terminar la semana, contá cuántos combos vendiste y compará con la semana anterior.",
          ],
        },
        {
          id: "cmo-recuperar",
          pregunta: "¿Cómo recupero a los clientes que dejaron de venir?",
          parrafos: [
            "De los clientes que tenés registrados (por WhatsApp o cuenta corriente), en julio compraron 718 y en octubre 689: unos 29 menos. Y los clientes nuevos bajaron de 71 a 61 por mes.",
            "Una opción: mandales un mensaje a quienes no compran hace más de un mes, con un beneficio simple y con fecha (por ejemplo, 10% en la docena de facturas hasta el domingo).",
            "Después medí cuántos vuelven en las dos semanas siguientes. Si funciona, repetilo una vez por mes.",
          ],
        },
        {
          id: "cmo-post",
          pregunta: "Escribime un post para Instagram con el producto del día",
          parrafos: [
            "Una opción para publicar hoy temprano, con una foto de la bandeja recién salida del horno:",
            "«Medialunas de manteca recién hechas en La Espiga. Las separamos para vos: escribinos por WhatsApp y pasá a buscarlas cuando quieras.»",
            "Publicalo antes de las 8 y repetí el formato tres días seguidos con distintos productos. Contá cuántos mensajes te llegan por cada post y quedate con el que mejor funcione.",
          ],
        },
      ],
    },
    {
      id: "coo",
      rol: "Tu COO",
      area: "Operaciones",
      descripcion: "Mira tus costos, la merma y el trabajo del equipo. Ordena el día a día para que nada se escape.",
      recomendacion: "Pedir precio a otro proveedor: tus insumos suben más que la inflación. Usá esa cotización para negociar.",
      dato: { nombre: "Merma sobre insumos", valor: "6,6%" },
      alertas: 2,
      preguntas: [
        {
          id: "coo-hoy",
          destacada: true,
          pregunta: "¿Qué hago hoy para mejorar mi negocio?",
          parrafos: ["Tu plan de hoy, en unos 90 minutos:"],
          pasos: [
            "Mandá un recordatorio a los 3 clientes que te deben ($4,3 M). 15 minutos.",
            "Separá los primeros $693 mil para el aguinaldo. 20 minutos.",
            "Mandá la campaña «Volvé a La Espiga» que armó tu CMO. 20 minutos.",
            "Pedí precio de la harina a otro molino. 25 minutos.",
          ],
          parrafosFinales: ["Marcalas en el plan de acción del panel a medida que las termines."],
        },
        {
          id: "coo-merma",
          pregunta: "¿Cómo bajo la merma?",
          parrafos: [
            "En octubre se perdió 6,6% de los insumos: $652 mil. En julio era 5,5%.",
            "Una opción:",
          ],
          pasos: [
            "Durante dos semanas, anotá cuánto producís y cuánto vendés de cada producto por día.",
            "Donde sobre más de 10%, bajá la producción de ese día.",
            "Lo que quede al cierre, ofrecelo la última hora a mitad de precio.",
          ],
          parrafosFinales: [
            "Si la merma vuelve a 5,5%, son unos $110 mil por mes que dejás de tirar. Es una estimación con datos de ejemplo.",
          ],
        },
        {
          id: "coo-proveedor",
          pregunta: "Preparame la negociación con mi proveedor principal",
          parrafos: [
            "Tu proveedor más grande es Molinos La Pradera (harina): le pagás $4,86 M el 7 de noviembre. Tus insumos subieron 6,5% en tres meses, contra una inflación de 5,6%.",
            "Para la charla:",
          ],
          pasos: [
            "Pedí hoy precio a otro molino, aunque sea para comparar.",
            "Proponé mantener el precio 60 días a cambio de un pedido fijo por semana.",
            "Si no se puede, pedí más plazo para pagar.",
          ],
          parrafosFinales: ["Te dejamos estos puntos listos para que los revises y los mandes vos."],
        },
      ],
    },
  ],
};
