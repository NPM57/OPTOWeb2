import {Injectable, Inject} from "@angular/core";
// import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

import {LoginService} from "./login.service";
import {AppConfig} from "../../app.module";

import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable()

export class AuthService implements CanActivate  {

  constructor( 
    @Inject ('APP_CONFIG_TOKEN') private config:AppConfig, 
    private http:Http, private router: Router, private loginservice:LoginService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(this.loginservice.isLoggedIn()){
          return true;
        }else{
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
    }

  }