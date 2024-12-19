import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { rol } from 'src/app/demo/models/modelsacceso/rolviewmodel';
import { rolService } from 'src/app/demo/service/serviceacceso/rol.service';

@Component({
    selector: 'acceso-rol',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.scss'],
    providers: [MessageService],
})
export class RolComponent implements OnInit {
    roles: rol[] = [];
    selectedRoles: rol[] = [];
    cols: any[] = [];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    selectedRol: rol | null = null; // Rol seleccionado para eliminar
    deleteRolDialog: boolean = false; // Mostrar el diálogo de eliminación

    acciones: MenuItem[] = [];

    constructor(
        private rolService: rolService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.rolService.clearRoleId();

        this.loadRoles();
        this.cols = [
            { field: 'codigo', header: 'Código' },
            { field: 'role_DescripcionRol', header: 'Descripción del Rol' },
            { field: 'acciones', header: 'Acciones' },
        ];
        this.acciones = [
            { 
                label: 'Detalles', 
                icon: 'pi pi-eye', 
                command: () => this.verDetalle(this.selectedRol!) 
            },
            { 
                label: 'Editar', 
                icon: 'pi pi-pencil', 
                command: () => this.editarRol(this.selectedRol!) 
            },
            { 
                label: 'Eliminar', 
                icon: 'pi pi-trash', 
                command: () => this.mostrarDialogoEliminar(this.selectedRol!) 
            }
        ]    
    }
    setSelectedRol(rol: rol) {
        this.selectedRol = rol;
    }

    loadRoles() {
        this.rolService.Listar().subscribe({
            next: (data) => {
                this.roles = data;
            }
        });
    }

    verDetalle(rol: rol) {
        this.rolService.setRoleId(rol.role_Id!);
        this.router.navigate(['/acceso/rol/roldetalle']);
    }

    editarRol(rol: rol) {
        this.rolService.setRoleId(rol.role_Id!);
        this.router.navigate(['/acceso/rol/roleditar']);
    }
    

    mostrarDialogoEliminar(rol: rol) {
        console.log('mostrar', rol);
        this.selectedRol = rol; // Asignar el rol seleccionado
        this.deleteRolDialog = true; // Mostrar el diálogo
    }

    confirmarEliminarRol() {
        console.log(this.selectedRol);
        if (!this.selectedRol) return;

        this.rolService.Eliminar(this.selectedRol.role_Id!).subscribe({
            next: (response) => {
                console.log(response);
                if (response?.code === 200 && response?.success) {
                    this.roles = this.roles.filter(
                        (rol) => rol.role_Id !== this.selectedRol?.role_Id
                    );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Rol eliminado exitosamente.',
                        life: 3000,
                    });
                } else if (response.code === 500 && response.message === 'Rol ya en uso.') {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'El rol está en uso y no puede ser eliminado.',
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

                this.deleteRolDialog = false;
                this.selectedRol = null;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Algo salió mal. Comuníquese con un Administrador.',
                    life: 3000,
                });
                this.deleteRolDialog = false;
                this.selectedRol = null;
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
