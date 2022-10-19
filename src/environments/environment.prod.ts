export const environment = {
  production: true,
  personas: [
    {
      id: 1,
      nombre: 'Miguel Angel',
      primer: 'Mancera',
      segundo: 'Frias',
      rfc: 'MAFM',
      telefono: '554445555',
      correo: 'mamf@k-m.com.mx',
      usuario: 'mamf',
      password: 'bwejwiejwewojewojcneucn',
      roles: [
        {
          id: 1,
          rol: 'ROL_TEC',
          descripcion: 'Tecnico'
        },
        {
          id: 2,
          rol: 'ROL_JUR',
          descripcion: 'Juridico'
        }
      ]
    },
    {
      id: 2,
      nombre: 'Fiorella',
      primer: 'Corona',
      segundo: '',
      rfc: 'FC',
      telefono: '554445555',
      correo: 'fc@k-m.com.mx',
      usuario: 'mamf',
      password: 'bwejwiejwewojewojcneucn',
      roles: [
        {
          id: 3,
          rol: 'ROL_ADM',
          descripcion: 'Administrador'
        }
      ]
    }
  ],
  proyectos: [
    {
      id: 1,
      numero: '4394232309',
      nombre: 'Presa San José de la Paz',
      cliente: 'Caminos del Norte S.A. de C.V.',
      sector: 'Hidroeléctricas',
      observaciones: 'Ninguna',
      fecha: new Date('2022-10-02 00:00:00'),
      ubicacion: 'San Jose de la Paz, Guanajuato'
    },
    {
      id: 2,
      numero: '4394232310',
      nombre: 'Carretera San Juan - San Francisco',
      cliente: 'SCT Residencia Occidente',
      sector: 'Carreteras',
      observaciones: 'Ninguna tampoco',
      fecha: new Date('2022-10-02 00:00:00'),
      ubicacion: 'Guadalupe, Zacatecas',
    },
  ],
  servicios: [
    {
      id: 1,
      nombre: 'MIA-Particular',
      institucion: 'Semarnat DGIRA',
      fecha: new Date('2022-10-31 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 1,
      estatus: 'En proceso',
      clase: 'badge-azul'
    },
    {
      id: 2,
      nombre: 'Concesión ZFMT',
      institucion: 'Semarnat DGZFMTAC',
      fecha: new Date('2022-11-30 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 1,
      estatus: 'Rezagado',
      clase: 'badge-rojo'
    },
    {
      id: 3,
      nombre: 'MIA-Regional',
      institucion: 'Semarnat DGIRA',
      fecha: new Date('2022-10-31 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 2,
      estatus: 'En proceso',
      clase: 'badge-azul'
    },
    {
      id: 4,
      nombre: 'Concesión aguas nacionales superficiales',
      institucion: 'CONAGUA',
      fecha: new Date('2022-11-30 00:00:00'),
      responsable: 'Jorge Romero',
      proyecto: 2,
      estatus: 'Autorizado',
      clase: 'badge-verde'
    }
  ],
  actividades: [
    {
      id: 1,
      actividad: 'Presentacion en ventanilla',
      tipo: 'Realizado',
      etapa: 1,
      fecha: new Date('2022-09-10'),
      servicio: 'MIA Particular',
      servicio_id: 1
    },
    {
      id: 2,
      actividad: 'Presentacion del extracto',
      tipo: 'Programado',
      etapa: 1,
      fecha: new Date('2022-09-10'),
      servicio: 'MIA Particular',
      servicio_id: 1
    }
  ],
  calendario: [
    {
      id: 1,
      actividad: 'Presentacion en ventanilla',
      responsable: 'Juan Rodriguez',
      fechaProgramado: new Date('2022-09-10'),
      fechaRealizado: new Date('2022-10-10'),
      estatus: 'En tiempo',
      clase: 'badge-verde',
      servicio: 1,
    },
    {
      id: 2,
      actividad: 'Presentacion del extracto',
      responsable: 'Juan Rodriguez',
      fechaProgramado: new Date('2022-10-20'),
      fechaRealizado: new Date(),
      estatus: 'Por vencer',
      clase: 'badge-amarillo',
      servicio: 1
    }
  ],
  eventos: [
    {
      anio: 2019,
      actividades: [
        {
          id: 1,
          anio: 2019,
          mes: 'Feb',
          dia: 23,
          fecha: '2019-02-23',
          evento: 'Algo paso este dia',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 2,
          anio: 2019,
          mes: 'Mar',
          dia: 2,
          fecha: '2019-03-02',
          evento: 'Algo paso este otro dia',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
      ],
      tipo: 1
    },
    {
      anio: 2020,
      actividades: [
        {
          id: 7,
          anio: 2020,
          mes: 'Jun',
          dia: 23,
          fecha: '2020-06-23',
          evento: 'Esta es una actividad ',
          tipo: 1,
          clase: 'timeline__card card',

        },
        {
          id: 8,
          anio: 2020,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
        {
          id: 9,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 10,
          anio: 2022,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
      ],
      tipo: 1
    },
    {
      anio: 2021,
      actividades: [
        {
          id: 3,
          anio: 2021,
          mes: 'Jun',
          dia: 23,
          fecha: '2020-06-23',
          evento: 'Esta es una actividad ',
          tipo: 1,
          clase: 'timeline__card card',

        },
        {
          id: 4,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
        {
          id: 5,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 6,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
      ],
      tipo: 1
    },
  ] 
};
