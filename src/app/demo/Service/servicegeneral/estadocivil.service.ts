import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { estadoCivil } from '../../models/modelsgeneral/estadocivilviewmodel';

@Injectable({
  providedIn: 'root'
})
export class estadoCivilService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private tipoSangre = `${this.apiUrl}/api/EstadoCivil`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<estadoCivil[]>(`${this.tipoSangre}/Listar`,this.getHttpOptions());
  }

}