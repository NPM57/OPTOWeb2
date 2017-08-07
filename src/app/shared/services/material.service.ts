import {Injectable, Inject} from "@angular/core";
import {AppConfig} from "../../app.module";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

interface auth {
	username:string,
	password:string
}

@Injectable()

export class MaterialService {

	constructor(@Inject ('APP_CONFIG_TOKEN') private config:AppConfig, private http:Http){
  }

    getMaterialCatalogue():Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/catalogue`,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }
  getMaterialGroup():Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/matgroup`,
      {
      	headers:new Headers({
      		'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
      		}
      	)
      }
    )
  }

   getMaterialList(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/matgroup/`+id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getMaterialDetails(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/catalogue?matcode=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getMaterialByClientId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/catalogue?client=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getMaterialIdByLocationId(id):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/searchbarcode?location=` + id ,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  getMaterialInvoice(material:string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/materialinvoice?mat=` + material,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }

  checkItemCode(id: string):Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}/api/catalogue?barcode=` + id,
      {
        headers:new Headers({
          'authorization':"Basic " + btoa(this.config.APP_ID + ":" + this.config.APP_PASSWORD)
          }
        )
      }
    )
  }



}