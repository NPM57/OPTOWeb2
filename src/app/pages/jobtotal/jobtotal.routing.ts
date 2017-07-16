import { Routes, RouterModule } from '@angular/router';
import { JobTotal } from './jobtotal.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: JobTotal,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


