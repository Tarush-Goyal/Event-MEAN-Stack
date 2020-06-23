import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  loginForm:FormGroup;
  Type='password';
  visible='visibility'
  values='';
  focus=true;
  errorMsg=null;

  credentials: TokenPayload = {
    email: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm=new FormGroup({
        'email':new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  onSubmit(){
    let temp={
      email:this.loginForm.get('email').value,
      password:this.loginForm.get('password').value
    };
    this.credentials=temp;
  this.login();
}

onFocus(){
  this.loginForm.get('password').markAsUntouched();
  this.focus=true;
}

showPassword(){
  if(this.Type==='password')  {
    this.Type='text';
    this.visible='visibility_off';
  }
  else
  {
    this.Type='password';
    this.visible='visibility';
  }
}

register(){
  this.router.navigate(["register"]);
}

ngOnDestroy(){
  this.errorMsg='';
}



  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
        this.errorMsg="Password or E-Mail invalid";
      }
    );
  }
}
