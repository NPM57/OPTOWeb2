import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

import { ClientService } from '../../shared/services/client.service';
import { ClientsRender } from '../../shared/render/clients-render.component';

@Component({
  selector: 'clients',
  templateUrl: './clients.html',
  styleUrls: ['./smartTables.scss']
})

export class Clients implements AfterViewInit {
  query: string = '';

  settings = {
    actions: false,
    columns: {
      client_code: {
        title: 'Client Code',
        type: 'text'
      },
      client_name: {
        title: 'Client Name',
        type: 'text'
      },
      e_mail: {
        title: 'Email',
        type: 'text'
      },
      state: {
        title: 'State',
        type: 'text'
      }
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, protected service: ClientService) {
    this.service.getClients().subscribe(res => {
    	this.source.load(res.json()["items"]);
    })
  }

 ngAfterViewInit(){
    document.getElementsByClassName('client_code')['0'].style.width = '150px';
    document.getElementsByClassName('e_mail')['0'].style.width = '200px';
    document.getElementsByClassName('state')['0'].style.width = '80px';
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRowSelect(event): void {
  	this.router.navigate(['pages/clients/details', event.data.client_code]); 
  }
}