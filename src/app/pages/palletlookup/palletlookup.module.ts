import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './palletlookup.routing';
import { PalletLookUp } from './palletlookup.component';

import { PalletLookUpService } from '../../shared/services/palletlookup.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    PalletLookUp
  ],
  providers: [
    PalletLookUpService
  ]
})
export class PalletLookUpModule {}
