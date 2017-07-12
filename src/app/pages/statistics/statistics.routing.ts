import { Routes, RouterModule }  from '@angular/router';
import { Statistics } from './statistics.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Statistics,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


