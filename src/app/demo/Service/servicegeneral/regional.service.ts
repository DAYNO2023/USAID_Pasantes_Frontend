import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { regional } from '../../models/modelsgeneral/regionalviewmodel';

@Injectable({
  providedIn: 'root'
})
export class regionalService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private regional = `${this.apiUrl}/api/Regional`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  
  Listar (){
    return this.http.get<regional[]>(`${this.regional}/Listar`,this.getHttpOptions());
  }

}