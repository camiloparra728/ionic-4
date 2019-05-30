import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) {
  }
  /**
   * Acción Get
   * @param paramss entidad cliente
   * @param reqOpts encabezados 
   */
  get(paramss?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    let params = new HttpParams();
    if (paramss) {
       // tslint:disable-next-line: forin
       for (const k in paramss) {
        params = params.append(k.toString(), paramss[k].toString());
      }
       reqOpts.params = new HttpParams();
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.url, { headers, params });
  }

  /**
   * Acción Post
   * @param paramss entidad cliente
   * @param reqOpts encabezados 
   */
  post(body: any, reqOpts?: any) {
    return this.http.post(environment.url , body, reqOpts);
  }

}
