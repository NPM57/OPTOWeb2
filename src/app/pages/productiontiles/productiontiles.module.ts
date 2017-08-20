import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductionTiles } from './productiontiles.component'
import { ProductionTileDetails } from './productiontiledetails/productiontiledetails.component'
import { routing } from './productiontiles.routing'
import { ProductionTileService } from '../../shared/services/productiontile.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    ProductionTiles,
    ProductionTileDetails
  ],
  providers: [
    ProductionTileService
  ]
})
export class ProductionTilesModule {}
