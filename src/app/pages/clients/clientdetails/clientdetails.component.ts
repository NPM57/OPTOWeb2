import 'rxjs/add/operator/switchMap';

import {Component, ElementRef, OnInit, AfterViewInit} from '@angular/core';

import { Location } from '@angular/common';

import { LocalDataSource } from 'ng2-smart-table';

import { ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../../shared/services/client.service';

import { PartService } from '../../../shared/services/part.service';
import { OrderService } from '../../../shared/services/order.service';
import { MaterialService } from '../../../shared/services/material.service';

import { ClientDetailRender } from '../../../shared/render/client-detail-render.component';

import * as GoogleMapsLoader from 'google-maps';

import * as Chartist from 'chartist';

//Must install the plugin via npm (node module) before using
declare function require(path: string): any;
require('chartist-plugin-legend');
require('chartist-plugin-tooltip');

@Component({
	selector: 'client-details',
	styleUrls: ['../smartTables.scss'],
	templateUrl: './clientdetails.html',
})

export class ClientDetails implements AfterViewInit {

	inputClientCode:string;
	inputClientName:string;
	inputCountryCode:string;
	inputEmail:string;
	inputWebsite:string;
	inputPostalAddress1:string;
	inputDeliveryAddress1:string;
	inputPostalAddress2:string;
	inputDeliveryAddress2:string;
	inputPostalCity:string;
	inputDeliveryCity:string;
	inputPostalState:string;
	inputDeliveryState:string;
	inputPostalPostcode:string;
	inputDeliveryPostcode:string;
	public data;
	public options;

	settings1 = {
		actions: false,
		columns: {
			code: {
				title: 'Code',
				type: 'text',
			},
			cust_part_no: {
				title: 'Part Number',
				type: 'text',
			},
			drawing_no: {
				title: 'Drawing Number',
				type: 'text',
			},
			part_description: {
				title: 'Description',
				type: 'text',
			},
			unit: {
				title: 'Unit',
				type: 'text',
			}
		}
	};

	settings2 = {
		actions: false,

		columns: {
			order_code: {
				title: 'Order Code',
				type: 'text',
			},
			customer_name: {
				title: 'Customer Name',
				type: 'text'
			},
			customer: {
				title: 'Customer Code',
				type: 'text',
			},
			contact_name: {
				title: 'Contact Name',
				type: 'text',
			},
			sum_one: {
				title: 'Price',
				type: 'text',
				renderComponents: ClientDetailRender,
			},
		}
	};
	
	settings3 = {
		actions: false,
		columns: {
			client_code: {
				title: 'Client Code',
				type: 'text',
			},
			client_name: {
				title: 'Client Name',
				type: 'text',
			},
			e_mail: {
				title: 'Email',
				type: 'text',
			},
			state: {
				title: 'State',
				type: 'text',
			}
		}
	};

	
	source1: LocalDataSource = new LocalDataSource();
	source2: LocalDataSource = new LocalDataSource();
	source3: LocalDataSource = new LocalDataSource();

	constructor(
		private route: ActivatedRoute, 
		private location: Location,
		private order_service: OrderService,
		private material_service: MaterialService,
		private part_service: PartService, 
		private client_service: ClientService,
		private _elementRef:ElementRef) {
		

	}

	ngOnInit() {
		var id:number;

		this.data = "";
		this.options = "";

		this.route.params.subscribe(params => {
			id = params['id'];
		});

		this.clientChart(id);

		this.part_service.getPartByClientId(id).subscribe(res=> {
			this.source1.load(res.json()["items"]);
		})

		this.order_service.getOrderByClientId(id).subscribe(res=> {
			this.source2.load(res.json()["items"]);
		})

		this.material_service.getMaterialByClientId(id).subscribe(res=> {
			this.source3.load(res.json()["items"]);
		})
		//this.data = this._chartistJsService.getAll();
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
		//part list render
		// document.getElementsByClassName('code')['0'].style.width = '100px';
  //   	document.getElementsByClassName('cust_part_no')['0'].style.width = '100px';
  //   	document.getElementsByClassName('drawing_no')['0'].style.width = '100px';
  //   	document.getElementsByClassName('unit')['0'].style.width = '100px';
  //   	// //order list render
  //   	document.getElementsByClassName('order_code')['0'].style.width = '100px';
	 //    document.getElementsByClassName('customer')['0'].style.width = '100px';
	 //    document.getElementsByClassName('contact_name')['0'].style.width = '150px';
	 //    document.getElementsByClassName('sum_one')['0'].style.width = '100px';
    	// //material list render
	    // document.getElementsByClassName('client_code')['0'].style.width = '100px';
	    // document.getElementsByClassName('e_mail')['0'].style.width = '180px';
	    // document.getElementsByClassName('state')['0'].style.width = '50px';

		let el = this._elementRef.nativeElement.querySelector('.google-maps');
		this.route.params
		.switchMap((params: Params) => this.client_service.getClientDetails(params['id']))
		.subscribe(res => {
			this.inputClientCode = res.json()["items"][0]["client_code"];
			this.inputClientName = res.json()["items"][0]["client_name"];
			this.inputCountryCode = res.json()["items"][0]["country_code"];

			this.inputEmail = res.json()["items"][0]["e_mail"];
			this.inputWebsite = res.json()["items"][0]["web_site"];

			this.inputPostalAddress1 = res.json()["items"][0]["address1"];
			this.inputDeliveryAddress1 = res.json()["items"][0]["postal_address1"];
			this.inputPostalAddress2 = res.json()["items"][0]["address2"];
			this.inputDeliveryAddress2 = res.json()["items"][0]["postal_address2"];

			this.inputPostalCity = res.json()["items"][0]["city"];
			this.inputDeliveryCity = res.json()["items"][0]["postal_city"];

			this.inputPostalState = res.json()["items"][0]["state"];
			this.inputDeliveryState = res.json()["items"][0]["state"];

			this.inputPostalPostcode = res.json()["items"][0]["postcode"];
			this.inputDeliveryPostcode = res.json()["items"][0]["postal_postcode"];

			// Address
			var address = res.json()["items"][0]["address1"] + "," + res.json()["items"][0]["address2"] + 
			"," + res.json()["items"][0]["city"] + "," + res.json()["items"][0]["state"];

			// Load Google Map
			this.GoogleMap(el, address);
		});
	}

		public GoogleMap(el,address){

				GoogleMapsLoader.load((google) => {
					var map = new google.maps.Map(el, {
						center: new google.maps.LatLng(-26.9968449, 153.3178702),
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					});
					 var geocoder = new google.maps.Geocoder();
					// geocodeAddress(geocoder, map, address);
						geocoder.geocode({'address': address}, function(results, status) {
						if (status === 'OK') {
							map.setCenter(results[0].geometry.location);
							GoogleMapsLoader.load((google) => {
								var marker = new google.maps.Marker({
									map: map,
									position: results[0].geometry.location
								});
							});
						} else {
							alert('Cannot identify location since the addresses are missing ' + status);
						}
					});
				});
		}
		


}
