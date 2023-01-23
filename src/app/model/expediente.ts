export class ExpedienteServicioCatF {
    id!: number;
    categoria!: string;
    servicio!: number;
    documentos!: ExpedienteServicioF[];
}

export class ExpedienteServicioF {
    id!: number;
    idDocumento!: number;
    documento!: string;
    descripcion!: string;
    cumple!: boolean;
    comentarios!: string;
    tramite!: number;
    tipo!: number;
    orden!: number;
    persona!: number;
    presenta!: boolean;
    archivos!: number;
    fechaP!: Date;
    fechaR!: Date;
    responsable!: number;
}

export class ExpedienteServicio {
    id!: number;
    servicio!: number;
    documento!: number;
    cumple!: boolean;
    comentarios!: string;
    presenta!: boolean;
}

export class ExpCatDocumentos {
    id!: number;
    documento!: string;
    descripcion!: string;
    tipo!: number;
    orden!: number;
    persona!: number;
}

export class ExpServicioArchivos {
    id!: number;
    expediente!: number;
    archivo!: number;
}

export class ExpCatDocumentosCatego {
    id!: number;
    categoria!: string;
    proceso!: number;
    documentos!: ExpCatDocumentos[];
}