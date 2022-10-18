
export class Moral {
    id!: number;
    nombre!: string;
    rfc!: string;
    telefono!: string;
}

export class Fisica {
    id!: number;
    nombre!: string;
    primer!: string;
    segundo!: string;
    rfc!: string;
    telefono!: string;
    correo!: string;
    usuario!: string;
    password!: string;
    roles!: Roles[];
}

export class PersonasRelacion {
    id!: number;
    moral!: number;
    fisica!: number;
    fecha!: Date;
    cargo!: number;
}

export class Roles {
    id!: number;
    rol!: string;
    descripcion!: string;
}

export class Asignacion {
    id!: number;
    persona!: number;
    rol!: number;
    servicio: number;
    constructor(
        servicio: number
    ) {
        this.servicio = servicio;
    }
}

export class AsignacionF {
    id!: number;
    persona!: Fisica;
    rol!: Roles;
    servicio: number;
    constructor(
        servicio: number
    ) {
        this.servicio = servicio;
    }
}