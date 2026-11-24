/* Configuración del sitio */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.config = {
  /* false en la versión publicada: oculta las etiquetas PENDIENTE */
  MOSTRAR_PENDIENTES: false,

  /* Portada: fotos que rotan en bucle (fundido + acercamiento lento), en lugar de video.
     Cada foto existe en assets/img/portada/<nombre>-640/-960/-1200/-1600.webp, 16:9 (el navegador elige el tamaño).
     La primera también está en index.html (<img id="visor-poster">) porque es el LCP.
     Agregar una foto = exportarla en 16:9 con esos cuatro anchos y sumar su nombre aquí. */
  portada: {
    intervalo: 6000,          // ms que se ve cada foto
    /* slide-15/16: CIS en las letras EPN. slide-18/19: NASA Space Apps Riobamba (separadas entre sí).
       Solo nombres cuyos archivos existan: una foto que falte se salta, pero genera un 404. */
    fotos: ['slide-01', 'slide-02', 'slide-03', 'slide-15', 'slide-04', 'slide-05', 'slide-16', 'slide-08',
            'slide-09', 'slide-18', 'slide-10', 'slide-11', 'slide-12', 'slide-19', 'slide-13', 'slide-14']
  },

  /* Formulario de contacto.
     endpoint: URL de un servicio de formularios que acepte POST con FormData
     y responda 2xx (Formspree, Getform, Basin, Google Apps Script…).
     Mientras esté vacío, el envío abre el correo del visitante (mailto). */
  form: {
    endpoint: '',
    email: 'rama.ieee@epn.edu.ec'   // PENDIENTE confirmar: tomado de la versión A, sin fuente oficial
  },

  /* Mascota (búho del borde derecho, js/mascota.js): destinos del avión.
     place: ciudad · detail: "País · texto corto" · target, uno de estos:
       '#id'               elemento de la vista actual
       '/ruta' o '/ruta/id' vista del sitio y elemento dentro de ella ('/historia/rnr-2024')
       '/#id'              elemento de Inicio ('/#beca-tab-ims-2026' abre esa pestaña de Becados)
       'https://…'         sitio externo, en una pestaña nueva
     Sin banderas emoji: en Windows se ven como letras. 2 columnas: mejor un número par. */
  mascota: {
    destinos: [
      { place: 'Boston',  detail: 'EE. UU. · Beca IMS 2026',          target: '/#beca-tab-ims-2026' },
      { place: 'Denver',  detail: 'EE. UU. · Beca IPC 2026',          target: '/#beca-tab-ipc-2026' },
      { place: 'Natal',   detail: 'Brasil · Beca LACAP 2026',         target: '/#beca-tab-lacap-2026' },
      { place: 'La Paz',  detail: 'Bolivia · 1.er lugar, 2010',       target: '/historia/casos-exito-2010' },
      { place: 'Cuenca',  detail: 'Ecuador · Feria de Ramas 2024',    target: '/historia/rnr-2024' },
      { place: 'Quito',   detail: 'Ecuador · Nuestra casa, la EPN',   target: 'https://maps.app.goo.gl/S6yPkwnSJmmtby6cA' }
    ]
  }
};
