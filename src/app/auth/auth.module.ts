import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

// Modulo personalizado. Creamos nuesto modulo con la auth. Login y registro
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        // Cuando nos aparece el error de ngIf o ngFor, deberemos importar el CommonModule
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        // Importamos el RouterModule para que funcionen los links
        RouterModule
    ]
})
export class AuthModule {}
