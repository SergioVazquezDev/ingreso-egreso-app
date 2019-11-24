import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        // Configuracion del LazyLoad, cuando llegue a la ruta '' carga el modulo de forma dinamica
        path: '',
        // Indicamos el path relativo del archivo que necesitamos cargar
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule),
        // Para impedir cargar el modulo si no se está autenticado (el canActivate se aplicaria demasiado tarde)
        canLoad: [ AuthGuardService ]
    },
    { path: '**', redirectTo: '' },

];


@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
