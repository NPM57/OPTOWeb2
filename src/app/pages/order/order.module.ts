import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderRender } from '../../shared/render/order-render.component';

import { routing } from './order.routing';
import { Order } from './order.component';


import { OrderService } from '../../shared/services/order.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
   entryComponents: [
    OrderRender
  ],
  declarations: [
    OrderRender,
    Order,
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule {}
