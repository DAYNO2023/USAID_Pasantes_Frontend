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
import { proyectoService } from 'src/app/demo/service/servicegestion/proyecto.service';

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
    proyectos: any[] = [];
    filtradoProyectos: any[] = [];
    seleccionadoProyecto: any;
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

    enviado: boolean = false;

    //FECHAS
    fechaMinima!: Date;
    fechaMaxima!: Date;
    fechaPorDefecto!: Date;
    anioRango!: string;

    constructor(
        private messageService: MessageService,
        private optanteService: optanteService,
        private tipoSangreService: tipoSangreService,
        private estadoCivilService: estadoCivilService,
        private proyectoService: proyectoService,
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
                [
                    Validators.required,
                    Validators.pattern(
                        /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov)$/i
                    ),
                ],
            ],
            opta_Nombres: [
                '',
                Validators.required,
                Validators.pattern('^[a-zA-ZñÑ\\s]+$'),
            ],
            opta_Apellidos: [
                '',
                Validators.required,
                Validators.pattern('^[a-zA-ZñÑ\\s]+$'),
            ],
            opta_FechaNacimiento: ['', Validators.required],
            opta_Sexo: ['F'],
            opta_Direccion: ['', Validators.required],
            opta_Telefono1: ['', Validators.required],
            opta_Telefono2: [''],
            civi_Id: [null, Validators.required],
            tisa_Id: [null, Validators.required],
            muni_Id: ['', Validators.required],
            cafr_Id: [null, Validators.required],
            prco_Id: [null, Validators.required],
        });
    }

    ngOnInit() {
        //AUTOCOMPLETES
        this.tipoSangreService.Listar().subscribe(
            (response) => {
                this.tiposSangre = response; // Asignar la lista de tipos de sangre
                console.log(this.tiposSangre);
            }
        );
        this.estadoCivilService.Listar().subscribe(
            (response) => {
                this.estadosCiviles = response;
            }
        );
        this.proyectoService.Listar().subscribe(
            (response) => {
                this.proyectos = response;
            }
        );
        this.departamentoService.Listar().subscribe(
            (response) => {
                this.departamentos = response;
            }
        );
        this.universidadService.Listar().subscribe(
            (response) => {
                this.universidades = response;
            }
        );

        //RANGO PARA FECHA DE NACIMIENTO
        const currentYear = new Date().getFullYear();
        const today = new Date();

        // Establecer fecha mínima y máxima
        this.fechaMinima = new Date(currentYear - 30, 0, 1); // 30 años atrás (1 de enero)
        this.fechaMaxima = new Date(currentYear - 18, 11, 31); // 18 años atrás (31 de diciembre)

        // Fecha por defecto para mostrar al abrir el calendario
        this.fechaPorDefecto = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        ); // 18 años atrás mismo mes y día

        // Rango de años para el selector de años
        this.anioRango = `${currentYear - 30}:${currentYear - 18}`;
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
    filtroProyecto(event: any) {
        const query = event.query.toLowerCase();
        this.filtradoProyectos = this.proyectos.filter((proyecto) =>
            proyecto.pryt_DescripcionProyecto.toLowerCase().includes(query)
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

        if (facultadSeleccionada) {
            this.carreraService
                .ListarPorFacultadPorRegional(facultadSeleccionada)
                .subscribe(
                    (response) => {
                        this.carreras = response;
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
    limpiarTipoSangre() {
        this.seleccionadoTipoSangre = null;
        this.optanteForm.controls['tisa_Id'].setValue(null); // Reiniciar valor en el formulario
    }
    limpiarEstadoCivil() {
        this.seleccionadoEstadoCivil = null;
        this.optanteForm.
        controls['civi_Id'].setValue(null);
    }
    limpiarProyecto() {
        this.seleccionadoProyecto = null;
        this.optanteForm.controls['prco_Id'].setValue(null);
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

    //VALIDACIONES:
    ValidarTexto(event: KeyboardEvent) {
        const inputElement = event.target as HTMLInputElement;
        const key = event.key;
    
        // Permitir letras (incluyendo ñ y acentos), espacios y teclas especiales
        if (
            !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key) &&
            key !== 'Backspace' &&
            key !== 'Tab' &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight'
        ) {
            event.preventDefault();
            return;
        }
    
        // Evitar espacio inicial
        if (key === ' ' && inputElement.selectionStart === 0) {
            event.preventDefault();
        }
    }
    permitirSoloLetras(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        let texto = inputElement.value;
    
        // Limitar a solo letras, espacios y caracteres especiales válidos
        texto = texto
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') // Eliminar caracteres no válidos
            .replace(/\s{2,}/g, ' ') // Evitar múltiples espacios consecutivos
            .replace(/^\s/, ''); // Evitar espacio al inicio
    
        // Obtener el nombre del control basado en el atributo formControlName
        const controlName = inputElement.getAttribute('formControlName');
        if (controlName) {
            inputElement.value = texto;
            this.optanteForm.controls[controlName].setValue(texto);
        }
    }
        
    ValidarNumeros(event: KeyboardEvent) {
        const key = event.key;

        // Permitir solo números y teclas especiales como backspace, tab, flechas
        if (
            !/^\d$/.test(key) &&
            key !== 'Backspace' &&
            key !== 'Tab' &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight'
        ) {
            event.preventDefault();
        }
    }
    permitirSoloNumeros(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const texto = inputElement.value;

        // Permitir solo números
        inputElement.value = texto.replace(/[^0-9]/g, '');

        // Limitar a 13 caracteres
        if (inputElement.value.length > 13) {
            inputElement.value = inputElement.value.substring(0, 13);
        }

        // Actualizar el FormControl correspondiente
        const controlName = inputElement.getAttribute('formControlName');
        if (controlName) {
            this.optanteForm.controls[controlName].setValue(inputElement.value);
        }
    }
    ValidarCorreo(event: KeyboardEvent) {
        const inputElement = event.target as HTMLInputElement;
        const key = event.key;

        // Permitir letras, números, @, ., -, _, y teclas especiales como backspace y flechas
        if (
            !/^[a-zA-Z0-9@._-]+$/.test(key) &&
            key !== 'Backspace' &&
            key !== 'Tab' &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight'
        ) {
            event.preventDefault();
            return;
        }

        const cursorPos = inputElement.selectionStart || 0;

        // Prevenir múltiples @
        if (key === '@' && inputElement.value.includes('@')) {
            event.preventDefault();
            return;
        }

        // Prevenir múltiples puntos consecutivos
        if (
            key === '.' &&
            (inputElement.value[cursorPos - 1] === '.' ||
                inputElement.value[cursorPos] === '.')
        ) {
            event.preventDefault();
            return;
        }

        // Prevenir más de un punto en el dominio después del @
        if (key === '.' && inputElement.value.includes('@')) {
            const afterAt = inputElement.value.split('@')[1] || '';
            if (
                afterAt.includes('.') &&
                cursorPos > inputElement.value.indexOf('@')
            ) {
                event.preventDefault();
                return;
            }
        }

        // Evitar que inicie con un punto o punto inmediatamente después de @
        if (
            (key === '.' && cursorPos === 0) ||
            (key === '.' && inputElement.value[cursorPos - 1] === '@')
        ) {
            event.preventDefault();
            return;
        }
    }
    permitirFormatoCorreo(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        let texto = inputElement.value;

        // Eliminar caracteres inválidos
        texto = texto.replace(/[^a-zA-Z0-9@._-]/g, '');

        // Asegurar un solo @
        const partes = texto.split('@');
        if (partes.length > 2) {
            texto = partes[0] + '@' + partes.slice(1).join('');
        }

        // Asegurar que no existan puntos consecutivos
        texto = texto.replace(/\.{2,}/g, '.');

        // Prevenir punto inmediatamente después de @ o al inicio
        texto = texto.replace(/@\.|^\./g, '');

        // Actualizar el valor visual y el FormControl
        inputElement.value = texto;
        const controlName = inputElement.getAttribute('formControlName');
        if (controlName) {
            this.optanteForm.controls[controlName].setValue(texto);
        }
    }
    validarDireccion(event: KeyboardEvent) {
        const inputElement = event.target as HTMLInputElement;
        const key = event.key;
    
        // Permitir letras, números, espacios, y caracteres válidos en direcciones
        if (
            !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]$/.test(key) &&
            key !== 'Backspace' &&
            key !== 'Tab' &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight'
        ) {
            event.preventDefault();
            return;
        }
    
        // Prevenir caracteres consecutivos repetidos (##, .., etc.)
        const cursorPos = inputElement.selectionStart || 0;
        const previousChar = inputElement.value[cursorPos - 1];
        if (key === previousChar && /[.,#-]/.test(key)) {
            event.preventDefault();
        }
    }
    permitirFormatoDireccion(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        let texto = inputElement.value;
    
        // Permitir solo caracteres válidos
        texto = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]/g, '');
    
        // Prevenir múltiples espacios consecutivos
        texto = texto.replace(/\s{2,}/g, ' ');
    
        // Prevenir caracteres consecutivos repetidos (##, .., etc.)
        texto = texto.replace(/([.,#-])\1+/g, '$1');
    
        // Evitar espacio al inicio
        texto = texto.replace(/^\s/, '');
    
        // Actualizar el valor visual y el FormControl
        inputElement.value = texto;
        const controlName = inputElement.getAttribute('formControlName');
        if (controlName) {
            this.optanteForm.controls[controlName].setValue(texto);
        }
    }

    //IMAGEN SUBIR
    seleccionarImagen(event: any): void {
        const archivo: File = event.files[0]; // Obtenemos el primer archivo
    
        if (!archivo) {
            return;
        }
    
        // Verifica si el archivo es una imagen
        if (!archivo.type.startsWith('image/')) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Solo se permiten archivos de imagen.',
                life: 3000,
            });
    
            // Limpia el archivo subido sin modificar directamente el `FileList`
            event.originalEvent.target.value = ''; // Limpia el input de archivo
            return;
        }
    
        // Verificar que el tamaño del archivo no exceda 10 MB
        const MAX_TAMANIO_MB = 10 * 1024 * 1024;
        if (archivo.size > MAX_TAMANIO_MB) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El tamaño máximo permitido es de 10 MB.',
                life: 3000,
            });
    
            // Limpia el archivo subido
            event.originalEvent.target.value = ''; // Limpia el input de archivo
            return;
        }
    
        const lector = new FileReader();
        lector.onload = (e: any) => {
            const imageUrl = e.target.result;
    
            // Redimensionar y guardar la imagen
            this.redimensionandoImagen(
                imageUrl,
                archivo.type,
                (redimensionarImagenUrl) => {
                    this.optanteForm
                        .get('opta_Imagen')
                        ?.setValue(redimensionarImagenUrl);
                }
            );
        };
    
        lector.readAsDataURL(archivo); // Cargar la imagen
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
        this.enviado = true;
        const formData = { ...this.optanteForm.value };

        // Asegurarse de que la fecha se transforme a formato ISO (YYYY-MM-DD)
        if (formData.opta_FechaNacimiento) {
            const fecha = new Date(formData.opta_FechaNacimiento);
            formData.opta_FechaNacimiento = fecha.toISOString().split('T')[0]; // Solo la fecha (sin hora)
        }

        formData.opta_Imagen = 'imagen.png';
        console.log(formData); // Verificar cómo queda el objeto antes de enviarlo
        console.log(this.optanteForm);

        if (this.optanteForm.valid) {
            this.optanteService
                .registrarOptante(formData) // Enviar el objeto transformado
                .subscribe(
                    (response) => {
                        // Validar si la operación fue exitosa según la respuesta
                        if (
                            response &&
                            response.code === 200 &&
                            response.success
                        ) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Éxito',
                                detail: 'Operación completada exitosamente.',
                                life: 3000,
                            });
                            this.ngOnInit(); // Recarga los datos
                        } else {
                            // Manejar respuestas inesperadas
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail:
                                    response.message || 'Actualización fallida',
                                life: 3000,
                            });
                        }
                    },
                    (error) => {
                        console.error('Error:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Actualización fallida',
                            life: 3000,
                        });
                    }
                );
        }
    }
}
