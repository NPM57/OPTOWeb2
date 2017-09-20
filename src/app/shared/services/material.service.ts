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
      `http://192.168.222.13:8095/api/catalogue`,
      //`api/catalogue`, 
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
      `http://192.168.222.13:8095/api/matgroup`,
      //`api/matgroup`, 
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
      `http://192.168.222.13:8095/api/matgroup/`+id,
      //`api/matgroup/`+id, 
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
      `http://192.168.222.13:8095/api/catalogue?matcode=` + id ,
      //`api/catalogue?matcode=` + id ,
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
      `http://192.168.222.13:8095/api/catalogue?client=` + id ,
      //`api/catalogue?client=` + id ,
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
      `http://192.168.222.13:8095/api/searchbarcode?location=` + id ,
      //`api/searchbarcode?location=` + id ,
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
      `http://192.168.222.13:8095/api/materialinvoice?mat=` + material,
      //`api/materialinvoice?mat=` + material,
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
      `http://192.168.222.13:8095/api/catalogue?barcode=` + id,
      //`api/catalogue?barcode=` + id,
      {
        headers:new Headers({
          'authorization':window.sessionStorage.getItem("authorization")
          }
        )
      }
    )
  }



}