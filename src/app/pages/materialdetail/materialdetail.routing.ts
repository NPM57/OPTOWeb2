import { Routes, RouterModule }  from '@angular/router';
import { MaterialDetail } from './materialdetail.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MaterialDetail,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


