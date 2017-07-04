import { Routes, RouterModule }  from '@angular/router';
import { Order } from './order.component';

import { ModuleWithProviders } from '@angular/core';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Order,
  },
  // {
  //   path: '',
  //   component: OrderDetail,
   
  // }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
