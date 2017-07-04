import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PalletService } from '../../shared/services/pallet.service';

import { routing } from './pallet.routing';
import { Pallet } from './pallet.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    Pallet
  ],
  providers: [
    PalletService
  ]
})
export class PalletModule {}
