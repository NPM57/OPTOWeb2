import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './jobproject.routing';
import { JobProject } from './jobproject.component';

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
    JobProject
  ],
  providers: [
    JobService,
  ]
})
export class JobProjectModule {}
