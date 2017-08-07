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
      `${this.config.BASE_URL}/api/partgroup`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }

  getPartList(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/partgroup?group=`+id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getPartByClientId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/partgroup?client=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getPartInvoices(id: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/partInvoices?part=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

}