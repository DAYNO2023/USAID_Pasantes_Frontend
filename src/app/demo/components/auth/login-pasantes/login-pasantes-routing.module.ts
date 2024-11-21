import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPasantesComponent } from './login-pasantes.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginPasantesComponent },
        { path: 'register', component: RegisterComponent },
    ])],
    exports: [RouterModule]
})
export class LoginPasantesRoutingModule { }
