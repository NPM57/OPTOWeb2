import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StockService } from '../../shared/services/stock.service';
// import { DropdownModule, ModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './stock.routing';
import { Stock } from './stock.component';
import { DivisionService } from '../../shared/services/division.service';
import { EmployeeService } from '../../shared/services/employee.service';
import { MaterialService } from '../../shared/services/material.service';
import { BinLocationService } from '../../shared/services/binlocation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    // DropdownModule.forRoot(),
    // ModalModule.forRoot(),
    routing
  ],
  declarations: [
    Stock
  ],
  providers: [
    StockService,
    DivisionService,
    EmployeeService,
    MaterialService,
    BinLocationService
  ]
})
export class StockModule {}
