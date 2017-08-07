import 'rxjs/add/operator/switchMap';

import {Component, ElementRef, AfterViewInit} from '@angular/core';

import { Location } from '@angular/common';

import { ActivatedRoute, Params } from '@angular/router';

import { SupplierService } from '../../../shared/services/supplier.service';
import { PartService } from '../../../shared/services/part.service';
import { OrderService } from '../../../shared/services/order.service';
import { MaterialService } from '../../../shared/services/material.service';
import { LocalDataSource } from 'ng2-smart-table';

import * as GoogleMapsLoader from 'google-maps';
import * as Chartist from 'chartist';

//Must install the plugin via npm (node module) before using
declare function require(path: string): any;
require('chartist-plugin-legend');
require('chartist-plugin-tooltip');

@Component({
	selector: 'supplier-details',
	styleUrls: ['./googleMaps.scss'],
	templateUrl: './supplierdetails.html',
})

export class SupplierDetails implements AfterViewInit{
     
	public inputSupplierCode:string;
	public inputSupplierName:string;
	public inputEmail:string;
	public inputWebsite:string;
	public inputPostalAddress1:string;
	public inputDeliveryAddress1:string;
	public inputPostalAddress2:string;
	public inputDeliveryAddress2:string;
	public inputPostalCity:string;
	public inputDeliveryCity:string;
	public inputPostalState:string;
	public inputDeliveryState:string;
	public inputPostalPostcode:string;
	public inputDeliveryPostcode:string;
	public inputPostalCountry:string;
	public inputDeliveryCountry:string;
	
	public data;
	public options;

	settings1 = {
		actions: false,
		columns: {
			code: {
				title: 'Code',
				type: 'string',
			},
			cust_part_no: {
				title: 'Part Number',
				type: 'string',
			},
			drawing_no: {
				title: 'Drawing Number',
				type: 'string'
			},
			part_description: {
				title: 'Description',
				type: 'string',
			},
			unit: {
				title: 'Unit',
				type: 'string',
			}
		}
	};

	settings2 = {
		actions: false,
		columns: {
			contact_name: {
				title: 'Contact Name',
				type: 'string',
			},
			customer: {
				title: 'Customer Code',
				type: 'string',
			},
			customer_name: {
				title: 'Customer Name',
				type: 'string'
			},
			order_code: {
				title: 'Order Code',
				type: 'string',
			},
			sum_one: {
				title: 'Price',
				type: 'string',
			}
		}
	};
	
	settings3 = {
		actions: false,
		columns: {
			client_code: {
				title: 'Client Code',
				type: 'string',
			},
			client_name: {
				title: 'Client Name',
				type: 'string',
			},
			e_mail: {
				title: 'Email',
				type: 'string'
			},
			state: {
				title: 'State',
				type: 'string',
			}
		}
	};

	source1: LocalDataSource = new LocalDataSource();
	source2: LocalDataSource = new LocalDataSource();
	source3: LocalDataSource = new LocalDataSource();



	constructor(private route: ActivatedRoute, 
		private location: Location, 
		private supplier_service: SupplierService, 
		private _elementRef:ElementRef, 
		private order_service: OrderService,
		private material_service: MaterialService,
		private part_service: PartService ) {
		//loadMap();	
	}

	ngOnInit() {
		var id:number;

		this.data = "";
		this.options = "";
		//this.data = this._chartistJsService.getAll();
		this.route.params.subscribe(params => {
			id = params['id'];
		});

		this.supplierChart(id);

		this.route.params
		.switchMap((params: Params) => this.material_service.getMaterialByClientId(params['id']))
		.subscribe(res => {
			this.source3.load(res.json()["items"]);
		});

		this.route.params
		.switchMap((params: Params) => this.part_service.getPartByClientId(params['id']))
		.subscribe(res => {
			this.source1.load(res.json()["items"]);
		});

		this.route.params
		.switchMap((params: Params) => this.order_service.getOrderByClientId(params['id']))
		.subscribe(res => {
			this.source2.load(res.json()["items"]);
		});
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

	checkItemEmpty(item_length){
		if(item_length > 0){
				var check=1;
			}else{
				var check=0;
		}
		return check;
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
			this.data = {
			  labels: labels,
			    series: [
			    {"name":name[0],"data":allYear[0].map(Number)},
			   	{"name":name[1],"data":allYear[1].map(Number)},
			   	{"name":name[2],"data":allYear[2].map(Number)},
			   	{"name":name[3],"data":allYear[3].map(Number)},
			  ]
			};
			console.log(this.data)
			new Chartist.Bar('.ct-chart', this.data,
			{
			 	height: '300px',
			 	seriesBarDistance: 10,
			 	plugins: [
            		Chartist.plugins.legend(),
            		Chartist.plugins.tooltip()
       		 	],
       		 	
       		});
	}

	ngAfterViewInit() {
		var el = this._elementRef.nativeElement.querySelector('.google-maps');
		this.route.params
		.switchMap((params: Params) => this.supplier_service.getSupplierDetails(params['id']))
		.subscribe(res => {
			this.inputSupplierCode = res.json()["items"][0]["supplier_code"];
			this.inputSupplierName = res.json()["items"][0]["supplier_name"];
			this.inputEmail = res.json()["items"][0]["email"];
			this.inputWebsite = res.json()["items"][0]["web_site"];
			this.inputPostalAddress1 = res.json()["items"][0]["address"];
			this.inputDeliveryAddress1 = res.json()["items"][0]["address_1"];
			this.inputPostalAddress2 = res.json()["items"][0]["addr1"];
			this.inputDeliveryAddress2 = res.json()["items"][0]["addr2"];
			this.inputPostalCity = res.json()["items"][0]["suburb"];
			this.inputDeliveryCity = res.json()["items"][0]["city_1"];
			this.inputPostalState = res.json()["items"][0]["state"];
			this.inputDeliveryState = res.json()["items"][0]["state_1"];
			this.inputPostalPostcode = res.json()["items"][0]["postcode"];
			this.inputDeliveryPostcode = res.json()["items"][0]["postcode_1"];
			this.inputPostalCountry = res.json()["items"][0]["postcode"];
			this.inputDeliveryCountry = res.json()["items"][0]["postcode_1"];
			
			// Address
			var address = res.json()["items"][0]["address1"] + "," + res.json()["items"][0]["address2"] + "," + res.json()["items"][0]["city"] + "," + res.json()["items"][0]["state"];
			
			// Load Google Map
			//this.loadGoogleMap(el, address);
		});
	}

	// loadGoogleMap(el, address) {
	// 	GoogleMapsLoader.load((google) => {
	// 		var map = new google.maps.Map(el, {
	// 			center: new google.maps.LatLng(-26.9968449, 153.3178702),
	// 			zoom: 16,
	// 			mapTypeId: google.maps.MapTypeId.ROADMAP
	// 		});
	// 		var geocoder = new google.maps.Geocoder();
	// 		this.geocodeAddress(geocoder, map, address);
	// 	});
	// }

	// geocodeAddress(geocoder, resultsMap, address) {
	// 	geocoder.geocode({'address': address}, function(results, status) {
	// 		if (status === 'OK') {
	// 			resultsMap.setCenter(results[0].geometry.location);
	// 			var marker = new google.maps.Marker({
	// 				map: resultsMap,
	// 				position: results[0].geometry.location
	// 			});
	// 		} else {
	// 			alert('Geocode was not successful for the following reason: ' + status);
	// 		}
	// 	});
	// }

}
