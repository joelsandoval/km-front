export class Proyecto {
    id!: number;
    numero!: string;
    nombre!: string;
    cliente!: string;
    sector!: string;
    observaciones!: string;
    fecha!: Date;
}

export class Servicio {
    id!: number;
    nombre!: string;
    institucion!: string;
    fecha!: Date;
    responsable!: string;
}

export class Actividad {
    id!: number;
    nombre!: string;
    fecha!: Date;
    fechaPres!: Date;
    responsable!: string;
}

export class TimeLine {
    anio!: number;
    actividades!: Evento[];
    tipo!: number;
  }
  
  export class Evento {
    id!: number;
    anio!: number;
    mes!: string;
    dia!: number;
    fecha!: string;
    evento!: string;
    tipo!: number;
    clase!: string;
  }