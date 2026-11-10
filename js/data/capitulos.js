/* ==========================================================
   IEEE Student Branch EPN — Datos de capítulos y grupos
   ----------------------------------------------------------
   Este es el ÚNICO archivo que hay que editar para mantener
   la sección "Capítulos y grupos". La presentación vive en
   js/capitulos.js y css/style.css.

   Para AGREGAR una agrupación, copia un bloque { ... } y
   cambia sus valores. El orden del arreglo es el orden en
   pantalla.

   Campos:
     id           identificador único, sin espacios (se usa en el HTML)
     sigla        sigla que se muestra grande en la tarjeta
     nombre       nombre oficial de la sociedad o grupo IEEE
     tipo         'capitulo' | 'afinidad' | 'sight'  (define el filtro)
     area         ámbito general de la sociedad IEEE a nivel mundial
                  (dato público de IEEE, no del capítulo local)
     descripcion  texto propio del capítulo EPN: propósito y actividades.
                  null = PENDIENTE (la tarjeta muestra el área general)
     logo         ruta al logotipo oficial, p. ej.
                  'assets/img/chapters/cis.svg'. null = PENDIENTE
     instagram    URL completa del perfil oficial, p. ej.
                  'https://www.instagram.com/usuario/'. null = PENDIENTE

   Los valores null NO deben rellenarse con datos inventados:
   la tarjeta los marca como pendientes mientras
   MOSTRAR_PENDIENTES sea true.
   ========================================================== */

window.IEEE_EPN = window.IEEE_EPN || {};

/* Cambiar a false para la versión publicada: oculta las
   etiquetas "Pendiente" de las tarjetas. */
window.IEEE_EPN.MOSTRAR_PENDIENTES = true;

window.IEEE_EPN.capitulos = [
  {
    id: 'cis',
    sigla: 'CIS',
    nombre: 'Computational Intelligence Society',
    tipo: 'capitulo',
    area: 'Redes neuronales, sistemas difusos, computación evolutiva y aprendizaje automático.',
    descripcion: null,
    logo: 'assets/img/chapters/IEEECISEPNBLUE-azul-ieee.png',
    instagram: "https://www.instagram.com/ieeecis.epn/"
  },
  {
    id: 'aps.mtts.rfid',
    sigla: 'AP-S, MTT-S, RFID',
    nombre: 'Antennas and Propagation, Microwave Theory and Technology and RFID',
    tipo: 'capitulo',
    area: 'Antenas, propagación de ondas electromagnéticas y sistemas radiantes.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/aps.mtts.rfid.epn/"
  },
  {
    id: 'cs',
    sigla: 'CS',
    nombre: 'Computer Society',
    tipo: 'capitulo',
    area: 'Ciencias de la computación, ingeniería de software y tecnologías de la información.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/computer_society.epn/"
  },
  {
    id: 'comsoc',
    sigla: 'ComSoc',
    nombre: 'Communications Society',
    tipo: 'capitulo',
    area: 'Telecomunicaciones, redes y sistemas de comunicación.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/comsoc_epn/"
  },
  {
    id: 'embs',
    sigla: 'EMBS',
    nombre: 'Engineering in Medicine and Biology Society',
    tipo: 'capitulo',
    area: 'Ingeniería biomédica: tecnología aplicada a la medicina y la biología.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieee.embs.epn/"
  },
  {
    id: 'pes',
    sigla: 'PES',
    nombre: 'Power & Energy Society',
    tipo: 'capitulo',
    area: 'Generación, transmisión, distribución y uso de la energía eléctrica.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieee.pes.epn/"
  },
  {
    id: 'photonics',
    sigla: 'Photonics',
    nombre: 'Photonics Society',
    tipo: 'capitulo',
    area: 'Láseres, óptica, optoelectrónica y comunicaciones ópticas.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieeephotonics_epn/"
  },
  {
    id: 'ras.css',
    sigla: 'RAS, CSS',
    nombre: 'Robotics and Automation Society & Control Systems Society',
    tipo: 'capitulo',
    area: 'Robótica, automatización y sistemas autónomos.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieee.ras.css.epn/"
  },
  {
    id: 'sight',
    sigla: 'SIGHT',
    nombre: 'Special Interest Group on Humanitarian Technology',
    tipo: 'sight',
    area: 'Tecnología aplicada a necesidades reales de comunidades y al desarrollo sostenible.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieee.sight.epn/"
  },
  {
    id: 'vts',
    sigla: 'VTS',
    nombre: 'Vehicular Technology Society',
    tipo: 'capitulo',
    area: 'Comunicaciones móviles, tecnologías vehiculares y sistemas de transporte.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/ieee.itss.vts.tec.epn/"
  },
  {
    id: 'wie',
    sigla: 'WIE',
    nombre: 'Women in Engineering',
    tipo: 'afinidad',
    area: 'Grupo de afinidad que impulsa la participación y el liderazgo de mujeres en ingeniería y ciencia.',
    descripcion: null,
    logo: null,
    instagram: "https://www.instagram.com/wie.ieee.epn/"
  }
];

/* Etiquetas visibles para cada tipo (y para los filtros). */
window.IEEE_EPN.tiposCapitulo = {
  capitulo: 'Capítulo técnico',
  afinidad: 'Grupo de afinidad',
  sight: 'Grupo SIGHT'
};
