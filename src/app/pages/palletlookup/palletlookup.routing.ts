import { Routes, RouterModule }  from '@angular/router';
import { PalletLookUp } from './palletlookup.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PalletLookUp,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


