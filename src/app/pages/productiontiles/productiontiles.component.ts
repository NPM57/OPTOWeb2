import {Component, ElementRef} from '@angular/core';
import { ProductionTileService } from '../../shared/services/productiontile.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
//import 'style-loader!./tiles.scss';

@Component({
	selector: 'production-tiles',
	styleUrls: ['./tiles.scss'],
	templateUrl: './productiontiles.html'
})

export class ProductionTiles {

	productions: Observable<Array<any>>

	constructor(private router: Router, protected service: ProductionTileService) {

	}

	ngOnInit() {
    	this.productions = this.service.getProductionTiles().map(response => response.json()["tiles"]);
	}

	button_details(event): void {
		
	}
}	