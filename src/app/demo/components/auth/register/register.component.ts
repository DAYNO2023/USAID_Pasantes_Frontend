import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    optanteForm: FormGroup; // Grupo de controles

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
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
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
            opta_Sexo: ['f'],
            opta_Direccion: ['', Validators.required],
            opta_Telefono1: ['', Validators.required],
            opta_Telefono2: [''],
            civi_Id: ['', Validators.required],
            tisa_Id: ['', Validators.required],
            muni_Id: ['', Validators.required],
            cafr_Id: ['', Validators.required],
        });
    }

    ngOnInit() {
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

    //METODOS PARA LIMIAR AUTOCOMPLETES
    limpiarEstadoCivil() {
        this.seleccionadoEstadoCivil = null;
        this.optanteForm.controls['civi_Id'].setValue(null); // Reiniciar valor en el formulario
    }
    limpiarTipoSangre() {
        this.seleccionadoTipoSangre = null;
        this.optanteForm.controls['tisa_Id'].setValue(null);
    }
    limpiarDepartamento() {
        // Resetear selección de departamentos y municipios
        this.seleccionadoDepartamento = null;
        this.municipios = [];
        this.filtradoMunicipios = [];
        this.seleccionadoMunicipio = null;
        this.optanteForm.controls['muni_Id'].setValue(null);
    }
    limpiarMunicipio() {
        this.seleccionadoMunicipio = null;
        this.optanteForm.controls['muni_Id'].setValue(null);
    }
    limpiarUniversidad() {
        this.seleccionadoUniversidad = null;
        this.regionales = [];
        this.facultades = [];
        this.carreras = [];
        this.filtradoRegionales = [];
        this.filtradoFacultades = [];
        this.filtradoCarreras = [];
        this.seleccionadoRegional = null;
        this.seleccionadoFacultad = null;
        this.seleccionadoCarrera = null;
        this.optanteForm.controls['cafr_Id'].setValue(null);
    }
    limpiarRegional() {
        this.seleccionadoRegional = null;
        this.facultades = [];
        this.carreras = [];
        this.filtradoFacultades = [];
        this.filtradoCarreras = [];
        this.seleccionadoFacultad = null;
        this.seleccionadoCarrera = null;
        this.optanteForm.controls['cafr_Id'].setValue(null);
    }
    limpiarFacultad() {
        this.seleccionadoFacultad = null;
        this.carreras = [];
        this.filtradoCarreras = [];
        this.seleccionadoCarrera = null;
        this.optanteForm.controls['cafr_Id'].setValue(null);
    }
    limpiarCarrera() {
        this.seleccionadoMunicipio = null;
        this.optanteForm.controls['muni_Id'].setValue(null);
    }

    seleccionarImagen(event: any): void {
        const archivo: File = event.files[0]; 

        if (!archivo) {
            return;
        }

        // Verifica si el archivo is una imagen
        if (!archivo.type.startsWith('image/')) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Solo se permiten archivos de imagen.',
                life: 3000,
            });
            event.files = [];
            return;
        }

        if (archivo.name.length > 260) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'El nombre del archivo excede el límite de 260 caracteres.',
                life: 3000,
                styleClass: 'iziToast-custom',
            });
            event.files = [];
            return;
        }

        const tamanoOriginal = archivo.size;

        const lector = new FileReader();
        lector.onload = (e: any) => {
            const imageUrl = e.target.result;

            this.redimensionandoImagen(imageUrl, archivo.type, (redimencionarImagenUrl) => {
                this.dataUrlaBlob(redimencionarImagenUrl, (blob) => {
                    const tamanoRedimensionado = blob.size;

                    if (tamanoRedimensionado < tamanoOriginal) {
                        console.log(
                            'La imagen redimensionada es más pequeña que la original.'
                        );
                    } else {
                        console.log(
                            'La imagen redimensionada no es más pequeña que la original.'
                        );
                    }

                    this.optanteForm
                        .get('opta_Imagen')
                        ?.setValue(redimencionarImagenUrl);
                });
            });
        };

        lector.readAsDataURL(archivo);
    }

    redimensionandoImagen(
        imageUrl: string,
        mimeType: string,
        callback: (redimencionarImagenUrl: string) => void
    ) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const MAX_WIDTH = 620;
                const escala = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * escala;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const redimencionarImagenUrl = canvas.toDataURL(mimeType, 0.6);
                callback(redimencionarImagenUrl);
            }
        };
        img.src = imageUrl;
    }

    dataUrlaBlob(dataUrl: string, callback: (blob: Blob) => void) {
        const [header, base64] = dataUrl.split(',');
        const mime = header.match(/:(.*?);/)?.[1];
        const binario = atob(base64);
        const array = [];
        for (let i = 0; i < binario.length; i++) {
            array.push(binario.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], { type: mime });
        callback(blob);
    }

    //Funcion para limpiar el contenedor imagen
    eliminarImagen(event: any): void {
        this.optanteForm.get('opta_Imagen')?.setValue(null);
        const archivoSubir = document.getElementById('p-fileupload') as any;
        if (archivoSubir && archivoSubir.clear) {
            archivoSubir.clear();
        }

        this.cdr.detectChanges();
    }

    guardar() {
        const formData = { ...this.optanteForm.value };

        // Asegurarse de que la fecha se transforme a formato ISO (YYYY-MM-DD)
        if (formData.opta_FechaNacimiento) {
            const fecha = new Date(formData.opta_FechaNacimiento);
            formData.opta_FechaNacimiento = fecha.toISOString().split('T')[0]; // Solo la fecha (sin hora)
        }

        console.log(formData); // Verificar cómo queda el objeto antes de enviarlo

        if (this.optanteForm.valid) {
            this.optanteService
                .registrarOptante(formData) // Enviar el objeto transformado
                .subscribe(
                    (response) => console.log('Registrado:', response),
                    (error) => console.error('Error:', error)
                );
        } else {
            console.error('Formulario inválido');
        }
    }
}
