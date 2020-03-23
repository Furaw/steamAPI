import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { TableService } from '../table.service'
import { CasesService } from '../cases.service'
import { Case, Price } from '../case-interfaces'

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit, OnDestroy {
  cases: Case[] = []
  displayedColumns = ['name', 'lowest_price', 'median_price']
  interval

  constructor(private casesService: CasesService, private tableService: TableService) { }

  ngOnInit(): void {
    this.loadCases()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  private loadCases() {
    this.interval = setInterval(() => {
      this.tableService.getAllCases()
        .pipe(
          take(1),
          catchError(err => this.casesService.showError(err))
        ).subscribe(cases => {
          this.cases = []
          cases.forEach(element => {
            this.getPrice(element.name)
          });
        })
    }, 5000)
  }

  getPrice(priceName: string) {
      const newPriceName = this.getCorrectName(priceName)
        this.casesService.getPrice(newPriceName)
          .pipe(
            take(1),
            catchError(err => this.casesService.showError(err))
          ).subscribe((priceObj: Price) => {
              if (!priceObj.isError) {
                 const newPriceName = priceName.charAt(0).toUpperCase() + priceName.slice(1)
                 const newCase = {
                    name: newPriceName,
                    lowestPrice: priceObj.lowest_price,
                    medianPrice: priceObj.median_price,
                 }
                 this.cases = [...this.cases, newCase]
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
