import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './materialdetail.routing';
import { MaterialDetail } from './materialdetail.component';

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
    MaterialDetail
  ],
  providers: [
    MaterialService
  ]
})
export class MaterialDetailModule {}

