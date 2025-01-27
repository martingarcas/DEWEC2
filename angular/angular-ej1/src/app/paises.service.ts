import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(public http:HttpClient) { }

  get(): Observable<any> {
    return this.http.get("https://restcountries.com/v3.1/all");
  }

  getPais(pais:String) {
    return this.http.get("https://restcountries.com/v3.1/name/" + pais);
  }

}
