import {Component, ElementRef} from '@angular/core';
import { ClockTileService } from '../../shared/services/clocktile.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
//import 'style-loader!./tiles.scss';

@Component({
	selector: 'clock-tiles',
	templateUrl: './clocktiles.html'
})

export class ClockTiles {

	clocks: Observable<Array<any>>

	constructor(private router: Router, protected service: ClockTileService) {

	}

	ngOnInit() {
    	this.clocks = this.service.getClockTiles().map(response => response.json()["items"]);
	}

	button_details(event): void {
		this.router.navigate(['pages/clocktiles/details', "a"]); 
	}
}	