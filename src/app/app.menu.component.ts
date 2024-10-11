import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="navigation-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `
})
export class AppMenuComponent implements OnInit {

    public model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: '5',
                items: [
                    {label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('blue'); }},
                    {label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('pink'); }},
                    {label: 'Steel', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('steel'); }},
                    {label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('orange'); }},
                    {label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('green'); }},
                    {label: 'Turquoise', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('turquoise'); }},
                    {label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('purple'); }},
                    {label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('cyan'); }},
                ]
            },
            {
                label: 'Layout Colors', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Dark', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('dark'); }},
                    {label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('blue'); }},
                    {label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('pink'); }},
                    {label: 'Steel', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('steel'); }},
                    {label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('orange'); }},
                    {label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('green'); }},
                    {label: 'Turquoise', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('turquoise'); }},
                    {label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('purple'); }},
                    {label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('cyan'); }},
                ]
            },
            {
                label: 'Menu Modes', icon: 'fa fa-fw fa-bars',
                items: [
                    {label: 'Static Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToStaticMenu()},
                    {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToOverlayMenu()},
                    {label: 'Light Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.darkMenu = false},
                    {label: 'Dark Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.darkMenu = true}
                ]
            },
            {
                label: 'Components', icon: 'fa fa-fw fa-sitemap', badge: '2', badgeStyleClass: 'orange-badge', routerLink: ['/components'],
                items: [
                    {label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/components/sample']},
                    {label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/components/forms']},
                    {label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/components/data']},
                    {label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/components/panels']},
                    {label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/components/overlays']},
                    {label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/components/menus']},
                    {label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/components/messages']},
                    {label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/components/charts']},
                    {label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/components/file']},
                    {label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/components/misc']}
                ]
            },
            {label: 'Landing Page', icon: 'fa fa-fw fa-certificate', url: 'assets/pages/landing.html', target: '_blank'},
            {
                label: 'Template Pages', icon: 'fa fa-fw fa-life-saver', routerLink: ['/pages'],
                items: [
                    {label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/pages/empty']},
                    {label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank'},
                    {label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank'},
                    {label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank'},
                    {label: 'Denied Page', icon: 'fa fa-fw fa-exclamation-triangle', url: 'assets/pages/access.html', target: '_blank'}
                ]
            },
            {
                label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
                items: [
                    {
                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    }
                ]
            },
            {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']}
        ];
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const href = 'assets/theme/theme-' + theme + '.css';

        this.replaceLink(themeLink, href);
    }

    changeLayout(layout) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const href = 'assets/layout/css/layout-' + layout + '.css';

        this.replaceLink(layoutLink, href);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }
}
