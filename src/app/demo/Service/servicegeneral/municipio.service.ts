import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { municipio } from '../../models/modelsgeneral/municipioviewmodel';

@Injectable({
  providedIn: 'root'
})
export class municipioService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private municipio = `${this.apiUrl}/api/Municipio`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  ListarPorDepartamento(id: string) {
    return this.http.get<municipio[]>(`${this.municipio}/ListarPorDepartamento/${id}`, this.getHttpOptions());
  }
}