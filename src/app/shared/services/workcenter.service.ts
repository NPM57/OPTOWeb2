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
            `${this.config.BASE_URL}/api/workcenter`,
            {
                headers:new Headers({
                    'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
                }
                )
            }
            )
    }

    getWorkCenterDetail(id):Observable<Response>{
        return this.http.get(
            `${this.config.BASE_URL}/api/workcenter/`+id,
            {
                headers:new Headers({
                    'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
                }
                )
            }
            )
    }
    
}