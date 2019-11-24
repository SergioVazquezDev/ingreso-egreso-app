import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../auth/auth-guard.service';


const routes: Routes = [
  {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        // Los Guard ahora estarían en auth-guard
        // canActivate: [ AuthGuardService ]
    }
];


@NgModule({
  imports: [
    // Aqui va forChild, no forRoot, forRoot es para el routing principal.
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
