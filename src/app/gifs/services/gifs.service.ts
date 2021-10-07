import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[]=[];
  get historial(){
    return [...this._historial]
  }

  buscarGifs(query: string){
   //para poner todo en minusculs
  query = query.trim().toLocaleLowerCase();

  //validacion para no volver a escribir lo misme en el arreglo 
  if ( !this._historial.includes(query)) {
    this._historial.unshift(query);
  }
//validar el tamaño del arreglo 
  this._historial =this._historial.splice(0,10);

  console.log(this._historial)

  }
}
