import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { PalletService } from '../../shared/services/pallet.service';
import 'style-loader!./buttons.scss';

@Component({
	selector: 'pallet',
	templateUrl: './pallet.html',
})

export class Pallet implements AfterViewInit{

	currentRadio:string='';
	inputPallet:string='';
	inputBinLocation:string='';
	inputJob:string='';
	inout:number=1;
	type:number;

	constructor(private service: PalletService) {
		
	}

	ngAfterViewInit(){
		if(screen.width > 420){
			document.getElementsByClassName('col-xs-6')['0'].style.width = '150px';
			document.getElementsByClassName('col-xs-6')['1'].style.width = '150px';
			document.getElementsByClassName('form-group')['0'].style.width = '300px';
			document.getElementsByClassName('form-group')['1'].style.width = '300px';
			document.getElementsByClassName('widgets')['0'].style.width = '400px';
		}
	}

	radio_stock(event) {    
		this.currentRadio = event.currentTarget.defaultValue;
		if(this.currentRadio=="PalletToLocation"){
			this.type=0;
			document.getElementById('PalletToLocation').style.display = 'block';
			document.getElementById('JobToPallet').style.display = 'none';
			if(this.inout==0){
				this.inputBinLocation="";
				document.getElementById('inputBinLocation').style.display = 'none';
				document.getElementById('BinLocation').style.display = 'none';
			}else{
				document.getElementById('inputBinLocation').style.display = 'block';
				document.getElementById('BinLocation').style.display = 'block';
			}
		}

		if(this.currentRadio=="JobToPallet"){
			this.type=1;
			document.getElementById('PalletToLocation').style.display = 'none';
			document.getElementById('JobToPallet').style.display = 'block';
		}
	}

	Switch(event) {
		if(this.inout==1){
			this.inout=0;
			if(this.inout==0){
				this.inputBinLocation="";
				document.getElementById('inputBinLocation').style.display = 'none';
				document.getElementById('BinLocation').style.display = 'none';
			}else{
				document.getElementById('inputBinLocation').style.display = 'block';
				document.getElementById('BinLocation').style.display = 'block';
			}
		}else{
			this.inout=1;
			if(this.inout==1){
				document.getElementById('inputBinLocation').style.display = 'block';
				document.getElementById('BinLocation').style.display = 'block';
			}else{
				document.getElementById('inputBinLocation').style.display = 'none';
				document.getElementById('BinLocation').style.display = 'none';
			}
		}
	}

	Update(event)	{
		console.log(this.type)
		let json = {
			"type":this.type,
			"pallet_code": this.inputPallet,
			"bin_location" : this.inputBinLocation.toUpperCase(),
			"job":this.inputJob,
			"action" : this.inout,
		}
		this.inputPallet = this.inputPallet.replace(/\s/g, '');

		if(this.inputPallet==""){
			alert("Input pallet cannot be empty");
			return;
		}else{
			if(this.inout==1){
				if(this.inputBinLocation == "" && this.currentRadio == "PalletToLocation"){
					alert("Input location field cannot be empty");
					return;
				}else if(this.inputJob == "" && this.currentRadio == "JobToPallet"){
					alert("Input job field cannot be empty");
					return;
				}else{
					this.service.sendPallet(json).subscribe(res => {
						alert(res.json().message);
						this.inputJob="";
						this.inputBinLocation="";
					})	
				}

			}else{
				
				if(this.inputJob == "" && this.currentRadio == "JobToPallet"){
					alert("Input job field cannot be empty");
					return;
				}else{
					this.service.sendPallet(json).subscribe(res => {
						alert(res.json().message);
						this.inputJob="";
						this.inputBinLocation="";
					})
				}
				
			}
		}

	}
}