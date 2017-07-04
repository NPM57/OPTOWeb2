import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class UserService {

    constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){}


    getUserList():Observable<Response>{
        return this.http.get(
            `${this.config.BASE_URL}/api/users`,
            {
                headers:new Headers({
                    'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
                }
                )
            }
            )
    }

    
}