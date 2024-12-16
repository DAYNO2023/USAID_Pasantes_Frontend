import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolComponent } from './rol.component';
import { RolCrearComponent } from './rolcrear/rolcrear.component';
import { RolEditarComponent } from './roleditar/roleditar.component';
@NgModule({
    imports: [RouterModule.forChild([
		{ path: '', component: RolComponent },
    { path: 'rolcrear', component: RolCrearComponent},
    { path: 'roleditar', component: RolEditarComponent}
    ])],
    exports: [RouterModule]
})
export class RolRoutingModule { }