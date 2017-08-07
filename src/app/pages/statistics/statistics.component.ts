import 'rxjs/add/operator/switchMap';
import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { SupplierService } from '../../shared/services/supplier.service';
import { PartService } from '../../shared/services/part.service';
import { MaterialService } from '../../shared/services/material.service';
import {BaThemeConfigProvider} from '../../theme';
import * as Chartist from 'chartist';

//Must install the plugin via npm (node module) before using
declare function require(path: string): any;
require('chartist-plugin-legend');
require('chartist-plugin-tooltip');


@Component({
	selector: 'statistics',
	templateUrl: './statistics.html',
	styleUrls: ['./smartTables.scss'],
})

export class Statistics implements AfterViewInit{

	public currentRadio:string="";
	public type:number=0;
	public markup:string="";
	public codeField:string="";
	public data;
	public options;
	public qty_type:number=1;
	public integ:boolean=false;

	constructor(
		private route: ActivatedRoute, 
		private client_service: ClientService,
		private supplier_service: SupplierService,
		private material_service: MaterialService,
		private part_service:PartService,
		private _elementRef:ElementRef, 
		private _baConfig:BaThemeConfigProvider) {
	}

	ngOnInit() {
		this.data = "";
		this.options = "";

	}
	
	ngAfterViewInit(){
	}

	Switch($event){
		if(this.qty_type==1){
			this.qty_type=2;
		}else{
			this.qty_type=1;
		}
	}

	labelHandle(startMonth){
		var labels;
		switch (startMonth) {
			case "7":
				return labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun" ];
			case "8":
				return labels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"];
			case "9":
				return labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug"];
			case "10":
				return labels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" ];
			case "11":
				return labels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct" ];
			case "12":
				return labels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov" ];
			case "1":
				return labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			case "2":
				return labels = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan" ];
			case "3":
				return labels = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb" ];
			case "4":
				return labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar" ];
			case "5":
				return labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr" ];
			case "6":
				return labels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May" ];
			
			default:
				// code...
				break;
		}
	}

	barChartCreate(labels, name, allYear){
			if(this.qty_type==1){
				this.integ = false;
       		 }else{
       		 	this.integ= true;
       		 }
			this.data = {
			  labels: labels,
			    series: [
			    {"name":name[0],"data":allYear[0].map(Number)},
			   	{"name":name[1],"data":allYear[1].map(Number)},
			   	{"name":name[2],"data":allYear[2].map(Number)},
			   	{"name":name[3],"data":allYear[3].map(Number)},
			  ]
			};

			new Chartist.Bar('.ct-chart', this.data,
			{
			 	height: '300px',
			 	seriesBarDistance: 10,
			 	plugins: [
            		Chartist.plugins.legend(),
            		Chartist.plugins.tooltip()
       		 	],
       		axisY: {
       			onlyInteger:this.integ,
       		} 	
       		 	
       		});
	}

	checkItemEmpty(item_length){
		if(item_length > 0){
				var check=1;
			}else{
				var check=0;
		}
		return check;
	}

	clientChart(id){
		var check;
		this.client_service.getClientInvoices(id)
		.subscribe(res => {

			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];
			var name =[];

			var items = res.json()["items"];
			var labels = this.labelHandle(res.json()["startMonth"])
			check = this.checkItemEmpty(items.length);

			for(var _i = 0; _i < items.length; _i++) {
				let item = items[_i];
				if (item["y"] == 1) {
					year1.push(item["total"]);
					name[0] = item["year"];
				} else if (item["y"] == 2) {
					year2.push(item["total"]);
					name[1] = item["year"];
				} else if (item["y"] == 3) {
					year3.push(item["total"]);
					name[2] = item["year"];
				} else {
					year4.push(item["total"]);
					name[3] = item["year"];
				}
			}
			var allYear = [year1, year2, year3, year4];
			this.barChartCreate(labels,name,allYear);
		});
		return check;
	}



	supplierChart(id){
		var check;
		this.supplier_service.getSupplierPurchases(id)
		.subscribe(res => {
			
			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];
			var name =[];

			var items = res.json()["items"];
			var labels = this.labelHandle(res.json()["startMonth"])
			check = this.checkItemEmpty(items.length);

			for(var _i = 0; _i < items.length; _i++) {
				let item = items[_i];
				if (item["y"] == 1) {
					year1.push(item["total"]);
					name[0] = item["year"];
				} else if (item["y"] == 2) {
					year2.push(item["total"]);
					name[1] = item["year"];
				} else if (item["y"] == 3) {
					year3.push(item["total"]);
					name[2] = item["year"];
				} else {
					year4.push(item["total"]);
					name[3] = item["year"];
				}
			}
			var allYear = [year1, year2, year3, year4];
			this.barChartCreate(labels,name,allYear);
		});

		return check;
	}

	 partChart(id){
	 	var check;
		this.part_service.getPartInvoices(id)
		.subscribe(res => {
			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];
			var name =[];

			var items = res.json()["items"];
			var labels = this.labelHandle(res.json()["startMonth"])
			check = this.checkItemEmpty(items.length);

			if(this.qty_type==1){
				for(var _i = 0; _i < items.length; _i++) {
					let item = items[_i];
					if (item["y"] == 1) {
						year1.push(item["total"]);
						name[0] = item["year"];
					} else if (item["y"] == 2) {
						year2.push(item["total"]);
						name[1] = item["year"];
					} else if (item["y"] == 3) {
						year3.push(item["total"]);
						name[2] = item["year"];
					} else {
						year4.push(item["total"]);
						name[3] = item["year"];
					}
				}
			}else{
				for(var _i = 0; _i < items.length; _i++) {
					let item = items[_i];
					if (item["y"] == 1) {
						year1.push(item["qty"]);
						name[0] = item["year"];
					} else if (item["y"] == 2) {
						year2.push(item["qty"]);
						name[1] = item["year"];
					} else if (item["y"] == 3) {
						year3.push(item["qty"]);
						name[2] = item["year"];
					} else {
						year4.push(item["qty"]);
						name[3] = item["year"];
					}
				}
			}
			var allYear = [year1, year2, year3, year4];
			this.barChartCreate(labels,name,allYear);
		});
		return check;
	 }

	 materialChart(id){
	 	var check;
		this.material_service.getMaterialInvoice(id)
		.subscribe(res => {
			var year1 =[];
			var year2 =[];
			var year3 =[];
			var year4 =[];
			var name =[];

			var items = res.json()["items"];
			var labels = this.labelHandle(res.json()["startMonth"])
			check = this.checkItemEmpty(items.length);

			if(this.qty_type==1){
				for(var _i = 0; _i < items.length; _i++) {
					let item = items[_i];
					if (item["y"] == 1) {
						year1.push(item["total"]);
						name[0] = item["year"];
					} else if (item["y"] == 2) {
						year2.push(item["total"]);
						name[1] = item["year"];
					} else if (item["y"] == 3) {
						year3.push(item["total"]);
						name[2] = item["year"];
					} else {
						year4.push(item["total"]);
						name[3] = item["year"];
					}
				}
			}else{
				for(var _i = 0; _i < items.length; _i++) {
					let item = items[_i];
					if (item["y"] == 1) {
						year1.push(item["qty"]);
						name[0] = item["year"];
					} else if (item["y"] == 2) {
						year2.push(item["qty"]);
						name[1] = item["year"];
					} else if (item["y"] == 3) {
						year3.push(item["qty"]);
						name[2] = item["year"];
					} else {
						year4.push(item["qty"]);
						name[3] = item["year"];
					}
				}
			}
			var allYear = [year1, year2, year3, year4];
			this.barChartCreate(labels,name,allYear);
		});
		return check;
	 }

	radio_stock($event) {    
		this.currentRadio = $event.currentTarget.defaultValue;

		if(this.currentRadio=="Client"){
			this.markup="Client Code";
			this.type=1;
			document.getElementById("switch-button").style.display="none";
			//document.getElementById("codeField").placeholder="Loc for Pallet and Job";
		}

		if(this.currentRadio=="Supplier"){
			this.markup="Supplier Code";
			this.type=2;
			document.getElementById("switch-button").style.display="none";
			//document.getElementById("codeField").placeholder="Pallet for Loc and Job";
		}

		if(this.currentRadio=="Part"){
			this.markup="Part Code";
			this.type=3;
			document.getElementById("switch-button").style.display="block";
			// document.getElementById("codeField").placeholder="Job for Loc and Pallet";
		}

		if(this.currentRadio=="Material"){
			this.markup="Material Code";
			this.type=4;
			document.getElementById("switch-button").style.display="block";
			// document.getElementById("codeField").placeholder="Job for Loc and Pallet";
		}
	}

	enterSearch($event,id){
		if (($event.which == 13 || $event.keyCode == 13)) {
			this.Search(id);
		}
	}

	Search(id){
		var validate;
		this.data="";
		if(this.codeField!=""){
			if(this.type==1){
				validate = this.clientChart(id);
			}else if(this.type==2){
				validate = this.supplierChart(id);
			}else if(this.type==3){
				validate = this.partChart(id);
			}else if(this.type==4){
				validate = this.materialChart(id);
			}
			
			if(validate!=0){
				document.getElementById('barChart').style.display = 'block';
			}else{
				document.getElementById('barChart').style.display = 'none';	
				alert('There is no data match the input code');
			}
		}else{
			alert('The input code cannot be empty');
		}	
	}
}
