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
      `api/catalogue`,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }
  getMaterialGroup():Observable<Response>{
    return this.http.get(
      `api/matgroup`,
      {
      	headers:new Headers({
      		'authorization':window.sessionStorage.getItem("authorization")
      		}
      	)
      }
    )
  }

   getMaterialList(id):Observable<Response>{
    return this.http.get(
      `api/matgroup/`+id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getMaterialDetails(id):Observable<Response>{
    return this.http.get(
      `api/catalogue?matcode=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getMaterialByClientId(id):Observable<Response>{
    return this.http.get(
      `api/catalogue?client=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getMaterialIdByLocationId(id):Observable<Response>{
    return this.http.get(
      `api/searchbarcode?location=` + id ,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  getMaterialInvoice(material:string):Observable<Response>{
    return this.http.get(
      `api/materialinvoice?mat=` + material,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }

  checkItemCode(id: string):Observable<Response>{
    return this.http.get(
      `api/catalogue?barcode=` + id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }



}