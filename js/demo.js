/*
  DEMO SIMULADA DE COFOUNDER (demo.html)
  --------------------------------------
  Esta es la lógica: arma las pantallas, dibuja los gráficos y maneja el chat.
  NO hay IA ni conexión a ningún servidor: todo sale de js/demo-datos.js.
  Para cambiar textos o números, editá ese archivo (no hace falta tocar este).
*/
(function () {
  "use strict";

  var D = window.DEMO_DATOS;
  var CONFIG = window.COFOUNDER_CONFIG || {};
  var FORMULARIO = CONFIG.formularioUrl || "https://forms.gle/L3hx7siAAM2UK2jy5";

  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DEMORA_ESCRIBIENDO = reducirMovimiento ? 0 : 1100; // milisegundos

  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  // ================= Utilidades =================
  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // $28.297.000
  function pesos(n) {
    var signo = n < 0 ? "−" : "";
    return signo + "$" + Math.abs(Math.round(n)).toLocaleString("es-AR");
  }
  // $28,3 M · $652 mil
  function pesosCorto(n) {
    var signo = n < 0 ? "−" : "";
    var a = Math.abs(n);
    if (a >= 1e6) return signo + "$" + (a / 1e6).toFixed(1).replace(".", ",") + " M";
    if (a >= 1e3) return signo + "$" + Math.round(a / 1e3) + " mil";
    return signo + "$" + Math.round(a);
  }
  function numero(n) { return Math.round(n).toLocaleString("es-AR"); }
  function porcentaje(n, decimales) {
    return n.toFixed(decimales === undefined ? 1 : decimales).replace(".", ",") + "%";
  }
  function variacion(actual, anterior) { return ((actual - anterior) / anterior) * 100; }

  // Avatar de socio: anillo + disco verde caja (geometría del logo)
  function avatar(colorAnillo) {
    return '<svg viewBox="0 0 160 100" aria-hidden="true"><circle cx="110" cy="50" r="50" fill="#187A60"/>' +
      '<circle cx="50" cy="50" r="40" fill="none" stroke="' + (colorAnillo || "#0F2524") + '" stroke-width="20"/></svg>';
  }

  var ICONOS = {
    sube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
    baja: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/></svg>',
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/></svg>',
    atencion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>',
    externo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    caja: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
    bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1 14H5L6 7z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>',
    personas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/></svg>',
    recibo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  };

  var NIVELES = { alta: "alta", media: "media", baja: "baja" };
  var CHIP_NIVEL = { alta: "chip--riesgo", media: "chip--atencion", baja: "chip--neutro" };
  var AREAS = { finanzas: "Finanzas", marketing: "Marketing", operaciones: "Operaciones" };
  var SOCIO_DE_AREA = { finanzas: "tu CFO", marketing: "tu CMO", operaciones: "tu COO" };

  function socioPorId(id) {
    for (var i = 0; i < D.socios.length; i++) if (D.socios[i].id === id) return D.socios[i];
    return null;
  }
  function buscarPregunta(idPregunta) {
    for (var i = 0; i < D.socios.length; i++) {
      var s = D.socios[i];
      for (var j = 0; j < s.preguntas.length; j++) {
        if (s.preguntas[j].id === idPregunta) return { socio: s, pregunta: s.preguntas[j] };
      }
    }
    return null;
  }

  var M = D.meses;
  var ultimo = M[M.length - 1];
  var anterior = M[M.length - 2];
  function gastos(m) { return m.insumos + m.sueldos + m.alquiler + m.impuestos + m.otros + m.publicidad; }

  // ================= Alto del aviso fijo (para que la barra no lo tape) =================
  function ajustarAviso() {
    var aviso = $(".aviso");
    if (aviso) document.documentElement.style.setProperty("--alto-aviso", aviso.offsetHeight + "px");
  }

  // ================= Gráficos (SVG dibujado a mano, sin librerías) =================
  var graficos = []; // { el, dibujar }: se redibujan al cambiar el tamaño de pantalla

  function registrar(el, dibujar) {
    graficos.push({ el: el, dibujar: dibujar });
    if (el.offsetParent !== null) dibujar();
  }
  function redibujarVisibles() {
    graficos.forEach(function (g) {
      if (g.el.offsetParent !== null) g.dibujar();
    });
  }

  // Escala "redonda" para el eje Y
  function escalaY(min, max, cantidad) {
    var rango = max - min || 1;
    var paso = Math.pow(10, Math.floor(Math.log10(rango / cantidad)));
    var opciones = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < opciones.length; i++) {
      if (rango / (paso * opciones[i]) <= cantidad) { paso = paso * opciones[i]; break; }
    }
    var desde = Math.floor(min / paso) * paso;
    var hasta = Math.ceil(max / paso) * paso;
    var marcas = [];
    for (var v = desde; v <= hasta + paso / 2; v += paso) marcas.push(v);
    return { desde: desde, hasta: hasta, marcas: marcas };
  }

  /*
    Gráfico de líneas.
    cfg = {
      etiquetas: ["nov", ...],
      series: [{ nombre, valores, color, punteada }],
      banda: { nombre, min: [], max: [] } (opcional),
      formatoEje: function(v), formatoFinal: function(v),
      marcas: [{ posicion (índice, puede tener decimales), texto }] (opcional),
      alto: 240
    }
  */
  function dibujarLineas(lienzo, cfg) {
    var ancho = Math.max(lienzo.clientWidth, 260);
    var alto = cfg.alto || 240;
    var chico = ancho < 480;
    var m = { arriba: 16, abajo: 26, izq: chico ? 50 : 60, der: chico ? 64 : 80 };
    var w = ancho - m.izq - m.der;
    var h = alto - m.arriba - m.abajo;
    var n = cfg.etiquetas.length;

    var todos = [];
    cfg.series.forEach(function (s) { todos = todos.concat(s.valores); });
    if (cfg.banda) todos = todos.concat(cfg.banda.min, cfg.banda.max);
    if (cfg.incluirCero) todos.push(0);
    var esc = escalaY(Math.min.apply(null, todos), Math.max.apply(null, todos), chico ? 4 : 5);

    function x(i) { return m.izq + (n === 1 ? w / 2 : (i * w) / (n - 1)); }
    function y(v) { return m.arriba + h - ((v - esc.desde) / (esc.hasta - esc.desde)) * h; }

    var svg = '<svg width="' + ancho + '" height="' + alto + '" viewBox="0 0 ' + ancho + " " + alto + '" aria-hidden="true">';

    // Grilla y eje Y
    esc.marcas.forEach(function (v) {
      var yy = y(v);
      var esCero = Math.abs(v) < 1e-9 && esc.desde < 0;
      svg += '<line x1="' + m.izq + '" x2="' + (m.izq + w) + '" y1="' + yy.toFixed(1) + '" y2="' + yy.toFixed(1) + '" stroke="' + (esCero ? "#8A9896" : "#ECE8DE") + '" stroke-width="1"/>';
      svg += '<text x="' + (m.izq - 8) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end">' + escapar(cfg.formatoEje(v)) + "</text>";
    });

    // Etiquetas del eje X (salteando si no entran)
    var salto = Math.max(1, Math.ceil((n * (chico ? 44 : 50)) / w));
    cfg.etiquetas.forEach(function (et, i) {
      if ((n - 1 - i) % salto !== 0) return; // siempre se ve el último mes
      svg += '<text x="' + x(i).toFixed(1) + '" y="' + (alto - 6) + '" text-anchor="middle">' + escapar(et) + "</text>";
    });

    // Marcas verticales (ej: aguinaldo)
    (cfg.marcas || []).forEach(function (mc) {
      var xx = (m.izq + (mc.posicion * w) / (n - 1)).toFixed(1);
      svg += '<line x1="' + xx + '" x2="' + xx + '" y1="' + (m.arriba + 4) + '" y2="' + (m.arriba + h) + '" stroke="#8A9896" stroke-dasharray="3 4"/>';
      svg += '<text x="' + xx + '" y="' + (m.arriba - 2) + '" text-anchor="middle" style="fill:#3D4F4E">' + escapar(mc.texto) + "</text>";
    });

    // Banda de rango probable
    if (cfg.banda) {
      var puntos = [];
      cfg.banda.max.forEach(function (v, i) { puntos.push(x(i).toFixed(1) + "," + y(v).toFixed(1)); });
      for (var i = n - 1; i >= 0; i--) puntos.push(x(i).toFixed(1) + "," + y(cfg.banda.min[i]).toFixed(1));
      svg += '<polygon points="' + puntos.join(" ") + '" fill="rgba(95,211,168,0.22)"/>';
    }

    // Líneas, punto final y valor final
    var finales = [];
    cfg.series.forEach(function (s) {
      var d = s.valores.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
      svg += '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"' + (s.punteada ? ' stroke-dasharray="6 5"' : "") + "/>";
      var v = s.valores[n - 1];
      svg += '<circle cx="' + x(n - 1).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4" fill="' + s.color + '"/>';
      finales.push({ y: y(v) + 4, texto: (cfg.formatoFinal || cfg.formatoEje)(v), color: s.color });
    });
    // Que los valores finales no se pisen entre sí
    finales.sort(function (a, b) { return a.y - b.y; });
    for (var k = 1; k < finales.length; k++) {
      if (finales[k].y - finales[k - 1].y < 14) finales[k].y = finales[k - 1].y + 14;
    }
    finales.forEach(function (f) {
      svg += '<text x="' + (x(n - 1) + 9).toFixed(1) + '" y="' + f.y.toFixed(1) + '" style="fill:' + f.color + ';font-weight:500">' + escapar(f.texto) + "</text>";
    });

    svg += "</svg>";
    lienzo.innerHTML = svg;
    // Geometría para mostrar los datos al pasar el cursor
    lienzo._geo = { x: x, y: y, n: n, izq: m.izq, ancho: w };
  }

  /*
    Datos al pasar el cursor (o tocar con el dedo) por un gráfico.
    zona: el contenedor con position relative · lienzo: donde está el SVG
    filas(i): devuelve [{ nombre, valor, color }] para el punto i
    titulo(i): el mes o la fecha de ese punto
  */
  function activarCursor(zona, lienzo, titulo, filas, puntosY) {
    var guia = document.createElement("div");
    guia.className = "grafico__guia";
    guia.hidden = true;
    var tip = document.createElement("div");
    tip.className = "grafico__tip";
    tip.hidden = true;
    tip.setAttribute("aria-hidden", "true");
    zona.appendChild(guia);
    zona.appendChild(tip);
    var puntos = [];

    function mostrar(e) {
      var g = lienzo._geo;
      if (!g) return;
      var caja = lienzo.getBoundingClientRect();
      var px = e.clientX - caja.left;
      var i = Math.round(((px - g.izq) / g.ancho) * (g.n - 1));
      i = Math.max(0, Math.min(g.n - 1, i));
      var xx = g.x(i);

      guia.style.left = xx + "px";
      guia.hidden = false;

      // Puntos resaltados sobre cada línea
      var ys = puntosY(i);
      while (puntos.length < ys.length) {
        var p = document.createElement("span");
        p.className = "grafico__punto";
        zona.appendChild(p);
        puntos.push(p);
      }
      puntos.forEach(function (p, k) {
        if (k >= ys.length) { p.hidden = true; return; }
        p.hidden = false;
        p.style.left = xx + "px";
        p.style.top = g.y(ys[k].valor) + "px";
        p.style.borderColor = ys[k].color;
      });

      tip.innerHTML = "<strong>" + escapar(titulo(i)) + "</strong>" +
        filas(i).map(function (f) {
          return '<span><i style="background:' + f.color + '"></i>' + escapar(f.nombre) + ": <b>" + escapar(f.valor) + "</b></span>";
        }).join("");
      tip.hidden = false;
      // Que el cartelito no se salga del gráfico
      var anchoTip = tip.offsetWidth;
      var izquierda = xx + 14;
      if (izquierda + anchoTip > caja.width) izquierda = xx - anchoTip - 14;
      tip.style.left = Math.max(0, izquierda) + "px";
    }
    function ocultar() {
      guia.hidden = true;
      tip.hidden = true;
      puntos.forEach(function (p) { p.hidden = true; });
    }
    zona.addEventListener("pointermove", mostrar);
    zona.addEventListener("pointerdown", mostrar);
    zona.addEventListener("pointerleave", ocultar);
  }

  // Arma leyenda + gráfico + tabla accesible ("Ver tabla")
  function grafico(contenedor, cfg) {
    var leyenda = cfg.series.map(function (s) {
      return '<span><i class="muestra' + (s.punteada ? " muestra--punteada" : "") + '" style="border-top-color:' + s.color + '"></i>' + escapar(s.nombre) + "</span>";
    }).join("");
    if (cfg.banda) leyenda += '<span><i class="muestra muestra--banda"></i>' + escapar(cfg.banda.nombre) + "</span>";

    var tabla = '<div class="tabla-envoltura" hidden><table class="tabla-datos"><caption class="solo-lector">' + escapar(cfg.descripcion) + "</caption><thead><tr>" +
      cfg.tabla.columnas.map(function (c) { return '<th scope="col">' + escapar(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      cfg.tabla.filas.map(function (f) { return "<tr>" + f.map(function (c) { return "<td>" + escapar(c) + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div>";

    contenedor.innerHTML =
      '<div class="grafico__leyenda">' + leyenda +
      '<button type="button" class="grafico__ver-tabla" aria-expanded="false">Ver tabla</button></div>' +
      '<div class="grafico__zona"><div class="grafico__lienzo" role="img" aria-label="' + escapar(cfg.descripcion) + '. Los valores están en la tabla."></div></div>' + tabla;

    var lienzo = $(".grafico__lienzo", contenedor);
    var boton = $(".grafico__ver-tabla", contenedor);
    var envoltura = $(".tabla-envoltura", contenedor);
    boton.addEventListener("click", function () {
      var abrir = envoltura.hidden;
      envoltura.hidden = !abrir;
      boton.setAttribute("aria-expanded", String(abrir));
      boton.textContent = abrir ? "Ocultar tabla" : "Ver tabla";
    });
    registrar(lienzo, function () { dibujarLineas(lienzo, cfg); });

    var formato = cfg.formatoCursor || cfg.formatoFinal || cfg.formatoEje;
    activarCursor($(".grafico__zona", contenedor), lienzo,
      function (i) { return cfg.titulos ? cfg.titulos[i] : cfg.etiquetas[i]; },
      function (i) {
        var filas = cfg.series.map(function (s) { return { nombre: s.nombre, valor: formato(s.valores[i]), color: s.color }; });
        if (cfg.banda) filas.push({ nombre: cfg.banda.nombre, valor: pesosCorto(cfg.banda.min[i]) + " a " + pesosCorto(cfg.banda.max[i]), color: "rgba(95,211,168,0.6)" });
        return filas;
      },
      function (i) { return cfg.series.map(function (s) { return { valor: s.valores[i], color: s.color }; }); });
  }

  // Línea chiquita de las tarjetas de números
  function minilinea(el, valores, formato, nombre) {
    el.classList.add("grafico__zona");
    var lienzo = document.createElement("div");
    el.appendChild(lienzo);
    activarCursor(el, lienzo,
      function (i) { return M[i].mes; },
      function (i) { return [{ nombre: nombre, valor: formato(valores[i]), color: "#187A60" }]; },
      function (i) { return [{ valor: valores[i], color: "#187A60" }]; });
    registrar(lienzo, function () {
      var ancho = Math.max(el.clientWidth, 120);
      var alto = 40;
      var el2 = lienzo;
      var min = Math.min.apply(null, valores);
      var max = Math.max.apply(null, valores);
      var n = valores.length;
      function x(i) { return 4 + (i * (ancho - 10)) / (n - 1); }
      function y(v) { return 5 + (alto - 10) - ((v - min) / (max - min || 1)) * (alto - 10); }
      var d = valores.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
      el2.innerHTML = '<svg width="' + ancho + '" height="' + alto + '" aria-hidden="true">' +
        '<path d="' + d + '" fill="none" stroke="#8A9896" stroke-width="2" stroke-linejoin="round"/>' +
        '<circle cx="' + x(n - 1).toFixed(1) + '" cy="' + y(valores[n - 1]).toFixed(1) + '" r="3.5" fill="#187A60"/></svg>';
      el2._geo = { x: x, y: y, n: n, izq: 4, ancho: ancho - 10 };
    });
  }

  // ================= Bienvenida =================
  var bienvenida = $("#bienvenida");
  var focoAntesDeBienvenida = null;

  function armarBienvenida() {
    var n = D.negocio;
    $("#bv-nombre").textContent = n.nombre;
    $("#bv-sub").textContent = n.rubro + " · de " + n.duena;
    $("#bv-descripcion").textContent = n.descripcion;
    $("#bv-preocupacion").textContent = "«" + n.preocupacion + "»";

    var datos = [
      ["Dónde está", n.ubicacion],
      ["Equipo", n.equipo],
      ["Condición fiscal", n.condicionFiscal],
      ["Ventas de octubre", pesosCorto(ultimo.ventas)],
      ["Ventas por día", "≈ " + numero(ultimo.tickets / 31)],
      ["Plata disponible hoy", pesosCorto(D.caja)],
    ];
    $("#bv-datos").innerHTML = datos.map(function (d) {
      return "<div><dt>" + escapar(d[0]) + "</dt><dd>" + escapar(d[1]) + "</dd></div>";
    }).join("");
    $("#bv-cargo").innerHTML = n.cargo.map(function (c) { return "<li>" + escapar(c) + "</li>"; }).join("");
  }

  function abrirBienvenida() {
    focoAntesDeBienvenida = document.activeElement;
    cerrarMenu();
    cerrarChat(true);
    bienvenida.hidden = false;
    bienvenida.scrollTop = 0;
    document.body.classList.add("bloqueado");
    $("#bv-entrar").focus({ preventScroll: true });
  }
  function cerrarBienvenida() {
    bienvenida.hidden = true;
    document.body.classList.remove("bloqueado");
    try { sessionStorage.setItem("cofounder-demo-bienvenida", "vista"); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    redibujarVisibles();
    if (focoAntesDeBienvenida && focoAntesDeBienvenida !== document.body && document.contains(focoAntesDeBienvenida)) {
      focoAntesDeBienvenida.focus();
    } else {
      $("#contenido").focus({ preventScroll: true });
    }
  }

  // ================= Navegación entre pantallas =================
  var VISTAS = ["panel", "finanzas", "marketing", "operaciones", "alertas"];
  var TITULOS = { panel: "Panel", finanzas: "Finanzas", marketing: "Marketing", operaciones: "Operaciones", alertas: "Alertas" };

  function vistaDesdeHash() {
    var h = (location.hash || "").replace("#", "");
    return VISTAS.indexOf(h) >= 0 ? h : "panel";
  }
  function mostrarVista(nombre, moverFoco) {
    $$(".vista").forEach(function (v) { v.hidden = v.getAttribute("data-vista") !== nombre; });
    $$(".lateral__nav a[data-ir]").forEach(function (a) {
      if (a.getAttribute("data-ir") === nombre) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title = TITULOS[nombre] + " · Demo · CoFounder";
    window.scrollTo(0, 0);
    redibujarVisibles();
    if (moverFoco) $("#contenido").focus({ preventScroll: true });
  }

  // ================= Menú lateral (celular) =================
  var lateral = $("#lateral");
  var velo = $("#velo");
  var botonMenu = $("#abrir-menu");
  var chat = $("#chat");

  function abrirMenu() {
    lateral.classList.add("abierto");
    velo.hidden = false;
    botonMenu.setAttribute("aria-expanded", "true");
    document.body.classList.add("bloqueado");
    $("#cerrar-menu").focus();
  }
  function cerrarMenu() {
    if (!lateral.classList.contains("abierto")) return;
    lateral.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    if (chat.hidden) { velo.hidden = true; document.body.classList.remove("bloqueado"); }
  }

  // ================= PANEL =================
  function armarKpis() {
    var tarjetas = [
      { icono: ICONOS.caja, valor: pesosCorto(ultimo.ventas), nombre: "Ventas de octubre", serie: M.map(function (m) { return m.ventas; }), cambio: variacion(ultimo.ventas, anterior.ventas), subirEsBueno: true },
      { icono: ICONOS.bolsa, valor: numero(ultimo.tickets), nombre: "Ventas (tickets) del mes", serie: M.map(function (m) { return m.tickets; }), cambio: variacion(ultimo.tickets, anterior.tickets), subirEsBueno: true },
      { icono: ICONOS.personas, valor: numero(ultimo.clientes), nombre: "Clientes registrados que compraron", serie: M.map(function (m) { return m.clientes; }), cambio: variacion(ultimo.clientes, anterior.clientes), subirEsBueno: true },
      { icono: ICONOS.recibo, valor: pesosCorto(gastos(ultimo)), nombre: "Gastos del mes", serie: M.map(gastos), cambio: variacion(gastos(ultimo), gastos(anterior)), subirEsBueno: false },
    ];
    var cont = $("#kpis");
    cont.innerHTML = tarjetas.map(function (t, i) {
      var sube = t.cambio >= 0;
      var esBueno = sube === t.subirEsBueno;
      return '<div class="caja kpi">' +
        '<div class="kpi__arriba"><span class="icono-caja" aria-hidden="true">' + t.icono + "</span>" +
        '<span class="kpi__variacion ' + (esBueno ? "sube" : "baja") + '">' + (sube ? ICONOS.sube : ICONOS.baja) +
        (sube ? "+" : "−") + porcentaje(Math.abs(t.cambio)) + " <small>vs. sep</small></span></div>" +
        '<span class="kpi__valor">' + escapar(t.valor) + "</span>" +
        '<span class="kpi__nombre">' + escapar(t.nombre) + "</span>" +
        '<div class="kpi__linea" data-mini="' + i + '"></div></div>';
    }).join("");
    tarjetas.forEach(function (t, i) { minilinea($('[data-mini="' + i + '"]', cont), t.serie, i === 1 || i === 2 ? numero : pesosCorto, i === 0 ? "Ventas" : t.nombre); });
  }

  function armarSalud() {
    var s = D.salud;
    $("#salud-variacion").innerHTML = ICONOS.baja + escapar(s.variacion);
    var radio = 80;
    var perimetro = 2 * Math.PI * radio;
    var lleno = (s.total / 100) * perimetro;
    $("#salud").innerHTML =
      '<div class="salud"><div class="salud__anillo">' +
      '<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="' + radio + '" fill="none" stroke="#ECE8DE" stroke-width="18"/>' +
      '<circle cx="100" cy="100" r="' + radio + '" fill="none" stroke="#D98E1F" stroke-width="18" stroke-linecap="round" stroke-dasharray="' + lleno.toFixed(1) + " " + perimetro.toFixed(1) + '" transform="rotate(-90 100 100)"/></svg>' +
      '<div class="salud__centro"><span class="salud__numero">' + s.total + '</span><span class="salud__de">de 100 puntos</span>' +
      '<span class="chip chip--atencion">' + ICONOS.atencion + escapar(s.estado) + "</span></div></div>" +
      '<div class="salud__areas">' +
      ["finanzas", "marketing", "operaciones"].map(function (a) {
        return '<a class="salud__area" href="#' + a + '"><span>' + AREAS[a] + "</span><strong>" + s.areas[a] + "</strong></a>";
      }).join("") + "</div></div>";
  }

  function htmlAlerta(a, completa) {
    var icono = a.nivel === "baja" ? ICONOS.info : ICONOS.atencion;
    return '<article class="alerta alerta--' + a.nivel + '">' +
      '<span class="alerta__icono" aria-hidden="true">' + icono + "</span><div>" +
      '<h3 class="alerta__titulo">' + escapar(a.titulo) + ' <span class="chip ' + CHIP_NIVEL[a.nivel] + '">Prioridad ' + NIVELES[a.nivel] + "</span>" +
      (completa ? ' <span class="chip chip--neutro">' + AREAS[a.area] + "</span>" : "") + "</h3>" +
      '<p class="alerta__texto">' + escapar(a.texto) + "</p>" +
      (completa ? '<p class="alerta__consejo"><strong>Qué hacer:</strong> ' + escapar(a.consejo) + "</p>" : "") +
      '<div class="alerta__pie"><span>Base: ' + escapar(a.base) + "</span>" +
      '<button type="button" class="alerta__resolver" data-consulta="' + a.consulta + '">Resolver con ' + SOCIO_DE_AREA[a.area] + " →</button></div>" +
      "</div></article>";
  }

  function armarAlertasResumen() {
    var urgentes = D.alertas.filter(function (a) { return a.nivel === "alta"; }).length;
    $("#alertas-cuenta").textContent = D.alertas.length + " alertas · " + urgentes + " urgentes";
    $("#alertas-resumen").innerHTML = D.alertas.slice(0, 3).map(function (a) { return htmlAlerta(a, false); }).join("");
    $("#ver-alertas").textContent = "Ver todas las alertas (" + D.alertas.length + ")";
    $("#contador-alertas").textContent = D.alertas.length;
  }

  function armarProyecciones() {
    var p = D.proyeccion;
    var base = p.map(function (f) { return f.base; });
    var estres = p.map(function (f) { return f.estres; });
    var minimo = Math.min.apply(null, base);
    var iMin = base.indexOf(minimo);

    $$("[data-proyeccion]").forEach(function (cont) {
      cont.innerHTML =
        '<div class="resumen-proy">' +
        "<div><span>Caja en 30 días</span><strong>" + pesosCorto(D.cajaEn30Dias) + "</strong></div>" +
        "<div><span>Punto más bajo</span><strong>" + pesosCorto(minimo) + " · " + p[iMin].fecha + "</strong></div>" +
        '<div class="baja"><span>Si las cosas salen mal</span><strong>En rojo el 6 ene</strong></div>' +
        "</div><div data-grafico></div>";
      grafico($("[data-grafico]", cont), {
        descripcion: "Proyección del saldo de caja para los próximos 90 días, escenario base y de estrés",
        etiquetas: p.map(function (f) { return f.fecha; }),
        series: [
          { nombre: "Escenario base", valores: base, color: "#187A60" },
          { nombre: "Escenario de estrés", valores: estres, color: "#0F2524", punteada: true },
        ],
        banda: { nombre: "Rango probable", min: p.map(function (f) { return f.min; }), max: p.map(function (f) { return f.max; }) },
        incluirCero: true,
        formatoEje: function (v) { return pesosCorto(v).replace(",0 M", " M"); },
        formatoFinal: pesosCorto,
        marcas: [{ posicion: 6.71, texto: "Aguinaldo" }],
        alto: 260,
        tabla: {
          columnas: ["Fecha", "Base", "Estrés", "Rango probable"],
          filas: p.map(function (f) { return [f.fecha, pesos(f.base), pesos(f.estres), pesosCorto(f.min) + " a " + pesosCorto(f.max)]; }),
        },
      });
    });
  }

  function armarMacro() {
    $("#macro").innerHTML = D.macro.map(function (m) {
      return "<div><span>" + escapar(m.nombre) + "</span><strong>" + escapar(m.valor) + "</strong><small>" + escapar(m.detalle) + "</small></div>";
    }).join("");
  }

  function armarPlan() {
    var lista = $("#plan");
    lista.innerHTML = D.plan.map(function (t, i) {
      var socio = socioPorId(t.socio);
      var chip = t.prioridad === "Alta" ? "chip--riesgo" : "chip--atencion";
      return '<li class="tarea">' +
        '<span class="tarea__check"><input type="checkbox" id="tarea-' + i + '"><span></span></span><div>' +
        '<div class="tarea__titulo"><label for="tarea-' + i + '">' + escapar(t.titulo) + '</label> <span class="chip ' + chip + '">Prioridad ' + t.prioridad.toLowerCase() + "</span></div>" +
        '<p class="tarea__texto">' + escapar(t.texto) + "</p>" +
        '<div class="tarea__pie"><span class="tarea__socio">' + avatar() + escapar(socio.rol) + "</span>" +
        '<span class="tarea__dato">' + ICONOS.reloj + t.minutos + " min</span>" +
        "<span>Impacto: " + escapar(t.impacto) + "</span>" +
        '<button type="button" class="alerta__resolver" data-consulta="' + t.consulta + '">Pedir ayuda</button></div>' +
        "</div></li>";
    }).join("");

    function actualizar() {
      var checks = $$('input[type="checkbox"]', lista);
      var hechas = checks.filter(function (c) { return c.checked; }).length;
      checks.forEach(function (c) { c.closest(".tarea").classList.toggle("hecha", c.checked); });
      $("#plan-progreso").textContent = hechas + "/" + checks.length + " completadas";
      $("#plan-barra").style.width = (hechas / checks.length) * 100 + "%";
    }
    lista.addEventListener("change", actualizar);
    actualizar();
  }

  function armarSocios() {
    $("#socios-tarjetas").innerHTML = D.socios.map(function (s) {
      return '<article class="caja socio-caja">' +
        '<div class="socio-caja__cabecera">' + avatar() + '<div><h3 class="socio-caja__rol">' + escapar(s.rol) + '</h3><span class="socio-caja__area">' + escapar(s.area) + "</span></div></div>" +
        '<p class="socio-caja__desc">' + escapar(s.descripcion) + "</p>" +
        '<p class="socio-caja__reco"><small>Recomendación de hoy</small>' + escapar(s.recomendacion) + "</p>" +
        '<div class="socio-caja__pie"><div class="socio-caja__dato"><span>' + escapar(s.dato.nombre) + "</span><strong>" + escapar(s.dato.valor) + "</strong>" +
        '<span class="socio-caja__alertas">' + s.alertas + (s.alertas === 1 ? " alerta" : " alertas") + " en su área</span></div>" +
        '<button type="button" class="boton-chico" data-abrir-chat="' + s.id + '">' + ICONOS.chat + "Consultar</button></div>" +
        "</article>";
    }).join("");
  }

  // ================= Pantallas de área: números, puntaje y "Pedile a…" =================
  function armarIndicadores() {
    $$("[data-indicadores]").forEach(function (cont) {
      var lista = D.indicadores[cont.getAttribute("data-indicadores")];
      cont.innerHTML = lista.map(function (k) {
        var tono = k.tono === "riesgo" ? '<span class="chip chip--riesgo">' + ICONOS.atencion + "Riesgo</span>" :
          k.tono === "atencion" ? '<span class="chip chip--atencion">' + ICONOS.atencion + "Atención</span>" :
          k.tono === "bien" ? '<span class="chip chip--bien">Bien</span>' : "";
        return '<div class="caja kpi' + (k.tono === "riesgo" ? " kpi--riesgo" : "") + '">' +
          '<div class="kpi__arriba"><span class="kpi__nombre">' + escapar(k.nombre) + "</span>" + tono + "</div>" +
          '<span class="kpi__valor">' + escapar(k.valor) + "</span>" +
          '<span class="kpi__detalle">' + escapar(k.detalle) + "</span></div>";
      }).join("");
    });
  }

  function armarComponentes() {
    $$("[data-componentes]").forEach(function (cont) {
      var area = cont.getAttribute("data-componentes");
      var lista = D.componentes[area];
      var dosColumnas = area !== "operaciones";
      cont.innerHTML = '<section class="caja"><div class="caja__cabecera"><div>' +
        '<h2 class="caja__titulo">Salud de ' + AREAS[area].toLowerCase() + ": " + D.salud.areas[area] + "/100</h2>" +
        '<p class="caja__sub">Qué compone el puntaje</p></div></div>' +
        '<div class="componentes' + (dosColumnas ? " componentes--2" : "") + '">' +
        lista.map(function (c) {
          return '<div class="componente"><div class="componente__arriba"><span>' + escapar(c.nombre) + '</span><span class="componente__puntaje">' + c.puntaje + "/100</span></div>" +
            '<span class="componente__valor">' + escapar(c.valor) + "</span>" +
            '<div class="componente__barra" aria-hidden="true"><span style="width:' + c.puntaje + '%"></span></div>' +
            '<p class="componente__ayuda">' + escapar(c.ayuda) + "</p></div>";
        }).join("") + "</div></section>";
    });
  }

  function armarPedile() {
    $$("[data-pedile]").forEach(function (cont) {
      var socio = socioPorId(cont.getAttribute("data-pedile"));
      cont.innerHTML = '<section class="caja"><div class="caja__cabecera"><div class="caja__con-icono">' +
        '<span class="icono-caja" aria-hidden="true">' + ICONOS.chat + "</span><div>" +
        '<h2 class="caja__titulo">Pedile a ' + escapar(socio.rol.replace(/^Tu /, "tu ")) + "</h2>" +
        '<p class="caja__sub">Consultas rápidas con respuestas de ejemplo</p></div></div></div>' +
        '<div class="pedile__lista">' +
        socio.preguntas.map(function (p) {
          return '<button type="button" class="pedile__boton" data-consulta="' + p.id + '">' + escapar(p.pregunta) + ICONOS.flecha + "</button>";
        }).join("") + "</div></section>";
    });
  }

  // ================= FINANZAS =================
  function armarFinanzas() {
    grafico($("#grafico-ing-egr"), {
      descripcion: "Ingresos y egresos de los últimos 12 meses",
      etiquetas: M.map(function (m) { return m.corto; }),
      series: [
        { nombre: "Ingresos", valores: M.map(function (m) { return m.ventas; }), color: "#187A60" },
        { nombre: "Egresos", valores: M.map(gastos), color: "#0F2524", punteada: true },
      ],
      formatoEje: function (v) { return pesosCorto(v).replace(",0 M", " M"); },
      formatoFinal: pesosCorto,
      tabla: {
        columnas: ["Mes", "Ingresos", "Egresos", "Resultado"],
        filas: M.map(function (m) { return [m.mes, pesos(m.ventas), pesos(gastos(m)), pesos(m.ventas - gastos(m))]; }),
      },
    });

    $("#calendario").innerHTML = D.calendario.map(function (c) {
      return '<li><span class="calendario__fecha">' + escapar(c.fecha) + "</span>" +
        "<span>" + escapar(c.concepto) + '<span class="calendario__tipo">' + escapar(c.tipo) + "</span></span>" +
        '<span class="calendario__monto ' + (c.monto < 0 ? "baja" : "sube") + '">' + (c.monto > 0 ? "+" : "") + pesosCorto(c.monto) + "</span></li>";
    }).join("");

    // Plata para separar
    var totalNov = D.reservas.reduce(function (t, r) { return t + r.noviembre; }, 0);
    $("#reservas-total").innerHTML = "<span>Para separar en noviembre</span><strong>" + pesosCorto(totalNov) + "</strong>" +
      "<small>Hoy separado: $0 · sale de la caja ($18,6 M) y de lo que vendas</small>";
    $("#reservas").innerHTML = D.reservas.map(function (r) {
      return '<li><div class="reservas__fila"><span class="reservas__nombre">' + escapar(r.nombre) +
        "<small>" + escapar(pesosCorto(r.total)) + " · " + escapar(r.cuando) + "</small></span>" +
        "<strong>" + pesosCorto(r.noviembre) + "</strong></div>" +
        '<div class="costos__barra" aria-hidden="true"><span style="width:' + ((r.noviembre / totalNov) * 100).toFixed(1) + '%"></span></div>' +
        '<p class="reservas__detalle">' + escapar(r.detalle) + "</p></li>";
    }).join("");
    $("#reserva-normal").textContent = D.reservaMesNormal;

    // Proveedores y distribuidores
    var totalProv = D.proveedores.reduce(function (t, p) { return t + p.monto; }, 0);
    $("#proveedores-sub").textContent = "Compras de octubre: " + pesosCorto(totalProv) + " (" + porcentaje((totalProv / ultimo.ventas) * 100) + " de lo que vendés)";
    $("#proveedores").innerHTML = D.proveedores.slice().sort(function (a, b) { return b.monto - a.monto; }).map(function (p) {
      var chip = p.suba > 5.6 ?
        '<span class="chip chip--atencion">' + ICONOS.sube + "+" + p.suba + "% · más que la inflación</span>" :
        '<span class="chip chip--neutro">+' + p.suba + "%</span>";
      return '<li><div class="proveedores__fila"><span class="proveedores__nombre">' + escapar(p.nombre) + "<small>" + escapar(p.que) + "</small></span>" +
        "<strong>" + pesosCorto(p.monto) + "</strong></div>" +
        '<div class="proveedores__pie"><span>' + escapar(p.entrega) + "</span><span>" + escapar(p.condicion) + "</span>" + chip + "</div></li>";
    }).join("");

    // De cada $100 que vendés
    var partes = [
      { nombre: "Mercadería e insumos", valor: ultimo.insumos, color: "#187A60" },
      { nombre: "Sueldos y cargas", valor: ultimo.sueldos, color: "#0F2524" },
      { nombre: "Alquiler", valor: ultimo.alquiler, color: "#3D4F4E" },
      { nombre: "Luz, gas y otros fijos", valor: ultimo.otros, color: "#8A9896" },
      { nombre: "Impuestos", valor: ultimo.impuestos, color: "#D98E1F" },
      { nombre: "Publicidad", valor: ultimo.publicidad, color: "#9A5F0A" },
    ];
    var gastado = partes.reduce(function (t, x) { return t + x.valor; }, 0);
    partes.push({ nombre: "Lo que te queda (ganancia)", valor: ultimo.ventas - gastado, color: "#5FD3A8", ganancia: true });
    $("#cada100").innerHTML =
      '<div class="cada100__barra" aria-hidden="true">' +
      partes.map(function (x) { return '<span style="width:' + ((x.valor / ultimo.ventas) * 100).toFixed(2) + "%;background:" + x.color + '"></span>'; }).join("") + "</div>" +
      '<ul class="cada100__lista">' + partes.map(function (x) {
        var deCien = (x.valor / ultimo.ventas) * 100;
        return "<li" + (x.ganancia ? ' class="cada100__ganancia"' : "") + '><i style="background:' + x.color + '"></i><span>' + escapar(x.nombre) + "</span>" +
          "<strong>$" + deCien.toFixed(1).replace(".", ",") + "</strong><small>" + pesosCorto(x.valor) + "</small></li>";
      }).join("") + "</ul>";

    // Gastos fijos
    var totalFijos = D.gastosFijos.reduce(function (t, g) { return t + g.monto; }, 0);
    $("#fijos").innerHTML = D.gastosFijos.map(function (g) {
      return "<li><span>" + escapar(g.nombre) + "</span><strong>" + pesos(g.monto) + "</strong></li>";
    }).join("") +
      '<li class="fijos__total"><span>Total por mes</span><strong>' + pesos(totalFijos) + "</strong></li>" +
      '<li class="fijos__nota">Sin contar sueldos (' + pesosCorto(ultimo.sueldos) + "). Con sueldos, los gastos fijos son " +
      pesosCorto(totalFijos + ultimo.sueldos) + " por mes: unos " + pesosCorto((totalFijos + ultimo.sueldos) / 30) + " por día.</li>";

    $("#cobros").innerHTML = D.cobros.map(function (c) {
      return '<li><span class="cuentas__nombre">' + escapar(c.nombre) + "</span>" +
        '<span class="cuentas__estado' + (c.vencida ? " vencida" : "") + '">' + escapar(c.estado) + "</span>" +
        '<span class="cuentas__monto">' + pesos(c.monto) + "</span>" +
        (c.vencida ? '<button type="button" class="cuentas__reclamar" data-consulta="cfo-cobrar">Reclamar</button>' : "") + "</li>";
    }).join("");

    $("#pagos").innerHTML = D.pagos.map(function (c) {
      return '<li><span class="cuentas__nombre">' + escapar(c.nombre) + "</span>" +
        '<span class="cuentas__estado">' + escapar(c.estado) + "</span>" +
        '<span class="cuentas__monto">' + pesos(c.monto) + "</span></li>";
    }).join("");
  }

  // ================= MARKETING =================
  function armarMarketing() {
    grafico($("#grafico-real"), {
      descripcion: "Ventas mensuales en pesos de cada mes y ajustadas por inflación",
      etiquetas: M.map(function (m) { return m.corto; }),
      series: [
        { nombre: "Ventas en pesos de cada mes", valores: M.map(function (m) { return m.ventas; }), color: "#8A9896", punteada: true },
        { nombre: "Ventas reales (pesos de octubre)", valores: M.map(function (m) { return m.real; }), color: "#187A60" },
      ],
      formatoEje: function (v) { return pesosCorto(v).replace(",0 M", " M"); },
      formatoFinal: pesosCorto,
      tabla: {
        columnas: ["Mes", "En pesos de cada mes", "Reales", "Ticket promedio"],
        filas: M.map(function (m) { return [m.mes, pesos(m.ventas), pesos(m.real), pesos(m.ventas / m.tickets)]; }),
      },
    });

    grafico($("#grafico-clientes"), {
      descripcion: "Clientes registrados que compraron cada mes",
      etiquetas: M.map(function (m) { return m.corto; }),
      series: [{ nombre: "Clientes registrados", valores: M.map(function (m) { return m.clientes; }), color: "#187A60" }],
      formatoEje: function (v) { return numero(v); },
      alto: 220,
      tabla: {
        columnas: ["Mes", "Activos", "Nuevos"],
        filas: M.map(function (m) { return [m.mes, numero(m.clientes), numero(m.nuevos)]; }),
      },
    });
  }

  // ================= CAMPAÑA DEL CMO (captación de clientes) =================
  function armarCampania() {
    var c = D.campania;
    var ventas = c.resultados[0].valor;
    $("#logro-titulo").textContent = ventas + " de ventas con la campaña de tu CMO";
    $("#logro-detalle").textContent = "«" + c.nombre + "» trajo " + c.resultados[1].valor + " clientes de vuelta y " + c.resultados[2].valor + " nuevos en dos semanas.";

    $("#campania-sub").textContent = "«" + c.nombre + "» · " + c.fechas + " · propuesta por tu CMO";
    $("#campania-que").textContent = c.que;
    $("#campania-resultados").innerHTML = c.resultados.map(function (r) {
      return "<div><span>" + escapar(r.nombre) + "</span><strong>" + escapar(r.valor) + "</strong><small>" + escapar(r.detalle) + "</small></div>";
    }).join("");

    grafico($("#grafico-campania"), {
      descripcion: "Ventas por semana antes y durante la campaña",
      etiquetas: c.semanas.map(function (s) { return s.semana; }),
      titulos: c.semanas.map(function (s, i) { return "Semana del " + s.semana + (i >= c.inicio ? " · con campaña" : ""); }),
      series: [{ nombre: "Ventas por semana", valores: c.semanas.map(function (s) { return s.ventas; }), color: "#187A60" }],
      formatoEje: function (v) { return pesosCorto(v); },
      formatoFinal: pesosCorto,
      formatoCursor: pesos,
      marcas: [{ posicion: c.inicio - 0.5, texto: "Empieza la campaña" }],
      alto: 220,
      tabla: {
        columnas: ["Semana", "Ventas", "Campaña"],
        filas: c.semanas.map(function (s, i) { return [s.semana, pesos(s.ventas), i >= c.inicio ? "Sí" : "No"]; }),
      },
    });
  }

  // ================= OPERACIONES =================
  function armarOperaciones() {
    grafico($("#grafico-insumos"), {
      descripcion: "Porcentaje de insumos sobre ventas por mes",
      etiquetas: M.map(function (m) { return m.corto; }),
      series: [{ nombre: "Insumos sobre ventas", valores: M.map(function (m) { return (m.insumos / m.ventas) * 100; }), color: "#187A60" }],
      formatoEje: function (v) { return porcentaje(v, Number.isInteger(Math.round(v * 10) / 10) ? 0 : 1); },
      formatoFinal: function (v) { return porcentaje(v); },
      alto: 220,
      tabla: {
        columnas: ["Mes", "Insumos / ventas", "Merma / insumos"],
        filas: M.map(function (m) { return [m.mes, porcentaje((m.insumos / m.ventas) * 100), porcentaje((m.merma / m.insumos) * 100)]; }),
      },
    });

    var u = ultimo;
    var costos = [
      ["Mercadería e insumos", u.insumos],
      ["Sueldos y cargas", u.sueldos],
      ["Servicios y otros fijos", u.otros],
      ["Alquiler", u.alquiler],
      ["Impuestos", u.impuestos],
      ["Publicidad", u.publicidad],
    ].sort(function (a, b) { return b[1] - a[1]; });
    var mayor = costos[0][1];
    $("#costos").innerHTML = costos.map(function (c) {
      var pct = (c[1] / u.ventas) * 100;
      return '<li><div class="costos__fila"><span>' + escapar(c[0]) + "</span><span><strong>" + pesosCorto(c[1]) + "</strong><small>" + porcentaje(pct) + " de las ventas</small></span></div>" +
        '<div class="costos__barra" aria-hidden="true"><span style="width:' + ((c[1] / mayor) * 100).toFixed(1) + '%"></span></div></li>';
    }).join("");
  }

  // ================= ALERTAS =================
  function armarAlertas() {
    var filtros = [["todas", "Todas", D.alertas.length]];
    ["finanzas", "marketing", "operaciones"].forEach(function (a) {
      filtros.push([a, AREAS[a], D.alertas.filter(function (x) { return x.area === a; }).length]);
    });
    var cont = $("#filtros");
    cont.innerHTML = filtros.map(function (f, i) {
      return '<button type="button" class="filtro" data-filtro="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + f[1] + " <span>" + f[2] + "</span></button>";
    }).join("");

    function pintar(area) {
      var lista = D.alertas.filter(function (a) { return area === "todas" || a.area === area; });
      $("#alertas-lista").innerHTML = lista.map(function (a) { return htmlAlerta(a, true); }).join("");
    }
    cont.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filtro]");
      if (!b) return;
      $$("[data-filtro]", cont).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      pintar(b.getAttribute("data-filtro"));
    });
    pintar("todas");
  }

  // ================= CHAT CON LOS SOCIOS =================
  var cuerpoChat = $("#chat-cuerpo");
  var conversacion = $("#chat-conversacion");
  var socioActual = D.socios[0].id;
  var sociosVistos = {};
  var preguntasVistas = {};
  var cierreMostrado = false;
  var ocupado = false;
  var focoAntesDelChat = null;

  function armarPestanasChat() {
    var cont = $("#chat-pestanas");
    cont.innerHTML = D.socios.map(function (s) {
      return '<button type="button" class="chat__pestana" role="tab" id="pestana-' + s.id + '" data-socio="' + s.id + '" aria-controls="chat-cuerpo">' + escapar(s.rol) + "</button>";
    }).join("");
    cont.addEventListener("click", function (e) {
      var b = e.target.closest("[data-socio]");
      if (!b) return;
      elegirSocio(b.getAttribute("data-socio"));
      cuerpoChat.scrollTop = 0; // que se vean las preguntas del socio elegido
    });
    // Flechas del teclado para moverse entre pestañas
    cont.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var ids = D.socios.map(function (s) { return s.id; });
      var i = ids.indexOf(socioActual) + (e.key === "ArrowRight" ? 1 : -1);
      i = (i + ids.length) % ids.length;
      elegirSocio(ids[i]);
      cuerpoChat.scrollTop = 0;
      $("#pestana-" + ids[i]).focus();
    });
  }

  function elegirSocio(id) {
    socioActual = id;
    var s = socioPorId(id);
    $("#chat-titulo").textContent = s.rol;
    $("#chat-area").textContent = s.area;
    $("#chat-desc").textContent = s.descripcion + " Tocá una pregunta:";
    $$(".chat__pestana").forEach(function (b) {
      var activa = b.getAttribute("data-socio") === id;
      b.setAttribute("aria-selected", String(activa));
      b.tabIndex = activa ? 0 : -1;
    });
    // La pregunta destacada (plan del día) va primero
    var preguntas = s.preguntas.slice().sort(function (a, b) { return (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0); });
    $("#chat-preguntas").innerHTML = preguntas.map(function (p) {
      return '<button type="button" class="chat__pregunta' + (p.destacada ? " chat__pregunta--destacada" : "") + (preguntasVistas[p.id] ? " vista" : "") + '" data-preguntar="' + p.id + '">' +
        "<span>" + (p.destacada ? "<small>Lo más pedido</small>" : "") + escapar(p.pregunta) + "</span>" + ICONOS.flecha + "</button>";
    }).join("");
  }

  function abrirChat(idSocio, idPregunta) {
    if (chat.hidden) focoAntesDelChat = document.activeElement;
    cerrarMenu();
    chat.hidden = false;
    velo.hidden = false;
    document.body.classList.add("bloqueado");
    elegirSocio(idSocio || socioActual);
    if (idPregunta) {
      $("#cerrar-chat").focus();
      preguntar(idPregunta);
    } else {
      $("#pestana-" + socioActual).focus();
    }
  }
  function cerrarChat(sinFoco) {
    if (chat.hidden) return;
    chat.hidden = true;
    if (!lateral.classList.contains("abierto")) { velo.hidden = true; document.body.classList.remove("bloqueado"); }
    if (!sinFoco && focoAntesDelChat && document.contains(focoAntesDelChat)) focoAntesDelChat.focus();
  }

  function bajarA(el) {
    var destino = el.offsetTop - cuerpoChat.offsetTop - 12;
    if (reducirMovimiento) cuerpoChat.scrollTop = destino;
    else cuerpoChat.scrollTo({ top: destino, behavior: "smooth" });
  }

  function preguntar(idPregunta) {
    if (ocupado) return;
    var r = buscarPregunta(idPregunta);
    if (!r) return;
    if (r.socio.id !== socioActual) elegirSocio(r.socio.id);
    ocupado = true;

    var burbuja = document.createElement("p");
    burbuja.className = "mensaje-usuario entrar";
    burbuja.textContent = r.pregunta.pregunta;
    conversacion.appendChild(burbuja);

    var escribiendo = document.createElement("div");
    escribiendo.className = "escribiendo entrar";
    escribiendo.innerHTML = '<span class="escribiendo__puntos" aria-hidden="true"><span></span><span></span><span></span></span>' + escapar(r.socio.rol) + " está escribiendo…";
    conversacion.appendChild(escribiendo);
    bajarA(burbuja);

    setTimeout(function () {
      escribiendo.remove();
      conversacion.appendChild(armarRespuesta(r.socio, r.pregunta));
      bajarA(burbuja);

      preguntasVistas[idPregunta] = true;
      sociosVistos[r.socio.id] = true;
      var boton = $('[data-preguntar="' + idPregunta + '"]');
      if (boton) boton.classList.add("vista");
      ocupado = false;

      if (!cierreMostrado && Object.keys(sociosVistos).length === D.socios.length) {
        cierreMostrado = true;
        conversacion.appendChild(armarCierre());
      }
    }, DEMORA_ESCRIBIENDO);
  }

  function armarRespuesta(socio, p) {
    var div = document.createElement("article");
    div.className = "respuesta entrar";
    var html = '<div class="respuesta__cabecera"><span class="respuesta__autor">' + avatar() + escapar(socio.rol) + "</span>" +
      '<span class="respuesta__ejemplo">Respuesta de ejemplo</span></div>';
    if (p.estado === "atencion") {
      html += '<p class="estado estado--atencion">' + ICONOS.atencion + escapar(p.estadoTexto || "Atención") + "</p>";
    }
    html += '<div class="respuesta__texto">';
    (p.parrafos || []).forEach(function (t) { html += "<p>" + escapar(t) + "</p>"; });
    if (p.pasos && p.pasos.length) {
      html += "<ol>" + p.pasos.map(function (t) { return "<li>" + escapar(t) + "</li>"; }).join("") + "</ol>";
    }
    (p.parrafosFinales || []).forEach(function (t) { html += "<p>" + escapar(t) + "</p>"; });
    html += "</div>";
    html += '<p class="respuesta__seguir">¿Te gustaría algo así con los números de tu negocio? ' +
      '<a href="' + escapar(FORMULARIO) + '" target="_blank" rel="noopener">Queremos escucharte<span class="solo-lector"> (se abre en una pestaña nueva)</span></a></p>';
    div.innerHTML = html;
    return div;
  }

  function armarCierre() {
    var div = document.createElement("section");
    div.className = "cierre-chat entrar";
    div.innerHTML = '<p class="etiqueta">Ya conociste a tu directorio</p>' +
      "<h3>¿Qué te pareció?</h3>" +
      "<p>Estamos desarrollando CoFounder y tu opinión nos ayuda a hacerlo mejor. Contanos de tu negocio y te avisamos cuando puedas probarlo con tus propios números.</p>" +
      '<a class="boton boton--brote" href="' + escapar(FORMULARIO) + '" target="_blank" rel="noopener">Queremos escucharte ' + ICONOS.externo +
      '<span class="solo-lector">(se abre en una pestaña nueva)</span></a>';
    return div;
  }

  // ================= Arranque =================
  function iniciar() {
    ajustarAviso();

    // Links al formulario de Google
    $$("[data-formulario]").forEach(function (a) { a.href = FORMULARIO; });

    // Barra de arriba
    var nombrePila = D.negocio.duena.split(" ")[0];
    $("#saludo").textContent = "Hola, " + nombrePila;
    $("#saludo-sub").textContent = "Tu resumen del " + D.negocio.hoy;
    $("#barra-duena").textContent = D.negocio.duena;
    $("#barra-negocio").textContent = D.negocio.nombre;
    $("#barra-iniciales").textContent = D.negocio.iniciales;

    armarBienvenida();
    armarPestanasChat();

    // Pantallas (los gráficos se dibujan cuando su pantalla está visible)
    mostrarVista(vistaDesdeHash(), false);
    armarKpis();
    armarSalud();
    armarAlertasResumen();
    armarProyecciones();
    armarMacro();
    armarPlan();
    armarSocios();
    armarIndicadores();
    armarComponentes();
    armarPedile();
    armarFinanzas();
    armarMarketing();
    armarCampania();
    armarOperaciones();
    armarAlertas();

    // Clicks en toda la página (botones que se crean en distintos lugares)
    document.addEventListener("click", function (e) {
      var t = e.target;
      var consulta = t.closest("[data-consulta]");
      if (consulta) { abrirChat(null, consulta.getAttribute("data-consulta")); return; }
      var abrir = t.closest("[data-abrir-chat]");
      if (abrir) { abrirChat(abrir.getAttribute("data-abrir-chat")); return; }
      var botonPregunta = t.closest("[data-preguntar]");
      if (botonPregunta) { preguntar(botonPregunta.getAttribute("data-preguntar")); return; }
      if (t.closest("[data-abrir-bienvenida]")) { abrirBienvenida(); return; }
      if (t.closest("a[data-ir]")) cerrarMenu();
    });

    $("#bv-entrar").addEventListener("click", cerrarBienvenida);
    $("#cerrar-chat").addEventListener("click", function () { cerrarChat(); });
    botonMenu.addEventListener("click", abrirMenu);
    $("#cerrar-menu").addEventListener("click", function () { cerrarMenu(); botonMenu.focus(); });
    velo.addEventListener("click", function () { cerrarChat(); cerrarMenu(); });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!chat.hidden) cerrarChat();
      else if (lateral.classList.contains("abierto")) { cerrarMenu(); botonMenu.focus(); }
    });

    window.addEventListener("hashchange", function () { mostrarVista(vistaDesdeHash(), true); });

    var espera;
    window.addEventListener("resize", function () {
      clearTimeout(espera);
      espera = setTimeout(function () { ajustarAviso(); redibujarVisibles(); }, 150);
    });

    // La bienvenida aparece la primera vez que se entra (en esta pestaña del navegador)
    var yaLaVio = false;
    try { yaLaVio = sessionStorage.getItem("cofounder-demo-bienvenida") === "vista"; } catch (e) { /* nada */ }
    if (!yaLaVio) abrirBienvenida();
  }

  iniciar();
})();
