import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from './../user';
import { ProfileService } from './../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  // user: User = new User("Zhou", "Zhou", "zh@rice.edu", "1231231234", new Date("1/1/1999"), "77005","", "assets/images/jayzhou.jpg");
  user: User = new User();
  maxDate = new Date();
  userForm: FormGroup;
  constructor(private profileService: ProfileService) { }
  ngOnInit() {
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.userForm = new FormGroup({
        'username': new FormControl(this.user.username, [Validators.required]),
        'displayName': new FormControl(this.user.displayName, [Validators.nullValidator]),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'phone': new FormControl(this.user.phone, [Validators.required, Validators.pattern("\\d{3}(-\\d{3})(-\\d{4})")]),
        'zipCode': new FormControl(this.user.zipCode, [Validators.required, Validators.pattern("^(\\d{5}(-\\d{4})?)$")]),
        'password': new FormControl('', [Validators.nullValidator]),
        'confirmPassword': new FormControl('', [Validators.nullValidator])
    },
    this.areEqual);

    this.profileService.getProfile().subscribe(value => {
      // this.user.username = value.username
      this.user = value;
      this.userForm.setValue({
        'username': this.user.username,
        'displayName':this.user.displayName ? this.user.displayName : '',
        'email': this.user.email ? this.user.email : '',
        'phone':this.user.phone ? this.user.phone : '',
        'zipCode': this.user.zipCode? this.user.zipCode : '',
        'password':'',
        'confirmPassword':''
      });
    })

  }

  get username() { return this.userForm.get('username'); }
  get displayName() { return this.userForm.get('displayName'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get zipCode() { return this.userForm.get('zipCode'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }

  areEqual(group: FormGroup) {
      if (group.controls["password"].value !== group.controls["confirmPassword"].value ) {
          group.controls["confirmPassword"].setErrors({"passwordMismatch": ""});
          return {
            areEqual: true
          };
      }
      return null
  }

  link() {
    this.profileService.link()
  }

  unlink() {
    this.profileService.unlink().subscribe(value => {
      this.user = value.profile
    })
  }

  upload(event:any) {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file, file.name)
      this.profileService.updateAvatar(formData).subscribe(value => {
        this.user.avatar = value.avatar
      })
    }
  }

  onSubmit() {
    if (this.user.username !== this.userForm.value.username) {
      console.error("username cannot be modified")
    }

    if (this.user.displayName !== this.userForm.value.displayName) {
      console.log("displayName updated")
      this.user.displayName = this.userForm.value.displayName;
      this.profileService.updateDisplayName(this.userForm.value.displayName).subscribe(value => {
        console.log(value)
      })
    }

    if (this.user.email !== this.userForm.value.email) {
      this.user.email = this.userForm.value.email;
      this.profileService.updateEmail(this.user.email).subscribe(value => {
      })
    }
    
    if (this.user.phone !== this.userForm.value.phone) {
      this.user.phone = this.userForm.value.phone;
      this.profileService.updatePhone(this.userForm.value.phone).subscribe(value => {
      })
    }

    if (this.user.zipCode !== this.userForm.value.zipCode) {
      this.user.zipCode = this.userForm.value.zipCode;
      this.profileService.updateZipcode(this.userForm.value.zipCode).subscribe(value => {
      })
    }
    let pwd = this.userForm.value.password
    if (this.user.password !== pwd) {
      if (pwd && pwd.trim() !== '')
        this.profileService.updatePassword(this.userForm.value.password).subscribe(value => {
        })
    }
  }
}
