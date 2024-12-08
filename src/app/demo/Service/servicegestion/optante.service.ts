import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiService } from '../apiservice.service';
import { optante } from '../../models/modelsgestion/optanteviewmodel';

@Injectable({
    providedIn: 'root',
})
export class optanteService {
    constructor(private http: HttpClient) {}

    private apiUrl: string = apiService.apiUrl;
    private apiKey: string = apiService.apiKey;
    private optante = `${this.apiUrl}/api/Optante/`;

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                XApiKey: `${this.apiKey}`,
            }),
        };
    }

    registrarOptante(optante: optante): Observable<any> {
        const url = `${this.optante}Registrar`;
        return this.http.post(url, optante, this.getHttpOptions());
    }

    enviarCorreoConCredenciales(
      opta_Nombres: string,
      opta_Apellidos: string,
      opta_CorreoElectronico: string,
      usuario: string,
      contraseña: string
  ): Observable<any> {
      const url = `${this.optante}EnviarCorreoConCredenciales/${opta_Nombres}/${opta_Apellidos}/${opta_CorreoElectronico}/${usuario}/${contraseña}`;
      return this.http.get(url, this.getHttpOptions());
  }
  
}
