import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { url, httpOptions } from './config';
import { User } from './user';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<User> {
  	const profileUrl = url + "profile";
    return this.http.get<User>(profileUrl, httpOptions)
  }

  link() {
    window.location.href = url + "link/facebook"
  }

  unlink():Observable<any> {
    return this.http.put(url+"unlink", {}, httpOptions) 
  }

  getPublicProfile(names: string[]): Observable<any> {
  	let publicUrl = url + "public/";
  	publicUrl += names.reduce((pre, cur) => pre + "," + cur)
  	return this.http.get<any>(publicUrl, httpOptions)
  }

  updateHeadline(headline: string): Observable<any> {
  	let updateUrl = url + "headline";
  	return this.http.put<any>(updateUrl, {headline: headline}, httpOptions)
  }

  updateEmail(email: string): Observable<any> {
  	let updateUrl = url + "email";
  	return this.http.put<any>(updateUrl, {email: email}, httpOptions)
  }

  updatePhone(phone: string): Observable<any> {
    let updateUrl = url + "phone";
    return this.http.put<any>(updateUrl, {phone: phone}, httpOptions)
  }

  updateZipcode(zipcode: string): Observable<any> {
  	let updateUrl = url + "zipcode";
  	return this.http.put<any>(updateUrl, {zipcode: zipcode}, httpOptions)
  }

  updateAvatar(file: FormData): Observable<any> {
    let updateUrl = url + "avatar";
    return this.http.put<any>(updateUrl, file,  {
      headers: new HttpHeaders({'Access-Control-Allow-Credentials': 'true'}),
      withCredentials: true
    })
  }

  updateDisplayName(name: string): Observable<any> {
    let updateUrl = url + "displayname";
    return this.http.put<any>(updateUrl, {displayName: name}, httpOptions)
  }

  updatePassword(password: string): Observable<any> {
    let updateUrl = url + "password";
    return this.http.put<any>(updateUrl, {password: password}, httpOptions)
  }
}