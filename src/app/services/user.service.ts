import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:8080/v1/api/user"

  constructor(private httpClient: HttpClient) { }

  getDoctors():Observable<any> {
    return this.httpClient.get<any>(this.url+"/doctor")
  }

  getReceptionist():Observable<any> {
    return this.httpClient.get<any>(this.url+"/receptionist")
  }

  getUsers():Observable<any> {
    return this.httpClient.get<any>(this.url)
  }

  getPatients():Observable<any> {
    return this.httpClient.get<any>(this.url+"/patient")
  }
}
