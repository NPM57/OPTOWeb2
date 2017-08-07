import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './workcenter.routing';
import { WorkCenter } from './workcenter.component';
import { WorkCenterService } from '../../shared/services/workcenter.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    WorkCenter
  ],
  providers: [
    WorkCenterService
  ]
})
export class WorkCenterModule {}
