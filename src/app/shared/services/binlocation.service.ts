import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class BinLocationService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  
  // checkLocationBin(id: string):Observable<Response>{
  //   return this.http.get(
  //     `http://192.168.222.13:8095/api/catalogue?web=1&bin=` + id ,
  //     {
  //       headers:new Headers({
  //         'authorization':window.sessionStorage.getItem("authorization")
  //         }
  //       )
  //     }
  //   )
  // }

  sendBinLocation(json: Object):Observable<Response>{
    return this.http.post(
      `http://192.168.222.13:8095/api/location`,
      //'api/location',
      JSON.stringify(json),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}