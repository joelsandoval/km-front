export class CatServicio {
    id!: number;
    servicio!: string;   
}

export class SubCategoria {
    id!: number;
    subcategoria!: string;
    servicios!: CatServicio[];
}

export class Categoria {
    id!: number;
    categoria!: string;
    subcategorias!: SubCategoria[];
}

export interface Section {
    name: string;
    updated: Date;
  }
