import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})

// Recibira un arreglo de item y devolverá primero los del tipo ingreso, y despues los de egreso
export class OrdenIngresoEgresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    // con sort espera dos elementos, pero en este caso nos sirve con el primero
    return items.sort((a, b) => {
      // el 1 y el -1 es para saber si tiene que cambiarlo o no
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
