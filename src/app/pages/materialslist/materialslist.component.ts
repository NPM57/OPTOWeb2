import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router,ActivatedRoute, Params} from '@angular/router';

import { MaterialService } from '../../shared/services/material.service'
import { MaterialListRender } from '../../shared/render/material-list-render.component';

import 'style-loader!./smartTables.scss';

@Component({
  selector: 'materialslist',
  templateUrl: './materialslist.html',
  styleUrls: ['./smartTables.scss']

})

export class MaterialsList implements AfterViewInit{

  query: string = '';
  public id:number;

  settings = {
    actions: false,
      columns: {
      material_code: {
        title: 'Material Code',
        type: 'text'
      },
      description: {
        title: 'Description',
        type: 'text'
      },
      cash_p_m: {
        title: 'Price',
        type: 'custom',
        renderComponent: MaterialListRender
      },
      stock: {
        title: 'Stock',
        type: 'text'
      },
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    protected service: MaterialService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });
    this.route.params.subscribe(params => {
            this.id = +params['id'];});

    this.service.getMaterialList(this.id).subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.source.load(res.json()["_embedded"]["materials"]);
    });
  }
    ngAfterViewInit(){
    document.getElementsByClassName('material_code')['0'].style.width = '100px';
    document.getElementsByClassName('cash_p_m')['0'].style.width = '100px';
    document.getElementsByClassName('stock')['0'].style.width = '100px';
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRowSelect(event): void{
    this.router.navigate(['pages/materialdetail', event.data.material_code]); 
  }
}