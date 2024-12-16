import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolCrearComponent } from './rolcrear.component';
import { RolComponent } from '../rol.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: RolCrearComponent },
            { path: 'rol', component: RolComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class RolCrearRoutingModule {}
