import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolComponent } from './rol.component';
import { RolCrearComponent } from './rolcrear/rolcrear.component';
import { RolEditarComponent } from './roleditar/roleditar.component';
import { RolDetalleComponent } from './roldetalle/roldetalle.component';

const routes: Routes = [
  { path: '', component: RolComponent },
  { path: 'rolcrear', component: RolCrearComponent },
  { path: 'roleditar', component: RolEditarComponent },
  { path: 'roldetalle', component: RolDetalleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolRoutingModule { }
