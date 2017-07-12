import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { PartService } from '../../shared/services/part.service'
import {Router,ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'Part List',
  templateUrl: './partlist.html',
  styleUrls: ['./smartTables.scss']

})

export class PartList implements AfterViewInit  {

  query: string = '';
  public id:number;

  settings = {
   actions: false,
      columns: {
      code: {
        title: 'Part code',
        type: 'string'
      },
      cust_part_no: {
        title: 'Client part number',
        type: 'string'
      },
      drawing_no: {
        title: 'Drawing number',
        type: 'string'
      }, 
      for_customer: {
        title: 'Client code',
        type: 'string'
      },
      part_description: {
        title: 'Description',
        type: 'string'
      }, 
      unit: {
        title: 'Unit',
        type: 'string'
      },
   
      
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    protected service: PartService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });
    this.route.params.subscribe(params => {
            this.id = +params['id'];});

    this.service.getPartList(this.id).subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.source.load(res.json()["items"]);
    });
  }
  ngAfterViewInit() {
    //part list render
    document.getElementsByClassName('code')['0'].style.width = '100px';
      document.getElementsByClassName('cust_part_no')['0'].style.width = '100px';
      document.getElementsByClassName('drawing_no')['0'].style.width = '100px';
      document.getElementsByClassName('unit')['0'].style.width = '100px';
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // onRowSelect(event): void{
  //   this.router.navigate(['pages/partlist', event.data.code]); 
  // }
}