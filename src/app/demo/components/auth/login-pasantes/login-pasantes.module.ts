import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPasantesRoutingModule } from './login-pasantes-routing.module';
import { LoginPasantesComponent } from './login-pasantes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { PasswordModule } from 'primeng/password';




@NgModule({
    imports: [
        CommonModule,
        LoginPasantesRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        AppConfigModule,
        InputTextModule,
        PasswordModule
    ],
    declarations: [LoginPasantesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Esto permitirá usar <p-floatLabel>
})
export class LoginPasantesComponentModule { }
