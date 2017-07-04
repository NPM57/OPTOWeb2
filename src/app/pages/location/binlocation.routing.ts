import { Routes, RouterModule }  from '@angular/router';

import { BinLocation } from './binlocation.component';

import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BinLocation,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
