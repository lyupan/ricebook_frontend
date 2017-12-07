import { Injectable } from '@angular/core';
import { User } from './../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { url, httpOptions } from './../config';

@Injectable()
export class RegisterService {
  private registerUrl = url + "register";
  constructor(private http: HttpClient) { }

  register(user : User): Observable<any> {
  	return this.http.post(this.registerUrl, {username: user.username, displayName: user.displayName, password: user.password,
  	 email: user.email, phone: user.phone, zipcode: user.zipCode, dob: user.dob}, httpOptions)
  }
}
