import 'rxjs/add/operator/switchMap';
import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { SupplierService } from '../../shared/services/supplier.service';
import { PartService } from '../../shared/services/part.service';
import { MaterialService } from '../../shared/services/material.service';
//import {legend} from 'chartist-plugin-legend';
//import * as legend from 'chartist-plugin-legend/chartist-plugin-legend.js';
declare function require(path: string): any;
import {BaThemeConfigProvider} from '../../theme';

import * as Chartist from 'chartist';
require('chartist-plugin-legend');


@Component({
	selector: 'statistics',
	templateUrl: './statistics.html',
	styleUrls: ['./smartTables.scss'],
})

export class Statistics implements AfterViewInit{

	currentRadio:string="";
	type:number=0;
	markup:string="";
	codeField:string="";
	public allYear:any="";
	public data;
	public options;


	constructor(
		private route: ActivatedRoute, 
		private client_service: ClientService,
		private supplier_service: SupplierService,
		private _elementRef:ElementRef, 
		private _baConfig:BaThemeConfigProvider) {
	}

	ngOnInit() {
		this.data = "";
		this.options = "";
	}
	
	ngAfterViewInit(){
	}

	arrayHandler(data, array){
		switch (data["month"]) {
			case 7:
			array[0].push(data["total"]);
			break;
			case 8:
			array[1].push(data["total"]);
			break;
			case 9:
			array[2].push(data["total"]);
			break;
			case 10:
			array[3].push(data["total"]);
			break;
			case 11:
			array[4].push(data["total"]);
			break;
			case 12:
			array[5].push(data["total"]);
			break;
			case 1:
			array[6].push(data["total"]);
			break;
			case 2:
			array[7].push(data["total"]);
			break;
			case 3:
			array[8].push(data["total"]);
			break;
			case 4:
			array[9].push(data["total"]);
			break;
			case 5:
			array[10].push(data["total"]);
			break;
			case 6:
			array[11].push(data["total"]);
			break;												
			default:
			// code...
			break;
		}
	}

	clientChart(id){
		this.client_service.getClientInvoices(id)
		.subscribe(res => {

			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];

			var items = res.json()["items"];
			var labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

			for(var _i = 0; _i < items.length; _i++) {
				let item = items[_i];
				if (item["y"] == 1) {
					year1.push(item["total"]);
					this.arrayHandler(item["month"],year1)
					var name1 = item["year"];
				} else if (item["y"] == 2) {
					year2.push(item["total"]);
					this.arrayHandler(item["month"],year2)
					var name2 = item["year"];
				} else if (item["y"] == 3) {
					year3.push(item["total"]);
					this.arrayHandler(item["month"],year3)
					var name3 = item["year"];
				} else {
					year4.push(item["total"]);
					this.arrayHandler(item["month"],year4)
					var name4 = item["year"];
				}
			}
			//this.allYear = [year1, year2, year3, year4];


			this.data = {
			  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
			    series: [
			    {"name":name1,"data":year1.map(Number)},
			   	{"name":name2,"data":year2.map(Number)},
			   	{"name":name3,"data":year3.map(Number)},
			   	{"name":name4,"data":year4.map(Number)},
			  ]
			};

			new Chartist.Bar('.ct-chart', this.data,
			 {
			 	height: '300px',
			 	stackBars: true,
			 	plugins: [
            	Chartist.plugins.legend()
       		 ]}
        );

		});

	}

	supplierChart(id){
		this.supplier_service.getSupplierPurchases(id)
		.subscribe(res => {
			
			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];

			var items = res.json()["items"];
			var labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

			for(var _i = 0; _i < items.length; _i++) {
				let item = items[_i];
				if (item["y"] == 1) {
					year1.push(item["total"]);
					this.arrayHandler(item["month"],year1)
					var name1 = item["year"];
				} else if (item["y"] == 2) {
					year2.push(item["total"]);
					this.arrayHandler(item["month"],year2)
					var name2 = item["year"];
				} else if (item["y"] == 3) {
					year3.push(item["total"]);
					this.arrayHandler(item["month"],year3)
					var name3 = item["year"];
				} else {
					year4.push(item["total"]);
					this.arrayHandler(item["month"],year4)
					var name4 = item["year"];
				}
			}
			//this.allYear = [year1, year2, year3, year4];

			this.data = {
			  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
			    series: [
			    {"name":name1,"data":year1.map(Number)},
			   	{"name":name2,"data":year2.map(Number)},
			   	{"name":name3,"data":year3.map(Number)},
			   	{"name":name4,"data":year4.map(Number)},
			  ]
			};

			new Chartist.Bar('.ct-chart', this.data,
			 {
			 	height: '300px',
			 	stackBars: true,
			 	plugins: [
            	Chartist.plugins.legend()
       		 ]}
        );

		});

	
	}

	// partChart(id){
	// 	this.client_service.getClientInvoices(id)
	// 	.subscribe(res => {
			
	// 		var items = res.json()["items"];
	// 		var year1 = [];
	// 		var year2 = [];
	// 		var year3 = [];
	// 		var year4 = [];
	// 		var labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
	// 		for(var _i = 0; _i < items.length; _i++) {
	// 			let item = items[_i];
	// 			if (item["y"] == 1) {
	// 				year1.push(item["total"])
	// 			} else if (item["y"] == 2) {
	// 				year2.push(item["total"])
	// 			} else if (item["y"] == 3) {
	// 				year3.push(item["total"])
	// 			} else {
	// 				year4.push(item["total"])
	// 			}
	// 		}
	// 		var allYear = [year1, year2, year3, year4];
	// 		new Chartist.Line('.ct-chart', {
	// 			labels: labels,
	// 			series: allYear
	// 		});

	// 	});
	
	// }

	// materialChart(id){
	// 	this.client_service.getClientInvoices(id)
	// 	.subscribe(res => {
			
	// 		var items = res.json()["items"];
	// 		var year1 = [];
	// 		var year2 = [];
	// 		var year3 = [];
	// 		var year4 = [];
	// 		var labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
	// 		for(var _i = 0; _i < items.length; _i++) {
	// 			let item = items[_i];
	// 			if (item["y"] == 1) {
	// 				year1.push(item["total"])
	// 			} else if (item["y"] == 2) {
	// 				year2.push(item["total"])
	// 			} else if (item["y"] == 3) {
	// 				year3.push(item["total"])
	// 			} else {
	// 				year4.push(item["total"])
	// 			}
	// 		}
	// 		var allYear = [year1, year2, year3, year4];
	// 		new Chartist.Line('.ct-chart', {
	// 			labels: labels,
	// 			series: allYear
	// 		});

	// 	});
	
	// }

	radio_stock($event) {    
		this.currentRadio = $event.currentTarget.defaultValue;

		if(this.currentRadio=="Client"){
			this.markup="Client Code";
			this.type=1;
			//document.getElementById("codeField").placeholder="Loc for Pallet and Job";
		}

		if(this.currentRadio=="Supplier"){
			this.markup="Supplier Code";
			this.type=2;
			//document.getElementById("codeField").placeholder="Pallet for Loc and Job";
		}

		if(this.currentRadio=="Part"){
			this.markup="Part Code";
			this.type=3;
			// document.getElementById("codeField").placeholder="Job for Loc and Pallet";
		}

		if(this.currentRadio=="Material"){
			this.markup="Material Code";
			this.type=4;
			// document.getElementById("codeField").placeholder="Job for Loc and Pallet";
		}
	}

	Search(id){
		console.log(this.allYear);
		this.data= "";
		if(this.type==1){
			this.clientChart(id);
		}
		if(this.type==2){
			this.supplierChart(id);
		}
		// if(this.type==3){
		// 	this.partChart(id);
		// }
		// if(this.type==4){
		// 	this.materialChart(id);
		// }
		// console.log(this.allYear);
		// if(this.allYear != ""){
		// 	console.log('1');
		// 	document.getElementById('lineChart').style.display = 'block';
		// }else{
		// 	console.log('2');
		// 	document.getElementById('lineChart').style.display = 'none';
		// }	
	}
}
