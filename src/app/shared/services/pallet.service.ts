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
      `http://192.168.222.13:8095/api/pallet`,
      // `api/pallet`,
      JSON.stringify(json),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  deletePallet(json: Object):Observable<Response>{
    return this.http.post(
      `http://192.168.222.13:8095/api/palletdelete`,
      // `api/palletdelete`,
      JSON.stringify(json),
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}