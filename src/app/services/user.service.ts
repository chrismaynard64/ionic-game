import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _currentUser: User = null;
  subject = new ReplaySubject<User>();

  get userSub() {
    return this.subject;
  }

  constructor(private http: HttpClient) { }


  loadUser(user: User) {
      let ret: User = null;

    this.http.post<User>(config.apiUrl + 'user',user, ).subscribe(u => {
      this._currentUser = u;
      this.userSub.next(u);
    });

  }

}
