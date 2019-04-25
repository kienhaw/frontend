import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface logIn {
  success: boolean,
  message: string,
  session: {}
}

interface isLogged {
  isLoggedIn: boolean,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private token = '';

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getUserDetails(username, password) {
    return this.http.post<logIn>(`${this.uri}/api/login`, { username, password }, { withCredentials: true });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setToken(value) {
    this.token = value;
  }

  // getLogin() {
  //   return this.http.get<isLogged>(`${this.uri}/api/checkIsLogin`, {
  //     withCredentials: true  // <=========== important!
  //   }).subscribe(data => {
  //     this.setLoggedIn(data.isLoggedIn);
  //     this.setToken(data.token);
  //   });
  // }

  logout() {
    return this.http.post(`${this.uri}/api/logout`, { withCredentials: true });
  }

  getToken() {
    return this.token;
  }

}
