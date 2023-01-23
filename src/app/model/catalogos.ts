export class CatServicio {
    id!: number;
    servicio!: string;   
}

export class Servicios {
    id!: number;
    categoria!: number;
    servicio!: string;
    servicioCorto!: string;
}

export class Categoria {
    id!: number;
    categoria!: string;
    servicios!: Servicios[];
}

export interface Section {
    name: string;
    updated: Date;
  }

export class CatActividades {
    id!: number;
    actividad!: string;
    tipo!: number;
    proceso!: number;
}

export class CatActividadesTipo {
    id!: number;
    actividadTipo!: string;
    actividades!: CatActividades[];
}

export class ExpCatDocumentosServicios {
    id!: number;
    categoId!: number;
    categoria!: string;
    documento!: string;
    descripcion!: string;
    servicio!: number;
}