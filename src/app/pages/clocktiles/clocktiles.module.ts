import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClockTileService } from '../../shared/services/clocktile.service';
import { ClockTiles } from './clocktiles.component'
import { routing } from './clocktiles.routing'
import { ClockTileDetails } from './clocktiledetails/clocktiledetails.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    ClockTiles,
    ClockTileDetails
  ],
  providers: [
    ClockTileService
  ]
})
export class ClockTilesModule {}
