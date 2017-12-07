import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { url, httpOptions } from './../config';


@Injectable()
export class LoginService {
  private loginUrl = url + "login";

  constructor(private http: HttpClient) {
  }

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {username: name, password: password},httpOptions)
  }

  loginWithFb() {
  	window.location.href = url + "login/facebook"
  }

  logout(): Observable<any> {
  	return this.http.put<any>(url + "logout", {}, httpOptions)
  }
}