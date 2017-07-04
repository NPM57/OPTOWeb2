import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';
import { EmployeeService } from '../../shared/services/employee.service';
import { ClockOnService } from '../../shared/services/clockon.service';
// import { DropdownModule, ModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClockOn } from './clockon.component'
import { routing } from './clockon.routing'

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
    ClockOn,
  ],
  providers: [
    EmployeeService,
    ClockOnService
  ]
})
export class ClockOnModule {}
