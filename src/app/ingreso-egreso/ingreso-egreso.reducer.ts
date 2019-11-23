import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface AppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estadoInicial, action: fromIngresoEgreso.acciones ): IngresoEgresoState {
    switch ( action.type ) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                // Regrersamos un nuevo array de items
                items: [
                    // Por seguridad, rompemos la referencia con ... y el operador map (nuevo arreglo y nuevo elemento)
                    ...action.items.map( item => {
                        return { ...item };
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}
