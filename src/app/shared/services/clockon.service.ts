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
      `http://192.168.222.13:8095/api/job/`+id,
      //`api/job/`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  clockOn(id):Observable<Response>{
    return this.http.post(
      `http://192.168.222.13:8095/api/job/`+id+'?mode=clockon',
      //api/job/`+id+'?mode=clockon',
       JSON.stringify({}),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  clockOff(id,finish,day):Observable<Response>{
    return this.http.post(
      `http://192.168.222.13:8095/api/job/`+id+'?mode=clockoff',
      //`api/job/`+id+'?mode=clockoff',
      JSON.stringify({"finish":finish,"day":day}),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  startJob(id,job_no,workcenter):Observable<Response>{
    return this.http.post(
      `http://192.168.222.13:8095/api/job/`+id+`?mode=jobstart`,
      //`api/job/`+id+`?mode=jobstart`,
       JSON.stringify({"jobno":job_no,"workcenter":workcenter}),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getWorkCenterByJobId(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/job?job_no=`+id,
      //`api/job?job_no=`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }



}