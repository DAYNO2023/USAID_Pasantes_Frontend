import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { facultad } from '../../models/modelsgeneral/facultadviewmodel';

@Injectable({
  providedIn: 'root'
})
export class facultadService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private facultad = `${this.apiUrl}/api/Facultad`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<facultad[]>(`${this.facultad}/Listar`,this.getHttpOptions());
  }

}