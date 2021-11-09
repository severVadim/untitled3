import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get("http://localhost:8180/configuration", {responseType: 'json'});
  }

  saveConfig(amount: number, body: {}) {
    console.log("SAVE");
    console.log(body);
    return this.http.post("http://localhost:8180/generateEntity?amount=" + amount , body, this.httpOptions);
  }
}
