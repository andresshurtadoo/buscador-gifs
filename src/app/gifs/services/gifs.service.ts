import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Git } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ySWTINw3tVT5Zl69QsWZhfeLQmwXn6EV';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs'
  private _historial : string[]=[];
//cambiar any por su tipo correspondiente
 public resultados :Git[] = [];


  get historial(){
    return [...this._historial]
  }


constructor(private http: HttpClient){

this.resultados=JSON.parse(localStorage.getItem('resultados')!) || []
this._historial=JSON.parse(localStorage.getItem('historial')!) || []

/*
if (localStorage.getItem('historial')) {
  this._historial= JSON.parse(localStorage.getItem('historial')!)

  
}
if (localStorage.getItem('resultados')) {
  this.resultados=JSON.parse(localStorage.getItem('resultados')!) || []
  
}*/

}



  buscarGifs(query: string = ''){
   //para poner todo en minusculs
  query = query.trim().toLocaleLowerCase();


  

  //validacion para no volver a escribir lo misme en el arreglo 
  if ( !this._historial.includes(query)) {
    this._historial.unshift(query);

    //validar el tamaño del arreglo 
  this._historial =this._historial.splice(0,10);

  localStorage.setItem('historial',JSON.stringify(this._historial))
  }

  
  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit','10')
  .set('q', query);
 


this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params } )
.subscribe( ( resp ) => {
  
  this.resultados= resp.data;
  localStorage.setItem('resultados', JSON.stringify(this.resultados) )
    });


  }


}
