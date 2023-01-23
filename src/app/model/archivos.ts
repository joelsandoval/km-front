export class Archivo {
    id: number;    
    proyecto!: number;
    archivo!: string;
    estatus!: number;
    tipo!: number;
    descripcion!: string;
    autor!: number;
    fecha!: Date;
    extension!: string;
    ruta!: string;
    rutaFs!: string;    
    activo!: number;
    size!: number;
    constructor(        
        id: number
    ) {
        this.id = id;    
    }       
}

export class ArchivoTipos {
    id!: number;
    tipo!: string;
}