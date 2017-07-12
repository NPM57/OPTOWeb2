import {Component, ElementRef, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

import { SupplierService } from '../../shared/services/supplier.service';
import { SupplierRender } from '../../shared/render/supplier-render.component';


@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./smartTables.scss'],
})

export class Suppliers implements AfterViewInit{
  query: string = '';

  settings = {
    actions: false,
    columns: {
      supplier_code: {
        title: 'Supplier Code',
        type: 'string'
      },
      supplier_name: {
        title: 'Supplier Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      state: {
        title: 'State',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, protected service: SupplierService) {
    this.service.getSuppliers().subscribe(res => {
    	this.source.load(res.json()["items"]);
    })
  }

  ngAfterViewInit(){
    document.getElementsByClassName('supplier_code')['0'].style.width = '150px';
    document.getElementsByClassName('email')['0'].style.width = '200px';
    document.getElementsByClassName('state')['0'].style.width = '80px';
  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  onRowSelect(event): void {
  	this.router.navigate(['pages/suppliers/details', event.data.supplier_code]); 
  }
}