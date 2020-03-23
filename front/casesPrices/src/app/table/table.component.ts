import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { TableService } from '../table.service'
import { CasesService } from '../cases.service'
import { UpdateCase } from '../case-interfaces'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  cases: UpdateCase[] = []
  displayedColumns = ['name', 'actions']
  constructor(private casesService: CasesService, private tableService: TableService) { }

  ngOnInit(): void {
    this.getAllCases()
  }

  changeCase(id, name) {
    this.cases = this.cases.map(el => {
      if (el.id === id) {
        return {id, name}
      } else {
        return el
      }
    })
  }

  updateCaseById(id) {
    let name: string
    this.cases.forEach(el => {
      if (el.id === id) {
        name = el.name
      }
    })
    const caseObj = {id, name}
    this.tableService.updateCaseById(caseObj)
    .pipe(
       take(1),
       catchError(err => this.casesService.showError(err))
    ).subscribe()
  }

  deleteCaseById(id: number) {
     this.tableService.deleteCaseById(id)
     .pipe(
        take(1),
        catchError( err => this.casesService.showError(err))
     ).subscribe(() => {
        this.cases = this.cases.filter(el => {
          if (el.id !== id) {
            return el
          }
        })
     })
  }

  addNewCase(name: string) {
    this.tableService.addCase(name)
      .pipe(
        take(1),
        catchError(err => this.casesService.showError(err))
      ).subscribe(() => {
       this.cases = [...this.cases, {name, id: this.cases.length}]
    })
  }

  private getAllCases() {
   this.tableService.getAllCases()
     .pipe(
       take(1),
       catchError( err => this.casesService.showError(err))
     ).subscribe((cases: UpdateCase[]) => {
        this.cases = cases
   })
  }
}
