import { Routes, RouterModule }  from '@angular/router';
import { WorkCenterDetail } from './workcenterdetail.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: WorkCenterDetail,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
