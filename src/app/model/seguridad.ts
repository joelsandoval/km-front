export class Credenciales {
    userName: string;
    nombre: string;
    roles: string[];
    constructor(
        userName: string,
        nombre: string,
        roles: string[]
    ) {
        this.userName = userName;
        this.nombre = nombre;
        this.roles = roles;
    }
  }
