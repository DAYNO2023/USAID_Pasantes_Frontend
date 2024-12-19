import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiService } from '../apiservice.service';
import { rol } from '../../models/modelsacceso/rolviewmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rolService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private rol = `${this.apiUrl}/api/Rol/`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  private roleId: number | null = null;

  setRoleId(id: number) {
    this.roleId = id;
    localStorage.setItem('roleId', id.toString()); 
  }

  getRoleId(): number | null {
    if (this.roleId) {
        return this.roleId;
    }
    const savedId = localStorage.getItem('roleId');
    return savedId ? Number(savedId) : null;
  }

  clearRoleId() {
    this.roleId = null;
    localStorage.removeItem('roleId');
  }

  //API
  
  Listar (){
    return this.http.get<rol[]>(`${this.rol}Listar`,this.getHttpOptions());
  }

  Insertar(rol: rol): Observable<any> {
    const url = `${this.rol}Insertar`;
    return this.http.post(url, rol, this.getHttpOptions());
  }

  Buscar(rolId: number){
    return this.http.get<rol[]>(`${this.rol}Buscar/${rolId}`,this.getHttpOptions());
  }

  Actualizar(rol: rol): Observable<any> {
    const url = `${this.rol}Actualizar`;
    return this.http.put(url, rol, this.getHttpOptions());
  }

  Eliminar(rolId: number): Observable<any> {
    const url = `${this.rol}Eliminar?id=${rolId}`;
    return this.http.delete(url, this.getHttpOptions());
  }
  
}