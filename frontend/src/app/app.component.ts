import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'houserent';
  username: string |any;
  password: string |any;
  usertype:string |any;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn
  constructor(private authService: AuthService,private router: Router,private http: HttpClient) {
    if (this.authService.isLoggedIn()) {
      this._isLoggedIn = true;

    }
  }

  ngOnInit() {

    this.usertype = localStorage.getItem('usertype');
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');


  }


  logout(): Observable<any> {

    this.authService.clearToken();
    this._isLoggedIn = false;
    window.location.replace('/login');
    return new Observable(observer => {
      observer.complete();

    });

  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
