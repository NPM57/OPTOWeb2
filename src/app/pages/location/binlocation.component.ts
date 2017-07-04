import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { BinLocationService } from '../../shared/services/binlocation.service';

@Component({
  selector: 'bin-location',
  styleUrls: ['./buttons.scss'],
  templateUrl: './binlocation.html',
})

export class BinLocation implements AfterViewInit{

	inputBarcode:string;
	inputBinLocation:string;

	constructor(private service: BinLocationService) {
	  
	}

	ngAfterViewInit(){
		if(screen.width > 420){
      		document.getElementsByClassName('col-sm-6')['0'].style.width = '150px';
      		document.getElementsByClassName('col-sm-6')['1'].style.width = '150px';
      		document.getElementsByClassName('form-group')['0'].style.width = '300px';
      		document.getElementsByClassName('form-group')['1'].style.width = '300px';
      		document.getElementsByClassName('widgets')['0'].style.width = '400px';
    	}
  	}

	button_OUT(event) {
		//alert("OUT CLICKED");
		let json = {
			"material_code" : "",
			"barcode": this.inputBarcode,
			"bin_location" : this.inputBinLocation,
			"action" : "0"
		} 
		this.service.sendBinLocation(json).subscribe(res => {
    		alert(res.json().message);
    		this.inputBarcode="";
			this.inputBinLocation="";
    	})

	}

	button_IN(event) {
		//alert("IN CLICKED");
		let json = {
			"material_code" : "",
			"barcode": this.inputBarcode,
			"bin_location" : this.inputBinLocation,
			"action" : "1"

		} 
		this.service.sendBinLocation(json).subscribe(res => {
    		alert(res.json().message);
    		this.inputBarcode="";
			this.inputBinLocation="";
    	})

	}

}
