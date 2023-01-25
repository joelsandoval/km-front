
export class Moral {
    id!: number;
    nombre!: string;
    rfc!: string;
    telefono!: string;
}

export class PersonasMorales {
    id!: number;
    razon!: string;
    rfc!: string;
}

export class Fisica {
    id!: number;
    nombre!: string;
    apellido1!: string;
    apellido2!: string;
    rfc!: string;
    correo!: string;
    telefono!: string;
    iniciales!: string;
    alias!: string;
}

export class FisicaF {
    id!: number;
    nombre!: string;
    primer!: string;
    segundo!: string;
    rfc!: string;
    telefono!: string;
    correo!: string;
    usuarioId!: number;
    usuario!: string;
    password!: string;
    moral!: number;
    alias!: string;
    iniciales!: string;
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
    persona!: FisicaF;
    rol!: Roles;
    servicio: number;
    constructor(
        servicio: number
    ) {
        this.servicio = servicio;
    }
}