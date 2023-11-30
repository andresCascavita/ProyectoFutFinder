import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { MenuComponent } from './components/menu/menu.component';
import { HistoryComponent } from './components/history/history.component';
import { CrearPartidoComponent } from './components/crear-partido/crear-partido.component';
import { ListaDePartidosComponent } from './components/lista-de-partidos/lista-de-partidos.component';
import { AgregarPartidoComponent } from './components/agregar-partido/agregar-partido.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [LoginGuard]},
  { path: 'menu', component: MenuComponent, canActivate: [LoginGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [LoginGuard]},
  { path: 'crearPartido', component: AgregarPartidoComponent, canActivate: [LoginGuard] },
  { path: 'listaDePartidos',component:ListaDePartidosComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
