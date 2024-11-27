import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {
    constructor(private messageService: MessageService) {}
    
    value: string | undefined;
    value2!: string;
    valRadio: string = '';

    routeItems: MenuItem[] = [];
    IndexTab: number = 0;

    uploadedFiles: any[] = [];

    ngOnInit(){
    }

    openNext() {
        this.IndexTab = (this.IndexTab === 2) ? 0 : this.IndexTab + 1;
    }

    openPrev() {
        this.IndexTab = (this.IndexTab === 0) ? 2 : this.IndexTab - 1;
    }

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }


}
