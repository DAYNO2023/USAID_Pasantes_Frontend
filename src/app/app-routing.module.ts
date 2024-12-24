import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

// const routerOptions: ExtraOptions = {
//     anchorScrolling: 'enabled'
// };

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', redirectTo: 'auth', pathMatch: 'full',
            },
            {
                path: 'auth',
                data: { breadcrumb: 'Auth' },
                loadChildren: () =>
                    import('./demo/components/auth/auth.module').then(
                        (m) => m.AuthModule
                    ),
            },
        ]
    },
    {
        path: 'USAID', 
        component: AppLayoutComponent,
        children: [
            { path: '',  data: { breadcrumb: 'Principal' }, loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) },
            { path: 'acceso', data: { breadcrumb: 'Acceso' }, loadChildren: () => import('./demo/components/componentacceso/acceso.module').then(m => m.AccesoModule) }
    
        ]
    },
    // { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'usuariorestablecer', loadChildren: () => import('./demo/components/auth/usuario-restablecer/usuario-restablecer.module').then(m => m.UsuariorestablecerModule) },
    { path: 'usuario-verificacion', loadChildren: () => import('./demo/components/auth/usuario-verificacion/usuario-verificacion.module').then(m => m.UsuarioVerificacionModule) },
    // { path: 'documentos', loadChildren: () => import('./demo/components/documentos/documentos.module').then(m => m.DocumentosModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
