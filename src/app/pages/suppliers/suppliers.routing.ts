import { Routes, RouterModule }  from '@angular/router';

import { Suppliers } from './suppliers.component';
import { SupplierDetails } from './supplierdetails/supplierdetails.component'

import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Suppliers,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  },
  { path: 'details/:id', component: SupplierDetails }	
];

export const routing = RouterModule.forChild(routes);
