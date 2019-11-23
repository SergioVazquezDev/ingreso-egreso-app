import * as fromAuth from './auth.actions';
import { User } from './user.model';


export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    // En el estado inicial no tenemos usuario, ninguno autenticado
    user: null
};

export function authReducer( state = estadoInicial, action: fromAuth.acciones ): AuthState {
    switch ( action.type ) {
        case fromAuth.SET_USER:
            return {
                // Tenemos que regresar user y para romper las referencias lo extraemos con ...
                // Al hacerlos así, tomamos cada una de las propiedades de user
                // mediante nuevos pares de valores
                user: { ... action.user }
            };
        case fromAuth.UNSET_USER:
            return {
                // Marcamos el user a null para inicializarlo
                user: null
            };
        default:
            return state;
        }
}

