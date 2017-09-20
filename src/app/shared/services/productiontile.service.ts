import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class ProductionTileService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getProductionTiles():Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/prdtiles`,
      //api/prdtiles`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }

  getProductionTileDetails(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/prdtiles/`+id,
      //api/prdtiles/`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}