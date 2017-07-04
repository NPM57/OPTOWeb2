import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'

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

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    canActivate: [AuthService],
    component: Pages,
    children: [
      { path: '', redirectTo: 'order',canActivate: [AuthService], pathMatch: 'full' },
    
      { path: 'location',canActivate: [LocationGuard], loadChildren: 'app/pages/location/binlocation.module#BinLocationModule' },
      { path: 'pallet',canActivate: [PalletGuard], loadChildren: 'app/pages/pallet/pallet.module#PalletModule' },
      { path: 'locationlookup',canActivate: [LocationLookUpGuard], loadChildren: 'app/pages/locationlookup/locationlookup.module#LocationLookUpModule' },
      { path: 'palletlookup',canActivate: [PalletLookUpGuard], loadChildren: 'app/pages/palletlookup/palletlookup.module#PalletLookUpModule' },
      // //{ path: 'ui',canActivateChild: [AuthService], loadChildren: 'app/pages/ui/ui.module#UiModule' },
     

      // { path: 'material',canActivate: [MaterialGuard], loadChildren: 'app/pages/material/material.module#MaterialModule' },
      // { path: 'materialslist/:id',canActivate: [MaterialGuard], loadChildren: 'app/pages/materialslist/materialslist.module#MaterialsListModule' },
      // { path: 'materialdetail/:code',canActivate: [MaterialGuard], loadChildren: 'app/pages/materialdetail/materialdetail.module#MaterialDetailModule' },
      
      // { path: 'part',canActivate: [PartGuard], loadChildren: 'app/pages/part/part.module#PartModule' },
      // { path: 'partlist/:id',canActivate: [PartGuard], loadChildren: 'app/pages/partlist/partlist.module#PartListModule' },
    
      { path: 'stock',canActivate: [StockGuard], loadChildren: 'app/pages/stock/stock.module#StockModule'},
      { path: 'clockon',canActivate: [ClockOnGuard], loadChildren: 'app/pages/clockon/clockon.module#ClockOnModule'},
      // { path: 'clocktiles',canActivate: [ClockTileGuard], loadChildren: 'app/pages/clocktiles/clocktiles.module#ClockTilesModule'},
      // { path: 'productiontiles',canActivate: [ProductionTileGuard], loadChildren: 'app/pages/productiontiles/productiontiles.module#ProductionTilesModule'},
      // { path: 'clients',canActivate: [ClientGuard], loadChildren: 'app/pages/clients/clients.module#ClientsModule' },
      // { path: 'suppliers',canActivate: [SupplierGuard], loadChildren: 'app/pages/suppliers/suppliers.module#SuppliersModule' },
      { path: 'order',canActivate: [OrderGuard], loadChildren: 'app/pages/order/order.module#OrderModule' },
      { path: 'orderdetail/:id',canActivate: [OrderGuard], loadChildren: 'app/pages/orderdetail/orderdetail.module#OrderDetailModule' },
   
      //{ path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      // { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      // { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      //{ path: 'partlist', loadChildren: 'app/pages/partlist/partlist.module#PartListModule' },
      // { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      // { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      // { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      // { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      // { path: 'login',canActivateChild: [AuthService], loadChildren: 'app/pages/login/login.module#LoginModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
