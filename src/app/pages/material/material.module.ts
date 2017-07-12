import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './material.routing';
import { Material } from './material.component';

import { MaterialService } from '../../shared/services/material.service'
import { MaterialRender } from '../../shared/render/material-render.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  entryComponents: [
    MaterialRender
  ],
  declarations: [
    MaterialRender,
    Material
  ],
  providers: [
    MaterialService
  ]
})
export class MaterialModule {}

