import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { proyecto } from '../../models/modelsgestion/proyectoviewmodel';

@Injectable({
  providedIn: 'root'
})
export class proyectoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private proyecto = `${this.apiUrl}/api/Proyecto`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<proyecto[]>(`${this.proyecto}/Listar`,this.getHttpOptions());
  }

}