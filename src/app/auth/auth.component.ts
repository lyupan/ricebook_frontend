import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { User } from './../user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [LoginService, RegisterService]
})

export class AuthComponent implements OnInit {
  //mode represents if the page displays a register form or a login form.
  //false represents login mode while true represents register mode
  mode: boolean = false;
  user: User = new User();
  maxDate = new Date();
  userForm: FormGroup;
  loginForm: FormGroup;
  userAccount: string;
  userPwd: string;
  pwdError: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private registerService : RegisterService) { }

  ngOnInit() {
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.userForm = new FormGroup({
      'username': new FormControl(this.user.username, [Validators.required]),
      'displayName': new FormControl(this.user.displayName, [Validators.nullValidator]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'phone': new FormControl(this.user.phone, [Validators.required, Validators.pattern("\\d{3}(-\\d{3})(-\\d{4})")]),
      'birth': new FormControl(this.user.dob, [Validators.required]),
      'zipcode': new FormControl(this.user.zipCode, [Validators.required, Validators.pattern("^(\\d{5}(-\\d{4})?)$")]),
      'password': new FormControl(this.user.password, [Validators.required, Validators.pattern("^(.+-.+-.+)$")]),
      'confirmPassword': new FormControl('', [Validators.required]),
    },
      this.areEqual
    );

    this.loginForm = new FormGroup({
      'account': new FormControl('', [Validators.required]),
      'pwd': new FormControl('', [Validators.required])
    });
  }

  get username() { return this.userForm.get('username'); }
  get displayName() { return this.userForm.get('displayName'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get birth() { return this.userForm.get('birth'); }
  get zipcode() { return this.userForm.get('zipcode'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }
  get account() { return this.loginForm.get('account'); }
  get pwd() { return this.loginForm.get('pwd'); }

  areEqual(group: FormGroup) {
      if (group.controls["password"].value !== group.controls["confirmPassword"].value ) {
          group.controls["confirmPassword"].setErrors({"passwordMismatch": ""});
          return {
            areEqual: true
          };
      }
      return null
  }

  onSubmit() {
    this.user.username = this.userForm.value.username;
    this.user.displayName = this.userForm.value.displayName;
    this.user.email = this.userForm.value.email;
    this.user.phone = this.userForm.value.phone;
    this.user.dob = this.userForm.value.birth;
    this.user.zipCode = this.userForm.value.zipcode;
    this.user.password = this.userForm.value.password;
    // console
    this.registerService.register(this.user).subscribe(value => {
      if (value.result === "success")
        // this.router.navigate(['/main']);
        this.mode = false
      else
        console.log("username duplicate");
      }, err => {
        console.log(err);
      })
  }

  login() {
    this.pwdError = false;
    this.userAccount = this.loginForm.value.account;
    this.userPwd = this.loginForm.value.pwd;
    this.loginService.login(this.userAccount, this.userPwd).subscribe(value => {
      if (value.result === "success")
        this.router.navigate(['/main']);
      else
         this.pwdError = true;
    }, err => {
      console.log(err)
    })
  }

  loginWithFb() {
    this.loginService.loginWithFb()
  }


  toSignUp() {
    this.mode = true;
  }

  toLogin() {
    this.mode = false;
  }
}
