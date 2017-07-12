import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './statistics.routing';
import { Statistics } from './statistics.component';

import { ClientService } from '../../shared/services/client.service';
import { SupplierService } from '../../shared/services/supplier.service';
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
    Statistics
  ],
  providers: [
    // PalletLookUpService
    ClientService,
    SupplierService
  ]
})
export class StatisticsModule {}
