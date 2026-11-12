/* ==========================================================
   IEEE Student Branch EPN — DATOS de becados
   Miembros de la rama que han recibido becas IEEE (de cualquier
   programa). Único archivo a editar para esa sección: js/becados.js
   los dibuja con una sola plantilla.

   AGREGAR UN BECADO = agregar un objeto al arreglo de abajo.
   Copia la PLANTILLA, pégala fuera del comentario y completa.

   Campos
     nombre      Nombre como la persona quiere que aparezca.
     programa    Programa o beca IEEE, con su nombre oficial.
     anio        Año en que la recibió (número, p. ej. 2025).
     carrera     Carrera en la EPN.
     foto        Opcional. Ruta a la foto, p. ej. 'assets/img/becados/nombre-apellido.webp'
                 (WebP, vertical 4:5, 480 × 600 px).
     enlace      Opcional. URL https:// (anuncio oficial de la beca, perfil profesional…).
     consentimiento
       datos     true SOLO si la persona autorizó publicar nombre, beca, año, carrera y enlace.
       foto      true SOLO si además autorizó publicar su foto.
       fecha     Fecha de la autorización (AAAA-MM-DD), para el registro interno de la rama.

   Reglas de publicación (las aplica js/becados.js)
     · Sin consentimiento.datos === true, el registro NO se publica.
     · Sin consentimiento.foto === true, no se muestra la foto (se ven las iniciales).
     · Los becados se ordenan por año, del más reciente al más antiguo.
   ========================================================== */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.becados = [
  /* PLANTILLA
  {
    nombre: '',
    programa: '',
    anio: 2026,
    carrera: '',
    foto: '',
    enlace: '',
    consentimiento: { datos: false, foto: false, fecha: '' }
  },
  */
];
