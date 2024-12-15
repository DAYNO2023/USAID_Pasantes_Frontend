import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolcrearComponent } from './rolcrear.component';
import { RolComponent } from '../rol.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: RolcrearComponent },
            { path: 'rol', component: RolComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class RolcrearRoutingModule {}
