import { Routes, RouterModule }  from '@angular/router';

import { Clients } from './clients.component';
import { ClientDetails } from './clientdetails/clientdetails.component'

import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Clients,
    children: [
      //{ path: 'details', component: ClientDetails }
    ]
  },
  { path: 'details/:id', component: ClientDetails }	
];

export const routing = RouterModule.forChild(routes);
