import { Routes, RouterModule }  from '@angular/router';

import { Stock } from './stock.component';

import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Stock,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
