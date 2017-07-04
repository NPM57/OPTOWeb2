import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class PalletLookUpService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  //Input Loc to get Pallet and Job (record) in Pallet table
  getPalletRecByLoc(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/palletlookup?loc=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  //Input Job to get Pallet and Loc (record) in Pallet table
  getPalletRecByJob(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/palletlookup?job=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  //Input Pallet to get Job and Loc (record) in Pallet table
  getPalletRecByPallet(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/palletlookup?pallet=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

}