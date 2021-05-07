import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientaddService {

  constructor(public _http: HttpClient) { }

  public get_banks() {
    return this._http.get(global.dev + 'banks/list');
  }

  public get_transfer_type() {
    return this._http.get(global.dev + 'banks/transfer_type');
  }

  public add_recipient(recipient): Observable<any> {    
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );

    return this._http.post(global.dev + 'destinatario/', recipient , { headers });
  }
}
