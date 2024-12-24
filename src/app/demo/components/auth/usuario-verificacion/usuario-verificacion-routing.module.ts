import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioVerificacionComponent } from './usuario-verificacion.component';

const routes: Routes = [{ path: '', component: UsuarioVerificacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioVerificacionRoutingModule { }
