import { Routes, RouterModule }  from '@angular/router';
import { LocationLookUp } from './locationlookup.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LocationLookUp,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


