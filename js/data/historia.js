/* Datos de la línea de tiempo: historia y reconocimientos de la rama.
   Campos de cada momento:
     id        identificador único (también sirve de ancla: /historia/<id>)
     anio      año que se muestra ('2008') o texto si no hay fecha ('R9 SAC', 'Sin fecha')
     fecha     fecha legible ('14–16 may 2008'); iso: AAAA-MM-DD para <time> (opcional)
     ambito    'regional' (IEEE Región 9) | 'nacional' (Ecuador: IEEE Sección Ecuador u otra entidad) | 'rama' (EPN)
     tipo      'reconocimiento' (placa, certificado, premio) | 'hito' (participación, evento, homenaje)
     etiqueta  texto corto de la píldora ('Primer lugar', 'Participación regional'…)
     titulo, lugar, desc
     premios   cuántos reconocimientos suma este momento (para la cifra de la cabecera)
     primeros  cuántos de ellos son primeros lugares
     nota      aclaración visible sobre la fecha o la fuente (opcional)
     fotos     [{ src, w, h, alt }]: WebP en assets/img/historia/, con su ancho y alto reales
     publicar  false = no se muestra
   El orden del arreglo es el orden en pantalla (del más antiguo al más reciente).
   Fuente: fotos y documentos de la sede de la rama (timeline-rama-ieee-epn-web, nov 2026). */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.historia = [
  {
    id: 'rrr-2006', anio: '2006', fecha: '19–22 oct 2006', iso: '2006-10-19',
    ambito: 'regional', tipo: 'hito', etiqueta: 'Participación regional',
    titulo: 'IX Reunión Regional de Ramas y II Reunión Regional GOLD',
    lugar: 'Acapulco, Guerrero, México',
    desc: 'La rama representa a la EPN en la RRR-RRGOLD 2006 de IEEE Latinoamérica.',
    premios: 0, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2006-rrr-acapulco.webp', w: 1046, h: 821, alt: 'Certificado de participación en la IX Reunión Regional de Ramas y II Reunión Regional GOLD, Acapulco 2006' }
    ],
    publicar: true
  },
  {
    id: 'jst8-2008', anio: '2008', fecha: '14–16 may 2008', iso: '2008-05-14',
    ambito: 'rama', tipo: 'hito', etiqueta: 'Evento organizado',
    titulo: '8.ª Jornadas de Sistemas de Telecomunicaciones (JST 8)',
    lugar: 'Escuela Politécnica Nacional, Quito',
    desc: 'Jornadas organizadas por la rama, con estudiantes y profesionales de varios países.',
    premios: 0, primeros: 0,
    nota: 'El año no figura en la foto; se infiere por el emblema de los 30 años de la rama.',
    fotos: [
      { src: 'assets/img/historia/2008-jst8-epn.webp', w: 1400, h: 647, alt: 'Foto grupal de los participantes de las JST 8 en un auditorio de la EPN, frente a la bandera de la Rama Estudiantil IEEE' }
    ],
    publicar: true
  },
  {
    id: 'mencion-quito-2008', anio: '2008', fecha: '14 may 2008', iso: '2008-05-14',
    ambito: 'nacional', tipo: 'reconocimiento', etiqueta: '30 aniversario',
    titulo: 'Mención de Honor Institucional',
    lugar: 'Concejo del Distrito Metropolitano de Quito',
    desc: 'El Concejo Metropolitano y el alcalde Paco Moncayo reconocen a la rama por sus 30 años formando profesionales de alto nivel.',
    premios: 1, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2008-mencion-concejo-quito.webp', w: 753, h: 1023, alt: 'Mención de Honor Institucional del Concejo Metropolitano de Quito a la Rama Estudiantil del IEEE de la EPN, 2008' }
    ],
    publicar: true
  },
  {
    id: 'rnr-2008', anio: '2008', fecha: 'May 2008', iso: '2008-05',
    ambito: 'nacional', tipo: 'reconocimiento', etiqueta: 'Triple reconocimiento',
    titulo: 'V Reunión Nacional de Ramas (RNR 2008)',
    lugar: 'Cuenca, Ecuador · IEEE Sección Ecuador',
    desc: 'La rama obtiene tres placas: Mejor Caso de Éxito, Mejor Estand en la Feria de Ramas y Rama más numerosa.',
    premios: 3, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2008-rnr-caso-exito.webp', w: 816, h: 1046, alt: 'Placa de IEEE Sección Ecuador al Mejor Caso de Éxito en la V RNR 2008, Cuenca' },
      { src: 'assets/img/historia/2008-rnr-mejor-estand.webp', w: 740, h: 953, alt: 'Placa al Mejor Estand en la Feria de Ramas de la V RNR 2008' },
      { src: 'assets/img/historia/2008-rnr-rama-numerosa.webp', w: 765, h: 978, alt: 'Placa a la Rama más numerosa en la V RNR 2008' }
    ],
    publicar: true
  },
  {
    id: 'rrr-2008', anio: '2008', fecha: '9–12 oct 2008', iso: '2008-10-09',
    ambito: 'regional', tipo: 'hito', etiqueta: 'Participación regional',
    titulo: 'XI Reunión Regional de Ramas y IV Reunión Regional GOLD',
    lugar: 'Bogotá, Colombia · IEEE Región 9',
    desc: 'Participación como Rama Estudiantil IEEE en el encuentro «Líderes para Latinoamérica».',
    premios: 0, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2008-rrr-bogota.webp', w: 735, h: 1108, alt: 'Certificado de participación en la XI Reunión Regional de Ramas y IV Reunión Regional GOLD, Bogotá 2008' }
    ],
    publicar: true
  },
  {
    id: 'casos-exito-2010', anio: '2010', fecha: '13 oct 2010', iso: '2010-10-13',
    ambito: 'regional', tipo: 'reconocimiento', etiqueta: 'Primer lugar',
    titulo: 'Concurso Regional de Casos de Éxito',
    lugar: 'Reunión Regional de Ramas 2010 · La Paz, Bolivia',
    desc: 'Primer lugar con el caso «IV Seminario Internacional por el Día Mundial de las Telecomunicaciones». Recibido con certificado de R9 SAC y placa de vidrio del comité organizador (IEEE Sección Bolivia).',
    premios: 1, primeros: 1,
    fotos: [
      { src: 'assets/img/historia/2010-casos-exito-la-paz.webp', w: 1031, h: 828, alt: 'Certificado de R9 SAC al primer lugar del Concurso Regional de Casos de Éxito, La Paz 2010' },
      { src: 'assets/img/historia/2010-casos-exito-placa-bolivia.webp', w: 726, h: 972, alt: 'Placa de vidrio de IEEE Sección Bolivia al primer lugar en Casos de Éxito, RRR 2010' }
    ],
    publicar: true
  },
  {
    id: 'ieeextreme-2017', anio: '2017', fecha: '14 oct 2017', iso: '2017-10-14',
    ambito: 'nacional', tipo: 'hito', etiqueta: 'Competencia',
    titulo: 'IEEEXtreme Programming Competition 11.0',
    lugar: 'Universidad Técnica de Ambato',
    desc: 'Participación en la sede de Ambato, en representación de las Ramas de la Región Centro Norte de IEEE Ecuador.',
    premios: 0, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2017-ieeextreme-ambato.webp', w: 790, h: 984, alt: 'Placa de la IEEEXtreme Programming Competition 11.0, sede Ambato 2017' }
    ],
    publicar: true
  },
  {
    id: 'website-award-2019', anio: '2019', fecha: '25 oct 2019', iso: '2019-10-25',
    ambito: 'regional', tipo: 'reconocimiento', etiqueta: 'Tercer lugar',
    titulo: '2019 Website Regional Student Award',
    lugar: 'Santo Domingo · IEEE R9 Student Activities Committee',
    desc: 'Tercer lugar regional por el sitio web de la rama.',
    premios: 1, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2019-website-award.webp', w: 1078, h: 808, alt: 'Certificado de tercer lugar en el 2019 Website Regional Student Award de IEEE Región 9' }
    ],
    publicar: true
  },
  {
    id: 'hackathon-2019', anio: '2019', fecha: '2019', iso: '2019',
    ambito: 'nacional', tipo: 'reconocimiento', etiqueta: 'Primer lugar',
    titulo: 'Hackathon Campus Conectado 2019',
    lugar: 'IEEE ComSoc',
    desc: 'Trofeo al primer lugar del Hackathon Campus Conectado, con el sello de IEEE ComSoc.',
    premios: 1, primeros: 1,
    fotos: [
      { src: 'assets/img/historia/2019-hackathon-campus-conectado.webp', w: 223, h: 1200, alt: 'Trofeo al primer lugar del Hackathon Campus Conectado 2019, con el sello de IEEE ComSoc' }
    ],
    publicar: true
  },
  {
    id: 'rnr-2024', anio: '2024', fecha: '20–22 sep 2024', iso: '2024-09-20',
    ambito: 'nacional', tipo: 'reconocimiento', etiqueta: 'Primer lugar',
    titulo: 'Feria de Ramas · Reunión Nacional de Ramas 2024',
    lugar: 'Cuenca, Ecuador · IEEE Sección Ecuador',
    desc: 'Primer lugar en la Feria de Ramas. En la misma RNR, el emprendimiento Intilab obtiene el 3.er lugar en EmprendIEEE 2024.',
    premios: 2, primeros: 1,
    fotos: [
      { src: 'assets/img/historia/2024-rnr-feria-ramas.webp', w: 1150, h: 776, alt: 'Reconocimiento de IEEE Sección Ecuador a IEEE EPN por el primer lugar en la Feria de Ramas, RNR 2024 en Cuenca' },
      { src: 'assets/img/historia/2024-emprendieee-intilab.webp', w: 1161, h: 811, alt: 'Certificado de tercer lugar en EmprendIEEE 2024 para el emprendimiento Intilab' }
    ],
    publicar: true
  },
  {
    id: 'homenaje-2024', anio: '2024', fecha: 'Dic 2024', iso: '2024-12',
    ambito: 'rama', tipo: 'hito', etiqueta: 'Homenaje',
    titulo: 'Homenaje al Dr. Ing. Santiago Chamba',
    lugar: 'Quito · Rama IEEE EPN, Capítulo PES EPN y ComSoc Ecuador',
    desc: 'La rama y sus capítulos técnicos rinden homenaje al Presidente de PES Ecuador 2024 por su inspiración y liderazgo.',
    premios: 0, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2024-homenaje-santiago-chamba.webp', w: 731, h: 1125, alt: 'Placa de homenaje al Dr. Ing. Santiago Chamba, Presidente de PES Ecuador 2024' }
    ],
    publicar: true
  },
  {
    id: 'mencion-seccion-2025', anio: '2025', fecha: '13 nov 2025', iso: '2025-11-13',
    ambito: 'nacional', tipo: 'reconocimiento', etiqueta: 'Mención de Honor',
    titulo: 'Mención de Honor como Rama Estudiantil',
    lugar: 'Quito · IEEE Sección Ecuador',
    desc: 'Por su compromiso constante, iniciativas valiosas y aporte significativo al fortalecimiento de la comunidad estudiantil.',
    premios: 1, primeros: 0,
    fotos: [
      { src: 'assets/img/historia/2025-mencion-honor-seccion.webp', w: 1165, h: 807, alt: 'Certificado de Mención de Honor de IEEE Sección Ecuador a la Rama Estudiantil, 2025' }
    ],
    publicar: true
  },
  {
    id: 'r9sac', anio: 'R9 SAC', fecha: 'Concursos estudiantiles R9', iso: '',
    ambito: 'regional', tipo: 'reconocimiento', etiqueta: 'Primer y tercer lugar',
    titulo: 'Student Membership Contest (Large SB) y Student Website Contest',
    lugar: 'IEEE Región 9 · R9 SAC Team',
    desc: 'Primer lugar por el crecimiento de la membresía estudiantil (rama grande) y tercer lugar por creatividad y excelencia en el sitio web.',
    premios: 2, primeros: 1,
    nota: 'Fecha por confirmar: los certificados no la indican.',
    fotos: [
      { src: 'assets/img/historia/r9sac-membership-large-sb.webp', w: 1102, h: 795, alt: 'Certificado de primer lugar en el IEEE Student Membership Contest, categoría Large SB, para IEEE Student Branch EPN' },
      { src: 'assets/img/historia/r9sac-website-contest.webp', w: 1152, h: 835, alt: 'Certificado de tercer lugar en el IEEE R9 Student Website Contest' }
    ],
    publicar: true
  },
  {
    id: 'trofeo-sin-placa', anio: 'Sin fecha', fecha: 'Por identificar', iso: '',
    ambito: 'rama', tipo: 'reconocimiento', etiqueta: 'Trofeo',
    titulo: 'Trofeo de la rama',
    lugar: 'Sede de la Rama IEEE EPN',
    desc: 'Trofeo conservado en la sede de la rama.',
    premios: 1, primeros: 0,
    nota: 'No tiene placa; falta confirmar evento y año.',
    fotos: [
      { src: 'assets/img/historia/trofeo-sin-placa.webp', w: 291, h: 1145, alt: 'Trofeo sin placa conservado en la sede de la rama' }
    ],
    publicar: true
  }
];
