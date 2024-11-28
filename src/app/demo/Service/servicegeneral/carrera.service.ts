import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { carrera } from '../../models/modelsgeneral/carreraviewmodel';

@Injectable({
  providedIn: 'root'
})
export class carreraService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private carrera = `${this.apiUrl}/api/Carrera`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<carrera[]>(`${this.carrera}/Listar`,this.getHttpOptions());
  }

}