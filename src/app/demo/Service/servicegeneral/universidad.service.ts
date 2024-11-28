import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { universidad } from '../../models/modelsgeneral/universidadviewmodel';

@Injectable({
  providedIn: 'root'
})
export class universidadService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private universidad = `${this.apiUrl}/api/Universidad`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<universidad[]>(`${this.universidad}/Listar`,this.getHttpOptions());
  }

}