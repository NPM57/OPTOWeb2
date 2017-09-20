import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class OrderService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getOrder():Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/salesorder`,
      //`api/salesorder`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }


  getOrderDetail(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/salesorder?order=`+id,
      //`api/salesorder?order=`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getOrderByClientId(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/salesorder?client=` + id,
      //`api/salesorder?client=` + id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }



}