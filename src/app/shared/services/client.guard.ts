import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

import {LoginService} from "./login.service";

import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable()

export class ClientGuard implements CanActivate  {

  constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, 
    private http:Http, private router: Router, private loginservice:LoginService){
    // let user:auth={
      //   username: this.config.APP_ID,
      //   password: this.config.APP_PASSWORD
      // }
      // console.log(user);
      // debugger;

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

       let activate_route = this.loginservice.getMenu();
       if(activate_route[0]["menu_client"]==1){
         return true;
       }else{
         return false;
       }
    }

  }