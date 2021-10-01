import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;

  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  userid: string;

  options: any;

  constructor(private loginService: LoginService, private userService: UserService) {

    this.options = {
      direction: 'vertical',
      zoom: false,
      slidesPreview: 1,
      slidesPerView: 1
    };

    this.loginService.getUser().subscribe(user => {
      console.log(user);
      this.name = user.displayName;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.userid = user.uid;
    });

  }

  ngOnInit() {

  }


  nextSlide(end?: boolean) {
    this.slides.slideNext();

    if (end) {

      const newUser = new User();

      newUser.name = this.name;
      newUser.phone_number = this.phoneNumber;
      newUser.address = this.address;
      newUser.email = this.email;
      newUser.user_account_id = this.userid;

      this.userService.createUser(newUser).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });

    }
  }


}
