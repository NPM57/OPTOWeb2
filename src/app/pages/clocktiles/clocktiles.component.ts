import {Component, ElementRef} from '@angular/core';
import { ClockTileService } from '../../shared/services/clocktile.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';


@Component({
	selector: 'clock-tiles',
	templateUrl: './clocktiles.html',
	styleUrls: ['./tiles.scss']
})

export class ClockTiles {

	clocks: Observable<Array<any>>

	constructor(private router: Router, protected service: ClockTileService) {

	}

	ngOnInit() {
    	this.clocks = this.service.getClockTiles().map(response => response.json()["items"]);
	}

	button_details(job_id): void {
		if( job_id == "No Job Start" || job_id == "No Job Start Today"){
			alert("You need to start a job to get the detail information");
		}else{
			this.router.navigate(['pages/clocktiles/details', job_id]); 
		}
	}
}	