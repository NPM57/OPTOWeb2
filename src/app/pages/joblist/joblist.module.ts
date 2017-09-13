import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClockTileService } from '../../shared/services/clocktile.service';
import { JobList } from './joblist.component';
import { routing } from './joblist.routing';
import { JobListDetails } from './joblistdetails/joblistdetails.component';
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
    JobList,
    JobListDetails
  ],
  providers: [
    ClockTileService,
    WorkCenterService,
    EmployeeService,
    ClockOnService
  ]
})
export class JobListModule {}
