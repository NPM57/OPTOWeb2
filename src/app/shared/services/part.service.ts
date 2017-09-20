import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class PartService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  
  getPartGroup():Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/partgroup`,
      //`api/partgroup`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }

  getPartList(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/partgroup?group=`+id,
      //`api/partgroup?group=`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getPartByClientId(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/partgroup?client=` + id ,
      //`api/partgroup?client=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getPartInvoices(id: string):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/partInvoices?part=` + id ,
      //`api/partInvoices?part=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

}