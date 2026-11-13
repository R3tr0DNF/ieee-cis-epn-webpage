/* ==========================================================
   IEEE Student Branch EPN — Configuración del sitio
   Los valores vacíos ('') son PENDIENTES: el sitio funciona sin
   ellos y los marca como tales mientras MOSTRAR_PENDIENTES = true.
   ========================================================== */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.config = {
  /* false en la versión publicada: oculta las etiquetas PENDIENTE */
  MOSTRAR_PENDIENTES: false,

  /* Portada: fotos que rotan en bucle (fundido + acercamiento lento), en lugar de video.
     Cada foto existe en assets/img/portada/<nombre>-960.webp y -1600.webp, 16:9 (1600 × 900).
     La primera también está en index.html (<img id="visor-poster">) porque es el LCP.
     Agregar una foto = exportarla en 16:9 con esos dos tamaños y sumar su nombre aquí. */
  portada: {
    intervalo: 6000,          // ms que se ve cada foto
    fotos: ['slide-01', 'slide-02', 'slide-03', 'slide-04', 'slide-05', 'slide-06', 'slide-07',
            'slide-08', 'slide-09', 'slide-10', 'slide-11', 'slide-12', 'slide-13', 'slide-14']
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
