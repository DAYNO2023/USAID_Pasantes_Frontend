import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolComponent } from './rol.component';
import { RolcrearComponent } from './rolcrear/rolcrear.component';
@NgModule({
    imports: [RouterModule.forChild([
		{ path: '', component: RolComponent },
    { path: 'rolcrear', component: RolcrearComponent}
    ])],
    exports: [RouterModule]
})
export class RolRoutingModule { }