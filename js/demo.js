/*
  DEMO SIMULADA DE COFOUNDER
  --------------------------
  No hay IA ni internet acá: todas las respuestas están escritas de antemano.

  PARA EDITAR TEXTOS: cambiá solo lo que está dentro del objeto DEMO, acá abajo.
  - "parrafos": cada texto entre comillas es un párrafo.
  - "pasos": lista numerada (opcional).
  - "estado": "atencion" muestra el aviso naranja con ícono (opcional).
  No hace falta tocar nada de la parte de "LÓGICA".
*/
var DEMO = {
  negocio: "Tienda de ropa con local y venta por Instagram. Datos ilustrativos.",

  socios: [
    {
      id: "cfo",
      rol: "Tu CFO",
      area: "Finanzas",
      descripcion: "Cuida tu caja, tus costos y tus precios.",
      preguntas: [
        {
          pregunta: "¿Voy a llegar bien a fin de mes?",
          estado: "atencion",
          estadoTexto: "Atención: la caja podría quedar corta",
          parrafos: [
            "Con las ventas de septiembre de este negocio de ejemplo, en tres semanas la caja podría quedar corta.",
            "Es una estimación: si cargás octubre, se ajusta. Te propongo dos opciones:",
          ],
          pasos: [
            "Adelantar el cobro a clientes que te deben.",
            "Pasar un pago a proveedores a 30 días.",
          ],
        },
        {
          pregunta: "¿Cuánto me conviene cobrar mi producto más vendido?",
          parrafos: [
            "En este ejemplo, el costo de la remera pasó de $8.000 a $9.200 y el precio sigue en $15.000: tu margen bajó de 47 % a 39 %.",
            "Para volver a un margen cercano al de antes (44 %), el precio rondaría los $16.500. Es una estimación con datos de ejemplo.",
            "Hoy podés probar el nuevo precio con una tanda chica.",
          ],
        },
      ],
    },
    {
      id: "cmo",
      rol: "Tu CMO",
      area: "Marketing",
      descripcion: "Te ayuda a conseguir clientes y a vender más.",
      preguntas: [
        {
          pregunta: "¿Qué oferta me conviene hacer esta semana?",
          parrafos: [
            "Los jueves y viernes se vende menos y tenés stock parado de la colección anterior.",
            "Una opción: un 2x1 en esa colección solo esos dos días, avisado por WhatsApp a quienes ya te compraron. Movés stock sin bajarle el precio a todo.",
            "Después medí cuántos de los que recibieron el mensaje compraron.",
          ],
        },
        {
          pregunta: "¿Qué publicación me conviene hacer para conseguir clientes?",
          parrafos: ["Una opción para probar:"],
          pasos: [
            "Hoy, un video corto de 15 segundos mostrando la prenda por la que más te preguntan, con el precio y “escribime por WhatsApp” al final.",
            "Mañana, una historia con las tres preguntas más frecuentes.",
          ],
          parrafosFinales: [
            "Contá cuántos mensajes te llegan por cada publicación y repetí la que mejor funcione.",
          ],
        },
      ],
    },
    {
      id: "coo",
      rol: "Tu COO",
      area: "Operaciones",
      descripcion: "Ordena tu día a día: stock, proveedores y procesos.",
      preguntas: [
        {
          pregunta: "¿Qué hago hoy para mejorar mi negocio?",
          parrafos: ["Tu plan de hoy, en unos 90 minutos:"],
          pasos: [
            "Llamá a los tres clientes que más te deben: ahí está tu caja de esta semana.",
            "Reponé los talles M y L de lo más vendido: te alcanzan para 4 días.",
            "Publicá el video que armó tu CMO.",
          ],
          parrafosFinales: ["Marcalas cuando termines."],
        },
        {
          pregunta: "¿Qué se me puede escapar esta semana?",
          parrafos: [
            "Tu proveedor principal tarda 10 días en entregar y el talle M te alcanza para 6. Conviene pedir hoy y no el viernes.",
            "Te dejamos el pedido armado para que lo revises y lo mandes vos.",
          ],
        },
      ],
    },
  ],
};

/* =========================================================
   LÓGICA (no hace falta editar de acá para abajo)
   ========================================================= */
(function () {
  "use strict";

  var config = window.COFOUNDER_CONFIG || {};
  var sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DEMORA_ESCRIBIENDO = sinAnimacion ? 0 : 1100; // milisegundos

  var pestanas = document.getElementById("pestanas");
  var panel = document.getElementById("panel-socio");
  var conversacion = document.getElementById("conversacion");
  var cierre = document.getElementById("cierre-demo");
  var sociosVistos = {}; // socios que ya respondieron algo
  var yaVistas = {};     // preguntas que ya se tocaron
  var ocupado = false;

  document.getElementById("negocio-ejemplo").textContent = DEMO.negocio;

  // Link del formulario en todos los botones marcados con data-formulario
  if (config.formularioUrl) {
    document.querySelectorAll("[data-formulario]").forEach(function (a) {
      a.href = config.formularioUrl;
    });
  }

  // ---------- Ayudantes ----------
  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }

  function svgAvatar() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 160 100");
    svg.setAttribute("aria-hidden", "true");
    var disco = document.createElementNS(ns, "circle");
    disco.setAttribute("cx", "110"); disco.setAttribute("cy", "50"); disco.setAttribute("r", "50");
    disco.setAttribute("fill", "#187A60");
    var anillo = document.createElementNS(ns, "circle");
    anillo.setAttribute("cx", "50"); anillo.setAttribute("cy", "50"); anillo.setAttribute("r", "40");
    anillo.setAttribute("fill", "none"); anillo.setAttribute("stroke", "#0F2524"); anillo.setAttribute("stroke-width", "20");
    svg.appendChild(disco);
    svg.appendChild(anillo);
    return svg;
  }

  var FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICONO_ATENCION = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5h.01"/></svg>';

  function buscarSocio(id) {
    return DEMO.socios.filter(function (s) { return s.id === id; })[0];
  }

  // ---------- Pestañas de socios ----------
  DEMO.socios.forEach(function (socio, i) {
    var boton = crear("button", "pestana");
    boton.type = "button";
    boton.id = "pestana-" + socio.id;
    boton.setAttribute("role", "tab");
    boton.setAttribute("aria-controls", "panel-socio");
    boton.dataset.socio = socio.id;
    boton.appendChild(svgAvatar());
    boton.appendChild(crear("span", "pestana__rol", socio.rol));
    boton.appendChild(crear("span", "pestana__area", socio.area));
    boton.addEventListener("click", function () { elegirSocio(socio.id); });
    // Moverse entre pestañas con las flechas del teclado
    boton.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var siguiente = (i + (e.key === "ArrowRight" ? 1 : -1) + DEMO.socios.length) % DEMO.socios.length;
      elegirSocio(DEMO.socios[siguiente].id);
      document.getElementById("pestana-" + DEMO.socios[siguiente].id).focus();
    });
    pestanas.appendChild(boton);
  });

  function elegirSocio(id) {
    var socio = buscarSocio(id);
    pestanas.querySelectorAll(".pestana").forEach(function (b) {
      var activa = b.dataset.socio === id;
      b.setAttribute("aria-selected", activa ? "true" : "false");
      b.tabIndex = activa ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", "pestana-" + id);
    panel.innerHTML = "";
    panel.appendChild(crear("p", "panel-socio__desc", socio.descripcion));
    var lista = crear("div", "preguntas");
    socio.preguntas.forEach(function (p, indice) {
      var b = crear("button", "pregunta");
      b.type = "button";
      b.dataset.clave = socio.id + "-" + indice;
      if (yaVistas[b.dataset.clave]) b.classList.add("vista");
      b.appendChild(crear("span", null, p.pregunta));
      b.insertAdjacentHTML("beforeend", FLECHA);
      b.addEventListener("click", function () { preguntar(socio, indice, b); });
      lista.appendChild(b);
    });
    panel.appendChild(lista);
  }

  // ---------- Conversación ----------
  function preguntar(socio, indice, boton) {
    if (ocupado) return;
    ocupado = true;
    var p = socio.preguntas[indice];

    var vacia = conversacion.querySelector(".conversacion__vacia");
    if (vacia) vacia.remove();

    var miMensaje = crear("p", "mensaje-usuario entrar", p.pregunta);
    conversacion.appendChild(miMensaje);

    var escribiendo = crear("div", "escribiendo entrar");
    escribiendo.innerHTML =
      '<span class="escribiendo__puntos" aria-hidden="true"><span></span><span></span><span></span></span>';
    escribiendo.appendChild(document.createTextNode(socio.rol + " está escribiendo…"));
    conversacion.appendChild(escribiendo);
    llevarALaVista(miMensaje);

    setTimeout(function () {
      escribiendo.remove();
      var respuesta = armarRespuesta(socio, p);
      conversacion.appendChild(respuesta);
      llevarALaVista(miMensaje);

      yaVistas[socio.id + "-" + indice] = true;
      if (boton) boton.classList.add("vista");
      sociosVistos[socio.id] = true;
      ocupado = false;

      // Cuando ya probó a los tres socios, aparece la invitación final
      if (Object.keys(sociosVistos).length === DEMO.socios.length && cierre.hidden) {
        cierre.hidden = false;
        cierre.classList.add("entrar");
      }
    }, DEMORA_ESCRIBIENDO);
  }

  function armarRespuesta(socio, p) {
    var caja = crear("article", "respuesta entrar");
    caja.setAttribute("aria-label", "Respuesta de ejemplo de " + socio.rol);

    var cabecera = crear("div", "respuesta__cabecera");
    var autor = crear("span", "respuesta__autor");
    autor.appendChild(svgAvatar());
    autor.appendChild(crear("span", null, socio.rol));
    cabecera.appendChild(autor);
    cabecera.appendChild(crear("span", "respuesta__ejemplo", "Respuesta de ejemplo"));
    caja.appendChild(cabecera);

    if (p.estado === "atencion") {
      var estado = crear("p", "estado estado--atencion");
      estado.innerHTML = ICONO_ATENCION;
      estado.appendChild(document.createTextNode(p.estadoTexto || "Atención"));
      caja.appendChild(estado);
    }

    var texto = crear("div", "respuesta__texto");
    (p.parrafos || []).forEach(function (t) { texto.appendChild(crear("p", null, t)); });
    if (p.pasos && p.pasos.length) {
      var ol = crear("ol");
      p.pasos.forEach(function (t) { ol.appendChild(crear("li", null, t)); });
      texto.appendChild(ol);
    }
    (p.parrafosFinales || []).forEach(function (t) { texto.appendChild(crear("p", null, t)); });
    caja.appendChild(texto);

    var seguir = crear("p", "respuesta__seguir");
    seguir.appendChild(document.createTextNode("¿Te gustaría algo así con los datos de tu negocio? "));
    var link = crear("a", null, "Queremos escucharte");
    link.href = config.formularioUrl || "index.html#contacto";
    link.target = "_blank";
    link.rel = "noopener";
    link.appendChild(crear("span", "solo-lector", " (se abre en una pestaña nueva)"));
    seguir.appendChild(link);
    caja.appendChild(seguir);
    return caja;
  }

  // En el celular la conversación queda abajo: la llevamos a la vista
  function llevarALaVista(el) {
    if (window.matchMedia("(min-width: 960px)").matches) {
      // En escritorio la conversación tiene su propia barra de scroll
      conversacion.scrollTo({ top: el.offsetTop - 20, behavior: sinAnimacion ? "auto" : "smooth" });
      return;
    }
    el.scrollIntoView({ behavior: sinAnimacion ? "auto" : "smooth", block: "start" });
  }

  // ---------- Destacado: el plan de hoy (lo más valorado) ----------
  document.getElementById("plan-hoy").addEventListener("click", function () {
    elegirSocio("coo");
    var boton = panel.querySelector('[data-clave="coo-0"]');
    preguntar(buscarSocio("coo"), 0, boton);
  });

  // Arranca mostrando a tu CFO
  elegirSocio("cfo");
})();
