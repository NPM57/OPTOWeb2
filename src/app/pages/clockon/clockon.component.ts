import {Component, HostListener, ElementRef, AfterViewInit} from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { ClockOnService } from '../../shared/services/clockon.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';


@Component({
	selector: 'clock-on',
	templateUrl: './clockon.html',
	 styleUrls: ['./switch.scss']
})


export class ClockOn implements AfterViewInit {

	public curr_code:string="";
	private curr_page:number;
	public status_emp:string="";
	public status_date:string="";
	public status_time:string="";
	public status_clock_on:string="";

	private activate:number;

	private employee_id:string="";
	private employee_name:string="";
	private job_number:string="";
	private job_on_time:string="";
	private wc_code:string="";

	private remainingtime:number;
	
	private clock_on:number;
	private clock_on_time:number;
	private clock_on_date:string="";
	
	public workcenters:any;
	public work_center_desc:any;


	clocks: Observable<Array<any>>

	constructor(private router: Router, protected employeeservice: EmployeeService, protected clockonservice:ClockOnService) {
		this.curr_page=1;
	}

	ngOnInit() {
			$("#myonoffswitch").click(function() {
			if($("#myonoffswitch").val()==1){
				$("#myonoffswitch").val(0);
			}
			else{
				$("#myonoffswitch").val(1);
			}
		});
	}

	ngAfterViewInit(){
		if(screen.width > 420){
      		document.getElementsByClassName('form-group')['0'].style.width = '150px';
			document.getElementsByClassName('form-group')['1'].style.width = '150px';
			document.getElementsByClassName('form-group')['2'].style.width = '150px';      		
      		document.getElementsByClassName('widgets')['0'].style.width = '700px';
    	}
  	}

	One(event): void {
		this.curr_code=this.curr_code+"1";
	}
	Two(event): void {
		this.curr_code=this.curr_code+"2";
	}
	Three(event): void {
		this.curr_code=this.curr_code+"3";
	}
	Four(event): void {
		this.curr_code=this.curr_code+"4";
	}
	Five(event): void {
		this.curr_code=this.curr_code+"5";
	}
	Six(event): void {
		this.curr_code=this.curr_code+"6";
	}
	Seven(event): void {
		this.curr_code=this.curr_code+"7";
	}
	Eight(event): void {
		this.curr_code=this.curr_code+"8";
	}
	Nine(event): void {
		this.curr_code=this.curr_code+"9";
	}
	Zero(event): void {
		this.curr_code=this.curr_code+"0";
	}

	Clear(event): void {
		this.curr_code="";
	}

	Minus(event): void {
		this.curr_code=this.curr_code+"-";
	}

	Add(event): void {
		this.curr_code=this.curr_code+"+";
	}

	Next(event): void {

		if(this.curr_code!=""){
			//console.log("not empty")
			if(this.curr_page==1){
				this.clockonservice.getAllInformation(this.curr_code).subscribe(res=>{
					this.activate=res.json()["active"];
					this.clock_on=res.json()["clocked_on"];
					this.clock_on_date=res.json()["clocked_on_date"];
					this.clock_on_time=res.json()["clocked_on_time"];
					this.employee_id=res.json()["employee_id"];
					this.employee_name=res.json()["employee_name"];
					this.job_number=res.json()["job_number"];
					this.job_on_time=res.json()["job_on_time"];
					this.remainingtime=res.json()["remaining_time"];
					this.workcenters=res.json()["workcenter_desc"];
					this.work_center_desc=res.json()["workcenters"];
					
					if(this.activate==1){
						//check if active
						//console.log("active");
						if(this.clock_on==1){
							//if already clock on --> only clock off day/job & finish job or not
							document.getElementById('section2').style.display = 'block';
							this.Status(event.click);
							//console.log($("#myonoffswitch").val())
							//console.log("clock on");
						}else{
							//if not clock on --> clock on and move to job screen
							//call API clock on (send)
							//console.log("begin to clock on");

							this.clockonservice.clockOn(this.curr_code).subscribe(res=>{
								this.clock_on_date=res.json()["date"];
								this.clock_on_time=res.json()["time"];
								document.getElementById('job').style.display = 'block';
								document.getElementById('emp').style.display = 'none';
								document.getElementById('wc').style.display = 'none';
								(<HTMLInputElement>document.getElementById("status")).disabled = true;
								this.status_emp="The employee: "+this.employee_name+" ("+this.employee_id+") clock on at:";
								this.status_time="Time: "+this.clock_on_time;
								this.status_date="Date: "+this.clock_on_date;
								this.curr_code="";
								this.curr_page=2;
							})
						
						}
					}else{
						alert("The employee id is incorrect or unactivate");
					}
				})
				return;
			}
			if(this.curr_page==2){
				this.clockonservice.getWorkCenterByJobId(this.curr_code).subscribe(res=>{
					if(res.json()["found"]=="1"){
						document.getElementById('job').style.display = 'none';
						document.getElementById('emp').style.display = 'none';
						document.getElementById('wc').style.display = 'block';
						this.job_number=this.curr_code;
						this.workcenters = this.clockonservice.getWorkCenterByJobId(this.curr_code).map(response => response.json()["workcenters"]);

						this.curr_code="okay";
						this.curr_page=3;
						
					}
					else{
						alert("Wrong Job Id");
					}
				})
			}

			if(this.curr_page==3){
				this.wc_code=$("#wc-number").val();
				console.log(this.wc_code);
				this.clockonservice.startJob(this.employee_id,this.job_number,this.wc_code).subscribe(res=>{
					document.getElementById('job').style.display = 'none';
					document.getElementById('emp').style.display = 'block';
					document.getElementById('wc').style.display = 'none';
					(<HTMLInputElement>document.getElementById("status")).disabled = false;

					let re = /\^/g; 
					//var newstr = str.replace(re, " "); 
					let tmp1=res.json()["response_message"];
					this.status_emp=tmp1.replace(re," ");

					let tmp2=res.json()["job_message"];
					this.status_clock_on=tmp2.replace(re," ");

					let tmp3 =res.json()["clock_message"];
					this.status_time=tmp3;
					this.status_date="";

					this.wc_code=this.curr_code;
					this.curr_code="";
					this.curr_page=1;
					return;
				})
			}
		}else{
			alert("Please input the number");
		}

		
	}

	Status(event): void {
		if(this.curr_code!=""){
			this.clockonservice.getAllInformation(this.curr_code).subscribe(res=>{
				if(res.json()["employee_id"]==this.curr_code){
					this.status_emp="The status of employee: "+res.json()["employee_name"]+" - "+this.curr_code;
					if(res.json()["clocked_on"]==1){
						this.status_clock_on="This employee is clock on at:"
						this.status_time="Clock on time: "+res.json()["clocked_on_time"]+" (hh:mm)";
						this.status_date="Clock on date: "+res.json()["clocked_on_date"]+" (mm/dd/yyyy)";
					}else{
						this.status_clock_on="This employee is not clock on"
						this.status_time="";
						this.status_date="";
					}
				}else{
					this.status_emp="There is no employee match the input number";
					this.status_clock_on="";
					this.status_time="";
					this.status_date="";
				}
			})
		}else{
			return;
		}
	}


	ClockOffJob(event): void {
		this.clockonservice.clockOff(this.employee_id).subscribe(res=>{
			document.getElementById('section2').style.display = 'none';
			this.curr_page=1;
			this.curr_code=""
			this.status_emp="";
			let re = /\^/g; 
					//var newstr = str.replace(re, " "); 
			let tmp1=res.json()["response_message"];
			this.status_clock_on=tmp1.replace(re," ");
			this.status_time="";
			this.status_date="";
		})
	}

	ClockOffDay(event): void {
		this.clockonservice.clockOff(this.employee_id).subscribe(res=>{
			document.getElementById('section2').style.display = 'none';
			this.curr_page=1;
			this.curr_code=""
			this.status_emp="";
			let re = /\^/g; 
					//var newstr = str.replace(re, " "); 
			let tmp1=res.json()["response_message"];
			this.status_clock_on=tmp1.replace(re," ");
			this.status_time="";
			this.status_date="";
		})
	}

	Quit(event): void {
		document.getElementById('section2').style.display = 'none';
		(<HTMLInputElement>document.getElementById("status")).disabled = false;
		document.getElementById('job').style.display = 'none';
		document.getElementById('emp').style.display = 'block';
		document.getElementById('wc').style.display = 'none';
		this.curr_page=1;
		this.curr_code=""
		this.status_emp="";
		this.status_clock_on="";
		this.status_time="";
		this.status_date="";
	}

	Delete(event): void {
		this.curr_code=this.curr_code.slice(0,-1);
	}


}	