/*
  CONFIGURACIÓN EDITABLE DE COFOUNDER
  ------------------------------------
  Acá están los datos que pueden cambiar seguido (links, contacto, redes).
  Para editarlos no hace falta tocar nada más: cambiá el texto entre comillas,
  guardá el archivo y recargá la página.
*/
window.COFOUNDER_CONFIG = {
  // Formulario de Google donde la gente deja sus datos ("Queremos escucharte").
  formularioUrl: "https://forms.gle/L3hx7siAAM2UK2jy5",

  // Contacto que se muestra en la sección "Contactanos".
  contacto: {
    nombre: "Santino Ciavirella",
    telefonoVisible: "+54 9 11 5982-3433",
    // Mismo número, solo dígitos y con código de país (lo usa el link de WhatsApp).
    telefonoDigitos: "5491159823433",
    email: "ciavirellasantino@gmail.com",
  },

  // Redes sociales. Si un link queda vacío (""), la red se muestra sin link.
  redes: [
    { red: "instagram", nombre: "Instagram", usuario: "@cofounder_ok", url: "https://www.instagram.com/cofounder_ok" },
    { red: "tiktok", nombre: "TikTok", usuario: "@cofounderarg", url: "https://www.tiktok.com/@cofounderarg" },
    { red: "x", nombre: "X", usuario: "@cofounderAI", url: "https://x.com/cofounderAI" },
    { red: "youtube", nombre: "YouTube", usuario: "@cofounderAI", url: "https://www.youtube.com/@cofounderAI" },
    // PENDIENTE: pegá acá el link completo de la página de LinkedIn.
    { red: "linkedin", nombre: "LinkedIn", usuario: "@cofounder", url: "" },
  ],
};
