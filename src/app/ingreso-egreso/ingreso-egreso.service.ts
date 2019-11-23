import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  // Usamos dos subcription para controlar ambos cambios es los items
  ingresoEgresoListerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  // escucha cualquier cambio del nodo de ingresoEgreso
  initIngresoEgresoListener() {
    // Nos subcribimos a todos los cambios de auth
    this.ingresoEgresoListerSubcription = this.store
      .select('auth')
      // esperamos a que el usuario tenga valor (con filter), si no lo tiene lo ignoramos
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  // insercion en firebase el ingresoEgreso
  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubcription = this.afDB
      // path donde quiero escuchar los cambio
      .collection(`${uid}/ingresos-egresos/items`)
      // con snapshotChanges obtenemos infomacion extra de los elementos. Gracias a esto sacaremos el uid
      .snapshotChanges()
      .pipe(
        map(docData => {
          // transformamos el flujo que viene de snapshotChanges
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id, // uid
              ...doc.payload.doc.data() // data del nodo
            };
          });
        })
      )
      .subscribe((coleccion: any[]) => {
        // Lanzamos la accion con el set de los items
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  // Cancelará las subcripciones al hacer logout
  cancelarSubscriptions() {
    this.ingresoEgresoListerSubcription.unsubscribe();
    this.ingresoEgresoItemsSubcription.unsubscribe();
    // Vaciamos los items del usuario
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    // Obtenemos el usuario de firebase
    const user = this.authService.getUsuario();
    return (
      this.afDB
        // doc dondo lo ubicaremos en firebase
        .doc(`${user.uid}/ingresos-egresos`)
        // nueva collection 'items'
        .collection('items')
        // añadimos el nuevo ingresosEgreso
        .add({ ...ingresoEgreso })
    );
  }

  borrarIngresoEgreso(uid: string) {
    // Obtenemos el usuario para saber el uid del usuario
    const user = this.authService.getUsuario();
    // Borramos el item de firebase (delete) indicando su localizacion
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
    // al igual que todos los metodos de firebase,
    // el delete retorna una promesa que puede ser controlada con un then / catch
  }
}
