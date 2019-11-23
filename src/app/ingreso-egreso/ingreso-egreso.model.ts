export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string; // Lo voy a necesitar al borrar algo

  constructor(obj) {
    this.descripcion = (obj && obj.descripcion) || null;
    this.monto = (obj && obj.monto) || null;
    this.tipo = (obj && obj.tipo) || null;
    /* Lo quitamos ya que en este caso no nos interesa guardarlo aqui,
    ya que lo podemos obtener de otra parte mucho más facil */
    // this.uid         = obj && obj.uid         || null;
  }
}
