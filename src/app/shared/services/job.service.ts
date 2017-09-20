import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class JobService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getJobTotal(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/jobtotal?jobtotal=`+id,
      //`api/jobtotal?jobtotal=`+id,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }

  getJobProject(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/jobproject?jobproject=`+id,
      //`api/jobproject?jobproject=`+id,,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}