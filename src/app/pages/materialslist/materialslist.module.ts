import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './materialslist.routing';
import { MaterialsList } from './materialslist.component';
import { MaterialListRender } from '../../shared/render/material-list-render.component';

import { MaterialService } from '../../shared/services/material.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  entryComponents: [
    MaterialListRender
  ],
  declarations: [
    MaterialListRender,
    MaterialsList
  ],
  providers: [
    MaterialService
  ]
})
export class MaterialsListModule {}
