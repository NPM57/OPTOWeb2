import { Routes, RouterModule }  from '@angular/router';
import { Material } from './material.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Material,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


