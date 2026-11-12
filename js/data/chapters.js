/* ==========================================================
   IEEE Student Branch EPN — Datos de capítulos y grupos
   Fuente: versión A (zip de datos, js/data/capitulos.js).
   Es el ÚNICO archivo que hay que editar para esta sección:
   agregar un capítulo = agregar un objeto al arreglo `chapters`.

   Campos
     id          identificador único (minúsculas, sin espacios): ancla #capitulos/<id>
     siglas      siglas en el orden en que se muestran
     sociedades  nombre oficial de cada sociedad o grupo IEEE que forma el capítulo
     tipo        'capitulo' | 'conjunto' | 'afinidad' | 'sight'
     area        'ondas' | 'computo' | 'energia' | 'comunidad'  (agrupación de la página)
     alcance     ámbito general de la sociedad IEEE en el mundo (texto de A; NO es la
                 descripción del capítulo EPN)
     descripcion propósito y actividades del capítulo EPN. null = PENDIENTE
     logo        { src, src2x, png, width, height, formato: 'ancho' | 'cuadrado' } o null = PENDIENTE
     instagram   URL del perfil. null = PENDIENTE
   ========================================================== */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.areas = [
  { id: 'ondas',     titulo: 'Ondas y comunicaciones' },
  { id: 'computo',   titulo: 'Computación e inteligencia' },
  { id: 'energia',   titulo: 'Energía, control y robótica' },
  { id: 'comunidad', titulo: 'Salud y comunidad' }
];

window.IEEE_EPN.tipos = {
  capitulo: 'Capítulo técnico',
  conjunto: 'Capítulo conjunto',
  afinidad: 'Grupo de afinidad',
  sight:    'Grupo SIGHT'
};

window.IEEE_EPN.chapters = [
  {
    id: 'aps-mtts-rfid',
    siglas: ['AP-S', 'MTT-S', 'RFID'],
    sociedades: ['IEEE Antennas and Propagation Society', 'IEEE Microwave Theory and Technology Society', 'IEEE Council on RFID'],
    tipo: 'conjunto',
    area: 'ondas',
    alcance: 'Antenas, propagación de ondas electromagnéticas y sistemas radiantes.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/aps.mtts.rfid.epn/'
  },
  {
    id: 'comsoc',
    siglas: ['ComSoc'],
    sociedades: ['IEEE Communications Society'],
    tipo: 'capitulo',
    area: 'ondas',
    alcance: 'Telecomunicaciones, redes y sistemas de comunicación.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/comsoc_epn/'
  },
  {
    id: 'photonics',
    siglas: ['Photonics'],
    sociedades: ['IEEE Photonics Society'],
    tipo: 'capitulo',
    area: 'ondas',
    alcance: 'Láseres, óptica, optoelectrónica y comunicaciones ópticas.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/ieeephotonics_epn/'
  },
  {
    id: 'vts',
    siglas: ['VTS'],
    sociedades: ['IEEE Vehicular Technology Society'],
    tipo: 'capitulo',
    area: 'ondas',
    alcance: 'Comunicaciones móviles, tecnologías vehiculares y sistemas de transporte.',
    descripcion: null,
    logo: null,
    /* DUDOSO: el usuario de Instagram (ieee.itss.vts.tec.epn) sugiere un capítulo conjunto
       ITSS + VTS (+ TEC); confirmar el nombre oficial del capítulo. */
    instagram: 'https://www.instagram.com/ieee.itss.vts.tec.epn/'
  },
  {
    id: 'cis',
    siglas: ['CIS'],
    sociedades: ['IEEE Computational Intelligence Society'],
    tipo: 'capitulo',
    area: 'computo',
    alcance: 'Redes neuronales, sistemas difusos, computación evolutiva y aprendizaje automático.',
    descripcion: null,
    logo: { src: 'assets/img/chapters/cis-480.webp', src2x: 'assets/img/chapters/cis-960.webp', png: 'assets/img/chapters/cis-480.png', width: 480, height: 277, formato: 'ancho' },
    instagram: 'https://www.instagram.com/ieeecis.epn/'
  },
  {
    id: 'cs',
    siglas: ['CS'],
    sociedades: ['IEEE Computer Society'],
    tipo: 'capitulo',
    area: 'computo',
    alcance: 'Ciencias de la computación, ingeniería de software y tecnologías de la información.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/computer_society.epn/'
  },
  {
    id: 'ras-css',
    siglas: ['RAS', 'CSS'],
    sociedades: ['IEEE Robotics and Automation Society', 'IEEE Control Systems Society'],
    tipo: 'conjunto',
    area: 'energia',
    alcance: 'Robótica, automatización y sistemas autónomos.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/ieee.ras.css.epn/'
  },
  {
    id: 'pes',
    siglas: ['PES'],
    sociedades: ['IEEE Power & Energy Society'],
    tipo: 'capitulo',
    area: 'energia',
    alcance: 'Generación, transmisión, distribución y uso de la energía eléctrica.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/ieee.pes.epn/'
  },
  {
    id: 'embs',
    siglas: ['EMBS'],
    sociedades: ['IEEE Engineering in Medicine and Biology Society'],
    tipo: 'capitulo',
    area: 'comunidad',
    alcance: 'Ingeniería biomédica: tecnología aplicada a la medicina y la biología.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/ieee.embs.epn/'
  },
  {
    id: 'sight',
    siglas: ['SIGHT'],
    sociedades: ['IEEE Special Interest Group on Humanitarian Technology'],
    tipo: 'sight',
    area: 'comunidad',
    alcance: 'Tecnología aplicada a necesidades reales de comunidades y al desarrollo sostenible.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/ieee.sight.epn/'
  },
  {
    id: 'wie',
    siglas: ['WIE'],
    sociedades: ['IEEE Women in Engineering'],
    tipo: 'afinidad',
    area: 'comunidad',
    alcance: 'Grupo de afinidad que impulsa la participación y el liderazgo de mujeres en ingeniería y ciencia.',
    descripcion: null,
    logo: null,
    instagram: 'https://www.instagram.com/wie.ieee.epn/'
  }
];
