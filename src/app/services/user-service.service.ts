/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userService: string;

  private user: User;

  constructor(private httpClient: HttpClient) {
    this.userService = environment.userServiceURL;
  }

  /**
   * Returns user information
   *
   * @param email
   * @param userid
   * @returns
   */
  getUserInfo(email: string, userid: string) {

    const URL = this.userService + '/find';

    const params = new HttpParams({
      fromObject: {
        email: email,
        user_account_id: userid
      }
    });

    return this.httpClient.get<User[]>(URL, { params: params });
  }


  createUser(user: User) {

    const URL = this.userService + '/create';

    const body = {
      name: user.name,
      last_name: 'asd',
      address: user.address,
      departament: 'asd',
      neighborhood: 'sasd',
      country: 'asd',
      email: user.email,
      phone_number: user.phone_number,
      user_account_id: user.user_account_id,
      city: 'asd',
      geo_location: 'asd'

    };

    return this.httpClient.post<any>(URL, body);



  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
