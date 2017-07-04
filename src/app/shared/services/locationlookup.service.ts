import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class LocationLookUpService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getLocationByMaterialId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/searchlocation?barcode=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

}