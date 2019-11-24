import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Modulo personalizado
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';
import { LocaleCurrencyPipe } from './locale-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    // Importamos el Router Child
    DashboardRoutingModule,
    // Configuracion del LazyLoad del store (no queremos que el store de ingresoEgreso aparezca si no estamos logueados)
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ],
  declarations: [
    // Declaramos los componentes y Pipes que usaremos en este modulo
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
    LocaleCurrencyPipe
  ]
})
export class IngresoEgresoModule { }
