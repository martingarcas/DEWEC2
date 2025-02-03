import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(public http: HttpClient) { }

  get(): Observable<any[]> {    
    return this.http.get<any[]>("https://restcountries.com/v3.1/all");
  }

  getPais(pais: string): Observable<any[]> {
    return this.http.get<any[]>(`https://restcountries.com/v3.1/name/${pais}`);
  }

  getPaisPorCodigo(ccA3: string): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${ccA3}`);
  }

}
