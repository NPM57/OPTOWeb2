import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './workcenterdetail.routing';
import { WorkCenterDetail } from './workcenterdetail.component';
import { WorkCenterService } from '../../shared/services/workcenter.service'
import { EmployeeService } from '../../shared/services/employee.service';
import { ClockOnService } from '../../shared/services/clockon.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    WorkCenterDetail
  ],
  providers: [
    WorkCenterService,
    EmployeeService,
    ClockOnService
  ]
})
export class WorkCenterDetailModule {}
