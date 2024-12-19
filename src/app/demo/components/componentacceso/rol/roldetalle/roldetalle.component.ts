import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modulo } from 'src/app/demo/models/modelsacceso/moduloviewmodel';
import { moduloService } from 'src/app/demo/service/serviceacceso/modulo.service';
import { moduloPorRolService } from 'src/app/demo/service/serviceacceso/moduloporrol.service';
import { rolService } from 'src/app/demo/service/serviceacceso/rol.service';

@Component({
    selector: 'acceso-rol-roldetalle',
    templateUrl: './roldetalle.component.html',
    styleUrls: ['../rol.component.scss']
})
export class RolDetalleComponent implements OnInit {

    roleId: number | null | undefined;
    rol: any; // Variable para guardar los detalles del rol
    modulosRol: modulo[] = []; // Módulos asociados al rol

    cargando: boolean = false; // Para manejar un spinner de carga

    constructor(
        private moduloService: moduloService,
        private moduloPorRolService: moduloPorRolService,
        private rolService: rolService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.cargando = true;
    
        this.roleId = this.rolService.getRoleId();
        console.log('Role ID:', this.roleId);
    
        if (this.roleId) {
            this.obtenerDetallesRol();
            this.cargarModulosPorRol();
        } 
    }

    cargarModulosPorRol() {
        // Obtener todos los módulos
        this.moduloService.Listar().subscribe({
            next: (todosLosModulos: modulo[]) => {
                // Obtener los módulos asociados al rol
                this.moduloPorRolService.Buscar(this.roleId!).subscribe({
                    next: (modulosPorRol: any[]) => {
                        const modulosAsociadosIds = modulosPorRol.map(m => m.modu_Id); // IDs de módulos asociados al rol
                        this.modulosRol = todosLosModulos.filter(modulo => 
                            modulosAsociadosIds.includes(modulo.modu_Id)
                        );
                        console.log('Módulos asociados al rol:', this.modulosRol);
                        this.cargando = false;
                    },
                    error: () => {
                        console.error('Error al obtener módulos por rol.');
                        this.cargando = false;
                    }
                });
            },
            error: () => {
                console.error('Error al listar todos los módulos.');
                this.cargando = false;
            }
        });
    }
    
    regresar() {
        // Limpiar el ID del rol al salir del componente
        this.rolService.clearRoleId();
        this.router.navigate(['/acceso/rol']);
    }

    obtenerDetallesRol() {
        this.rolService.Buscar(this.roleId!).subscribe({
            next: (rol: any) => {
                this.rol = rol;
                console.log('Detalles del rol:', this.rol);
                this.cargando = false;
            },
            error: () => {
                console.error('Error al obtener detalles del rol.');
                this.cargando = false;
            }
        });
    }
    
}
