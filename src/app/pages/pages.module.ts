import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AuthService } from '../shared/services/auth.service'
import { LoginService } from '../shared/services/login.service'

import { LocationGuard } from '../shared/services/location.guard'
import { PalletGuard } from '../shared/services/pallet.guard'
import { LocationLookUpGuard } from '../shared/services/locationlookup.guard'
import { PalletLookUpGuard } from '../shared/services/palletlookup.guard'
import { MaterialGuard } from '../shared/services/material.guard'
import { PartGuard } from '../shared/services/part.guard'
import { OrderGuard } from '../shared/services/order.guard'
import { StockGuard } from '../shared/services/stock.guard'
import { ClientGuard } from '../shared/services/client.guard'
import { SupplierGuard } from '../shared/services/supplier.guard'
import { ClockOnGuard } from '../shared/services/clockon.guard'
import { ClockTileGuard } from '../shared/services/clocktile.guard'
import { ProductionTileGuard } from '../shared/services/productiontile.guard'
import { StatisticsGuard } from '../shared/services/statistics.guard'
import { JobProjectGuard } from '../shared/services/jobproject.guard'
import { JobTotalGuard } from '../shared/services/jobtotal.guard'
import { JobListGuard } from '../shared/services/joblist.guard'
import { WorkCenterGuard } from '../shared/services/workcenter.guard'

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers:[
  AuthService,
  LoginService,
  LocationGuard,
  PalletGuard,
  PalletLookUpGuard,
  LocationLookUpGuard,
  MaterialGuard,
  PartGuard,
  OrderGuard,
  StockGuard,
  ClientGuard,
  SupplierGuard,
  ClockOnGuard,
  ClockTileGuard,
  ProductionTileGuard,
  StatisticsGuard,
  JobProjectGuard,
  JobTotalGuard,
  JobListGuard,
  WorkCenterGuard
  ]
})
export class PagesModule {
}
