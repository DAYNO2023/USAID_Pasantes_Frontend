import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { PasswordModule } from 'primeng/password';
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
// import { InputOtpModule } from 'primeng/inputotp';

import { UsuarioVerificacionRoutingModule } from './usuario-verificacion-routing.module';
import { UsuarioVerificacionComponent } from './usuario-verificacion.component';


@NgModule({
  imports: [
    CommonModule,
    UsuarioVerificacionRoutingModule,
    FormsModule,
    // InputOtpModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    AppConfigModule,
    PasswordModule,
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
    ReactiveFormsModule
  ],
  declarations: [UsuarioVerificacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class UsuarioVerificacionModule { }
