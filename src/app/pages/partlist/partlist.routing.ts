import { Routes, RouterModule }  from '@angular/router';

import { PartList } from './partlist.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PartList,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
