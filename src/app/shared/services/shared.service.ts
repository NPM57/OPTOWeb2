import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

// provided at application module

@Injectable()

export class SharedService {
  private work_center_description:any;
	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  setWorkCenterDescription(work_center_description){
    this.work_center_description = work_center_description;
  }
  gerWorkCenterDescription(){
    return this.work_center_description;
  }
}