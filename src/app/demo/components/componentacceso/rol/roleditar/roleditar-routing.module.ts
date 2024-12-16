import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolEditarComponent } from './roleditar.component';
import { RolComponent } from '../rol.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: RolEditarComponent },
            { path: 'rol', component: RolComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class RolEditarRoutingModule {}
