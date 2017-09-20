import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class WorkCenterService {
    data:any
    private description:string="";
    constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){}


    getWorkCenterList():Observable<Response>{
        return this.http.get(
            `http://192.168.222.13:8095/api/workcenter`,
            //`api/workcenter`,
            {
                headers:new Headers({
                    'authorization':window.sessionStorage.getItem("authorization")
                }
                )
            }
            )
    }

    getWorkCenterDetail(id):Observable<Response>{
        return this.http.get(
            `http://192.168.222.13:8095/api/workcenter/`+id,
            //`api/workcenter/`+id,
            {
                headers:new Headers({
                    'authorization':window.sessionStorage.getItem("authorization")
                }
                )
            }
            )
    }
    
}