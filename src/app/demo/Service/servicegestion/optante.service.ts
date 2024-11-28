import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { optante } from '../../models/modelgestion/optanteviewmodel'; 


@Injectable({
  providedIn: 'root'
})
export class optanteService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = apiService.apiUrl;
  private apiKey: string = apiService.apiKey;
  private optante = `${this.apiUrl}/api/Optante/`;
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'XApiKey': `${this.apiKey}`
      })
    };
  }

  registrarOptante(optante: optante): Observable<any> {
    const url = `${this.optante}Registrar`;
    return this.http.post(url, optante, this.getHttpOptions());
}


}