import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class SupplierService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

  getSuppliers():Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/suppliers?web=1`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }

  getSupplierPurchases(supplier: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/supplierpurchases?web=1&supplier=` + supplier + `&type=1`,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }
  
  getSupplierDetails(supplier: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/suppliers?web=1&supplier=` + supplier,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }
}