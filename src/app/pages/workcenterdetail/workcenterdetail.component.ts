import { HostListener, Component, ElementRef, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { WorkCenterService } from '../../shared/services/workcenter.service';
import { EmployeeService } from '../../shared/services/employee.service';
import { ClockOnService } from '../../shared/services/clockon.service';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { SharedService } from '../../shared/services/shared.service';

@Component({
	selector: 'workcenterdetail',
	templateUrl: './workcenterdetail.html',
	styleUrls: ['./workcenterdetail.scss']
})

export class WorkCenterDetail{

	tableData:any;
	public id:number;
	public description:string;
	public emp_id:string="";
	public job:string="";
	private clock_on:number;
	private activate:number;
	private alive: boolean;
	private timer: Observable<number>;
	private interval: number;
	private zero_time_begin:number=0;

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		protected service: WorkCenterService,
		protected clockonservice:ClockOnService,
		public shared_service:SharedService) {
		this.route.params.subscribe(params => {
			this.id = +params['id'];
		});
		this.alive = true;
		this.interval = 20000;
		this.timer = Observable.timer(this.zero_time_begin, this.interval);
	}

	ngOnInit(){
		this.service.getWorkCenterDetail(this.id).subscribe(res => {
			this.tableData = res.json()["items"];
		})

		this.description= this.shared_service.gerWorkCenterDescription();

		$("#myonoffswitch").click(function() {
			if($("#myonoffswitch").val()==1){
				$("#myonoffswitch").val(0);
				console.log($("#myonoffswitch").val());
			}
			else{
				$("#myonoffswitch").val(1);
				console.log($("#myonoffswitch").val());
			}
		});

		document.getElementById("tick").style.display = 'none';
		document.getElementById("tick2").style.display = 'none';

		this.timer
		.takeWhile(() => this.alive)
		.subscribe(() => { 
			this.service.getWorkCenterDetail(this.id)
			.subscribe(res => {
				this.tableData = res.json()["items"];
			});
		});

		
	}

	ngOnDestroy(){
		this.alive = false; // switches your IntervalObservable off
	}

	ModalTrigger(): void{
		this.emp_id="";
		document.getElementById("myModal").style.display = 'block';
		$("#emp").focus();
	}

	CloseModal(): void{
		document.getElementById("myModal").style.display = 'none';
	}

	ViewAction(job_id): void{
		this.emp_id="";
		this.job = job_id;
		document.getElementById("actionDialog").style.display = 'block';
		$("#emp2").focus();
	}

	CloseView(): void{
		document.getElementById("actionDialog").style.display = 'none';
	}

	@HostListener('document:click', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.srcElement.id == 'myModal') {
			document.getElementById("myModal").style.display = 'none';
		}else if (event.srcElement.id == 'actionDialog') {
			document.getElementById("actionDialog").style.display = 'none';
		}         
	}

	@HostListener('document:keypress', ['$event'])
	KeyboardEvent(event: KeyboardEvent) {
		if (event.srcElement.id == 'emp') {
			let x = event.keyCode;
			let character = event.key;
			if(x==13){
				this.clockonservice.getAllInformation(this.emp_id).subscribe(res=>{
					this.activate=res.json()["active"];
					if(this.activate==1){
						document.getElementById("tick").style.display = 'block';
					}else{
						alert("The employee id is not exist");
						this.emp_id="";
						document.getElementById("tick").style.display = 'none';
					}
				})
			}
		}else if (event.srcElement.id == 'emp2') {
			let x = event.keyCode;
			let character = event.key;
			if(x==13){
				this.clockonservice.getAllInformation(this.emp_id).subscribe(res=>{
					this.activate=res.json()["active"];
					if(this.activate==1){
						document.getElementById("tick2").style.display = 'block';
					}else{
						alert("The employee id is not exist");
						this.emp_id="";
						document.getElementById("tick2").style.display = 'none';
					}
				})
			}
		}


	}

	ClockOffJob(event): void {
		if(this.emp_id==""){
			alert('The employee id needs to be filled');
		}else{
			this.clockonservice.getAllInformation(this.emp_id).subscribe(res=>{
				this.clock_on=res.json()["clocked_on"];
				if(this.clock_on==1 && res.json()["job_number"]!=null){
					this.clockonservice.clockOff(this.emp_id,$("#myonoffswitch").val(),0).subscribe(res=>{
						alert("Clock off Job success - You can clock on another job now");
						document.getElementById("myModal").style.display = 'none';
						document.getElementById("tick").style.display = 'none';

						this.service.getWorkCenterDetail(this.id).subscribe(res => {
							this.tableData = res.json()["items"];
							this.zero_time_begin=0;
						})
					})
				}else if(this.clock_on==1 && res.json()["job_number"]==null){
					alert("You are not clock on any jobs - You can clock off day");
				}else{
					alert("You are not clock on");
				}
			})
		}
	}

	ClockOffDay(event): void {
		if(this.emp_id==""){
			alert('The employee id needs to be filled');
		}else{
			this.clockonservice.getAllInformation(this.emp_id).subscribe(res=>{
				this.clock_on=res.json()["clocked_on"];

				if(this.clock_on==1){
					this.clockonservice.clockOff(this.emp_id,$("#myonoffswitch").val(),1).subscribe(res=>{
						alert("Clock off Day success");
						document.getElementById("myModal").style.display = 'none';
						document.getElementById("tick").style.display = 'none';

						this.service.getWorkCenterDetail(this.id).subscribe(res => {
							this.tableData = res.json()["items"];
							this.zero_time_begin=0;
						})
					})
				}else{
					alert("You have to clock on before clocking off");
				}
			})
		}
	}

	ClockOn():void{
		if(this.emp_id==""){
			alert('The employee id needs to be filled');
		}else{
			this.clockonservice.getAllInformation(this.emp_id).subscribe(res=>{
				this.clock_on = res.json()["clocked_on"];
				if(res.json()["job_number"]!=null){
					alert("This employee already clocked on another job")
				}else{
					if(this.clock_on !=1){
						this.clockonservice.clockOn(this.emp_id).subscribe(res=>{
							this.clockonservice.startJob(this.emp_id,this.job,this.id).subscribe(res=>{
								let notice = res.json()["clock_message"] + res.json()["job_message"];
								alert(notice);

								this.service.getWorkCenterDetail(this.id).subscribe(res => {
									this.tableData = res.json()["items"];
									this.zero_time_begin=0;
								})
							})
						});
					}else{
						this.clockonservice.startJob(this.emp_id,this.job,this.id).subscribe(res=>{
								let notice = res.json()["clock_message"] + res.json()["job_message"];
								alert(notice);

								this.service.getWorkCenterDetail(this.id).subscribe(res => {
									this.tableData = res.json()["items"];
									this.zero_time_begin=0;
								})
							})
					}
					document.getElementById("actionDialog").style.display = 'none';
					document.getElementById("tick2").style.display = 'none';
				}
			})

		}
	}

}
