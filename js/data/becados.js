/* Datos de becas IEEE.
   Campos: id, siglas, nombre, inicio (AAAA-MM-DD), fechas, lugar, organiza,
   capitulo (opcional), foto { src, alt }, becados, publicar.
   Nombre incompleto: { nombre: 'Carlos', pendiente: 'apellido' } (no se publica). */
window.IEEE_EPN = window.IEEE_EPN || {};

window.IEEE_EPN.becas = [
  {
    id: 'lacap-2026',
    siglas: 'LACAP 2026',
    nombre: '2nd IEEE Latin American Conference on Antennas & Propagation',
    inicio: '2026-02-22',
    fechas: '22–25 feb 2026',
    lugar: 'Natal, Brasil',                      // consta en el letrero de la foto del documento
    organiza: 'IEEE Antennas and Propagation Society (AP-S)',   // logo y nombre "IEEE AP-S" en el mismo letrero
    capitulo: 'aps-mtts-rfid',
    foto: { src: 'assets/img/becados/lacap-2026', alt: 'Gabriel Paredes con la bandera del capítulo AP-S/MTT-S/RFID de la EPN junto al letrero de bienvenida de LACAP 2026' },
    becados: ['Gabriel Paredes'],
    publicar: true
  },
  {
    id: 'ims-2026',
    siglas: 'IMS 2026',
    nombre: 'IEEE MTT-S International Microwave Symposium',
    inicio: '2026-06-07',
    fechas: '7–12 jun 2026',
    lugar: 'Boston, MA, EE. UU.',
    organiza: 'IEEE Microwave Theory and Technology Society (MTT-S)',
    capitulo: 'aps-mtts-rfid',
    foto: { src: 'assets/img/becados/ims-2026', alt: 'Andrey Carrillo con la bandera del capítulo AP-S/MTT-S/RFID de la EPN junto al letrero de IMS 2026' },
    becados: ['Andrey Carrillo'],
    publicar: true
  },
  {
    id: 'rising-stars-2026',
    siglas: 'Rising Stars 2026',
    nombre: 'IEEE Region 9 Rising Stars — Latin America and Caribbean Conference 2026',
    inicio: '2026-09-04',
    fechas: '4–6 sep 2026',
    lugar: '',                                    // no consta en el documento
    organiza: 'IEEE Región 9 (Latinoamérica y el Caribe)',
    capitulo: '',
    foto: { src: 'assets/img/becados/rising-stars-2026', alt: 'Becados de la rama con la bandera de IEEE Student Branch de la Escuela Politécnica Nacional en una escalera del congreso Rising Stars 2026' },
    becados: [
      'Edwin Lidioma', 'Jordan Guillen', 'Michael Yanez', 'Harry Guajan', 'Boris Gárces',
      'Alexis Vasco', 'Gabriel Palma', { nombre: 'Carlos', pendiente: 'apellido' }, 'Sherly Vizcaino',
      'Alisson Almachi', 'Alejandra Santamaría', 'María José Encalada', 'Martín Muñoz', 'Andrey Carrillo'
    ],
    publicar: true
  },
  {
    id: 'clasypcs-2026',
    siglas: 'CLASYPCS 2026',
    nombre: 'IEEE Region 9 CS Congress of Latin American Students & Young Professionals',
    inicio: '2026-09-20',
    fechas: '20–22 sep 2026',
    lugar: 'San José',                            // consta en el logo del congreso, en la foto del documento
    organiza: 'IEEE Computer Society, Región 9',
    capitulo: 'cs',
    nota: 'Directiva del capítulo IEEE Computer Society EPN',
    foto: { src: 'assets/img/becados/clasypcs-2026', alt: 'Foto grupal de los participantes de CLASYPCS 2026 en San José, con banderas de los países de la región, entre ellas la de Ecuador' },
    becados: ['Michael Yanez', 'Harry Guajan', 'Luis Tipán', 'Boris Gárces', 'Alexis Vasco', 'Alejandra Santamaría'],
    publicar: true
  },
  {
    id: 'ipc-2026',
    siglas: 'IPC 2026',
    nombre: 'IEEE Photonics Conference',          // el documento dice "IPC 2026"; nombre completo de esas siglas (confirmar)
    inicio: '2026-11-08',
    fechas: '8–12 nov 2026',
    lugar: 'Denver, Colorado, EE. UU.',
    organiza: 'IEEE Photonics Society',            // panel de fondo en la foto del documento
    capitulo: 'photonics',
    foto: { src: 'assets/img/becados/ipc-2026', alt: 'Sherly Vizcaino con participantes de IPC 2026 y la bandera de IEEE Student Branch de la Escuela Politécnica Nacional frente al panel de IEEE Photonics Society' },
    becados: ['Sherly Vizcaino'],
    publicar: true
  }
];
