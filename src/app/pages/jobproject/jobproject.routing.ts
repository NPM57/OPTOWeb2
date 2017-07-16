import { Routes, RouterModule } from '@angular/router';
import { JobProject } from './jobproject.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: JobProject,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


