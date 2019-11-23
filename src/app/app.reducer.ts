// Esto nos permite fusionar varios reducers en uno solo
import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

// Aqui añadiremos todos los reducers de nuestra app
export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // (en este caso no hace falta xq lo configuramos con lazyLoad, ya que no nos hace falta en el login)
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};

