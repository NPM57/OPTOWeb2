import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from '@angular/router';

import { OrderService } from '../../shared/services/order.service';
import { OrderRender } from '../../shared/render/order-render.component';


@Component({
  selector: 'Order List',
  templateUrl: './order.html',
  styleUrls: ['./smartTables.scss']
})

export class Order implements AfterViewInit{

  query: string = '';
 

  settings = {
   actions: false,
    columns: {
      order_code: {
        title: 'ID',
        type: 'text'
      },
      customer_name: {
        title: 'Customer Name',
        type: 'text',
      },
       customer: {
        title: 'Customer ID',
        type: 'text'
      },
       contact_name: {
        title: 'Contact Name',
         type: 'text',
      },
      sum_one: {
        title: 'Total Price',
        type: 'custom',
        renderComponent: OrderRender,
       },
      // Column_4: {
      //   title: 'Project',
      //   type: 'string'
      // },
    }
  };
  source: LocalDataSource = new LocalDataSource();

    constructor( 
      private router:Router, 
      protected service:OrderService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });
    this.service.getOrder().subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.source.load(res.json()["items"]);
    })
  }
   ngAfterViewInit(){
    document.getElementsByClassName('order_code')['0'].style.width = '100px';
    document.getElementsByClassName('customer')['0'].style.width = '140px';
    document.getElementsByClassName('contact_name')['0'].style.width = '150px';
    document.getElementsByClassName('sum_one')['0'].style.width = '120px';
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  onRowSelect(event): void{
    this.router.navigate(['pages/orderdetail', event.data.order_code]);
  }

}