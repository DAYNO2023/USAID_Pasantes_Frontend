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
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/apps/calenda']
                    }
                ]
            },
            {
                label: 'Autorización',
                items: [
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-unlock',
                        items: [
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/acceso/rol']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Comunicación',
                items: [
                    {
                        label: 'Encuestas',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Foros',
                        icon: 'pi pi-fw pi-comments',
                        items: [
                            {
                                label: 'Consultores',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Pasantes',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Notificaciones',
                        icon: 'pi pi-fw pi-bell',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Preguntas Frecuentes',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/auth/login']
                    }
                ]
            },
            {
                label: 'Mantenimiento',
                items: [
                    {
                        label: 'Administracion',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'Colaboradores',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Puestos',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Regionales Corporativas',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Generales',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Bancos',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Carreras',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-directions',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-heart',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Facultades',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Municipios',
                                icon: 'pi pi-fw pi-map-marker',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Regionales',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Tipos de Documentos',
                                icon: 'pi pi-fw pi-copy',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Tipos de Sangre',
                                icon: 'pi pi-fw pi-ellipsis-v',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Universidades',
                                icon: 'pi pi-fw pi-verified',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Gestion',
                items: [
                    {
                        label: 'Empresarial',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'Componentes',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Empresas',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Proyectos',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Optantes',
                                icon: 'pi pi-fw pi-filter',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    {
                        label: 'Voluntariado',
                        icon: 'pi pi-fw pi-user-plus',
                        items: [
                            {
                                label: 'Actividades',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Beneficios',
                                icon: 'pi pi-fw pi-info',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Pasantes',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/apps/blog/list']
                            }
                        ]
                    },
                    
                ]
            },
            {
                label: 'Estadisticas',
                items: [
                    {
                        label: 'Reportes',
                        icon: 'pi pi-fw pi-file-export',
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
                        icon: 'pi pi-fw pi-chart-line',
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
