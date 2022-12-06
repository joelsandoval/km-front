export class Proyecto {
    id!: number;
    //numero!: string;
    proyecto!: string;
    proyectoCorto!: string;
    cliente!: number;
    sector!: number;
    registro!: Date;
    observaciones!: string;
    ubicacion!: string;
    categoria!: number;
    estatus!: number;
}

export class ProyectoF {
    id!: number;
    numero!: string;
    proyecto!: string;
    proyectoCorto!: string;
    cliente!: string;
    clienteId!: number;
    sector!: string;
    observaciones!: string;
    registro!: Date;
    ubicacion!: string;
    estatusId!: number;
    categoria!: number;
}


export class Servicio {
    id!: number;
    proyecto!: number;
    nombre!: string;
    institucion!: string;
    fecha!: Date;
    responsable!: string;
    estatus!: string;
    clase!: string;
}

export class ServicioF {
    id!: number;
    proyecto!: number;
    servicioId!: number;
    servicio!: string;
    registro!: Date;
    estatusId!: number;
    estatus!: string;
    responsableId!: number;
    responsable!: string;
    institucionId!: number;
    institucion!: string;
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
    realizado!: boolean;
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