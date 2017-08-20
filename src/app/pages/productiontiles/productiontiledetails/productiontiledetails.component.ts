import {Component, ElementRef} from '@angular/core';
import { ProductionTileService } from '../../../shared/services/productiontile.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'production-tile-details',
	templateUrl: './productiontiledetails.html',
	styleUrls: ['./productiontiledetails.scss']
})

export class ProductionTileDetails {

	public orders:any;

	public client_code: any;
	public client_name:string;
	public id:number;


	constructor(protected service: ProductionTileService,
				private route: ActivatedRoute) {

	}

	ngOnInit() {
    	this.route.params.subscribe(params => {
			this.id = params['id'];
		});
    	this.service.getProductionTileDetails(this.id).subscribe(res=>{
    		this.orders = res.json()["Orders"]

    		this.client_code = res.json()["Client_code"];
    		this.client_name = res.json()["Client_name"];
    	})
	}
}	