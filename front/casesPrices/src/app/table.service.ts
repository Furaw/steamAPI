import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UpdateCase } from './case-interfaces'

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }
  getAllCases() {
    return this.http.get('http://localhost:8080/getAllCases')
  }
  updateCaseById(caseObj: UpdateCase) {
    return this.http.post('http://localhost:8080/updateCaseById', caseObj)
  }
  deleteCaseById(id: number) {
     return this.http.post('http://localhost:8080/deleteCaseById', {id})
  }
  addCase(name: string) {
    return this.http.post('http://localhost:8080/addCase', {name})
  }
}
