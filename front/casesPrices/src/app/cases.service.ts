import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getPrice(caseName: string) {
    return this.http.get('http://localhost:8080/getPrice?caseName='+caseName)
  }

  showError(err) {
       if (err.status !== 200) {
        this._snackBar.open(err.message, 'Close', {
          duration: 2000,
        });
       }
      return of({...err, isError: true})
  }
}
