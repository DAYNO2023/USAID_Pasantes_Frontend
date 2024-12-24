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
    selector: 'acceso-rol-roleditar',
    templateUrl: './roleditar.component.html',
    styleUrls: ['./roleditar.component.scss'],
    providers: [MessageService],
})
export class RolEditarComponent implements OnInit {
    actualizarForm: FormGroup; // Grupo de controles
    enviado: boolean = false;
    rolYaRegistrado: boolean = false;

    modulos: TreeNode[] = [];
    modulosSeleccionados: TreeNode | TreeNode[] | any = [] ;

    roleId: number | null | undefined;

    constructor(
        private moduloService: moduloService,
        private moduloPorRolService: moduloPorRolService,
        private rolService: rolService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.actualizarForm = this.fb.group({
            role_DescripcionRol: [
                null,
                [Validators.required, Validators.pattern('^[a-zA-ZñÑ\\s]+$')],
            ],
            role_UsuarioModificacion: [null],
        });
    }

    ngOnInit(): void {
        // this.loading = true;
    
        this.roleId = this.rolService.getRoleId();
    
        if (this.roleId) {
            this.rolService.Buscar(this.roleId).subscribe({
                next: (rol: any) => {
                    this.actualizarForm.patchValue({
                        role_DescripcionRol: rol.role_DescripcionRol
                    });
                }
            });
            this.cargarModulos();
        } 
        // Limpia el estado después de usarlo
    }

    cargarModulos() {
        this.moduloService.Listar().subscribe({
            next: (modulos: modulo[]) => {
                this.modulos = this.transformarModulos(modulos);
                this.seleccionarModulos(); // Llamar después de cargar los módulos
            }
        });
    }

    seleccionarModulos() {
        this.moduloPorRolService.Buscar(this.roleId!).subscribe({
            next: (modulosPorRol: any[]) => {
                const modulosSeleccionadosKeys = modulosPorRol.map(m => m.modu_Id.toString()); // Extraer los IDs como strings
                console.log('mpdulos selecc', modulosSeleccionadosKeys)
                this.marcarModulosSeleccionados(this.modulos, modulosSeleccionadosKeys);
            },
            error: (error) => {
                console.error('Error al obtener módulos por rol:', error);
            }
        });
    }

    marcarModulosSeleccionados(nodos: TreeNode[], keysSeleccionados: string[]) {
        nodos.forEach((nodo) => {
            // Si el nodo actual tiene una key en la lista, se selecciona
            if (keysSeleccionados.includes(nodo.key!)) {
                if (!this.modulosSeleccionados.includes(nodo)) {
                    this.modulosSeleccionados.push(nodo);
                }
            }
    
            // Si tiene hijos, recursivamente verifica y selecciona
            if (nodo.children && nodo.children.length > 0) {
                this.marcarModulosSeleccionados(nodo.children, keysSeleccionados);
            }
        });
    
        // Después de marcar los nodos, forzar la propagación de la selección hacia arriba
        this.propagateSelectionUp(nodos);
    }

    propagateSelectionUp(nodos: TreeNode[]) {
        nodos.forEach((nodo) => {
            if (nodo.children && nodo.children.length > 0) {
                const todosSeleccionados = nodo.children.every((hijo) =>
                    this.modulosSeleccionados.includes(hijo)
                );
    
                const algunoSeleccionado = nodo.children.some((hijo) =>
                    this.modulosSeleccionados.includes(hijo)
                );
    
                if (todosSeleccionados) {
                    if (!this.modulosSeleccionados.includes(nodo)) {
                        this.modulosSeleccionados = [...this.modulosSeleccionados, nodo];
                    }
                    nodo.partialSelected = false; // No está en estado indeterminado
                } else if (algunoSeleccionado) {
                    nodo.partialSelected = true; // Estado indeterminado
                } else {
                    nodo.partialSelected = false;
                    this.modulosSeleccionados = this.modulosSeleccionados.filter(
                        (item: TreeNode<any>) => item !== nodo
                    );
                }
            }
    
            // Detener la recursión si no hay más padres
            if (nodo.parent) {
                this.propagateSelectionUp([nodo.parent]);
            }
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
                        expanded: true,
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
                expanded: true,
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

    actualizarModulosPorRol() {
        // Convertir los módulos seleccionados en un arreglo de IDs
        const modulosSeleccionadosIds = this.modulosSeleccionados
            .map((modulo: any): number => parseInt(modulo.key, 10)) // Especificar el tipo explícitamente
            .filter((id: number) => !isNaN(id) && id !== 0); // Filtrar IDs no válidos y el ID 0 (nodo raíz)

        // Construir el objeto `moduloPorRol`
        const moduloPorRol: moduloPorRol = {
            role_Id: this.roleId!,
            modulos: modulosSeleccionadosIds, // Pasar el arreglo de números
        };

        // Llamar al servicio para actualizar los módulos por rol
        this.moduloPorRolService.Actualizar(moduloPorRol).subscribe({
            next: (response) => {
                console.log('qepaso', response);
                if (response?.code === 200 && response?.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Rol actualizado exitosamente.',
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
        // Limpiar el formulario
        this.actualizarForm.reset();
    
        // Limpiar el treeview
        this.modulosSeleccionados = [];
        this.rolService.clearRoleId();
        this.router.navigate(['/USAID//acceso/rol']);
    }
    

    actualizar() {
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

        const formData = { ...this.actualizarForm.value };
        if(formData.role_DescripcionRol == null)
            return;

        formData.role_Id = this.roleId;
        formData.role_UsuarioModificacion = 1;
        console.log(formData);

        this.rolService.Actualizar(formData).subscribe({
            next: (response) => {
                if (response?.code === 200 && response?.success) {

                    // Llama a un método para actualizar los módulos seleccionados para el rol
                    this.actualizarModulosPorRol();
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
