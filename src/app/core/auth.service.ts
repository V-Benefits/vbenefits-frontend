import { Injectable, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../login/models/login.Model';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private _router: Router,
    private http: HttpClient,
  ) {}

  login(user: LoginModel) {
    debugger;
    return this.http.post<LoginModel>(
      environment.serverUrl + 'account/login',
      user
    );
  }
  logout() {
    debugger;
    console.log('isnide logout Function()');
    let email = JSON.parse(localStorage.getItem('Email'));
    if (email == null) {
      localStorage.clear();
      console.log('cleared local storage', localStorage.getItem('Email'));
      // window.location.replace('http://localhost:85/api/account/login');
      window.location.replace('http://localhost:4200/login');

      this.http
        .post<LoginModel>(environment.serverUrl + 'account/logout', email)
        .subscribe(
          success => {
            localStorage.clear();
            window.location.replace('http://localhost:4200/login');

            // window.location.replace('http://localhost:85/api/account/login');
            // window.location.replace('http://localhost:4200/login');
            //  window.location.replace('http://10.230.196.38/smartwallettest/login');
            //window.location.replace('http://10.230.196.38/SmartWalletUI/login');
          },
          error => {
            localStorage.clear();
            window.location.replace('http://localhost:4200/login');
            // window.location.replace('http://localhost:4200/login');
            // window.location.replace('http://10.230.196.38/smartwallettest/login');
            //window.location.replace('http://10.230.196.38/SmartWalletUI/login');

            console.log(error);
          }
        );
    }
  }

  // logoutOnClose() {
  //   let LoginUser = JSON.parse(localStorage.getItem('LoginUser'));
  //   if (LoginUser !== null) {
  //     this.http
  //       .post<LoginModel>(environment.serverUrl + 'account/logout', LoginUser)
  //       .subscribe(
  //         success => {
  //           localStorage.clear();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    console.log('inside canActivate function .......');
      if (this.isAuthenticated()) {
        console.log('passed isAuthenticated()');
        let email = localStorage.getItem('Email');
        console.log('userEmail is --> ', email);
        return true;
      } else {
        this.logout();
      }
  }
  /**
   * this is used to clear anything that needs to be removed
   */
  /**
   * check for expiration and if token is still existing or not
   */
  isAuthenticated(): boolean {
    debugger;
    const res = localStorage.getItem('Token') !== null && !this.isTokenExpired();
    console.log('current token is --> ', localStorage.getItem('Token'));

    return res;
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    debugger;
    let token = this.decode();
    return token.exp ? false : true;
  }
  /**
   * this is used to clear local storage and also the route to login
   */

  decode() {
    debugger;
    return decode(localStorage.getItem('Token'));
  }
}
