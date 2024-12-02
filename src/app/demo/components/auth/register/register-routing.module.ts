import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { LoginPasantesComponent } from '../login-pasantes/login-pasantes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterComponent },
        { path: 'login-pasantes', component: LoginPasantesComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }