import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  currentUser: User = null;

  constructor(private userService: UserService) {}

 ngOnInit() {
    this.userService.userSub.subscribe(u => {
      this.currentUser = u;
    });
 }

}
