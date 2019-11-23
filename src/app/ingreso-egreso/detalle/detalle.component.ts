import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<fromIngresoEgreso.AppState>,
               public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    // Obtenemos los item del store
    this.subscription = this.store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
          this.items = ingresoEgreso.items;
        });
  }

  ngOnDestroy() {
    // Cancelamos la subcription
    this.subscription.unsubscribe();
  }

  // Borra el item
  borrarItem( item: IngresoEgreso ) {
    // llamamos al servicio que borra el item en firebase
    this.ingresoEgresoService.borrarIngresoEgreso( item.uid )
        // controlamos el OK y el KO
        .then( () => {
          Swal.fire('Eliminado', item.descripcion, 'success');
        }).catch( error => {
          Swal.fire('Error en borrado', error.message, 'error');
        });
  }

}
