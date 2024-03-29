import { Injectable } from "@angular/core";
import { Global } from "./global";
import { AppModule } from "../app.module";

@Injectable()
export class UploadService{
  public url : string;

  constructor(){
    this.url = Global.url
  }

  //peticion ajax para subir un archivo

  makeFileRequest(url : string, params: Array<string>, files: Array<File>, name : string){
    return new Promise(function(resolve, reject){
      var formData:any = new FormData()
      var xhr /*sinonimo de ajax*/ = new XMLHttpRequest() //tipo de peticion asincrona
      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name)
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.open('POST', url, true); //Peticion
      xhr.send(formData) //Qe la envie al formulario

    })
  }

}
