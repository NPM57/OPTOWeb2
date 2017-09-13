import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class DivisionService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getDivisions():Observable<Response>{
    return this.http.get(
      `api/division`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }
  // }
  // checkLocationBin(id: string):Observable<Response>{
  //   return this.http.get(
  //     `api/catalogue?web=1&bin=` + id ,
  //     {
  //       headers:new Headers({
  //         'authorization':window.sessionStorage.getItem("authorization")
  //         }
  //       )
  //     }
  //   )
  // }

  // sendBinLocation(json: Object):Observable<Response>{
  //   return this.http.post(
  //     `api/location`,
  //     JSON.stringify(json),
  //     {
  //       headers:new Headers({
  //         'authorization':window.sessionStorage.getItem("authorization")
  //         }
  //       )
  //     }
  //   )
  // }
}