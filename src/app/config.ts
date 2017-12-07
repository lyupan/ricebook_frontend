import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = "https://rice-lp.herokuapp.com/"
// const url = "http://localhost:3000/"
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true'}),
  withCredentials: true
};

export {url, httpOptions}