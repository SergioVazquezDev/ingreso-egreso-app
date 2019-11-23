import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Iniciamos la userSubscription para evitar el error del unsubcribe de undefined
  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      // Si existe el usuario de firebase
      if (fbUser) {
        // Obtenemos la referencia a un objeto que se encuentra en firebase
        // Con valueChanges observamos los cambios de ese objeto
        this.userSubscription = this.afDB
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usuarioObj: any) => {
            // Trasformamos el usuarioObj a nuestro modelo de User
            const newUser = new User(usuarioObj);
            // Lanzamos la accion que nos almacena el usuario en el store
            this.store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        // Si no tenemos usuario de firebase:
        // Asignamos reseteamos nuestro usuario
        this.usuario = null;
        // Cancelamos la subcription y paramos de escuchar cambios en el user
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // Hacemos el dispatch que lanza la accion que muestra el loading
    this.store.dispatch(new ActivarLoadingAction());

    // Creamos el usuario
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // Guardamos los datos deseados del usuario que acabamos de crear
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        // Insertamos el usuario en firebase
        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            // Al terminar, hacemos el dispatch que lanza la accion que cancela el loading
            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch(error => {
        console.error(error);
        // Si sucede un error, tambien hacemos el dispatch que lanza la accion que cancela el loading
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error en el registro', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  // Cerrar sesion
  logout() {
    // Redireccionamos a login
    this.router.navigate(['/login']);
    // Logout de firebase
    this.afAuth.auth.signOut();
    // Vaciamos el usuario del store
    this.store.dispatch(new UnsetUserAction());
  }

  // Revisa si tenemos el usuario de firebase, y si no, redirecciona al login
  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  // Obtenemos el usuario
  getUsuario() {
    // Lo hacemos con el operador spread para romper la referencia
    return { ...this.usuario };
  }
}
