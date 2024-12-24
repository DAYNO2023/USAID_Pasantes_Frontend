import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionsGuard } from 'src/app/guards/permissions.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'rol', 
            data: { breadcrumb: 'Roles' }, 
            canActivate: [PermissionsGuard],
            loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) 
        },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }
