import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from '@angular/router';

import { LocationLookUpService } from '../../shared/services/locationlookup.service'
import { MaterialService } from '../../shared/services/material.service'

import 'style-loader!./smartTables.scss';

@Component({
  selector: 'location-lookup',
  templateUrl: './locationlookup.html',
})

export class LocationLookUp implements AfterViewInit{

  inputBarcode:string="";
  inputBinLocation:string="";
  currentRadio: string="";
  codeField:string="";

  markup:string="Default";

  status:string="";
  tableName:string;

  settings1 = {
    actions: false,
    columns: {
      code: {
        title: 'Location ID',
        type: 'text',
      },
      date: {
        title: 'Date',
        type: 'text',
      },
    }
  };

  settings2 = {
    actions: false,
    columns: {
      material: {
        title: 'Material ID',
        type: 'text',
      },
      date: {
        title: 'Date',
        type: 'text',
      },
    }
  };


  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  constructor(private locationlookupservice: LocationLookUpService, private materialservice: MaterialService) {

  }
  ngAfterViewInit(){
    if(screen.width > 420){
         
          document.getElementsByClassName('widgets')['0'].style.width = '420px';
          document.getElementById('material').style.width='400px';
          document.getElementById('location').style.width='400px';
      }
    }

  radio_stock(event) {    
    this.currentRadio = event.currentTarget.defaultValue;
    if(this.currentRadio=="inputBarcode"){
     this.markup="Bar Code";
     }

     if(this.currentRadio=="inputBinLocation"){
       this.markup="Location";
     }
  }


  check(event){
   this.codeField = this.codeField.replace(/\s/g, '');
   if(this.currentRadio!=""){
     if(this.codeField!=""){ 
       if(this.currentRadio=="inputBarcode"){
         this.locationlookupservice.getLocationByMaterialId(this.codeField).subscribe(res=>{
           if(res.json()["items"][0]["code"]!=" "){
             this.source1.load(res.json()["items"]);
              document.getElementById('material').style.display = 'block';
              document.getElementById('location').style.display = 'none';
            }else{
              alert("Wrong code id")
            }
         })
       }

       if(this.currentRadio=="inputBinLocation"){
         this.materialservice.getMaterialIdByLocationId(this.codeField).subscribe(res=>{
           if(res.json()["items"][0]["code"]!=" "){
             this.source2.load(res.json()["items"]);
             document.getElementById('material').style.display = 'none';
             document.getElementById('location').style.display = 'block';
           }else{
              alert("Wrong code id")
           }
         })
       }
     }else{
       alert("The input field cannot be empty");
     }
   }else{
      alert("Please select input type");
   }

  }

  // button_OUT(event) {
  //   //alert("OUT CLICKED");
  //   let json = {
  //     "material_code" : "",
  //     "barcode": this.inputBarcode,
  //     "bin_location" : this.inputBinLocation,
  //     "action" : "0"
  //   } 
  //   this.service.sendBinLocation(json).subscribe(res => {
  //       alert(res.json().message);
  //       this.inputBarcode="";
  //     this.inputBinLocation="";
  //     })

  // }

  // button_IN(event) {
  //   //alert("IN CLICKED");
  //   let json = {
  //     "material_code" : "",
  //     "barcode": this.inputBarcode,
  //     "bin_location" : this.inputBinLocation,
  //     "action" : "1"

  //   } 
  //   this.service.sendBinLocation(json).subscribe(res => {
  //       alert(res.json().message);
  //       this.inputBarcode="";
  //     this.inputBinLocation="";
  //     })

  // }

}
