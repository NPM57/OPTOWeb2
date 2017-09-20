import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class ClockTileService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getClockTiles():Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/clockon`,
      //`api/clockon`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }


    getClockTileDetails(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/clocktiles/`+id,
      //`api/clocktiles/`+id`,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}