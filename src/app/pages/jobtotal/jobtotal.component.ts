import 'rxjs/add/operator/switchMap';
import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../../shared/services/job.service';

import {BaThemeConfigProvider} from '../../theme';
import * as Chartist from 'chartist';

//Must install the plugin via npm (node module) before using
declare function require(path: string): any;
require('chartist-plugin-legend');
require('chartist-plugin-tooltip');


@Component({
	selector: 'jobtotal',
	templateUrl: './jobtotal.html',
	styleUrls: ['./smartTables.scss'],
})

export class JobTotal implements AfterViewInit{

	public codeField:string="";
	public data;
	public options;

	constructor(
		private route: ActivatedRoute, 
		private job_service: JobService,
		private _elementRef:ElementRef, 
		private _baConfig:BaThemeConfigProvider) {
	}

	ngOnInit() {
		this.data = "";
		this.options = "";

	}
	
	ngAfterViewInit(){
	}

	barChartCreate(name,items){

			this.data = {
			  labels: ["A","B","","C","D","E","F"],
			    series:items
			};
			new Chartist.Bar('.ct-chart', this.data,
			{
			 	height: '300px',
			 	seriesBarDistance: 10,
			 	horizontalBars: true,
			 	distributeSeries: true,
			 	reverseData: true,
			 	stretch: true,
			 	plugins: [
            		Chartist.plugins.tooltip()
       		 	],
       		axisY: {
       			//onlyInteger:this.integ,
       		} 	
       		 	
       		});
	}

	// checkItemEmpty(item_length){
	// 	if(item_length > 0){
	// 			var check=1;
	// 		}else{
	// 			var check=0;
	// 	}
	// 	return check;
	// }

	jobTotalChart(id){
		var check;

		this.job_service.getJobProject(id)
		.subscribe(res => {
			var name =[];
			var item_arr = [];
			var items = res.json()["items"][0];
			
			var empty= [];
			var item1= items["item1"];
			var item2= items["item2"];
			var item3= items["item3"];
			var item4= items["item4"];
			var item5= items["item5"];
			var item6= items["item6"];

			item_arr=[item1,item2,empty,item3,item4,item5,item6];

			this.barChartCreate(name,item_arr);
		});
		return check;
	}


	enterSearch($event,id){
		if (($event.which == 13 || $event.keyCode == 13)) {
			this.Search(id);
		}
	}

	Search(id){
		this.data="";
		if(id!=""){
			this.jobTotalChart(id);
		}else{
			alert('The input code cannot be empty');
		}	
	}
}
