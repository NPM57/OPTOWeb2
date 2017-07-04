import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class PalletService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  sendPallet(json: Object):Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}/api/pallet`,
      JSON.stringify(json),
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }
}