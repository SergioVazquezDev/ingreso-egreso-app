import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  // Inicializamos la subcription para evitar el error unsubcribe de undefined
  subscription: Subscription = new Subscription();

  constructor( public authService: AuthService,
               public store: Store<AppState> ) { }

  ngOnInit() {
    // Escuchamos los cambios del store del ui, y asignaremos a cargando lo que tenga isLoading
    // Usamos una subcription ya que nos permitirá llamar al onDestroy cuando se destruya este componente
    this.subscription = this.store.select('ui')
        .subscribe( ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy() {
    // Destruimos el subcription cuando el componente deje de existir.
    this.subscription.unsubscribe();
  }

  onSubmit( data: any ) {
    this.authService.crearUsuario( data.nombre, data.email, data.password );
  }

}
