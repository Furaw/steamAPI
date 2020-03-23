import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  getPrice(caseName: string) {
    return this.http.get('http://localhost:8080/geturls?caseName='+caseName)
  }
}
