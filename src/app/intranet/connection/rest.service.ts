import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * Generar una conexion a un servicio rest de tipo get
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   *
   * @return  {Promise<object>}        Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionGET = (url: string, data: any) => {
    const options = {
      params: data, 
      headers: {
        "Authorization": environment.TOKEN_API
      }
    }
    return new Promise(resolve => {
      this.http.get(`${url}`, options).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          });
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }
}
