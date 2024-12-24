import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'Login-Pasantes', pathMatch: 'full'},

        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },

        { path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
        { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
        { path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
        
        { path: 'Login-Pasantes', loadChildren: () => import('./login-pasantes/login-pasantes.module').then(m => m.LoginPasantesComponentModule) },
        { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
        { path: 'Usuario-Restablecer', loadChildren: () => import('./usuario-restablecer/usuario-restablecer.module').then(m => m.UsuariorestablecerModule) },
        { path: 'Documentos', loadChildren: () => import('./documentos/documentos.module').then(m => m.DocumentosModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
