import {Component, ElementRef} from '@angular/core';
import { ClockTileService } from '../../../shared/services/clocktile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'clock-tile-details',
	templateUrl: './clocktiledetails.html'
})

export class ClockTileDetails {


	constructor(protected service: ClockTileService) {

	}

	ngOnInit() {
    	
	}
}	