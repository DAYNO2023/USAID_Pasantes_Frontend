import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariorestablecerComponent } from './usuario-restablecer.component';
import { UsuarioVerificacionComponent } from '../usuario-verificacion/usuario-verificacion.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UsuariorestablecerComponent },
    { path: 'Verificar', component: UsuarioVerificacionComponent }

  ])],
  exports: [RouterModule]
})
export class UsuariorestablecerRoutingModule { }
