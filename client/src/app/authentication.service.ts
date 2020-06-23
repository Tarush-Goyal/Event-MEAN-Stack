import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface EventPayload{
  name: string;
  cost: string;
  description: string;
  type: string;
  city: string;
  date: string;
  email: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private token: string;
  eventEmail:string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  private request(
    method: "post" | "get",
    type: "login" | "register" | "profile" | "event" | "list",
    Data?: TokenPayload | EventPayload | string,
  ): Observable<any> {
    let base$;

    if (method === "post") {
      base$ = this.http.post(`/api/${type}`, Data);
    } else {
      if(type === "profile"){
      base$ = this.http.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    } else{
      this.eventEmail=JSON.stringify(Data);
      base$ = this.http.get(`/api/${type}`, {
        headers: { email:this.eventEmail }
      });
    }
    }

if(type!="event"){
    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  return base$;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }

  public list(email: string): Observable<any> {
    return this.request("get", "list",email);
  }

  public event(event: EventPayload): Observable<any> {
    return this.request("post", "event", event);
  }
}
