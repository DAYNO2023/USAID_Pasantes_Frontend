import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from "primeng/dropdown";
import { TreeModule } from 'primeng/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { RolcrearRoutingModule } from './rolcrear-routing.module';
import { RolcrearComponent } from './rolcrear.component';
import { SplitButtonModule } from "primeng/splitbutton";
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
	imports: [ProgressSpinnerModule,
		FileUploadModule,
		SplitButtonModule,
		CommonModule,
		RolcrearRoutingModule,
		ToastModule,
		DialogModule,
		FormsModule,
		InputTextModule,
		DropdownModule,
		ButtonModule,
		OverlayPanelModule,
		TableModule,
		ConfirmDialogModule,
		SidebarModule,
		RippleModule,
		ConfirmPopupModule,
		TreeModule,
		ReactiveFormsModule
	],
    declarations: [
        RolcrearComponent
    ]
})
export class RolcrearModule { }