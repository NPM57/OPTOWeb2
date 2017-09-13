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
	sub_prod: Observable<Array<any>>
	summary:number=0;

	constructor(private router: Router, protected service: ProductionTileService) {

	}

	ngOnInit() {
    	this.productions = this.service.getProductionTiles().map(response => response.json()["tiles"]);
    	this.sub_prod=this.productions;
	}

	button_details(id): void {
		this.router.navigate(['pages/productiontiles/details', id]); 

	}
	summary_details(id): void {
		this.summary = 1;
		document.getElementsByClassName('widgets')['0'].style.display = 'none';
		document.getElementById("summary").style.display = 'block';
	}
	back_state():void{
		this.summary = 0;
		document.getElementsByClassName('widgets')['0'].style.display = 'block';
		document.getElementById("summary").style.display = 'none';
	}
}	