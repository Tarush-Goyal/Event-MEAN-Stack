import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  signupForm: FormGroup;
  Type = "password";
  visible = "visibility";
  values = "";
  focus = true;
  errorMsg;

  credentials: TokenPayload = {
    email: "",
    name: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
       name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onFocus() {
    this.signupForm.get("password").markAsUntouched();
    this.focus = true;
  }

  login() {
    this.router.navigate(["login"]);
  }

  showPassword() {
    if (this.Type === "password") {
      this.Type = "text";
      this.visible = "visibility_off";
    } else {
      this.Type = "password";
      this.visible = "visibility";
    }
  }

  onSubmit() {
    let temp={
    email: this.signupForm.get("email").value,
    password: this.signupForm.get("password").value,
    name: this.signupForm.get("name").value
  }
  this.credentials=temp;
  this.register();

  }

  ngOnDestroy(){
    this.errorMsg='';
  }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        this.errorMsg='Account Already Exists';
        console.error(err);
      }
    );
  }
}
