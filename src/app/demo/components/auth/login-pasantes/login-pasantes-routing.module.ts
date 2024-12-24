import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPasantesComponent } from './login-pasantes.component';
import { RegisterComponent } from '../register/register.component';
import { UsuariorestablecerComponent } from '../usuario-restablecer/usuario-restablecer.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginPasantesComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'Usuario-Restablecer', component: UsuariorestablecerComponent }

    ])],
    exports: [RouterModule]
})
export class LoginPasantesRoutingModule { }
