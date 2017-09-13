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
      `api/suppliers`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }

  getSupplierPurchases(supplier: string):Observable<Response>{
    return this.http.get(
      `api/supplierpurchases?supplier=` + supplier + `&type=1`,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
  
  getSupplierDetails(supplier: string):Observable<Response>{
    return this.http.get(
      `api/suppliers?supplier=` + supplier,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
}