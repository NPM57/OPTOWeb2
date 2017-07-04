import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderDetailRender } from '../../shared/render/order-detail-render.component';

import { routing } from './orderdetail.routing';
import { OrderDetail } from './orderdetail.component';

import { OrderService } from '../../shared/services/order.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  entryComponents: [
    OrderDetailRender
  ],
  declarations: [
    OrderDetailRender,
    OrderDetail
  ],
  providers: [
    OrderService
  ]
})
export class OrderDetailModule {}
