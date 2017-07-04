import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router,ActivatedRoute, Params} from '@angular/router';

import { OrderService } from '../../shared/services/order.service';
import { OrderDetailRender } from '../../shared/render/order-detail-render.component';

import 'style-loader!./smartTables.scss';

@Component({
  selector: 'Order Detail',
  templateUrl: './orderdetail.html',
})

export class OrderDetail implements AfterViewInit{

  query: string = '';
  public id:number;

  settings = {
    actions: false,
    columns: {
      ma: {
        title: 'Discount',
        type: 'text'
      },
      part_code_one: {
        title: 'Part Code',
        type: 'text'
      },
      part_desc: {
        title: 'Description',
        type: 'text'
      },
      sum_one: {
        title: 'Total Price',
        type: 'custom',
        renderComponent: OrderDetailRender,
      },
      total_amount_one: {
        title: 'Price',
        type: 'custom',
        renderComponent: OrderDetailRender,
      },
      total_qty: {
        title: 'Quantity',
        type: 'text'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    //private router:Router,
    private route:ActivatedRoute,
    protected service:OrderService) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });

    this.route.params.subscribe(params => {
            this.id = +params['id'];});
 
    this.service.getOrderDetail(this.id).subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.source.load(res.json()["items"]);
    });
  }

   ngAfterViewInit(){
    document.getElementsByClassName('total_qty')['0'].style.width = '80px';
    document.getElementsByClassName('total_amount_one')['0'].style.width = '80px';
    document.getElementsByClassName('sum_one')['0'].style.width = '80px';
    document.getElementsByClassName('ma')['0'].style.width = '80px';
    document.getElementsByClassName("part_code_one")['0'].style.width = '80px';
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


}