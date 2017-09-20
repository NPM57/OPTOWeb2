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
      `http://192.168.222.13:8095/api/palletlookup?loc=` + id ,
      //`api/palletlookup?loc=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  //Input Job to get Pallet and Loc (record) in Pallet table
  getPalletRecByJob(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/palletlookup?job=` + id ,
      //`api/palletlookup?job=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  //Input Pallet to get Job and Loc (record) in Pallet table
  getPalletRecByPallet(id):Observable<Response>{
    return this.http.get(
      `http://192.168.222.13:8095/api/palletlookup?pallet=` + id ,
      //`api/palletlookup?pallet=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

}