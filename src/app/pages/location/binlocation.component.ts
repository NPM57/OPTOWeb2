import {HostListener, Component, ViewChild, AfterViewInit} from '@angular/core';
import { BinLocationService } from '../../shared/services/binlocation.service';

@Component({
  selector: 'bin-location',
  styleUrls: ['./buttons.scss'],
  templateUrl: './binlocation.html',
})

export class BinLocation implements AfterViewInit{

	inputBarcode:string="";
	inputBinLocation:string="";
	mode:string;
	mode_type:number;
	hiddentext:string="";

	scan_data:string;

	constructor(private service: BinLocationService) {
	  this.mode_type = 1;
	  this.mode='Scan';
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

	
  	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if(this.mode_type==1){
		  let x = event.keyCode;
		  let character = event.key;
		  if (x != 13) {
		  	this.hiddentext= this.hiddentext+character;
		  }else if(x===13 && this.inputBarcode!=""){
		  	this.inputBinLocation=this.hiddentext;
		  	this.hiddentext="";
		  }else{
		  	this.inputBarcode=this.hiddentext;
		  	this.hiddentext="";
		  }
		}
	}

  	modeSelected($event){
  		if(this.mode_type==1){
  			this.mode_type=2;
  			this.mode='Keyboard';
  			$( "#inputBarcode" ).focus();
  		}else{
  			this.mode_type=1;
  			this.mode='Scan';
  		}
  	}

  	clearInput($event){
  		if($event.srcElement.value==1){
  			this.inputBarcode="";
  			$('#clearbar').blur();
  		}else{
  			this.inputBinLocation="";
  			$('#clearbin').blur();
  		}
   	}

  	stopKeyboard($event){
  		if(this.mode_type==1){
	  		$('#inputBarcode').blur();
	  		$('#inputBinLocation').blur();
  		}
  	}

	barCodeHandle($event) {	
        if (($event.which == 13 || $event.keyCode == 13)) {
	       	if($event.target.value != "" && this.mode_type==2){
		       $( "#inputBinLocation" ).focus();
		    }
		}
    }

    binHandle($event) {
        if (($event.which == 13 || $event.keyCode == 13) && this.mode_type==2) {
	        $("#inputBinLocation").blur();

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
			$( "#inputBarcode" ).focus();
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
			$( "#inputBarcode" ).focus();
    	})

	}

}
