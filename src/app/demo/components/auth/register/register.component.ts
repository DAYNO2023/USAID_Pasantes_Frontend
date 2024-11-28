import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { tipoSangre } from 'src/app/demo/models/modelsgeneral/tiposangreviewmodel';
import { tipoSangreService } from 'src/app/demo/service/servicegeneral/tiposangre.service';
import { optanteService } from 'src/app/demo/service/servicegestion/optante.service';
import { estadoCivilService } from 'src/app/demo/service/servicegeneral/estadocivil.service';
import { estadoCivil } from 'src/app/demo/models/modelsgeneral/estadocivilviewmodel';
import { departamentoService } from 'src/app/demo/service/servicegeneral/departamento.service';
import { municipioService } from 'src/app/demo/service/servicegeneral/municipio.service';
import { universidadService } from 'src/app/demo/service/servicegeneral/universidad.service';
import { regionalService } from 'src/app/demo/service/servicegeneral/regional.service';
import { facultadService } from 'src/app/demo/service/servicegeneral/facultad.service';
import { carreraService } from 'src/app/demo/service/servicegeneral/carrera.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [MessageService],
})
export class RegisterComponent implements OnInit {
    optanteForm!: FormGroup; // Grupo de controles

    // AUTOCOMPLETES
    tiposSangre: any[] = []; // Lista original de tipos de sangres
    filtradoTiposSangre: any[] = []; // Lista filtrada para autocomplete
    seleccionadoTipoSangre: any; // Tipo de sangre seleccionada
    //
    estadosCiviles: any[] = []; 
    filtradoEstadosCiviles: any[] = []; 
    seleccionadoEstadosCiviles: any; 
    //
    departamentos: any[] = []; 
    filtradoDepartamentos: any[] = []; 
    seleccionadoDepartamentos: any; 
    //
    municipios: any[] = []; 
    filtradoMunicipios: any[] = []; 
    seleccionadoMunicipios: any; 
    //
    universidades: any[] = []; 
    filtradoUniversidades: any[] = []; 
    seleccionadoUniversidades: any; 
    //
    regionales: any[] = []; 
    filtradoRegionales: any[] = []; 
    seleccionadoRegionales: any; 
    //
    facultades: any[] = []; 
    filtradoFacultades: any[] = []; 
    seleccionadoFacultades: any; 
    //
    carreras: any[] = []; 
    filtradoCarreras: any[] = []; 
    seleccionadoCarreras: any; 

    routeItems: MenuItem[] = [];
    IndexTab: number = 0;

    uploadedFiles: any[] = [];

    constructor(
        private messageService: MessageService,
        private optanteService: optanteService,
        private tipoSangreService: tipoSangreService,
        private estadoCivilService: estadoCivilService,
        private departamentoService: departamentoService,
        private municipioService: municipioService,
        private universidadService: universidadService,
        private regionalService: regionalService,
        private facultadService: facultadService,
        private carreraService: carreraService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.optanteForm = this.fb.group({
            opta_DNI: ['', Validators.required],
            opta_Imagen: ['', Validators.required],
            opta_CorreoElectronico: [
                '',
                [Validators.required, Validators.email],
            ],
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

        //AUTOCOMPLETES
        this.tipoSangreService.Listar().subscribe(
            (response) => {
                this.tiposSangre = response; // Asignar la lista de tipos de sangre
            },
            (error) => {
                console.error('Error al cargar los tipos de sangre:', error);
            }
        );
        this.estadoCivilService.Listar().subscribe(
            (response) => {
                this.estadosCiviles = response; 
            },
            (error) => {
                console.error('Error al cargar los estados civiles:', error);
            }
        );
        this.departamentoService.Listar().subscribe(
            (response) => {
                this.estadosCiviles = response; 
            },
            (error) => {
                console.error('Error al cargar los departamentos:', error);
            }
        );

    }

    siguiente() {
        this.IndexTab = this.IndexTab === 2 ? 0 : this.IndexTab + 1;
    }

    anterior() {
        this.IndexTab = this.IndexTab === 0 ? 2 : this.IndexTab - 1;
    }

    //FILTRADO AUTOCOMPLETES
    filtroTipoSangre(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoEstadosCiviles = this.tiposSangre.filter((tipo) =>
            tipo.tisa_Descripcion
                .toLowerCase()
                .includes(query)
        );
    }
    filtroEstadoCivil(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoEstadosCiviles = this.estadosCiviles.filter((estado) =>
            estado.civi_DescripcionEstadoCivil
                .toLowerCase()
                .includes(query)
        );
    }
    filtroDepartamento(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoDepartamentos = this.departamentos.filter((departamento) =>
            departamento.depa_DescripcionDepartamento
                .toLowerCase()
                .includes(query)
        );
    }
    

    subirImagen(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
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
