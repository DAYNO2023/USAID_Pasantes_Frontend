import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Calendario',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/apps/calendar']
                    },
                    {
                        label: 'Hoja de Tiempo',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/apps/calendar']
                    }
                ]
            },
            {
                label: 'Autorizacion',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-unlock',
                        items: [
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Comunicacion',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Encuestas',
                        icon: 'pi pi-fw pi-unlock',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Foros',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Consultores',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Pasantes',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Notificaciones',
                        icon: 'pi pi-fw pi-unlock',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Preguntas Frecuentes',
                        icon: 'pi pi-fw pi-unlock',
                        routerLink: ['/auth/login']
                    }
                ]
            },
            {
                label: 'Mantenimiento',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Administracion',
                        icon: 'pi pi-fw pi-unlock',
                        items: [
                            {
                                label: 'Colaboradores',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Puestos',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Regionales Corporativas',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Generales',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Bancos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Carreras',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Facultades',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Municipios',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Regionales',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Tipos de Documentos',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Tipos de Sangre',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Universidades',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Gestion',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Empresarial',
                        icon: 'pi pi-fw pi-unlock',
                        items: [
                            {
                                label: 'Componentes',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Empresas',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Proyectos',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Optantes',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Voluntariado',
                        icon: 'pi pi-fw pi-unlock',
                        items: [
                            {
                                label: 'Actividades',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Beneficios',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Pasantes',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    
                ]
            },
            {
                label: 'Estadisticas',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Reportes',
                        icon: 'pi pi-fw pi-globe',
                        items: [
                            {
                                label: 'Reportes',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Reportes',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Graficos',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Graficos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Graficos',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    }
                ]
            },
        ];
    }
}
