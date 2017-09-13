import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { JobList } from './joblist.component'

import { JobListDetails } from './joblistdetails/joblistdetails.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
	{
		path: '',
		component: JobList,
		children: [
		//{ path: 'details', component: ClientDetails }
		]
	},
	{ path: 'details/:id', component: JobListDetails }
];

export const routing = RouterModule.forChild(routes);
