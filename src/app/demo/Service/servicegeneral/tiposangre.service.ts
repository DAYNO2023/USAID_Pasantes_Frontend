import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { tipoSangre } from '../../models/modelsgeneral/tiposangreviewmodel';


@Injectable({
  providedIn: 'root'
})
export class tipoSangreService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private tipoSangre = `${this.apiUrl}/api/TipoSangre`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<tipoSangre[]>(`${this.tipoSangre}/Listar`,this.getHttpOptions());
  }

}