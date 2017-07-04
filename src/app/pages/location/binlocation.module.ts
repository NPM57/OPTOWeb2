import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BinLocationService } from '../../shared/services/binlocation.service';

import { routing } from './binlocation.routing';
import { BinLocation } from './binlocation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    BinLocation
  ],
  providers: [
    BinLocationService
  ]
})
export class BinLocationModule {}
