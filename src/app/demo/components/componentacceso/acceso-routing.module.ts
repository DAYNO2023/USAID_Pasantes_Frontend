import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'rol', 
            data: { breadcrumb: 'Roles' }, 
            loadChildren: () => import('../componentacceso/rol/rol.module').then(m => m.RolModule),
        },
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }
