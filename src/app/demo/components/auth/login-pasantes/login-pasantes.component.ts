import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Service/serviceacceso/login.service';

@Component({
  templateUrl: './login-pasantes.component.html',
  styleUrls: ['./login-pasantes.component.scss']
})
export class LoginPasantesComponent {
  usuario: string = '';
  clave: string = '';
  errorMessage: string = ''; // Variable para manejar mensajes de error

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  iniciarSesion() {
    if (!this.usuario || !this.clave) {
      this.errorMessage = 'Usuario y contraseña son obligatorios.';
      return;
    }
  
    this.loginService.iniciarSesion(this.usuario, this.clave).subscribe({
      next: (response) => {
        // Manejo de respuesta exitosa
        console.log('Inicio de sesión exitoso', response.data);
        
        // Guardar datos en sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(response.data));
        
        this.errorMessage = ''; // Limpia el mensaje de error
        this.router.navigate(['/USAID/Principal']); // Navega al dashboard o ruta principal
      },
      error: (error) => {
        // Manejo de error
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = error.message || 'Error al conectar con el servidor.';
      }
    });
  }  
  
}
