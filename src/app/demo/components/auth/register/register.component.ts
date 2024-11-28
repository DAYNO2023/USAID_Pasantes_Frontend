import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { tipoSangre } from 'src/app/demo/models/modelsgeneral/tiposangreviewmodel';
import { tipoSangreService } from 'src/app/demo/service/servicegeneral/tiposangre.service';
import { optanteService } from 'src/app/demo/service/servicegestion/optante.service';
import { estadoCivilService } from 'src/app/demo/service/servicegeneral/estadocivil.service';
import { estadoCivil } from 'src/app/demo/models/modelsgeneral/estadocivilviewmodel';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {
    optanteForm!: FormGroup; // Grupo de controles

    tipossangre: tipoSangre[] = []; // Lista de tipos de sangre
    tiposangreseleccionado!: tipoSangre; // Tipo de sangre seleccionado

    estadosciviles: estadoCivil[] = []; // Lista de estados civiles
    estadocivilseleccionado!: estadoCivil; // Estado civil seleccionado

    routeItems: MenuItem[] = [];
    IndexTab: number = 0;

    uploadedFiles: any[] = [];

    constructor(
        private messageService: MessageService,
        private optanteService: optanteService,
        private tipoSangreService: tipoSangreService,
        private estadoCivilService: estadoCivilService,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.optanteForm = this.fb.group({
            opta_DNI: ['', Validators.required],
            opta_Imagen: ['', Validators.required],
            opta_CorreoElectronico: ['', [Validators.required, Validators.email]],
            opta_Nombres: ['', Validators.required],
            opta_Apellidos: ['', Validators.required],
            opta_FechaNacimiento: ['', Validators.required],
            opta_Sexo: ['', Validators.required],
            opta_Direccion: ['', Validators.required],
            opta_Telefono1: ['', Validators.required],
            opta_Telefono2: [''],
            civi_Id: ['', Validators.required],
            tisa_Id: ['', Validators.required],
            muni_Id: ['', Validators.required],
            cafr_Id: ['', Validators.required],
        });

        this.tipoSangreService.Listar().subscribe(
            (response) => {
                this.tipossangre = response; // Asignar la lista de tipos de sangre
            },
            (error) => {
                console.error('Error al cargar los tipos de sangre:', error);
            }
        );

        this.estadoCivilService.Listar().subscribe(
            (response) => {
                this.estadosciviles = response; // Asignar la lista de estados civiles
            },
            (error) => {
                console.error('Error al cargar los estados civiles:', error);
            }
        );
    }

    siguiente() {
        this.IndexTab = (this.IndexTab === 2) ? 0 : this.IndexTab + 1;
    }

    anterior() {
        this.IndexTab = (this.IndexTab === 0) ? 2 : this.IndexTab - 1;
    }

    subirImagen(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    guardar() {
        if (this.optanteForm.valid) {
          this.optanteService
            .registrarOptante(this.optanteForm.value)
            .subscribe(
              (response) => console.log('Registrado:', response),
              (error) => console.error('Error:', error)
            );
        } else {
          console.error('Formulario inválido');
        }
      }
}
