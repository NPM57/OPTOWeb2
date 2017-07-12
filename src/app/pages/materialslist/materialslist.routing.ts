import { Routes, RouterModule }  from '@angular/router';

import { MaterialsList } from './materialslist.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MaterialsList,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
