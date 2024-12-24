import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariorestablecerRoutingModule } from './usuario-restablecer-routing.module';
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
import { UsuariorestablecerComponent } from './usuario-restablecer.component';



@NgModule({
  imports: [
    CommonModule,
    UsuariorestablecerRoutingModule,
    FormsModule,
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
  declarations: [UsuariorestablecerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class UsuariorestablecerModule { }
