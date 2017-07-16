import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './jobtotal.routing';
import { JobTotal } from './jobtotal.component';

import { JobService } from '../../shared/services/job.service';
// import { PalletLookUpService } from '../../shared/services/palletlookup.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    JobTotal
  ],
  providers: [
    JobService,
  ]
})
export class JobTotalModule {}
