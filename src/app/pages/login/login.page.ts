import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private user: Observable<firebase.User>;
  private email;
  private id;

  constructor(public alertController: AlertController, private router: Router,
    private googlePlus: GooglePlus, private platform: Platform, private auth: AngularFireAuth) {

    this.user = this.auth.authState;

  }

  async ngOnInit() {

    await this.user.subscribe(user => {

      if (user) {
        console.log('user logged in', user.email);
        this.email = user.email;
        this.id = user.uid;
        this.presentAlert().then(() => {
          this.router.navigateByUrl('/tabs');
        });
      } else {
        console.log('user not logged in');
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

  async nativeGoogleLogin(): Promise<any> {
    try {

      const gplusUser = await this.googlePlus.login({
        webClientId: '221788106045-trn14ssklpbg0hsnov8mu2hfnduurqel.apps.googleusercontent.com',
        offline: false,
        scopes: 'profile email'
      });

      return await this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (error) {
      console.log(error);
    }
  }

  async webGoogleLogin(): Promise<any> {
    try {

      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);

      return credential;

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
