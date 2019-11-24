import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(public authService: AuthService) {}

  canActivate() {
    return this.authService.isAuth();
  }

  /* El canLoad funciona exactamente igual que el canActivate,
  salvo porque necesitamos que escuche solo una vez y que cancela la subcripcion.
  Para eso, usamos el take(1)
  */
  canLoad() {
    return this.authService.isAuth().pipe(take(1));
  }
}
