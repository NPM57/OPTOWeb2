import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class EmployeeService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getEmployees():Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/employee?web=1`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }
  // }
  // checkLocationBin(id: string):Observable<Response>{
  //   return this.http.get(
  //     `${this.config.BASE_URL}/api/catalogue?web=1&bin=` + id ,
  //     {
  //       headers:new Headers({
  //         'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
  //         }
  //       )
  //     }
  //   )
  // }

  // sendBinLocation(json: Object):Observable<Response>{
  //   return this.http.post(
  //     `${this.config.BASE_URL}/api/location`,
  //     JSON.stringify(json),
  //     {
  //       headers:new Headers({
  //         'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
  //         }
  //       )
  //     }
  //   )
  // }
}