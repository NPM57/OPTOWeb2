import {Component, ElementRef} from '@angular/core';
import { ClockTileService } from '../../shared/services/clocktile.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';


@Component({
	selector: 'job-list',
	templateUrl: './joblist.html',
	styleUrls: ['./joblist.scss']
})

export class JobList {

	clocks: Observable<Array<any>>

	constructor(private router: Router, 
		protected service: ClockTileService) {

	}

	ngOnInit() {
    	this.clocks = this.service.getClockTiles().map(response => response.json()["items"]);
	}

	button_details(emp_id): void {
		// if( job_id == "No Job Start" || job_id == "No Job Start Today"){
		// 	alert("You need to start a job to get the detail information");
		// }else{
			//this.router.navigate(['pages/joblist/details', job_id]); 
			this.router.navigate(['pages/joblist/details', emp_id]);
		//}
	}
}	