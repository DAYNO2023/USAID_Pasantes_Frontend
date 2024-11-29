import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { tipoSangreService } from 'src/app/demo/service/servicegeneral/tiposangre.service';
import { optanteService } from 'src/app/demo/service/servicegestion/optante.service';
import { estadoCivilService } from 'src/app/demo/service/servicegeneral/estadocivil.service';
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
    //continuacion autocompletes:
    estadosCiviles: any[] = [];
    filtradoEstadosCiviles: any[] = [];
    seleccionadoEstadoCivil: any;
    departamentos: any[] = [];
    filtradoDepartamentos: any[] = [];
    seleccionadoDepartamento: any;
    municipios: any[] = [];
    filtradoMunicipios: any[] = [];
    seleccionadoMunicipio: any;
    universidades: any[] = [];
    filtradoUniversidades: any[] = [];
    seleccionadoUniversidad: any;
    regionales: any[] = [];
    filtradoRegionales: any[] = [];
    seleccionadoRegional: any;
    facultades: any[] = [];
    filtradoFacultades: any[] = [];
    seleccionadoFacultad: any;
    carreras: any[] = [];
    filtradoCarreras: any[] = [];
    seleccionadoCarrera: any;

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
                console.log(this.tiposSangre);
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
                this.departamentos = response;
            },
            (error) => {
                console.error('Error al cargar los departamentos:', error);
            }
        );
        this.universidadService.Listar().subscribe(
            (response) => {
                this.universidades = response;
            },
            (error) => {
                console.error('Error al cargar las universidades:', error);
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
        this.filtradoTiposSangre = this.tiposSangre.filter((tipo) =>
            tipo.tisa_Descripcion.toLowerCase().includes(query)
        );
    }
    filtroEstadoCivil(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoEstadosCiviles = this.estadosCiviles.filter((estado) =>
            estado.civi_DescripcionEstadoCivil.toLowerCase().includes(query)
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
    seleccionandoDepartamento(event: any) {
        const departamentoSeleccionado = event?.value?.depa_Id;

        if (departamentoSeleccionado) {
            this.municipioService
                .ListarPorDepartamento(departamentoSeleccionado)
                .subscribe(
                    (response) => {
                        this.municipios = response;
                        this.filtradoMunicipios = [];
                        this.optanteForm.controls['muni_Id'].setValue(null); // Reiniciar municipio seleccionado
                    },
                    (error) => {
                        console.error('Error al cargar los municipios:', error);
                    }
                );
        } else {
            console.warn('No se seleccionó un departamento válido');
            this.municipios = [];
            this.filtradoMunicipios = [];
        }
    }
    filtroMunicipio(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoMunicipios = this.municipios.filter((municipio) =>
            municipio.muni_DescripcionMunicipio.toLowerCase().includes(query)
        );
    }
    filtroUniversidad(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoUniversidades = this.universidades.filter((universidad) =>
            universidad.univ_DescripcionUniversidad
                .toLowerCase()
                .includes(query)
        );
    }
    seleccionandoUniversidad(event: any) {
        const universidadSeleccionada = event?.value?.univ_Id;

        if (universidadSeleccionada) {
            this.regionalService
                .ListarPorUniversidad(universidadSeleccionada)
                .subscribe(
                    (response) => {
                        this.regionales = response;
                        this.filtradoRegionales = [];
                        this.facultades = [];
                        this.carreras = [];
                        this.filtradoFacultades = [];
                        this.filtradoCarreras = [];
                    },
                    (error) => {
                        console.error('Error al cargar las regionales:', error);
                    }
                );
        } else {
            console.warn('No se seleccionó una universidad válida');
            this.regionales = [];
            this.facultades = [];
            this.carreras = [];
            this.filtradoRegionales = [];
            this.filtradoFacultades = [];
            this.filtradoCarreras = [];
        }
    }
    filtroRegional(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoRegionales = this.regionales.filter((regional) =>
            regional.regi_DescripcionRegional.toLowerCase().includes(query)
        );
    }
    seleccionandoRegional(event: any) {
        const regionalSeleccionada = event?.value?.regi_Id;

        if (regionalSeleccionada) {
            this.facultadService
                .ListarPorRegional(regionalSeleccionada)
                .subscribe(
                    (response) => {
                        this.facultades = response;
                        this.filtradoFacultades = [];
                        this.carreras = [];
                        this.filtradoCarreras = [];
                    },
                    (error) => {
                        console.error('Error al cargar las facultades:', error);
                    }
                );
        } else {
            this.facultades = [];
            this.carreras = [];
            this.filtradoFacultades = [];
            this.filtradoCarreras = [];
        }
    }
    filtroFacultad(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoFacultades = this.facultades.filter((facultad) =>
            facultad.facu_DesripcionFacultad.toLowerCase().includes(query)
        );
    }
    seleccionandoFacultad(event: any) {
        const facultadSeleccionada = event?.value?.fare_Id;
        console.log(event);

        if (facultadSeleccionada) {
            this.carreraService
                .ListarPorFacultadPorRegional(facultadSeleccionada)
                .subscribe(
                    (response) => {
                        this.carreras = response;
                        console.log(this.carreras);
                        this.filtradoCarreras = [];
                    },
                    (error) => {
                        console.error('Error al cargar las carreras:', error);
                    }
                );
        } else {
            this.carreras = [];
            this.filtradoCarreras = [];
        }
    }
    filtroCarrera(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoCarreras = this.carreras.filter((carrera) =>
            carrera.carr_DescripcionCarrera.toLowerCase().includes(query)
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
