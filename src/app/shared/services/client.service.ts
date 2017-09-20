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
      `http://192.168.222.13:8095/api/clients`,
      //'api/clients',
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }
  getClientDetails(id: string):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/clients?client=` + id ,
      //'api/clients?client=` + id ',
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getClientInvoices(id: string):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/clientInvoices?client=` + id ,
      //'api/clientInvoices?client=` + id ',
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}