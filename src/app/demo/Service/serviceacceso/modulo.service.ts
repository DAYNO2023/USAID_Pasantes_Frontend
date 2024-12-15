import { Injectable } from "@angular/core";
import { modulo } from "../../models/modelsacceso/moduloviewmodel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { apiService } from "../apiservice.service";

@Injectable({
    providedIn: 'root'
})
export class moduloService {
    constructor(private http: HttpClient) { }
    
      private apiUrl: string = apiService.apiUrl;
      private apiKey: string = apiService.apiKey;
      private modulo = `${this.apiUrl}/api/Modulo`;
      
      private getHttpOptions() {
        return {
          headers: new HttpHeaders({
            'XApiKey': `${this.apiKey}`
          })
        };
      }
    
      
      Listar (){
        return this.http.get<modulo[]>(`${this.modulo}/Listar`,this.getHttpOptions());
      }
}