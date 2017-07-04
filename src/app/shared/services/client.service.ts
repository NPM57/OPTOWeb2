import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class ClientService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getClients():Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/clients?web=1`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }
  getClientDetails(id: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/clients?web=1&client=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getClientInvoices(id: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/clientInvoices?web=1&client=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }
}