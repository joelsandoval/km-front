// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Fisica } from "src/app/model/personas";

export const environment = {
  production: false,
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
    },
    {
      id: 2,
      numero: '4394232310',
      nombre: 'Carretera San Juan - San Francisco',
      cliente: 'SCT Residencia Norte',
      sector: 'Carreteras',
      observaciones: 'Ninguna tampoco',
      fecha: new Date('2022-10-02 00:00:00'),
    },
  ],
  servicios: [
    {
      id: 1,
      nombre: 'MIA-Particular',
      institucion: 'Semarnat DGIRA',
      fecha: new Date('2022-10-31 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 1
    },
    {
      id: 2,
      nombre: 'Concesión ZFMT',
      institucion: 'Semarnat DGZFMTAC',
      fecha: new Date('2022-11-30 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 1
    },
    {
      id: 3,
      nombre: 'MIA-Particular',
      institucion: 'Semarnat DGIRA',
      fecha: new Date('2022-10-31 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 2
    },
    {
      id: 4,
      nombre: 'Concesión ZFMT',
      institucion: 'Semarnat DGZFMTAC',
      fecha: new Date('2022-11-30 00:00:00'),
      responsable: 'Miguel Mancera',
      proyecto: 2
    }
  ]


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
