import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from '@angular/router';

import { MaterialService } from '../../shared/services/material.service'
import { MaterialRender } from '../../shared/render/material-render.component';


@Component({
  selector: 'Material Group',
  templateUrl: './material.html',
  styleUrls: ['./smartTables.scss']

})

export class Material implements AfterViewInit {

  query: string = '';

  settings = {
    actions: false,
    columns: {
      code: {
        title: 'Code',
        type: 'custom',
        renderComponent:MaterialRender
      },
      description: {
        title: 'Description',
        type: 'text'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router:Router, 
    protected service: MaterialService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });
    this.service.getMaterialGroup().subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.source.load(res.json()["_embedded"]["item"]);
    })
  }

  ngAfterViewInit(){
    document.getElementsByClassName('code')['0'].style.width = '100px';
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onRowSelect(event): void{
    //debugger;
    this.router.navigate(['pages/materialslist', event.data.code]);    
  }
}