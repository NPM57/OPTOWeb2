import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { ProductionTiles } from './productiontiles.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ProductionTiles,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
