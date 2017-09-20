import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class UserService {

    constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){}


    getUserList():Observable<Response>{
        return this.http.get(
            `http://192.168.222.13:8095/api/users`,
            //`api/users`,
            {
                headers:new Headers({
                    'authorization':window.sessionStorage.getItem("authorization")
                }
                )
            }
            )
    }

    
}