import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    // Aqui el usuario ya estará logeado, y por tanto, ya nos podremos traer sus items
    this.ingresoEgresoService.initIngresoEgresoListener();

  }

}
