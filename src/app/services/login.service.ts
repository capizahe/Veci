import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: Observable<firebase.User>;

  constructor(private googlePlus: GooglePlus, private auth: AngularFireAuth) {
    this.user = this.auth.authState;
  }

  /**
   * @returns Observable<firebase.User>
   */
  getUser(): Observable<firebase.User> {
    return this.user;
  }

  /**
   * Login with Auth Provider from google native
   *
   * @param token
   * @returns
   */
  async nativeLogin() {

    const gplusUser = await this.googlePlus.login({});

    return await this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, gplusUser.accessToken));
  }

  async webGoogleLogin() {

    const provider = new firebase.auth.GoogleAuthProvider().addScope('phone');

    return await this.auth.signInWithPopup(provider);
  }


}
