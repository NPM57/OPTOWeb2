import { Routes, RouterModule }  from '@angular/router';
import { Part } from './part.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Part,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


