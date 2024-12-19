import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolRoutingModule } from './rol-routing.module';
import { RolComponent } from './rol.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TreeModule } from 'primeng/tree';
import { RolEditarComponent } from './roleditar/roleditar.component';
import { RolCrearComponent } from './rolcrear/rolcrear.component';
import { RolDetalleComponent } from './roldetalle/roldetalle.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
	imports: [
		CommonModule,
		RolRoutingModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		OverlayPanelModule,
		ConfirmDialogModule,
		SidebarModule,
		ConfirmPopupModule,
		TreeModule,
		ReactiveFormsModule,
		ProgressSpinnerModule,
		SplitButtonModule,
	],
	declarations: [RolComponent, RolEditarComponent, RolCrearComponent, RolDetalleComponent]
})
export class RolModule { }