import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './clients.routing';
//Component
import { ClientDetails } from './clientdetails/clientdetails.component';
import { Clients } from './clients.component';
//Service
import { ClientService } from '../../shared/services/client.service';
import { PartService } from '../../shared/services/part.service';
import { OrderService } from '../../shared/services/order.service';
import { MaterialService } from '../../shared/services/material.service';
import { ChartistJsService } from './clientdetails/chartistJs.service';
//Custom render
import { ClientsRender } from '../../shared/render/clients-render.component';
import { ClientDetailRender } from '../../shared/render/client-detail-render.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  entryComponents:[
    ClientsRender,
    ClientDetailRender
  ],
  declarations: [
    ClientDetailRender,
    ClientsRender,
    Clients,
    ClientDetails
  ],
  providers: [
    ClientService,
    PartService,
    MaterialService,
    OrderService,
    ChartistJsService
  ]
})
export class ClientsModule {}
