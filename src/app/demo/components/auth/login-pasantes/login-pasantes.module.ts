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

import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ReactiveFormsModule } from '@angular/forms';




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
        PasswordModule,
        RippleModule,
        FileUploadModule,
        TabViewModule,
        CalendarModule,
        RadioButtonModule,
        ChipsModule,
        AutoCompleteModule,
        InputNumberModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
    ],
    declarations: [LoginPasantesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Esto permitirá usar <p-floatLabel>
})
export class LoginPasantesComponentModule { }
