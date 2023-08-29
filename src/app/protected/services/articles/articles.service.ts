import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


  token : string = '';
  // user : User | undefined;
  private baseUrl = environment.baseUrl;

  constructor(  private http : HttpClient,
                // private store : Store <AppState>,
                // private dialog : MatDialog
              )
{ }

getAllArticles(){

    return this.http.get<any>(`${this.baseUrl}api/articulos`) 
    .pipe(
      map( res => res )
    )
}


getArticleById(id : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${id}`) 
    
  .pipe(
    tap( res =>{
                    // if(token){
                    //     this.token = token
                    // }           
                  // console.log("desde login Service: ",res);
              }  
    ),            
    map( res => res )
  )
}

searchProducts( value : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/busqueda?f=codigo_interno&q=${value}`)
  .pipe(
    map( res =>{ 
          console.log('desde service searchProducts', res)
            return res} )
    );
}

searchProductById( id : any){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${id}`)
  .pipe(
    map( res =>{ 
          console.log('desde service searchProductById', res)
            return res} )
    );
}

editProductById( body: any, codigo_interno : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${codigo_interno}`, body)
.pipe(
  map( res =>{ 
        console.log('desde service searchProductById', res)
          return res} )
  );
}

getAllTruePriceList( ){
  return this.http.get<any>(`${this.baseUrl}api/precios`)
  .pipe(
    map( res =>{ 
          console.log('desde service getAllTruePriceList', res)
            return res} )
    );
}

getPriceListById( id:any ){
  return this.http.get<any>(`${this.baseUrl}api/precios/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service getPriceListById', res)
          return res} )
  );
}

getAllOrders( ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos`)
.pipe(
  map( res =>{ 
        console.log('desde service getAllOrders', res)
          return res} )
  );
}

getOrdersByPtoVenta( id :  any ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service getOrdersByPtoVenta', res)
          return res} )
  );
}


getSalePointByNumOrder( salePoint :  any, nroOrder : any ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos/${salePoint}/${nroOrder}`)
.pipe(
  map( res =>{ 
        console.log('desde service getSalePointByNumOrder', res)
          return res} )
  );
}



getOrdersPaginator(from : any, to : any ){

  const Pedidos =  [
    {
        "idPedido": 62208,
        "estado": "E",
        "idAgenda": 2739,
        "razonSocial": "Ricardo Montereal",
        "domicilio": "Pehuenches 850",
        "localidad": "Villa La Angostura",
        "provincia": "Neuquén",
        "cp": "8407",
        "pais": "Argentina",
        "cuit": 0,
        "docNro": "27176396305",
        "ptoVenta": 1,
        "cbteNro": 1,
        "fecha": "2023-04-24T14:18:37.000-03:00",
        "impSubtotal": 15000,
        "descuentoPorcentaje": 0,
        "impDescuento": 0,
        "impTotIva": 2603.30579,
        "impTotal": 15000,
        "detalleItems": [
            {
                "descripcion": "BOLSA DE PAPAS",
                "codigoInterno": "50100",
                "cantidad": 1,
                "alicIvaPorciento": 21,
                "impNetoUnidad": 12396.69421,
                "impSubtotal": 15000,
                "bonificacionPorciento": 0,
                "bonificacionImpNetoUni": 0,
                "bonificacionImpNetoTot": 0,
                "importeNetoTotal": 12396.69421,
                "importeIva": 2603.30579,
                "impTotal": 15000
            }
        ]
    },
  ]

  // return Pedidos;

  return this.http.get<any>(`${this.baseUrl}api/pedidos?p=${from}&r=${to}`)
.pipe(
  map( res =>{ 
        console.log('desde service getOrdersPaginator', res)
          return res} )
  );
}


}