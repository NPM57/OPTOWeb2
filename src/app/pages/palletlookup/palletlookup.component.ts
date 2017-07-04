import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from '@angular/router';

import { PalletLookUpService } from '../../shared/services/palletlookup.service'


import 'style-loader!./smartTables.scss';

@Component({
  selector: 'pallet-lookup',
  templateUrl: './palletlookup.html',
})

export class PalletLookUp implements AfterViewInit{

  inputJob:string="";
  inputBinLocation:string="";
  inputPallet:string="";
  currentRadio: string="";
  codeField:string="";
  type:number=0;

  markup:string="Default";

  status:string="";
  tableName:string;

  //search by Job
  settings1 = {
    actions: false,
    columns: {
      location: {
        title: 'Loc',
        type: 'text',
      },
      pallet: {
        title: 'Pallet',
        type: 'text',
      },
      job: {
        title: 'Job',
        type: 'text',
      },
      date: {
        title: 'Date',
        type: 'text',
      },
      description: {
        title: 'Desc',
        type: 'text',
      },
    }
  };

  source1: LocalDataSource = new LocalDataSource();
  constructor(private palletlookupservice: PalletLookUpService) {
  }

  ngAfterViewInit(){
    if(screen.width > 420){
          document.getElementsByClassName('widgets')['0'].style.width = '400px';
      }
    }

  radio_stock(event) {    
    this.currentRadio = event.currentTarget.defaultValue;

     if(this.currentRadio=="Location"){
       this.markup="Loc for Pallet and Job";
       this.type=1;
       //document.getElementById("codeField").placeholder="Loc for Pallet and Job";
     }

     if(this.currentRadio=="Pallet"){
       this.markup="Pallet for Loc and Job";
       this.type=2;
       //document.getElementById("codeField").placeholder="Pallet for Loc and Job";
     }

     if(this.currentRadio=="Job"){
       this.markup="Job for Loc and Pallet";
       this.type=3;
       // document.getElementById("codeField").placeholder="Job for Loc and Pallet";
     }

   
  
  }


  check(event){
     document.getElementById('table').style.display = 'block';
   if(this.type!=0){
     if(this.codeField!=""){ 
       this.codeField=this.codeField.toUpperCase();
       if(this.type==1){
         this.palletlookupservice.getPalletRecByLoc(this.codeField).subscribe(res=>{
           if(res.json()["items"]!=""){
             this.source1.load(res.json()["items"]);
            }else{
              alert("Location id is not exist")
            }
         })
       }else if(this.type==2){
         this.palletlookupservice.getPalletRecByPallet(this.codeField).subscribe(res=>{
           if(res.json()["items"]!=""){
             this.source1.load(res.json()["items"]);
           }else{
              alert("Pallet code is not exist")
           }
         })
       }else{
         this.palletlookupservice.getPalletRecByJob(this.codeField).subscribe(res=>{
           if(res.json()["items"]!=""){
             this.source1.load(res.json()["items"]);
           }else{
              alert("Job No is not exist")
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

}
