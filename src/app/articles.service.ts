// import { Headers, Http } from '@angular/http';
import { Article } from './article';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { url, httpOptions } from './config';

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<any> {
    return this.http.get<any>(url + "articles/", httpOptions)
  }

  getArticlesByAuthors(authors: string[]): Observable<any> {
    let articlesUrl = url + "articles/";
    articlesUrl += authors.reduce((pre, cur) => pre + "," + cur)
    return this.http.get<any>(articlesUrl, httpOptions);
  }

  postArticle(article: Article): Observable<any>{
    let articlesUrl = url + "article";
    return this.http.post<any>(articlesUrl, {text: article.text}, httpOptions)
  }

  updateArticle(article: Article): Observable<any> {
    let articlesUrl = url + "articles/" + article.id;
    return this.http.put<any>(articlesUrl, {text: article.text}, httpOptions)
  }

  updateImage(articleId: number, formData: FormData): Observable<any> {
    let articlesUrl = url + "articles/" + articleId;
    return this.http.post<any>(articlesUrl, formData,  {
      headers: new HttpHeaders({'Access-Control-Allow-Credentials': 'true'}),
      withCredentials: true
    })
  }

  updateComment(articleId: number, commentId: number, text: string): Observable<any> {
    let articlesUrl = url + "articles/" + articleId;
    return this.http.put<any>(articlesUrl, {commentId: commentId, text: text}, httpOptions) 
  }

  deleteArticle(article: Article): Observable<any> {
    let articlesUrl = url + "articles/" + article.id;
    return this.http.delete<any>(articlesUrl, httpOptions)
  }
}
