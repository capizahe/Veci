import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email;
  private id;

  constructor(public alertController: AlertController, private router: Router,
    private platform: Platform, private auth: AngularFireAuth, private loginService: LoginService) {

  }

  ngOnInit() {

    //Validate if user it is logged already in the system

    this.loginService.getUser().subscribe(user => {

      if (user) {
        this.email = user.email;
        this.id = user.uid;
        this.presentAlert().then(() => {
          this.router.navigateByUrl('/tabs');
        });
      }
    });
  }

  googleLogin() {

    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin()
        .then(user => {
          if (user) {
            console.log(user);

          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.webGoogleLogin()
        .then(user => {
          console.log(user);
        });
    }

  }

  // NEED-FIX
  facebookLogin() {

    if (this.platform.is('cordova')) {
    } else {
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    try {

      const auth = await this.loginService.nativeLogin();
      return auth;

    } catch (error) {
      console.log(error);
    }
  }

  async webGoogleLogin() {
    try {
      const auth = await this.loginService.webGoogleLogin();
      return auth;
    } catch (error) {
      console.log(error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: `Bienvenido`,
      message: `${this.email}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
