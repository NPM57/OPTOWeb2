import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { ProductionTiles } from './productiontiles.component'
import { ProductionTileDetails } from './productiontiledetails/productiontiledetails.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
	{
		path: '',
		component: ProductionTiles,
		children: [
		  //{ path: 'details', component: ClientDetails }
		]
	},
	{ path: 'details/:id', component: ProductionTileDetails }
];


export const routing = RouterModule.forChild(routes);
