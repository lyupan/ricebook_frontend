import { Component, OnInit} from '@angular/core';
import { Following } from './following';
import {FollowingService} from './following.service';
import {Article} from './../article';
import {ArticlesService } from './../articles.service';
import { User } from './../user';
import { LoginService } from './../auth/login.service';
import { ProfileService } from './../profile.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [FollowingService, ArticlesService, LoginService, ProfileService]
})
export class MainComponent implements OnInit {

  newHeadline: string;
  followings: Following[];
  articles: Article[];
  allArticles: Article[];
  isWriting: boolean = false;
  content: string;
  user: User = new User();
  formData: FormData = null;
  userNotExist = false;
  alreadyFollowed = false;
  constructor(private router: Router, private followingService: FollowingService, private loginService: LoginService,
  private articlesService: ArticlesService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(value => {
      this.user = value
      if (!this.user.following || this.user.following.length === 0)
        return 
      let names:string[] = [...this.user.following]
      this.profileService.getPublicProfile(names).subscribe(value => {
        this.followings = value.profiles
        let authors = [this.user.username, ...this.user.following];
        this.articlesService.getArticlesByAuthors(authors).subscribe(value => {
          this.articles = value.articles;
          this.allArticles = value.articles;
        })
      })
    });
  }

  updateHeadline() {
  	if (this.newHeadline !== undefined) {
  		this.user.headline = this.newHeadline;
      this.profileService.updateHeadline(this.newHeadline).subscribe(value => {
      })
    }
  }

  unfollow(following: Following) {
  	this.followingService.unfollow(following.username).subscribe((value) => {
      if (value.result === 'failure') {
        console.error(value.info)
      } else {
        let names:string[] = [...value.following]
        this.user.following = names
        this.profileService.getPublicProfile(names).subscribe(value => {
          this.followings = value.profiles
          let authors = [this.user.username, ...this.user.following];
          this.articlesService.getArticlesByAuthors(authors).subscribe(value => {
            this.articles = value.articles;
            this.allArticles = value.articles;
          })
        })
      }
    })
  }

  follow(following: string) {
    if (!following || following.trim() === '') {
      this.alreadyFollowed = false
      this.userNotExist = false
      return
    }

    if (this.user.following.indexOf(following) > -1) {
      this.alreadyFollowed = true
      return
    }
    this.alreadyFollowed = false
    this.followingService.follow(following).subscribe((value) => {
      if (value.result === 'failure') {
        this.userNotExist = true
      } else {
        this.userNotExist = false
        let names:string[] = [...value.following]
        this.user.following = names
        this.profileService.getPublicProfile(names).subscribe(value => {
          this.followings = value.profiles
            let authors = [this.user.username, ...this.user.following];
            this.articlesService.getArticlesByAuthors(authors).subscribe(value => {
              this.articles = value.articles;
              this.allArticles = value.articles;
            })
        })
      }
    })
  }

  writeArticle() {
    this.isWriting = !this.isWriting;
  }

  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.formData = new FormData();
      const file = event.target.files[0]
      this.formData.append('image', file, file.name)      
    }
  }

  postArticle() {
    let d = new Date();
    let article: Article = {
        id:-1,
        author:this.user.username,
        date:d,
        image: '',
        text:this.content,
        like: 0,
        comments: []
    };
    this.articlesService.postArticle(article).subscribe(value => {
      this.articles.unshift(value.articles)
      if (this.formData !== null) {
        this.articlesService.updateImage(value.articles.id, this.formData).subscribe(val => {
          this.articles[0] = val.article
          this.resetContent()
        })
      } else {
        this.resetContent()
      }
    })
  }

  resetContent() {
    this.content = "";
    this.formData = null
  }

  search(s : string) {
    this.articles = this.allArticles;
    if (s!=undefined && s!=="")
    this.articles = this.articles.filter(article => (article.author === s || article.text.includes(s)));
  }

  logout() {
    this.loginService.logout().subscribe(value => {
      this.router.navigate(['/auth']);
    })
  }
}
