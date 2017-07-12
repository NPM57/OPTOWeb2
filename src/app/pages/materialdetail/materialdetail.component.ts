import {Component, ElementRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MaterialService } from '../../shared/services/material.service'

import {Router,ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'Material Detail',
  templateUrl: './materialdetail.html',
  styleUrls: ['./smartTables.scss']

})

export class MaterialDetail {


  inputMaterialID:string;
  inputMaterialDescription:string;
  inputMaterialPrice:string;
  inputMaterialStock:string;

  settings = {
    actions: false,
    columns: {
      ID: {
        title: 'Material ID',
        type: 'string'
      },
      cash_p_m: {
        title: 'Price',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
   
      stock: {
        title: 'Stock',
        type: 'string'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    //private router:Router, 
    private route:ActivatedRoute,
    protected service: MaterialService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });
    var code:string="";
    this.route.params.subscribe(params => {
            code = params["code"];});

    // this.service.getMaterialDetails(this.code).subscribe(res => {
    //     //alert(JSON.stringify(res.json()));
    //     this.source.load(res.json()["items"]);
    //   });

    this.service.getMaterialDetails(code).subscribe(res => {
      this.inputMaterialID = res.json()["items"][0]["ID"];
      this.inputMaterialDescription = res.json()["items"][0]["description"];
      this.inputMaterialPrice = res.json()["items"][0]["cash_p_m"];
      this.inputMaterialStock = res.json()["items"][0]["stock"];
     
    });
  
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  // onRowSelect(event): void{
  //   debugger;
  //   this.router.navigate(['pages/materialslist', event.data.code]);    
  // }
}