import {Component, ElementRef, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Rx';
import {Router} from '@angular/router';
import { WorkCenterService } from '../../shared/services/workcenter.service';


@Component({
  selector: 'workcenter',
  templateUrl: './workcenter.html',
   styleUrls: ['./buttons.scss']
})

export class WorkCenter implements OnInit{

  tableData:any;



	constructor(private router:Router, 
    protected service: WorkCenterService) {
		
	}

  ngOnInit(){
    this.service.getWorkCenterList().subscribe(res => {
        //alert(JSON.stringify(res.json()));
        this.tableData = res.json()["items"];
    })
  }

	onRowSelect(id):void{
    //debugger;
    this.router.navigate(['pages/workcenterdetail', id]);    
  }

}
