import { Injectable } from '@angular/core';
import {Following} from './following';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { url, httpOptions } from './../config';

@Injectable()
export class FollowingService {

  private followingsUrl = url + "following/"
  constructor(private http: HttpClient) { }

  getFollowings(): Observable<any> {
    return this.http.get<any>(this.followingsUrl, httpOptions)
  }

  follow(name : string): Observable<any> {
    return this.http.put<any>(this.followingsUrl+name,{}, httpOptions)
  }

   unfollow(name : string): Observable<any> {
    return this.http.delete<any>(this.followingsUrl+name, httpOptions)
  }
}
