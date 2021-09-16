import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMapsGeolocalizacaoPage } from './google-maps-geolocalizacao';

@NgModule({
  declarations: [
    GoogleMapsGeolocalizacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapsGeolocalizacaoPage),
  ],
})
export class GoogleMapsGeolocalizacaoPageModule {}
