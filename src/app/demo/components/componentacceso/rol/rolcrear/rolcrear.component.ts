import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { moduloPorRol } from 'src/app/demo/models/modelsacceso/moduloporrolviewmodel';
import { modulo } from 'src/app/demo/models/modelsacceso/moduloviewmodel';
import { moduloService } from 'src/app/demo/service/serviceacceso/modulo.service';
import { moduloPorRolService } from 'src/app/demo/service/serviceacceso/moduloporrol.service';
import { rolService } from 'src/app/demo/service/serviceacceso/rol.service';

@Component({
    selector: 'acceso-rol-rolcrear',
    templateUrl: './rolcrear.component.html',
    styleUrls: ['./rolcrear.component.scss'],
    providers: [MessageService],
})
export class RolCrearComponent implements OnInit {
    insertarForm: FormGroup; // Grupo de controles
    enviado: boolean = false;
    rolYaRegistrado: boolean = false;

    modulos: TreeNode[] = [];
    modulosSeleccionados: TreeNode | TreeNode[] | any[] | any;

    constructor(
        private moduloService: moduloService,
        private moduloPorRolService: moduloPorRolService,
        private rolService: rolService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.insertarForm = this.fb.group({
            role_DescripcionRol: [
                null,
                [Validators.required, Validators.pattern('^[a-zA-ZñÑ\\s]+$')],
            ],
            role_UsuarioCreacion: [null],
        });
    }

    ngOnInit(): void {
        this.cargarModulos();
    }

    cargarModulos() {
        this.moduloService.Listar().subscribe({
            next: (modulos: modulo[]) => {
                this.modulos = this.transformarModulos(modulos);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los módulos',
                });
            },
        });
    }

    transformarModulos(modulos: modulo[]): TreeNode[] {
        // Crear un mapa para agrupar por título (modu_Titulo)
        const tituloMap: { [key: string]: TreeNode } = {};
        const tituloCount: { [key: string]: number } = {};

        // Contar la cantidad de módulos por título
        modulos.forEach((mod) => {
            const titulo = mod.modu_Titulo || 'Sin Título';
            if (!tituloCount[titulo]) {
                tituloCount[titulo] = 0;
            }
            tituloCount[titulo]++;
        });

        // Crear nodos solo para títulos con más de un módulo
        modulos.forEach((mod) => {
            const titulo = mod.modu_Titulo || 'Sin Título';

            // Solo crear nodos para títulos con más de un módulo
            if (tituloCount[titulo] > 1) {
                if (!tituloMap[titulo]) {
                    // Crear el nodo del título
                    tituloMap[titulo] = {
                        key: titulo, // Key del nodo padre
                        label: titulo, // Nombre del título
                        data: `Título: ${titulo}`, // Información adicional
                        children: [], // Aquí se agregarán los módulos como hijos
                    };
                }

                // Agregar el módulo como hijo del título correspondiente
                tituloMap[titulo].children?.push({
                    key: mod.modu_Id?.toString() || '', // El ID del módulo
                    label: mod.modu_DescripcionModulo || 'Sin Descripción', // Nombre del módulo
                    data: `Módulo: ${mod.modu_DescripcionModulo}`, // Información adicional
                });
            }
        });

        // Crear el nodo raíz con todos los títulos válidos como hijos
        return [
            {
                key: '0', // Nodo raíz
                label: 'Todas', // Etiqueta del nodo raíz
                data: 'Todas las modulos',
                children: Object.values(tituloMap), // Convertir los valores del mapa a un arreglo
            },
        ];
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
            // this.optanteForm.controls[controlName].setValue(texto);
        }
    }

    guardarModulosPorRol(rolId: number) {
        // Convertir los módulos seleccionados en un arreglo de IDs
        const modulosSeleccionadosIds = this.modulosSeleccionados
            .map((modulo: any): number => parseInt(modulo.key, 10)) // Especificar el tipo explícitamente
            .filter((id: number) => !isNaN(id) && id !== 0); // Filtrar IDs no válidos y el ID 0 (nodo raíz)

        // Construir el objeto `moduloPorRol`
        const moduloPorRol: moduloPorRol = {
            role_Id: rolId,
            modulos: modulosSeleccionadosIds, // Pasar el arreglo de números
        };

        console.log('enviando modulos', moduloPorRol);

        // Llamar al servicio para insertar los módulos por rol
        this.moduloPorRolService.Insertar(moduloPorRol).subscribe({
            next: (response) => {
                console.log('qepaso', response);
                if (response?.code === 200 && response?.success) {
                    console.log('inserto bien');
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Rol creado exitosamente.',
                        life: 3000,
                    });

                    setTimeout(() => {
                        this.cancelar();
                    }, 500);
                }
            },
        });
    }

    cancelar() {
        this.enviado = false;
        console.log('entra');

        // Limpiar el formulario
        this.insertarForm.reset();

        // Limpiar el treeview
        this.modulosSeleccionados = [];
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    guardar() {
        this.enviado = true;
        // Verificar si se seleccionaron modulos
        if (
            !this.modulosSeleccionados ||
            this.modulosSeleccionados.length === 0
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar al menos un módulo.',
                life: 3000,
            });
            return;
        }

        const formData = { ...this.insertarForm.value };
        if (formData.role_DescripcionRol == null) return;

        formData.role_UsuarioCreacion = 1;
        console.log(formData);

        this.rolService.Insertar(formData).subscribe({
            next: (response) => {
                if (response?.code === 200 && response?.success) {
                    const rolId = response.data.codeStatus; // ID del rol insertado

                    // Llama a un método para insertar los módulos seleccionados para el rol
                    this.guardarModulosPorRol(rolId);
                } else if (
                    response?.code === 500 &&
                    response?.message === 'Rol ya registrado.'
                ) {
                    this.rolYaRegistrado = true;
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'El rol ya está registrado.',
                        life: 3000,
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Algo salió mal. Comuníquese con un Administrador.',
                        life: 3000,
                    });
                }
            },
            error: (err) => {
                console.error('Error:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Algo salió mal. Comuníquese con un Administrador.',
                    life: 3000,
                });
            },
        });
    }
}
