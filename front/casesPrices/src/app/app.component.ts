import { Component } from '@angular/core';
import { take, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';

import { CasesService } from './cases.service'
import { Case, Price } from './case-interfaces'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cases: Case[] = []
  constructor(private service: CasesService, private _snackBar: MatSnackBar) { }

  getPrice(priceName: string) {
    const newPriceName = this.getCorrectName(priceName)
      this.service.getPrice(newPriceName)
        .pipe(
          take(1),
          catchError(err => {
            this._snackBar.open(err.message, 'Close', {
              duration: 2000,
            });
            return of({...err, isError: true})
          } )
        ).subscribe((priceObj: Price) => {
            if (!priceObj.isError) {
               const newPriceName = priceName.charAt(0).toUpperCase() + priceName.slice(1)
               const newCase = {
                  name: newPriceName,
                  lowestPrice: priceObj.lowest_price,
                  medianPrice: priceObj.median_price,
               }
               this.cases.unshift(newCase)
            }
        })
  }

  private getCorrectName(name: string): string {
    const arr = name.split(' ')
    if(arr.length === 1) {
      const innerName = arr[0]
      return innerName.charAt(0).toUpperCase() + innerName.slice(1)
    } else {
      const firstName = arr[0].charAt(0).toUpperCase() + arr[0].slice(1)
      const secondName = arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
      return `${firstName}%20${secondName}`
    }
  }
}
