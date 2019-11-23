import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  // Montos de los ingresos-egresos
  ingresos: number;
  egresos: number;

  // Contadores de ingresos-egresos
  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  // Elementos del gráfico
  public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<fromIngresoEgreso.AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
            .subscribe( ingresoEgreso => {
              this.contarIngresoEgreso( ingresoEgreso.items );
            });
  }


  contarIngresoEgreso( items: IngresoEgreso[] ) {
    // Iniciamos los contadores
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    // Recorremos el array para completar los contadores y los montos
    items.forEach( item => {
      if ( item.tipo === 'ingreso' ) {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });
    // actualizamos los datos del grafico
    this.doughnutChartData = [this.egresos, this.ingresos ];
  }
}
