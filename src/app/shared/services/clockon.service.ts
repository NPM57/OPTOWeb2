import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
  username:string,
  password:string
}

@Injectable()

export class ClockOnService {

  constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getAllInformation(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/job/`+id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  clockOn(id):Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}/api/job/`+id+'?mode=clockon',
       JSON.stringify({}),
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

clockOff(id):Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}/api/job/`+id+'?mode=clockoff',
      JSON.stringify({}),
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

startJob(id,job_no,workcenter):Observable<Response>{
  return this.http.post(
    `${this.config.BASE_URL}/api/job/`+id+`?mode=jobstart`,
     JSON.stringify({"jobno":job_no,"workcenter":workcenter}),
    {
      headers:new Headers({
        'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
        }
      )
    }
  )
}

getWorkCenterByJobId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/job?job_no=`+id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }



}