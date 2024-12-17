import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'rol', 
            data: { breadcrumb: 'Roles' }, 
            loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) 
        },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }
