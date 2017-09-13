import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

// Auth Service
import {Router, ActivatedRoute, Params} from '@angular/router'
import {LoginService} from "../../shared/services/login.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public binlocation:AbstractControl;
  public stock:AbstractControl;
  public noti:string='';
  private validate:boolean=false;
  private menu;
  private screen_size:number;

  constructor(fb:FormBuilder, private loginservice: LoginService,private router:Router, private route: ActivatedRoute, ) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'binlocation': false,
      'stock': false
    });
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.binlocation = this.form.controls['binlocation'];
    this.stock = this.form.controls['stock'];
  }

    

  public onSubmit(values:Object):void {
    (<HTMLInputElement>document.getElementById('submit')).disabled=true;
    if (this.form.valid ) {
      this.loginservice.Validate(this.username.value,this.password.value,screen.width).subscribe(res=>{
        if(res.json()["items"][0]!=null){
          if(res.json()["items"][0]["isLoggedIn"]==1){
            this.menu = res.json()["items"][0]["menus"];
            if(this.loginservice.Login(this.username.value,this.password.value,this.menu)){
              this.validate =true;
              if(this.validate){
                 
                if( screen.width>420){
                  if(this.stock.value){
                    this.router.navigate(['pages/stock']);
                  }
                  else if(this.binlocation.value){
                    this.router.navigate(['pages/location']);
                  }
                  else if(this.binlocation.value ==false){
                    this.router.navigate(['pages/location']);
                  }else{
                    this.router.navigate(['login']);
                  }
                }else{
                  this.router.navigate(['pages/location']);
                }
              }else{
                (<HTMLInputElement>document.getElementById('submit')).disabled=false;
                this.noti = "Wrong username and password, please try again !"
                this.router.navigate(['login']);
              }
            }else{
              this.validate =false;
              return;
            }
          }else{
            return;
          }
        }else{
            this.noti = "Wrong username and password, please try again !"
            this.router.navigate(['login']);
        }    
      });
    }else{
      (<HTMLInputElement>document.getElementById('submit')).disabled=false;
      return;
    }
  }

}
