/* ==========================================================
   IEEE Student Branch EPN — Configuración del sitio
   Los valores vacíos ('') son PENDIENTES: el sitio funciona sin
   ellos y los marca como tales mientras MOSTRAR_PENDIENTES = true.
   ========================================================== */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.config = {
  /* false en la versión publicada: oculta las etiquetas PENDIENTE */
  MOSTRAR_PENDIENTES: false,

  /* Video de fondo de la portada (corto, en bucle, sin pista de audio, idealmente < 3 MB).
     Rutas relativas a index.html; distinguen mayúsculas y minúsculas en el servidor.
     El póster también está en index.html (<img id="visor-poster">) para que sea el LCP. */
  video: {
    webm: '',                                      // opcional, p. ej. 'assets/video/vid1.webm'
    mp4: 'assets/video/vid1-1080.mp4',             // 1080p, 25 fps, sin audio (~1,1 MB)
    poster: 'assets/video/vid1-poster-1920.webp'   // primer cuadro del video
  },

  /* Formulario de contacto.
     endpoint: URL de un servicio de formularios que acepte POST con FormData
     y responda 2xx (Formspree, Getform, Basin, Google Apps Script…).
     Mientras esté vacío, el envío abre el correo del visitante (mailto). */
  form: {
    endpoint: '',
    email: 'rama.ieee@epn.edu.ec'   // PENDIENTE confirmar: tomado de la versión A, sin fuente oficial
  }
};
