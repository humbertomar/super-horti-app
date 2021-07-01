import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from "@ionic-native/splash-screen";

import { HttpModule } from '@angular/http';

import { MyApp } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import "firebase/storage";

import { DatePicker } from "@ionic-native/date-picker";

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { firebaseConfig } from "./firebase.config";

import { CartService } from "../pages/cart.service";

import { SocialSharing } from '@ionic-native/social-sharing';

import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { Common } from '../providers/common';

import { BrMaskerModule } from 'brmasker-ionic-3';

import { CalendarModule } from "ion2-calendar";

import { InsertCepPage } from "../pages/insert-cep/insert-cep";
import { CheckoutPage } from "../pages/checkout/checkout";
import { AddEnderecoPage } from "../pages/add-endereco/add-endereco";

import { Geolocation } from '@ionic-native/geolocation';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { MapProvider } from '../providers/map/map';

import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { GoogleMapsGeolocalizacaoPage } from "../pages/google-maps-geolocalizacao/google-maps-geolocalizacao";

import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
  declarations: [MyApp, InsertCepPage, GoogleMapsGeolocalizacaoPage, CheckoutPage, AddEnderecoPage],
  imports: [
    //IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {
      platforms: {
				ios: {
					backButtonText: ''
        },
        android: {
					backButtonText: ''
				}
      },
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: true
		}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule, HttpModule,
    HttpClientModule,

    BrMaskerModule,

    CalendarModule
    //StatusBar
  ],
  exports: [BrowserModule, BrMaskerModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, InsertCepPage, GoogleMapsGeolocalizacaoPage, CheckoutPage, AddEnderecoPage],
  providers: [
    Common,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CartService,
    DatePicker,
    AuthServiceProvider,
    FirebaseServiceProvider,

    SocialSharing,

    BrMaskerModule,

    StatusBar,

    Geolocation,

    SpinnerProvider,
    MapProvider,

    NativeGeocoder,

    Diagnostic
  ]
})
export class AppModule { }
