import { Routes, RouterModule }  from '@angular/router';
import { WorkCenter } from './workcenter.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: WorkCenter,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);