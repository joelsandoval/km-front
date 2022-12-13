'use strict';

import { Categoria, Section } from "./catalogos";
import { Fisica, FisicaF } from "./personas";
import { Calendario, Proyecto, Servicio } from "./proyecto";

export const sep = '/';
export const version: string = "22.2.2";

export const personas: FisicaF[] =
    [
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
            iniciales: 'MAMF'
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
            iniciales: 'MAMF'
        }
    ];

export const proyectos: Proyecto[] = [
    {
        id: 1,
        proyecto: 'Presa San José de la Paz',
        proyectoCorto: '',
        cliente: 2,
        sector: 12,
        observaciones: 'Ninguna',
        registro: new Date('2022-10-02 00:00:00'),
        ubicacion: 'San Jose de la Paz, Guanajuato',
        categoria: 1,
        estatus: 1,
    },
    {
        id: 2,
        proyecto: 'Carretera San Juan - San Francisco',
        proyectoCorto: '',
        cliente: 3,
        sector: 12,
        observaciones: 'Ninguna tampoco',
        registro: new Date('2022-10-02 00:00:00'),
        ubicacion: 'Guadalupe, Zacatecas',
        categoria: 1,
        estatus: 1
    },
];



export const actividades = [
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
];

export const calendario: Calendario[] = [
    {
        id: 1,
        actividad: 'Presentacion en ventanilla',
        responsable: 'Juan Rodriguez',
        fechaProgramado: new Date('2022-10-10'),
        fechaRealizado: new Date('2022-10-15'),
        estatus: 'En tiempo',
        clase: 'badge-verde',
        servicio: 1,
        realizado: true
    },
    {
        id: 2,
        actividad: 'Presentacion del extracto',
        responsable: 'Juan Rodriguez',
        fechaProgramado: new Date('2022-10-30'),
        fechaRealizado: new Date(),
        estatus: 'Por vencer',
        clase: 'badge-amarillo',
        servicio: 1,
        realizado: false
    }
];

export const eventos = [
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
];

/* export const CAT_SERVICIOS: Categoria[] = [
    {
        id: 1,
        categoria: 'Ambiental',
        subcategorias: [
            {
                id: 1,
                subcategoria: 'Agua',
                servicios: [
                    {
                        id: 1,
                        servicio: 'Estudios de factibilidad en materia de agua'
                    },
                    {
                        id: 2,
                        servicio: 'Aprovechamiento y uso eficiente del agua'
                    },
                    {
                        id: 3,
                        servicio: 'Permisos para descarga de aguas residuales'
                    },
                ]
            },
            {
                id: 2,
                subcategoria: 'Atmosfera',
                servicios: [
                    {
                        id: 4,
                        servicio: 'Actividades por las que se emitan a la atmósfera olores, gases o partículas sólidas'
                    },
                    {
                        id: 5,
                        servicio: 'Licencia Ambiental Única'
                    },
                    {
                        id: 6,
                        servicio: 'Licencia de Funcionamiento'
                    },
                ]
            },
            {
                id: 3,
                subcategoria: 'Cambio de uso de suelo',
                servicios: [
                    {
                        id: 7,
                        servicio: 'Factibilidades en materia de cambio de uso de suelo forestal'
                    },
                    {
                        id: 8,
                        servicio: 'Estudios Técnico Justificativos '
                    },
                    {
                        id: 9,
                        servicio: 'Autorizaciones de cambio de uso de suelo en terrenos forestales '
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        categoria: 'Ambiental',
        subcategorias: [
            {
                id: 1,
                subcategoria: 'Agua',
                servicios: [
                    {
                        id: 1,
                        servicio: 'Estudios de factibilidad en materia de agua'
                    },
                    {
                        id: 2,
                        servicio: 'Aprovechamiento y uso eficiente del agua'
                    },
                    {
                        id: 3,
                        servicio: 'Permisos para descarga de aguas residuales'
                    },
                ]
            },
            {
                id: 2,
                subcategoria: 'Atmosfera',
                servicios: [
                    {
                        id: 4,
                        servicio: 'Actividades por las que se emitan a la atmósfera olores, gases o partículas sólidas'
                    },
                    {
                        id: 5,
                        servicio: 'Licencia Ambiental Única'
                    },
                    {
                        id: 6,
                        servicio: 'Licencia de Funcionamiento'
                    },
                ]
            },
            {
                id: 3,
                subcategoria: 'Cambio de uso de suelo',
                servicios: [
                    {
                        id: 7,
                        servicio: 'Factibilidades en materia de cambio de uso de suelo forestal'
                    },
                    {
                        id: 8,
                        servicio: 'Estudios Técnico Justificativos '
                    },
                    {
                        id: 9,
                        servicio: 'Autorizaciones de cambio de uso de suelo en terrenos forestales '
                    },
                ]
            }
        ]
    }
];
 */

export const folders: Section[] = [
    {
        name: 'Borrador del documento',
        updated: new Date('1/1/22'),
    },
    {
        name: 'Versión definitiva para entrega.docx',
        updated: new Date('1/17/22'),
    },
];

export const notes: Section[] = [
    {
        name: 'Imagen de ejemplo 1',
        updated: new Date('2/20/22'),
    },
    {
        name: 'Imagen de ejemplo 2',
        updated: new Date('1/18/22'),
    },
];