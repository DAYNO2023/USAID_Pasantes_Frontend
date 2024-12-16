import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rol', data: { breadcrumb: 'Roles' }, loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) },
        { path: 'rolcrear', data: { breadcrumb: 'Rol Crear' }, loadChildren: () => import('./rol/rolcrear/rolcrear.module').then(m => m.RolCrearModule) },
        { path: 'roleditar', data: { breadcrumb: 'Rol Editar' }, loadChildren: () => import('./rol/roleditar/roleditar.module').then(m => m.RolEditarModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }