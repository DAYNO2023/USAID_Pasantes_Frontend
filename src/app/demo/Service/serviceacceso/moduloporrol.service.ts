import { HttpClient, HttpHeaders } from "@angular/common/http";
import { apiService } from "../apiservice.service";
import { Observable } from "rxjs";
import { moduloPorRol } from "../../models/modelsacceso/moduloporrolviewmodel";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class moduloPorRolService{
    constructor(private http: HttpClient) { }
    
      private apiUrl: string = apiService.apiUrl;
      private apiKey: string = apiService.apiKey;
      private moduloPorRol = `${this.apiUrl}/api/ModuloPorRol/`;
      
      private getHttpOptions() {
        return {
          headers: new HttpHeaders({
            'XApiKey': `${this.apiKey}`
          })
        };
      }
    
      Insertar(moduloPorRol: moduloPorRol): Observable<any> {
        const url = `${this.moduloPorRol}Insertar`;
        return this.http.post(url, moduloPorRol, this.getHttpOptions());
      }
}