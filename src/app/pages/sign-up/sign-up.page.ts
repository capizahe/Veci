import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user-service.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

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

  //MAP VARIABLES
  map: any;
  mapAddress: string;
  lat: string;
  long: string;
  autoComplete: { input: string };
  autoCompleteItems: any[];
  location: any;
  placeid: any;
  googleAutoComplete: any;
  //END MAP VARIABLES

  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  userid: string;

  options: any;

  constructor(private loginService: LoginService, private userService: UserService,
    private geoLocation: Geolocation, private nativeGeoCoder: NativeGeocoder, public zone: NgZone, private platform: Platform) {

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


  loadMap() {
    this.platform.ready().then(() => {

      const options = {
        enableHighAccuracy: true, timeout: 60000
      };

      //Obtener cordenadas desde telefono

      this.geoLocation.getCurrentPosition(options).then((resp) => {
        this.autoComplete.input = `${resp.coords.latitude}, ${resp.coords.longitude}`;
        console.log('CURRENT POSITION', resp.coords.latitude, resp.coords.longitude);
        /*
              const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

              const mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              //Pasar las coordenadas al mapa de google
              this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
              this.map.addListener('tilesloaded', () => {
                console.log('accuracy', this.map, this.map.center.lat());
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
                this.lat = this.map.center.lat();
                this.long = this.map.center.lng();
              });*/
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

  //FUNCION DEL BOTON INFERIOR PARA QUE NOS DIGA LAS COORDENADAS DEL LUGAR EN EL QUE POSICIONAMOS EL PIN.
  showCords() {
    alert('lat' + this.lat + ', long' + this.long);
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

  //FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
  selectSearchResult(item) {
    //AQUI PONDREMOS LO QUE QUERAMOS QUE PASE CON EL PLACE ESCOGIDO, GUARDARLO, SUBIRLO A FIRESTORE.
    //HE AÑADIDO UN ALERT PARA VER EL CONTENIDO QUE NOS OFRECE GOOGLE Y GUARDAMOS EL PLACEID PARA UTILIZARLO POSTERIORMENTE SI QUEREMOS.
    alert(JSON.stringify(item));
    this.placeid = item.place_id;
  }


  //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  clearAutocomplete() {
    this.autoCompleteItems = [];
    this.autoComplete.input = '';
  }

  //EJEMPLO PARA IR A UN LUGAR DESDE UN LINK EXTERNO, ABRIR GOOGLE MAPS PARA DIRECCIONES.
  goTo() {
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
  }


}
