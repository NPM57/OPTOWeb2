import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './suppliers.routing';
import { Suppliers } from './suppliers.component';
import { SupplierDetails } from './supplierdetails/supplierdetails.component'

import { SupplierService } from '../../shared/services/supplier.service';
import { PartService } from '../../shared/services/part.service';
import { OrderService } from '../../shared/services/order.service';
import { MaterialService } from '../../shared/services/material.service';

import { SupplierRender } from '../../shared/render/supplier-render.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  entryComponents:[
    SupplierRender
  ],
  declarations: [
    SupplierRender,
    Suppliers,
    SupplierDetails,
  ],
  providers: [
    SupplierService,
    PartService,
    OrderService,
    MaterialService
  ]
})
export class SuppliersModule {}
