import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { Article,Comment } from './../article';
import { User } from './../user';
import {ArticlesService } from './../articles.service';

const EDIT = "Edit";
const SAVE = "Save";
const EDITICON = "<span class=\"glyphicon glyphicon-edit\"></span> ";
const SAVEICON = "<span class=\"glyphicon glyphicon-check\"></span> ";
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticlesService]
})

export class ArticleComponent implements OnInit, OnChanges {
  @Input() articles: Article[];
  @Input() user: User;
  commentMode : boolean = false;
  editable: boolean[] = [];
  commentable: boolean[] = [];
  newComment: string;
  constructor(private articlesService: ArticlesService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.articles!== undefined && this.articles.length > 0) {
      this.editable[0] = false;
      this.articles.reduce((acc, curVal, curIdx) => {this.editable[curIdx] = false; return null;});
    }
  }

  like(article: Article) {
    article.like++;
  }

  comment(idx: number) {
    if (this.commentable[idx] === undefined)
      this.commentable[idx] = false;
    this.commentable[idx] = !this.commentable[idx];
  }

  edit(idx : number) {
    if (this.user.username !== this.articles[idx].author)
      return;
    document.getElementsByClassName('edit')[idx].setAttribute('hidden', 'true')
    document.getElementsByClassName('save')[idx].removeAttribute('hidden')
    this.editable[idx] = true;
  }

  save(idx: number) {
    if (this.user.username !== this.articles[idx].author)
      return;
    document.getElementsByClassName('save')[idx].setAttribute('hidden', 'true')
    document.getElementsByClassName('edit')[idx].removeAttribute('hidden')
    this.editable[idx] = false;
    let text = document.getElementsByClassName('article-content')[idx].innerHTML
    text = text.replace(new RegExp('<div>', 'g'),'\r\n')
    text = text.replace(new RegExp('<\/div>', 'g'),'')
    if (this.articles[idx].text === text) {
      return ;
    }
    this.articles[idx].text = text
    this.articlesService.updateArticle(this.articles[idx]).subscribe(value => {
      this.articles[idx] = value.articles
    })
  }

  upload(idx: number, event: any) {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file, file.name)
      this.articlesService.updateImage(this.articles[idx].id, formData).subscribe(value => {
        this.articles[idx] = value.article
      })
    }
  }

  updateComment(i:number, j : number, text: string) {
    if (j !== -1)
      j = this.articles[i].comments[j].commentId
    this.articlesService.updateComment(this.articles[i].id, j, text).subscribe(value => {
      this.articles[i] = value.articles
    })
  }

  delete(idx : number) {
    this.articlesService.deleteArticle(this.articles[idx]).subscribe(value => {
      this.articles.splice(idx, 1);
      this.editable.splice(idx, 1);
      this.commentable.splice(idx, 1);
    })
  }
}
