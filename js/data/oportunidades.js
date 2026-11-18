/* ==========================================================
   IEEE Student Branch EPN — DATOS de Oportunidades IEEE
   js/oportunidades.js las dibuja en la vista /oportunidades
   (tarjetas con filtros). No hay otro lugar que editar.

   Fuente: hoja de cálculo "IEEE OPPORTUNITIES HUB ECUADOR 2026.xlsx",
   hoja "Oportunidades IEEE" (SharePoint de la rama), leída el 17 nov 2026.
   Se copió el contenido de cada fila sin agregar datos. Cambios hechos:
     · ortografía y tildes (Proxima → Próxima, Schoolarships → Scholarships,
       Distingushed → Distinguished, coumintario → comunitario, etc.);
     · las filas de IMS 2027 y AESS estaban en inglés: se tradujeron al español;
     · "ene-26", "feb-26"… → "enero 2026", "febrero 2026"…;
     · enlaces de GRSS sin "https://" → con "https://"; espacios dentro de la URL de ComSoc → quitados.
   Los estados y las fechas son los de la hoja: la vista pide confirmarlos en el enlace oficial.

   AGREGAR UNA OPORTUNIDAD = copiar un objeto y completar sus campos.
     soc          Clave de la sociedad (ver "sociedades" abajo).
     nombre       Nombre de la oportunidad.
     tipo         Texto del tipo, tal como figura en la hoja.
     cat          Categoría para el filtro: beca | premio | fondos | mentoria | evento | programa | formacion
     alcance      Alcance (Local, Global, Región 9…).
     dirigido     A quién va dirigida.
     desc         Descripción breve ('' si la hoja no la tiene).
     beneficios   Texto o lista de textos.
     requisitos   Texto ('' si solo hay enlace).
     requisitosUrl Enlace a los requisitos (opcional).
     estado       Estado 2026 tal como figura en la hoja.
     apertura / cierre / frecuencia / modalidad   Textos de la hoja ('' si no constan).
     link         Enlace de aplicación (opcional, solo https://).
     contacto     Lista: { url, label } | { email, label } | { text }.
     recomendacion Texto ('' si no consta).
     img          Opcional: { src: ruta sin sufijo (-640.webp / -960.webp, 16:10), alt, nota }.
   ========================================================== */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.oportunidades = {
  fuente: 'IEEE Opportunities Hub Ecuador 2026',
  actualizado: '2026-11-17',

  /* Sociedades: nombre, siglas y capítulo de la rama relacionado (js/data/chapters.js) para el logo y el enlace */
  sociedades: {
    cs:     { siglas: 'CS',     nombre: 'IEEE Computer Society',                          capitulo: 'cs' },
    ras:    { siglas: 'RAS',    nombre: 'IEEE Robotics and Automation Society',           capitulo: 'ras-css' },
    wie:    { siglas: 'WIE',    nombre: 'IEEE Women in Engineering',                      capitulo: 'wie' },
    grss:   { siglas: 'GRSS',   nombre: 'IEEE Geoscience and Remote Sensing Society',     capitulo: '' },
    mtts:   { siglas: 'MTT-S',  nombre: 'IEEE Microwave Theory and Technology Society',   capitulo: 'aps-mtts-rfid' },
    aess:   { siglas: 'AESS',   nombre: 'IEEE Aerospace and Electronic Systems Society',  capitulo: '' },
    sight:  { siglas: 'SIGHT',  nombre: 'IEEE SIGHT',                                     capitulo: 'sight' },
    comsoc: { siglas: 'ComSoc', nombre: 'IEEE Communications Society',                    capitulo: 'comsoc' }
  },

  items: [
    /* ---------- IEEE Computer Society (CS) ---------- */
    {
      soc: 'cs', nombre: 'Nano Mentoring Session', tipo: 'Programa de mentoría', cat: 'mentoria',
      alcance: 'Local', dirigido: 'Todos los miembros IEEE',
      desc: 'Programa para solicitar las bases sobre una sesión de Nano Mentoría en cualquier evento de CS.',
      beneficios: 'Te dan las bases para llevar a cabo una buena sesión de nano mentoría con el respaldo de CS. Si es presencial puedes obtener un fondo de $100 para tu evento.',
      requisitos: '', requisitosUrl: 'https://docs.google.com/document/d/1ppwLSCk_DGI1cZEbT8f99EUYJHV76hhp/edit',
      estado: 'Permanente', apertura: '', cierre: '', frecuencia: 'Permanente', modalidad: 'Híbrida',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSexo5IhS8hdXsv375KaoDG7PX9mQw-prqCFiDY-65y9grMwtQ/viewform',
      contacto: [{ url: 'https://linktr.ee/cs.syp.micromentoring', label: 'Linktree de CS SYP Micro Mentoring' }],
      recomendacion: 'Solicitar con tiempo.'
    },
    {
      soc: 'cs', nombre: 'Micro Mentoring Mentors / Mentees', tipo: 'Programa de mentoría', cat: 'mentoria',
      alcance: 'Global', dirigido: 'Todos los miembros de IEEE CS',
      desc: 'Programa para ser parte como mentor o mentorado en temas de Computer Society.',
      beneficios: 'Conectar con profesionales y estudiantes alrededor del mundo y guiar o ser guiado.',
      requisitos: '', requisitosUrl: 'https://docs.google.com/document/d/1ppwLSCk_DGI1cZEbT8f99EUYJHV76hhp/edit',
      estado: 'Cerrado', apertura: '', cierre: '', frecuencia: 'Semestral', modalidad: 'Virtual',
      link: 'https://linktr.ee/cs.syp.micromentoring',
      contacto: [],
      recomendacion: ''
    },
    {
      soc: 'cs', nombre: 'Future Tech LATAM Event Series', tipo: 'Serie de charlas', cat: 'evento',
      alcance: 'Sudamérica', dirigido: 'Todos los miembros IEEE',
      desc: 'Serie de charlas online y gratuitas del 15 de septiembre al 2 de diciembre de 2026, enfocadas en los últimos avances de inteligencia artificial, computación cuántica y tecnologías emergentes.',
      beneficios: 'Conocer sobre las últimas tecnologías por parte de expertos en el tema.',
      requisitos: '',
      estado: 'Activo', apertura: '', cierre: '', frecuencia: 'Variable', modalidad: 'Virtual',
      link: 'https://forms.gle/isTvkhjZLb9JGP4K9',
      contacto: [{ url: 'https://linktr.ee/CS.MGA.SP', label: 'Linktree de la serie' }],
      recomendacion: ''
    },
    {
      soc: 'cs', nombre: 'TechX', tipo: 'Iniciativa', cat: 'programa',
      alcance: 'Local', dirigido: 'Todos los miembros de IEEE CS',
      desc: 'Iniciativa destacada de IEEE CS SYP que busca fomentar la innovación, la colaboración y el trabajo en red conectando a estudiantes, jóvenes profesionales y líderes de la industria mediante la creación de eventos con temáticas innovadoras.',
      beneficios: [
        'Financiamiento para crear una actividad de CS, ya sea a nivel nacional o regional.',
        'Oportunidad de solicitar una sesión de Nano Mentoring en caso de querer.',
        'Guía y apoyo de gente de CS SYP para organizar el evento.'
      ],
      requisitos: '', requisitosUrl: 'https://drive.google.com/drive/folders/1rItnCdr0WOBepwlj5GSa83L6WFKpD31w?hl=es-419',
      estado: 'Próxima', apertura: '', cierre: '', frecuencia: 'Semestral', modalidad: 'Híbrida o presencial',
      link: '',
      contacto: [{ url: 'https://syp.computer.org/techx', label: 'Sitio de TechX' }],
      recomendacion: 'Planificar con tiempo el evento para postular cuando salga el cohort respectivo del año.'
    },
    {
      soc: 'cs', nombre: 'CLASYPCS', tipo: 'Congreso', cat: 'evento',
      alcance: 'Región 9', dirigido: 'Todos',
      desc: 'Evento más grande de Computer Society en la Región 9.',
      beneficios: 'Contactar con voluntarios de CS alrededor de la Región 9, tanto estudiantes como profesionales, así como conocer a los principales directivos de CS.',
      requisitos: 'Tener visa del país anfitrión en caso de requerirlo.',
      estado: 'Activo', apertura: '', cierre: '', frecuencia: 'Anual', modalidad: 'Presencial',
      link: 'https://clasypcs2026.ieee-latamtech.org/',
      contacto: [{ url: 'https://www.instagram.com/ieeeclasypcs', label: 'Instagram de CLASYPCS' }],
      recomendacion: '',
      img: { src: 'assets/img/becados/clasypcs-2026', alt: 'Foto grupal de los participantes de CLASYPCS 2026 en San José, con banderas de los países de la región, entre ellas la de Ecuador', nota: 'CLASYPCS 2026: seis becados de la rama' }
    },
    {
      soc: 'cs', nombre: 'CS Scholarships', tipo: 'Becas', cat: 'beca',
      alcance: 'Global', dirigido: 'Todos los miembros de IEEE CS',
      desc: '', beneficios: '', requisitos: '',
      estado: '', apertura: '', cierre: '', frecuencia: '', modalidad: '',
      link: 'https://www.computer.org/volunteering/awards/scholarships',
      contacto: [{ email: 'ieeecs-syp-soi@computer.org' }],
      recomendacion: ''
    },
    {
      soc: 'cs', nombre: 'Distinguished Visitors Program', tipo: 'Programa', cat: 'programa',
      alcance: 'Global', dirigido: 'Todos los miembros IEEE',
      desc: 'Programa de CS que conecta a sus capítulos profesionales y estudiantiles con líderes tecnológicos e innovadores de clase mundial. A través de este programa, los expertos ofrecen presentaciones tanto virtuales como presenciales, brindando conocimiento de alto nivel directamente a las comunidades locales.',
      beneficios: 'Tener la oportunidad de encontrar a un ponente de CS para tus eventos.',
      requisitos: '', requisitosUrl: 'https://www.computer.org/communities/professional-chapters/distinguished-visitors-program#how-it-works',
      estado: 'Permanente', apertura: '', cierre: '', frecuencia: 'Permanente', modalidad: 'Híbrida',
      link: 'https://www.computer.org/communities/professional-chapters/distinguished-visitors-program#procedures',
      contacto: [{ url: 'https://www.computer.org/distinguished-visitors-program', label: 'Sitio del programa' }],
      recomendacion: ''
    },
    {
      soc: 'cs', nombre: 'CS Tech Week Ecuador 2026', tipo: 'Congreso', cat: 'evento',
      alcance: 'Ecuador', dirigido: 'Todos',
      desc: 'Una semana dedicada a la tecnología, innovación, talento y comunidad, celebrando un evento de Computer Society y sus 80 años, reuniendo a estudiantes y entusiastas de la computación a través de charlas, hackathons, concursos y espacios de conexión.',
      beneficios: '', requisitos: '',
      estado: 'Próxima', apertura: '', cierre: '', frecuencia: 'Variable', modalidad: 'Virtual',
      link: '',
      contacto: [{ url: 'https://www.instagram.com/ecu.cs.week.2026/', label: 'Instagram de CS Tech Week Ecuador' }],
      recomendacion: ''
    },

    /* ---------- IEEE Robotics and Automation Society (RAS) ---------- */
    {
      soc: 'ras', nombre: 'IDEA Travel Grant', tipo: 'Beca de viaje', cat: 'beca',
      alcance: 'Global', dirigido: 'Miembros de RAS',
      desc: 'Asiste a una de las grandes conferencias auspiciadas o coauspiciadas por IEEE RAS.',
      beneficios: 'Ten la oportunidad de acceder al networking del más alto nivel, a workshops y a charlas técnicas avanzadas en robótica.',
      requisitos: 'No haber publicado en conferencias patrocinadas por IEEE RAS en los últimos 3 años.',
      estado: 'Próxima', apertura: 'Octubre', cierre: 'Finales de noviembre', frecuencia: 'Anual', modalidad: 'Presencial',
      link: 'https://www.ieee-ras.org/membership/expanding-collaboration-and-engagement-committee/idea-travel-support/',
      contacto: [],
      recomendacion: 'Redactar un buen CV.'
    },
    {
      soc: 'ras', nombre: 'Distinguished Lecturer Program', tipo: 'Programa', cat: 'programa',
      alcance: 'Global', dirigido: 'Miembros de RAS',
      desc: 'Trae a prestigiosos conferencistas en el área de robótica para dar una charla en tu universidad.',
      beneficios: 'Conferencistas de gran nivel a bajo costo.',
      requisitos: 'Ser miembro de IEEE RAS.',
      estado: 'Permanente', apertura: '', cierre: '', frecuencia: 'Anual', modalidad: 'Híbrida',
      link: '', contacto: [], recomendacion: ''
    },

    /* ---------- IEEE Women in Engineering (WIE) ---------- */
    {
      soc: 'wie', nombre: 'IEEE WIE Student Branch Affinity Group of the Year Award', tipo: 'Premio / reconocimiento a grupo', cat: 'premio',
      alcance: 'Global / Región 9', dirigido: 'Grupos de afinidad estudiantiles WIE',
      desc: 'Reconocimiento anual al Grupo de Afinidad Estudiantil WIE más destacado a nivel mundial por sus actividades, impacto social, retención de miembros e iniciativas STEM.',
      beneficios: 'Reconocimiento oficial de IEEE WIE, certificado institucional, premio económico de hasta $1,000 USD e impacto destacado en la Región 9.',
      requisitos: 'Estar activo en vTools, enviar informe detallado de actividades del año anterior, métricas de asistencia, evidencia fotográfica y testimonios.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Mantener al día los reportes en vTools durante todo el año para facilitar la consolidación de la postulación.'
    },
    {
      soc: 'wie', nombre: 'IEEE Women in Engineering Affinity Group of the Year Award', tipo: 'Premio / reconocimiento a grupo', cat: 'premio',
      alcance: 'Global / Región 9', dirigido: 'Grupos de afinidad WIE de sección / profesionales',
      desc: 'Reconocimiento anual al Grupo de Afinidad Profesional o de Sección de WIE que demuestre el mejor desempeño, crecimiento de membresía e impacto técnico/profesional.',
      beneficios: 'Reconocimiento oficial global, premio en efectivo de hasta $1,000 USD para el grupo y visibilidad internacional dentro de IEEE.',
      requisitos: 'Reporte consolidado de actividades del año anterior en vTools, métricas de retención, proyectos de valor profesional ejecutados.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Coordinar directamente con la junta directiva de la Sección IEEE Ecuador para validar los informes requeridos.'
    },
    {
      soc: 'wie', nombre: 'IEEE Women in Engineering Inspiring Member of the Year Award', tipo: 'Premio / reconocimiento individual', cat: 'premio',
      alcance: 'Global', dirigido: 'Miembros profesionales / graduados IEEE WIE',
      desc: 'Premio otorgado a miembros profesionales de WIE que hayan demostrado un liderazgo inspirador y dedicación excepcional para promover a las mujeres en ingeniería.',
      beneficios: 'Reconocimiento internacional de IEEE, trofeo/placa conmemorativa y artículo destacado en la IEEE WIE Magazine.',
      requisitos: 'Ser miembro activo de IEEE WIE, nominación formal por parte de miembros IEEE, cartas de recomendación e historial documentado de liderazgo.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Solicitar las cartas de recomendación con al menos 3 semanas de anticipación al cierre del portal.'
    },
    {
      soc: 'wie', nombre: 'IEEE Women in Engineering Inspiring Student Member Award', tipo: 'Premio / reconocimiento individual', cat: 'premio',
      alcance: 'Global', dirigido: 'Estudiantes de pregrado y posgrado IEEE WIE',
      desc: 'Galardón a estudiantes que destacan por su entusiasmo, liderazgo dentro de su Rama Estudiantil y esfuerzo por motivar a otras estudiantes en carreras STEM.',
      beneficios: 'Reconocimiento oficial global, certificado de excelencia y difusión del perfil estudiantil en redes de IEEE WIE.',
      requisitos: 'Ser estudiante miembro activo de IEEE WIE, contar con nominación de pares o asesores de la Rama Estudiantil y portafolio de actividades.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Resaltar el rol en la organización de talleres, eventos STEM y gestión de redes/comunicación en WIE.'
    },
    {
      soc: 'wie', nombre: 'IEEE WIE Technology & Leadership Award', tipo: 'Premio / reconocimiento individual', cat: 'premio',
      alcance: 'Global', dirigido: 'Mujeres profesionales en ingeniería y tecnología',
      desc: 'Premio que reconoce a mujeres destacadas que han realizado contribuciones tecnológicas de gran impacto y han demostrado un liderazgo excepcional en la industria o la academia.',
      beneficios: 'Reconocimiento de alto nivel de IEEE WIE, placa institucional y mención internacional en publicaciones especializadas.',
      requisitos: 'Nominación fundamentada, trayectoria profesional destacada, patentes, publicaciones o proyectos de innovación de gran escala.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Acompañar la postulación con métricas cuantitativas del impacto técnico y liderazgo alcanzado.'
    },
    {
      soc: 'wie', nombre: 'IEEE WIE Committee Outstanding Volunteer of the Year Award', tipo: 'Premio / reconocimiento individual', cat: 'premio',
      alcance: 'Global', dirigido: 'Voluntarias/os de comités directivos o de trabajo de IEEE WIE',
      desc: 'Reconocimiento a la labor extraordinaria de voluntarias/os que forman parte de comités globales o regionales de WIE y apoyan la operatividad de sus iniciativas.',
      beneficios: 'Certificado de honor del Comité Directivo Global de IEEE WIE y reconocimiento público en la red de voluntariado.',
      requisitos: 'Ser voluntario activo en un comité de WIE, demostración de contribución al cumplimiento de objetivos anuales y nominación directa.',
      estado: 'Próxima', apertura: 'Enero 2026', cierre: '1 de abril de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/awards/',
      contacto: [{ email: 'wie-awards@ieee.org' }],
      recomendacion: 'Documentar las actividades lideradas en comunicación, logística o gestión de proyectos dentro del comité.'
    },
    {
      soc: 'wie', nombre: 'IEEE WIE Special Project Funding Grants', tipo: 'Financiamiento de proyectos', cat: 'fondos',
      alcance: 'Global / Local', dirigido: 'Grupos de afinidad WIE (estudiantiles y profesionales)',
      desc: 'Subvención económica orientada a financiar actividades locales, talleres de desarrollo técnico, mentorías y eventos para atraer e inspirar a mujeres en STEM.',
      beneficios: 'Financiamiento directo entre $200 y $1,000 USD para cubrir insumos, materiales educativos y logística del proyecto.',
      requisitos: 'Propuesta formal del proyecto, desglose de presupuesto, cronograma detallado, plan de impacto y estar al día en vTools.',
      estado: 'Activa', apertura: 'Febrero 2026', cierre: '30 de abril de 2026', frecuencia: 'Semestral / anual', modalidad: 'Virtual',
      link: 'https://wie.ieee.org/funding/',
      contacto: [{ email: 'wie-funding@ieee.org' }],
      recomendacion: 'Alinear la propuesta con los Objetivos de Desarrollo Sostenible (ODS), especialmente Igualdad de Género y Educación de Calidad.'
    },
    {
      soc: 'wie', nombre: 'WIE International Leadership Summit (ILS) Host & Activity Grant', tipo: 'Financiamiento / sponsor de eventos', cat: 'fondos',
      alcance: 'Regional (Región 9 / Ecuador)', dirigido: 'Secciones IEEE y grupos de afinidad WIE',
      desc: 'Fondo mayor destinado a patrocinar la organización de la Cumbre Internacional de Liderazgo WIE ILS en la región, promoviendo networking y liderazgo femenino.',
      beneficios: 'Fondo de patrocinio entre $2,000 y $5,000 USD y posicionamiento internacional del grupo organizador.',
      requisitos: 'Propuesta ejecutiva de sede, programa preliminar, presupuesto desglosado y carta de respaldo formal de la Sección IEEE Ecuador.',
      estado: 'Próxima', apertura: 'Mayo 2026', cierre: '31 de julio de 2026', frecuencia: 'Anual', modalidad: 'Híbrida / presencial',
      link: 'https://wieils.ieee.org/',
      contacto: [{ email: 'wie-ils@ieee.org' }],
      recomendacion: 'Estructurar la propuesta en alianza entre varias Ramas Estudiantiles y la junta de Sección.'
    },
    {
      soc: 'wie', nombre: 'IEEE WIE Conference Travel Grants (ILC & IEEE Conferences)', tipo: 'Beca de viaje', cat: 'beca',
      alcance: 'Global', dirigido: 'Estudiantes y jóvenes profesionales miembros de WIE',
      desc: 'Becas de movilidad para financiar la participación presencial de voluntarias en la WIE International Leadership Conference (ILC) o conferencias técnicas de IEEE.',
      beneficios: 'Cobertura de inscripción a la conferencia, asignación para pasaje aéreo y/o hospedaje durante el evento.',
      requisitos: 'Ser miembro activo de WIE, tener un paper/póster aceptado o ejercer un rol directivo en WIE, acompañado de carta de motivación.',
      estado: 'Activa', apertura: 'Diciembre 2025', cierre: '15 de marzo de 2026', frecuencia: 'Anual', modalidad: 'Presencial',
      link: 'https://wie.ieee.org/travel-grants/',
      contacto: [{ email: 'wie-travel@ieee.org' }],
      recomendacion: 'Mantener al día la visa y el pasaporte al momento de realizar la postulación.'
    },

    /* ---------- IEEE Geoscience and Remote Sensing Society (GRSS) ---------- */
    {
      soc: 'grss', nombre: 'IEEE GRSS IDEA Professional Development Microgrants', tipo: 'Apoyo financiero / microgrant', cat: 'fondos',
      alcance: 'Global (fuerte enfoque regional)', dirigido: 'Estudiantes de posgrado (maestría/doctorado) o profesionales activos en geociencias y teledetección',
      desc: 'Subvención para remover barreras financieras individuales en el avance académico o el desarrollo de investigaciones de la sociedad.',
      beneficios: 'Financiamiento de hasta $500 USD por persona para cubrir equipos de cómputo, software especializado, salidas de campo, laboratorios, cursos (Coursera) o viajes de ponentes.',
      requisitos: 'Ser miembro activo de IEEE GRSS. Demostrar necesidad financiera real y un claro compromiso de voluntariado/giveback local. Prohibido el uso de GenAI en la redacción.',
      estado: 'Cerrada', apertura: 'Primer trimestre de cada año', cierre: 'Típicamente marzo de cada año', frecuencia: 'Anual', modalidad: 'Reembolso de gastos aprobados',
      link: 'https://grss-ieee.org/community/groups-initiatives/idea/professional-development-microgrants/',
      contacto: [{ email: 'idea@grss-ieee.org', label: 'Comité de Evaluación IDEA' }],
      recomendacion: 'No utilices IA para redactar la carta (motivo de descalificación directa). Estructura la postulación vinculando el beneficio con proyectos de voluntariado concretos para Ecuador.'
    },
    {
      soc: 'grss', nombre: 'GRSS YP Ambassador Program (Programa de Embajadores YP)', tipo: 'Programa de liderazgo y voluntariado', cat: 'programa',
      alcance: 'Global', dirigido: 'Jóvenes profesionales (YP) graduados en los últimos 15 años de su primer título profesional',
      desc: 'Iniciativa de liderazgo de 2 años para incidir en la gobernanza de la sociedad, coordinar eventos de reclutamiento globales y liderar actividades de YPs.',
      beneficios: 'Financiamiento total para asistir a 2 conferencias internacionales IGARSS consecutivas, desarrollo de habilidades directivas de alto nivel y visibilidad científica mundial.',
      requisitos: 'Membresías activas de IEEE y GRSS (nivel YP). Presentar currículum (1 pág.) y una propuesta innovadora de valor de máximo 2 páginas para la comunidad de jóvenes profesionales.',
      estado: 'Activa', apertura: 'Anual (enero / febrero)', cierre: '15 de marzo, anualmente', frecuencia: 'Anual (2 años de gestión)', modalidad: 'Híbrida (reuniones virtuales y asistencia presencial a IGARSS)',
      link: 'https://grss-ieee.org/community/groups-initiatives/young-professionals-yp/',
      contacto: [{ email: 'yp@grss-ieee.org' }, { email: 'subit@ieee.org', label: 'Subit Chakrabarti' }],
      recomendacion: 'Revisa a detalle la estructura de los comités de la sociedad antes de postular. Describe una propuesta clara para vincular a los capítulos estudiantiles de la Región 9.'
    },
    {
      soc: 'grss', nombre: 'μVolunteering (IEEE Volunteering)', tipo: 'Voluntariado flexible / micro-voluntariado', cat: 'programa',
      alcance: 'Global', dirigido: 'Todos los miembros de IEEE/GRSS, especialmente profesionales jóvenes con disponibilidad de tiempo limitada',
      desc: 'Plataforma digital para buscar, proponer y realizar proyectos voluntarios de corta duración, locales o remotos, adaptados a tus habilidades y horario.',
      beneficios: 'Voluntariado con horarios e implicaciones flexibles. Permite generar automáticamente un "Volunteering CV" oficial respaldado por las directivas mundiales de IEEE.',
      requisitos: 'Membresía activa de IEEE/GRSS. Registrarse y buscar proyectos/tareas vigentes en el portal oficial de voluntariado de IEEE.',
      estado: 'Continua', apertura: 'Abierto permanentemente', cierre: 'Varía según cada tarea específica', frecuencia: 'Continua', modalidad: 'Remota / virtual',
      link: 'https://volunteer.ieee.org',
      contacto: [{ email: 'yp@grss-ieee.org' }, { text: 'Directivas de capítulos locales' }],
      recomendacion: 'Es la mejor manera de iniciar tu currículum de voluntario (Ethos) sin compromisos de largo plazo, lo cual te dará un gran respaldo al aplicar a Travel Grants o Microgrants.'
    },
    {
      soc: 'grss', nombre: 'GRSS Schools (p. ej. Spring School de la R9)', tipo: 'Formación técnica avanzada / becas de estudio', cat: 'formacion',
      alcance: 'Regional / internacional', dirigido: 'Estudiantes de grado, posgrado y jóvenes profesionales de áreas técnicas afines',
      desc: 'Escuelas intensivas de capacitación práctica lideradas por los investigadores más reconocidos a nivel mundial en SAR, IA, Quantum Computing o Cambio Climático.',
      beneficios: 'Certificación técnica especializada de vanguardia, redes de contacto regionales e internacionales directas y acceso a becas de viaje (Travel Grants) financiadas por GRSS.',
      requisitos: 'Postulación online. Presentar CV, carta de motivación y estar afiliado o recomendado por un capítulo estudiantil activo (altamente recomendado).',
      estado: 'Activa', apertura: 'Varía según el capítulo anfitrión (mitad de año)', cierre: 'Suele cerrar 1.5 a 2 meses antes del evento', frecuencia: 'Regular / anual', modalidad: 'Híbrida (virtual y sede presencial regional)',
      link: 'https://grss-ieee.org/resources/education/grss-schools/',
      contacto: [{ email: 'education@grss-ieee.org' }, { text: 'Capítulos organizadores regionales' }],
      recomendacion: 'Consúltale a tu directiva local (UTN, Yachay, ESPOL) sobre convocatorias grupales. Los capítulos que demuestran solidez de red logran que sus miembros sean becados con prioridad.'
    },
    {
      soc: 'grss', nombre: 'Travel Grants para conferencias (IGARSS / LAGIRS / ARGENCON)', tipo: 'Becas de viaje y movilidad', cat: 'beca',
      alcance: 'Global / regional', dirigido: 'Estudiantes de grado/posgrado y jóvenes profesionales miembros de GRSS',
      desc: 'Subvenciones financieras de movilidad para asistir y presentar artículos de investigación originales aceptados en simposios co-patrocinados por la sociedad.',
      beneficios: 'Apoyo económico para cubrir boletos aéreos, hospedaje o cuotas de inscripción a congresos mundiales (IGARSS 2026 en Washington D.C.) o latinoamericanos (LAGIRS).',
      requisitos: 'Membresía activa de GRSS. Tener un artículo de investigación original aceptado para presentación oral o interactiva en la conferencia y postularse mediante su web.',
      estado: 'Activa', apertura: 'Con la notificación de aceptación de papers de la conferencia', cierre: 'Varía según el congreso (generalmente de abril a junio)', frecuencia: 'Continua (vinculada al ciclo de congresos anuales)', modalidad: 'Presencial',
      link: 'https://grss-ieee.org/conferences/',
      contacto: [{ email: 'conferences@grss-ieee.org' }, { text: 'Comité organizador del congreso' }],
      recomendacion: 'Las candidaturas de estudiantes tienen la máxima prioridad. Escribe artículos de tus proyectos y postúlalos a conferencias locales y regionales: ¡el Travel Grant es muy viable!'
    },
    {
      soc: 'grss', nombre: 'Concursos y premios estudiantiles (Mikio Takagi Student Prize, 3MT, etc.)', tipo: 'Reconocimiento y premios financieros', cat: 'premio',
      alcance: 'Global / regional', dirigido: 'Estudiantes de grado y posgrado de cualquier área de ingeniería o ciencias',
      desc: 'Concursos de papers y presentaciones interactivos en los que se premia el rigor técnico, la innovación y la capacidad de oratoria en conferencias.',
      beneficios: 'Reconocimiento internacional de gran escala, premios en efectivo (para primer, segundo y tercer lugar de papers estudiantiles de IGARSS) y visibilidad en revistas de GRSS.',
      requisitos: 'Ser autor principal del paper estudiante nominado para la conferencia o registrarse formalmente en los retos y desafíos de los comités de la sociedad.',
      estado: 'Activa', apertura: 'Apertura simultánea con el envío de papers de IGARSS', cierre: 'Típicamente enero/febrero de cada año', frecuencia: 'Anual', modalidad: 'Híbrida / presencial (en vivo durante las conferencias)',
      link: 'https://grss-ieee.org/resources/awards/',
      contacto: [{ email: 'awards@grss-ieee.org', label: 'Comité de Premiaciones de GRSS' }],
      recomendacion: 'Practica un pitch dinámico. Formatos como la competencia de tesis de 3 minutos (3MT) premiada por el comité IDEA en LAGIRS Brasil premian la capacidad de síntesis y oratoria.'
    },
    {
      soc: 'grss', nombre: 'RISE UP YP Mentorship Program', tipo: 'Mentoría y desarrollo profesional', cat: 'mentoria',
      alcance: 'Global', dirigido: 'Jóvenes profesionales graduados de su primer título técnico en los últimos 15 años y estudiantes de posgrado',
      desc: 'Programa formal que conecta de manera directa a miembros YP con investigadores de élite y directivos de la industria de observación de la Tierra.',
      beneficios: 'Asesoría técnica y de carrera personalizada por mentores internacionales, redes para postular a doctorados/maestrías y guía en estructuración de patentes.',
      requisitos: 'Membresía activa de IEEE GRSS. Diligenciar el formulario web de RISE UP detallando tu perfil de ingeniería e intereses profesionales para un emparejamiento óptimo.',
      estado: 'Activa', apertura: 'Ciclos de ingreso permanentes', cierre: 'Abierto todo el año', frecuencia: 'Continua (bimensual según el volumen de mentores)', modalidad: 'Virtual (sesiones virtuales periódicas)',
      link: 'https://grss-ieee.org/community/groups-initiatives/young-professionals-yp/rise-up-yp-mentorship-program/',
      contacto: [{ email: 'yp@grss-ieee.org', label: 'Comité de Mentoría de YPs' }],
      recomendacion: 'Al rellenar el perfil, detalla el impacto local que deseas lograr. Esto facilita que te emparejen con mentores senior interesados en apoyar el crecimiento técnico en Latinoamérica.'
    },
    {
      soc: 'grss', nombre: 'Student Branch Chapter Excellence Award (Premio a la Excelencia)', tipo: 'Reconocimiento institucional y de liderazgo', cat: 'premio',
      alcance: 'Global', dirigido: 'Capítulos estudiantiles de GRSS y capítulos estudiantiles conjuntos vigentes a nivel mundial',
      desc: 'Premio anual de prestigio para exaltar el trabajo ejemplar, las actividades técnicas continuas y la integración social llevadas a cabo por un capítulo de estudiantes.',
      beneficios: 'Reconocimiento formal ante el AdCom internacional de la sociedad, visibilidad de tu universidad en boletines mundiales y fortalecimiento de la red de voluntarios.',
      requisitos: 'El capítulo debe estar formalmente establecido, al día con sus reportes anuales a IEEE, y presentar un dossier documentando sus proyectos de impacto del año previo.',
      estado: 'Activa', apertura: 'Último trimestre de cada año', cierre: '15 de diciembre, anualmente', frecuencia: 'Anual', modalidad: 'Evaluación remota por portafolio de evidencias',
      link: 'https://grss-ieee.org/resources/awards/student-branch-chapter-excellence-award/',
      contacto: [{ email: 'awards@grss-ieee.org', label: 'Comité de Premios de Capítulos' }],
      recomendacion: 'Este premio es el norte idóneo para Ecuador. UTN, Yachay, ESPOL y ESPE pueden coordinar actividades conjuntas (como Altiplano) y documentarlas para postular como país.'
    },

    /* ---------- IEEE Microwave Theory and Technology Society (MTT-S) ---------- */
    {
      soc: 'mtts', nombre: 'IMS 2027', tipo: 'Beca / apoyo de viaje', cat: 'beca',
      alcance: 'Internacional', dirigido: 'Miembros estudiantes de IEEE MTT-S',
      desc: 'Programa que apoya a estudiantes seleccionados para asistir al IEEE International Microwave Symposium (IMS) y participar en actividades profesionales, técnicas y de networking.',
      beneficios: 'Apoyo de viaje, participación en la conferencia, networking con profesionales e investigadores y contacto con la industria y la comunidad de investigación en microondas.',
      requisitos: 'Ser miembro estudiante elegible de IEEE MTT-S, postular dentro del periodo establecido y cumplir los requisitos de selección del programa.',
      estado: 'Disponible en 2027', apertura: '', cierre: '', frecuencia: 'Anual', modalidad: '',
      link: '',
      contacto: [{ text: 'Postulación oficial de IEEE MTT-S / IMS' }],
      recomendacion: 'Muy recomendado para estudiantes interesados en microondas, RF, antenas y networking internacional.',
      img: { src: 'assets/img/becados/ims-2026', alt: 'Andrey Carrillo con la bandera del capítulo AP-S/MTT-S/RFID de la EPN junto al letrero de IMS 2026', nota: 'IMS 2026: un becado de la rama' }
    },

    /* ---------- IEEE Aerospace and Electronic Systems Society (AESS) ---------- */
    {
      soc: 'aess', nombre: 'AESS Young Professionals Travel Grant', tipo: 'Beca de viaje', cat: 'beca',
      alcance: 'Internacional', dirigido: 'Miembros estudiantes y profesionales de IEEE AESS',
      desc: 'La beca de viaje de AESS apoya a los IEEE Young Professionals que asisten a conferencias de AESS, para impulsar su desarrollo profesional.',
      beneficios: 'Beca cubierta y oportunidades para que jóvenes profesionales se den a conocer.',
      requisitos: 'Ser miembro de AESS y presentar carta de motivación.',
      estado: 'Cerrado', apertura: '', cierre: '', frecuencia: 'Anual', modalidad: 'Híbrida',
      link: 'https://share.google/gtZZ2mIg03lnxMIEF',
      contacto: [],
      recomendacion: 'Tener cartas de recomendación o trabajos previos que respalden el voluntariado en el capítulo.'
    },

    /* ---------- IEEE SIGHT ---------- */
    {
      soc: 'sight', nombre: '2026 IEEE SIGHT Group Activity Initiative', tipo: 'Financiamiento para actividad o prototipo', cat: 'fondos',
      alcance: 'IEEE SIGHT (cualquiera puede aplicar)', dirigido: 'Grupos SIGHT',
      desc: 'Una iniciativa que se realiza cada año donde se puede conseguir hasta $300 para una actividad, taller o prototipo con enfoque comunitario.',
      beneficios: [
        'Cualquier grupo SIGHT es elegible (si cumple con requisitos simples).',
        'Cubren víveres, transporte, etc.',
        'No hay competencia, por lo que todos los grupos SIGHT lo pueden conseguir.'
      ],
      requisitos: 'Debe tener al menos 12 meses de antigüedad. Informar activamente sobre eventos y miembros de la directiva en IEEE vTools. Seguir el Manual de Operaciones del Grupo SIGHT. Presentar solo una solicitud por año calendario. Asegúrese de que cualquier grupo financiado en 2025 haya presentado su informe final antes de volver a solicitar financiación.',
      estado: 'Activa', apertura: '26 de junio de 2026', cierre: '31 de agosto de 2026', frecuencia: 'Anual', modalidad: 'Virtual',
      link: 'https://sight.ieee.org/2026/06/2026-ieee-sight-group-activity-initiative-now-open/',
      contacto: [],
      recomendacion: 'Aplicar lo antes posible, ya que hay un concurso relacionado a ella.'
    },

    /* ---------- IEEE Communications Society (ComSoc) ---------- */
    {
      soc: 'comsoc', nombre: 'IEEE ComSoc Student Ambassador', tipo: 'Beca de viaje', cat: 'beca',
      alcance: 'Global', dirigido: 'Miembros de ComSoc',
      desc: 'Programa orientado a la divulgación de IEEE ComSoc a nivel profesional y estudiantil.',
      beneficios: 'Si eres seleccionado ganas una beca para asistir a GLOBECOM: cubren tu inscripción al evento, además de un financiamiento de $1200 para gastos logísticos.',
      requisitos: 'Ser miembro de ComSoc y no haber sido acreedor de una beca anterior por el capítulo en un periodo de un año calendario.',
      estado: 'Cerrado', apertura: '4 de mayo', cierre: '30 de mayo', frecuencia: 'Anual', modalidad: 'Virtual (presencial para los ganadores)',
      link: 'https://www.comsoc.org/engagement-community/students/ieee-comsoc-student-ambassador',
      contacto: [],
      recomendacion: 'Tener actividades previas para considerarlas en las aplicaciones finales. No importa el impacto del evento, sino la cantidad de eventos que hagas, tus aliados y la originalidad del evento.'
    },
    {
      soc: 'comsoc', nombre: 'IEEE ComSoc School Series', tipo: 'Beca', cat: 'beca',
      alcance: 'Global', dirigido: 'Miembros de ComSoc',
      desc: 'Programa orientado a la capacitación de los miembros de ComSoc.',
      beneficios: 'Si eres seleccionado podrás viajar al país anfitrión del evento; el financiamiento dependerá de la distancia del país anfitrión.',
      requisitos: 'Ser miembro de ComSoc y no haber sido acreedor de una beca anterior por el capítulo en un periodo de un año calendario.',
      estado: 'Cerrado', apertura: 'Se están aceptando propuestas para ser el anfitrión', cierre: '15 de septiembre', frecuencia: 'Anual', modalidad: 'Presencial',
      link: 'https://www.comsoc.org/education-training/school-series?f%5B0%5D=education_category%3A6666',
      contacto: [],
      recomendacion: 'Ser un voluntario activo dentro de IEEE ComSoc, ya que este programa está enfocado en potenciar las actividades y los roles de liderazgo.'
    }
  ]
};
