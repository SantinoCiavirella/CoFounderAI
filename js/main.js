/*
  COMPORTAMIENTO DE LA LANDING
  - Pone el link del formulario en todos los botones "Queremos escucharte".
  - Arma la lista de contacto y de redes con los datos de js/config.js.
  - Hace aparecer las secciones de a poco al scrollear.
*/
(function () {
  "use strict";

  var config = window.COFOUNDER_CONFIG || {};
  document.documentElement.classList.remove("sin-js");

  // Íconos de línea (2 px, puntas redondeadas, grilla de 24 px)
  var ICONOS = {
    whatsapp: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a3.5 3.5 0 0 1-2-2l1-1-1-2z"/>',
    telefono: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.6 2.4 4.5 5 4.8"/>',
    x: '<path d="M4 4h4.5L20 20h-4.5z"/><path d="M20 4l-6.6 7.3M4 20l6.6-7.3"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5h.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.5-3s2.5 1.3 2.5 3V17"/>',
  };

  function icono(nombre) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONOS[nombre] || "") +
      "</svg>"
    );
  }

  // Evita que un texto de config.js se interprete como código HTML
  function escapar(texto) {
    var div = document.createElement("div");
    div.textContent = texto == null ? "" : String(texto);
    return div.innerHTML;
  }

  // 1) Link del formulario en todos los botones marcados con data-formulario
  if (config.formularioUrl) {
    document.querySelectorAll("[data-formulario]").forEach(function (enlace) {
      enlace.href = config.formularioUrl;
    });
  }

  // 2) Datos de contacto
  var listaContacto = document.getElementById("lista-contacto");
  var c = config.contacto;
  if (listaContacto && c) {
    var nombre = document.getElementById("contacto-nombre");
    if (nombre && c.nombre) nombre.textContent = c.nombre;

    var items = [];
    if (c.telefonoDigitos) {
      items.push(
        '<li><a href="https://wa.me/' + escapar(c.telefonoDigitos) + '" target="_blank" rel="noopener">' +
          icono("whatsapp") +
          "<span>WhatsApp: " + escapar(c.telefonoVisible) +
          '<span class="solo-lector"> (se abre en una pestaña nueva)</span></span></a></li>'
      );
      items.push(
        '<li><a href="tel:+' + escapar(c.telefonoDigitos) + '">' +
          icono("telefono") + "<span>Llamar: " + escapar(c.telefonoVisible) + "</span></a></li>"
      );
    }
    if (c.email) {
      items.push(
        '<li><a href="mailto:' + escapar(c.email) + '">' +
          icono("email") + "<span>" + escapar(c.email) + "</span></a></li>"
      );
    }
    listaContacto.innerHTML = items.join("");
  }

  // 3) Redes sociales
  var listaRedes = document.getElementById("lista-redes");
  if (listaRedes && Array.isArray(config.redes)) {
    listaRedes.innerHTML = config.redes
      .map(function (r) {
        var contenido =
          icono(r.red) +
          '<span><span class="red__nombre">' + escapar(r.nombre) + "</span>" +
          '<span class="red__usuario">' + escapar(r.usuario) + "</span></span>";
        if (r.url) {
          return (
            '<li><a class="red" href="' + escapar(r.url) + '" target="_blank" rel="noopener">' +
            contenido +
            '<span class="solo-lector"> (se abre en una pestaña nueva)</span></a></li>'
          );
        }
        // Sin link cargado todavía: se muestra igual, pero sin enlace
        return '<li><span class="red red--sin-link">' + contenido + "</span></li>";
      })
      .join("");
  }

  // 4) Año actual en el pie
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  // 5) Aparición suave al scrollear
  var elementos = document.querySelectorAll(".aparece");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  elementos.forEach(function (el) { observador.observe(el); });
})();
