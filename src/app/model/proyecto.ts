export class Proyecto {
    id!: number;
    numero!: string;
    nombre!: string;
    cliente!: string;
    sector!: string;
    observaciones!: string;
    fecha!: Date;
    ubicacion!: string;
}

export class Servicio {
    id!: number;
    nombre!: string;
    institucion!: string;
    fecha!: Date;
    responsable!: string;
    estatus!: string;
    clase!: string;
}

export class Actividad {
    id!: number;
    nombre!: string;
    fecha!: Date;
    fechaPres!: Date;
    responsable!: string;
    servicio!: string;
    proyecto!: string;
}

export class Calendario {
    id!: number;
    actividad!: string;
    responsable!: string;
    fechaProgramado!: Date;
    fechaRealizado!: Date;
    estatus!: string;
    clase!: string;
    servicio!: number;
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