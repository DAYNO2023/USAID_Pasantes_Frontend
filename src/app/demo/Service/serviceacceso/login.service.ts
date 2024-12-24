import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { apiService } from '../../USAID/api.service';
import { UsuarioInicioSesion, UsuarioRestablecer } from '../../models/modelacceso/loginmodel'; // Modelo para la respuesta

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private loginUrl = `${this.apiUrl}/api/Login`;

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  iniciarSesion(usuario: string, clave: string): Observable<any> {
    const url = `${this.loginUrl}/InicioSesion/${usuario}/${clave}`;
    console.log('URL generada:', url);
    return this.http.get(url, this.getHttpOptions()).pipe(
      map((response: any) => {
        if (response.statusCode === 200 && response.success) {
          return response; // Retorna la respuesta en caso de éxito
        } else {
          throw new Error(response.message || 'Error al iniciar sesión.');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Error desconocido';
  
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMsg = `Error del cliente: ${error.error.message}`;
        } else {
          // Otros errores del servidor
          errorMsg = `Error del servidor: ${error.status} - ${error.error?.message || error.message}`;
        }
  
        console.error('Error al procesar la solicitud:', error);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
  
  

  // Método para restablecer contraseña
  restablecerContra(usua_Id: number, empl_Correo: string, usuario: string): Observable<any> {
    const url = `${this.loginUrl}EnviarCorreo/${usua_Id}/${empl_Correo}/${usuario}`;
    return this.http.get(url, this.getHttpOptions());
  }

  // Método para verificar el código de restablecimiento
  verificarCodigoRestablecer(usua_Id: number, codigo: number): Observable<any> {
    const url = `${this.loginUrl}VerificarCodigoReestablecer/${usua_Id}/${codigo}`;
    return this.http.get(url, this.getHttpOptions());
  }

  // Método para buscar usuario por ID
  buscar(id: number): Observable<any> {
    const url = `${this.loginUrl}BuscarUsuario/${id}`;
    return this.http.get(url, this.getHttpOptions());
  }

  // Método para buscar usuario por ID (ahora acepta string)
  buscarUsuario(Usuario: string): Observable<UsuarioRestablecer> {
    const url = `${this.loginUrl}BuscarUsuario/${Usuario}`;
    return this.http.get<UsuarioRestablecer>(url, this.getHttpOptions());
  }


  // Método para restablecer la clave
  reestablecerClave(usuario: UsuarioInicioSesion): Observable<any> {
    const url = `${this.loginUrl}ReestablecerClave`;
    return this.http.put(url, usuario, this.getHttpOptions());
  }
}
