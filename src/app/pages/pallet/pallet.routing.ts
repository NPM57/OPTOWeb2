import { Routes, RouterModule }  from '@angular/router';

import { Pallet } from './pallet.component';

import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Pallet,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
