import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading = false;

  private email;
  private id;


  constructor(public alertController: AlertController, private router: Router,
    private platform: Platform, private loginService: LoginService, private userService: UserService) {

  }

  ngOnInit() {

    //Validate if user it is logged already in the system

    this.loginService.getUser().subscribe(user => {

      if (user) {
        this.loading = true;
        this.email = user.email;
        this.id = user.uid;
        this.userService.getUserInfo(this.email, this.id)
          .subscribe({
            next: (userdb) => {
              console.log(userdb);
              if (userdb && userdb.length === 1) {
                this.userService.setUser(userdb[0]);
                this.router.navigateByUrl('/tabs');
              } else {
                //User it is not in the db yet - redirect to signup page
                this.router.navigateByUrl('/sign-up');
              }
            },
            error: (error) => {
              this.loading = false;
              this.presentAlert('ERROR', 'ha ocurrido un error por favor intenta mas tarde');
              console.log('ha ocurrido un error', error);
            }
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
        .then(data => {
          this.userService.getUserInfo(data.user.email, data.user.uid)
            .subscribe({
              next: (userdb) => {
                console.log(userdb);
                if (userdb && userdb.length === 1) {
                  this.userService.setUser(userdb[0]);
                  this.router.navigateByUrl('/tabs');
                } else {
                  //User it is not in the db yet - redirect to signup page
                  this.router.navigateByUrl('/sign-up');
                }
              },
              error: (error) => {
                this.presentAlert('ERROR', 'ha ocurrido un error');
                console.log('ha ocurrido un error', error);
              }
            });
        })
        .catch((reason) => {
          this.presentAlert('ERROR', 'ha ocurrido un error');
          console.log(reason);
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

  async presentAlert(messageType: string, message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: `${messageType}`,
      message: `${message}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
