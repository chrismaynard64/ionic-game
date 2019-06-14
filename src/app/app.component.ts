import { UserService } from './services/user.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.initializeApp();
    this.auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
    // this.auth.renewTokens();
    }

    this.userService.userSub.subscribe(u => {

    });


    this.auth.user.subscribe(u => {
        this.userService.loadUser(u);
    });
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
