export class User {

   username!: string;
   email!: string;
   firstName!: string;
   lastName!: string;
   password!: string;
   rol!: string;

}

export class SegUsuarios {
   id!: number;
   usuario!: string;
   nombre!: string;
   apellidos!: string;
   email!: string;
   estatus!: number;
   fechaAlta!: Date;
   fechaBaja!: Date;
}
