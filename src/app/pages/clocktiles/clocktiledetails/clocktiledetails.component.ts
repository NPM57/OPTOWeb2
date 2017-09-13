import {Component, ElementRef} from '@angular/core';
import { ClockTileService } from '../../../shared/services/clocktile.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'clock-tile-details',
	templateUrl: './clocktiledetails.html',
	styleUrls: ['./clocktiledetails.scss']
})

export class ClockTileDetails {

	public part_code:string;
	public part_description:string;
	public qty:number;
	public total_time:number;
	public processes: any;
	public id:string;
	public wc_id:string;
	public es_time:string;


	constructor(protected service: ClockTileService,
				private route: ActivatedRoute) {

	}

	

	ngOnInit() {
    	this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		this.route.params.subscribe(params => {
			this.wc_id = params['wc'];
		});
    	this.service.getClockTileDetails(this.id).subscribe(res=>{
    		this.part_code = res.json()["Part_code"];
    		this.part_description = res.json()["Part_description"];
    		this.qty = res.json()["Qty"];
    		this.total_time = res.json()["Total_time"];
    		this.es_time = this.total_time + " min";
    		this.processes = res.json()["Processes"];
    	})
	}
}	