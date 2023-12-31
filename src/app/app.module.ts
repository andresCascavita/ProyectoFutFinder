import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore'


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CrearPartidoComponent } from './components/crear-partido/crear-partido.component';
import { ListaDePartidosComponent } from './components/lista-de-partidos/lista-de-partidos.component';
import { getFirestore } from 'firebase/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { CookieService } from 'ngx-cookie-service';
import { AgregarPartidoComponent } from './components/agregar-partido/agregar-partido.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    CrearPartidoComponent,
    ListaDePartidosComponent,
    AgregarPartidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FirestoreModule, provideFirebaseApp(() => initializeApp(environment.firebase)),

  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
