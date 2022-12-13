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
