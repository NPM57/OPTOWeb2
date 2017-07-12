import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PartService } from '../../shared/services/part.service'

import {Router} from '@angular/router';

@Component({
  selector: 'Part Group',
  templateUrl: './part.html',
  styleUrls: ['./smartTables.scss']

})

export class Part implements AfterViewInit{

  query: string = '';

  settings = {
    actions: false,
    columns: {
      code: {
        title: 'Code',
        type: 'text'
      },
      description: {
        title: 'Description',
        type: 'text'
      }
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private router:Router, 
    protected service: PartService) {
    this.service.getPartGroup().subscribe(res => {
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
    this.router.navigate(['pages/partlist', event.data.code]);    
  }
}