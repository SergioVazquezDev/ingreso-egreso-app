import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from '../shared/ui.accions';

import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup; // Formulario
  tipo = 'ingreso';

  // Control del cargando
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    // Ajuste del AppStare de LazyLoad y no del AppState principal
    private store: Store<fromIngresoEgreso.AppState>
  ) {}

  ngOnInit() {
    // Escuchamos cuando la app entra en estado de carga
    this.loadingSubs = this.store
      .select('ui')
      .subscribe(ui => (this.cargando = ui.isLoading));
    // Declaración y configuracion de los campos del formulario
    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy() {
    // Cancelamos la subciption cuando el formulario se destruya
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    // Mostramos el loading
    this.store.dispatch(new ActivarLoadingAction());
    // mediante {}, enviamos el forma.value
    // con el operador de propagación (operador spread) como pares de valores + el tipo
    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo
    });
    // Llamamos al servicio para insertar el ingresoEgreso
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        // Si todo salio bien:
        // Ocualtamos el loading
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        // Si es success, borramos el formulario y establecemos el importe en cero
        this.forma.reset({ monto: 0 });
      })
      .catch(error => {
        // Si ocurrio un error:
        // Cerramos el loading
        this.store.dispatch(new DesactivarLoadingAction());
        // Mostramos el error
        Swal.fire('Error en el login', error.message, 'error');
      });
  }
}
