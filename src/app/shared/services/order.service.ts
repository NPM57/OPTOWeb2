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
      `${this.config.BASE_URL}/api/salesorder?web=1`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }


  getOrderDetail(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/salesorder?web=1&order=`+id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getOrderByClientId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/salesorder?web=1&client=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }



}