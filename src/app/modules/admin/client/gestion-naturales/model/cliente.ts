export class Cliente {
    id!: number;
    tipoDocumento: String;
    numeroDocumento: String;
    name: String;
    lastname: String;
    genero : String;
    fechaNacimiento : String;
    direction : String;
    rol: String;
    estado: String;


    constructor(tipoDocumento: String, numeroDocumento: String, name: String, lastname: String, genero : String, fechaNacimiento: String, direction : String, rol: String, estado: String) {
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.name = name;
        this.lastname = lastname;
        this.genero = genero; 
        this.fechaNacimiento = fechaNacimiento;
        this.direction = direction;
        this.rol = rol;
        this.estado = estado;
    }
}