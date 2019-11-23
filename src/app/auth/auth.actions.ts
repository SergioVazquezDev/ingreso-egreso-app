import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

// Guarmos el usuario en nuestro store
export class SetUserAction implements Action {
    readonly type = SET_USER;
    // Pasamos como payload el user que guardaremos
    constructor( public user: User ) {}
}

// Accion para vaciar la info de usuario
export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;
}

export type acciones = SetUserAction | UnsetUserAction;
