import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { WorkCenterService } from '../../shared/services/workcenter.service';
import { SharedService } from '../../shared/services/shared.service';


@Component({
  selector: 'workcenter',
  templateUrl: './workcenter.html',
   styleUrls: ['./buttons.scss']
})

export class WorkCenter implements OnInit{

  tableData:any;


	constructor(private router:Router, 
    protected service: WorkCenterService,
    public shared_service: SharedService) {
		
	}

  ngOnInit(){
    this.service.getWorkCenterList().subscribe(res => {
        this.tableData = res.json()["items"];
    })
  }

	onRowSelect(id,des):void{
    this.shared_service.setWorkCenterDescription(des);
    this.router.navigate(['pages/workcenterdetail', id]);    
  }

}
