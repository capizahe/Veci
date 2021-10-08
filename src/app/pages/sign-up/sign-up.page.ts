import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, Platform } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user-service.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';

// eslint-disable-next-line no-var
declare var google;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  //map variables
  map: any;
  mapAddress: string;
  lat: string;
  long: string;
  autoComplete: { input: string };
  autoCompleteItems: any[];
  location: any;
  placeid: any;
  googleAutoComplete: any;

  //SingUp user variables
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  userid: string;
  country: string;
  state: string;
  city: string;

  //aux variables
  options: any;
  enableMap = false;
  description: string;

  constructor(private router: Router, private loginService: LoginService, private userService: UserService,
    private geoLocation: Geolocation, private nativeGeoCoder: NativeGeocoder,
    public zone: NgZone, private platform: Platform, private alertController: AlertController) {

    this.googleAutoComplete = new google.maps.places.AutocompleteService();
    this.autoComplete = { input: '' };
    this.autoCompleteItems = [];

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
      console.log(this.email);
    });

  }

  ngOnInit() {

  }


  nextSlide(end?: boolean, field?: string) {
    //Pendiente hacer validaciónes ej. regex phone number
    switch (field) {
      case 'phone':
        if (!this.phoneNumber || this.phoneNumber.length < 5) {
          this.presentErrorAlert('ERROR', 'El numero de telefono no puede ir vacío.');
        } else {
          if (end) {
            this.enableMap = true;
            this.loadMap();
          }
        }
        break;
      case 'name':
        if (!this.name || this.name.length < 5) {
          this.presentErrorAlert('ERROR', 'El nombre no puede ir vacío.');
        } else {
          this.slides.slideNext();
        }
        break;
    }
  }


  loadMap() {
    this.platform.ready().then(() => {

      const options = {
        enableHighAccuracy: true, timeout: 60000
      };
      this.geoLocation.getCurrentPosition(options).then((resp) => {

        const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          center: latLng,
          zoom: 40,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //Pasar las coordenadas al mapa de google
        this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map.addListener('tilesloaded', () => {
          console.log('accuracy', this.map, this.map.center.lat());
          this.lat = this.map.center.lat();
          this.long = this.map.center.lng();
        });
      }).catch((error) => {
        console.log('Error getting location', error);

      });
    });
  }


  getAddressFromCoords(latitude: number, longitude: number) {

    console.log('getAddressFromCoords ' + latitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeoCoder.reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();

        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });

  }

  showCords() {

    const newUser = new User();
    newUser.name = this.name;
    newUser.phone_number = this.phoneNumber;
    newUser.address = this.description;
    newUser.geo_location = `${this.lat},${this.long}`;
    newUser.email = this.email;
    newUser.user_account_id = this.userid;
    newUser.city = this.city;
    newUser.country = this.country;
    newUser.departament = this.state;
    console.log(newUser);
    this.userService.createUser(newUser).subscribe({
      next: (data) => {
        if (data && data.token) {
          this.router.navigateByUrl('/tabs');
        }
      },
      error: (error) => {
        this.presentErrorAlert('ERROR', 'Ha ocurrido un error al intentar crear el usuario. Por favor intenta mas tarde');
        console.log(error);
      }
    });
  }

  //AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  updateSearchResults() {
    if (this.autoComplete.input === '') {
      this.autoCompleteItems = [];
      return;
    }
    this.googleAutoComplete.getPlacePredictions({ input: this.autoComplete.input },
      (predictions, status) => {
        this.autoCompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autoCompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {

    this.description = item.description;
    this.placeid = item.place_id;
    this.address = item.terms[0].value;
    this.city = item.terms[item.terms.length - 3].value;
    this.state = item.terms[item.terms.length - 2].value;
    this.country = item.terms[item.terms.length - 1].value;

    const place = new google.maps.places.PlacesService(this.map);
    place.getDetails({
      placeId: this.placeid
    }, (result, status) => {
      if (google.maps.places.PlacesServiceStatus.OK === 'OK') {
        console.log(status);
        console.log(result.geometry.location.toString());
        this.lat = result.geometry.location.lat();
        this.long = result.geometry.location.lng();
        this.getAddressFromCoords(result.geometry.location.lat(), result.geometry.location.lng());

        //Crea un marcador en el mapa.
        const marker = new google.maps.Marker({
          map: this.map,
          place: {
            placeId: this.placeid,
            location: result.geometry.location
          }
        });

        //Centra el mapa en nueva posición
        const position = new google.maps.LatLng(this.lat, this.long);
        this.map.setCenter(position);

        //Clean items
        this.autoCompleteItems = [];
      }
    });
  }


  //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  clearAutocomplete() {
    this.autoCompleteItems = [];
    this.autoComplete.input = '';
  }


  async presentConfirmAlert(messageType: string, message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: `${messageType}`,
      mode: 'ios',
      message: `${message}`,
      translucent: true,
      buttons: [{
        text: 'Confirmar',
        handler: () => {
          this.showCords();
        }
      },
      {
        text: 'Verificar',
        handler: () => {
          this.enableMap = false;
          this.slides.slideTo(0);
        }
      }]
    });
    await alert.present();
  }

  async presentErrorAlert(messageType: string, message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: `${messageType}`,
      message: `${message}`,
      buttons: ['OK']
    });
    await alert.present();
  }


  triggerConfirmAlert() {
    this.presentConfirmAlert('Validación',
      'Seguro que quieres continuar, está información será la que te permitirá encontrar las tiendas mas cercanas');
  }
}
