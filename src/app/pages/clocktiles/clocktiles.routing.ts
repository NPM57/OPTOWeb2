import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { ClockTiles } from './clocktiles.component'

import { ClockTileDetails } from './clocktiledetails/clocktiledetails.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
	{
		path: '',
		component: ClockTiles,
		children: [
		//{ path: 'details', component: ClientDetails }
		]
	},
	{ path: 'details/:id', component: ClockTileDetails }
];

export const routing = RouterModule.forChild(routes);
