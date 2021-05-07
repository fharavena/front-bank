import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferaddService {

  constructor(public _http: HttpClient) { }

  public filter_recipient(nombre) {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this._http.get(global.dev + 'destinatario/' + nombre, { headers });
  }

  public get_banco() {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this._http.get('https://bast.dev/api/banks.php', { headers });
  }

  public transferencia_add(params): Observable<any> {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this._http.post(global.dev + 'transferencia/', params, { headers });
  }

  public get_transferencia() {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this._http.get(global.dev + 'transferencia/', { headers });
  }
}
