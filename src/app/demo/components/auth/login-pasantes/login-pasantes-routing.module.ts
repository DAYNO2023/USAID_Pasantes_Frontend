import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPasantesComponent } from './login-pasantes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginPasantesComponent }
    ])],
    exports: [RouterModule]
})
export class LoginPasantesRoutingModule { }
