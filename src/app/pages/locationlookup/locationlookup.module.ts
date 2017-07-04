import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './locationlookup.routing';
import { LocationLookUp } from './locationlookup.component';

import { LocationLookUpService } from '../../shared/services/locationlookup.service'
import { MaterialService } from '../../shared/services/material.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    LocationLookUp,
  ],
  providers: [
    LocationLookUpService,
    MaterialService
  ]
})
export class LocationLookUpModule {}

