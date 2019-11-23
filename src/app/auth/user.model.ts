export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    // TIP: Hemos adaptado el contrucctor para que acepte un objeto como entrada
    constructor( obj: DataObj ) {
        // (Si existe el objeto y tiene el atributo x, lo pones, si no null)
        this.nombre = obj && obj.nombre || null;
        this.uid    = obj && obj.uid || null;
        this.email  = obj && obj.email || null;
    }
}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}

