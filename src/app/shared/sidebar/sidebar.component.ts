import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();

  constructor( public authService: AuthService,
               public ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState> ) { }

  ngOnInit() {

    this.subscription = this.store.select('auth')
        .pipe(
          // implementamos el filter para evitar informacion nula
          filter( auth => auth.user != null )
        )
        // Obtenemos el nombre para mostrarlo en el sidebar
        .subscribe( auth => this.nombre = auth.user.nombre );

  }

  logout() {
    this.authService.logout();
    // cancelo las subcripciones de los cambios en ingresosEgresos
    // esto se llama al hacer el logout
    this.ingresoEgresoService.cancelarSubscriptions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
