import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';

// Environment
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

// Locales
import { registerLocaleData } from '@angular/common';

// importar locales
import localeEs from '@angular/common/locales/es';
// import localePy from '@angular/common/locales/es-PY';
// import localePt from '@angular/common/locales/pt';
// import localeEn from '@angular/common/locales/en';
// import localeEsAr from '@angular/common/locales/es-AR';


// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEs, 'es');
// registerLocaleData(localePy, 'es-PY');
// registerLocaleData(localePt, 'pt');
// registerLocaleData(localeEn, 'en');
// registerLocaleData(localeEsAR, 'es-AR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
