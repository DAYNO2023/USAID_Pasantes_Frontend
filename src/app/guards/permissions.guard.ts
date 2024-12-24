import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      console.error('No se encontraron datos de usuario en sessionStorage.');
      this.router.navigate(['/auth/login']); // Redirigir al login si no está autenticado
      return false;
    }

    const parsedData = JSON.parse(userData);
    const modulos = parsedData.modulos;

    // Validar si el usuario tiene acceso a la URL completa
    const requestedUrl = state.url.startsWith('/') ? state.url : `/${state.url}`; // Asegura que la URL comience con '/'
    const tieneAcceso = modulos.some(
      (modulo: any) =>
        modulo.modu_UrlModulo &&
        requestedUrl.startsWith(modulo.modu_UrlModulo)
    );

    if (!tieneAcceso) {
      console.warn(`Acceso denegado a la URL: ${requestedUrl}`);
      this.router.navigate(['/notfound']); // Redirigir a una página de acceso denegado
      return false;
    }

    return true; // Permitir acceso si tiene el módulo
  }
}
