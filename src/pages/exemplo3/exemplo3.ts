import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-exemplo3',
  templateUrl: 'exemplo3.html',
})
export class Exemplo3Page {

  markers = [];

  @ViewChild('map') mapRef:ElementRef;
  constructor(public navCtrl: NavController,
     public navParams: NavParams) {

    }
    
    ionViewDidLoad() {
      this.DisplayMap();
    }

    DisplayMap() {

      const location = new google.maps.LatLng(-16.665136, -49.286041);

      const options = {
        center: location,
        zoom:20,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      const map = new google.maps.Map(this.mapRef.nativeElement,options);

      this.addMarker(location,map);
    }

    addMarker(location,map) {

      /*return new google.maps.Marker({
        location,
        map,
        draggable: true
      });*/

      var marker = new google.maps.Marker({
        draggable: true,
        map: map,
        animation: google.maps.Animation.DROP,
        position: location
      });

      console.log(marker.getPosition());

      google.maps.event.addListener(marker, 'dragend', function () {
        geocodePosition(marker.getPosition());
      });

      var geocoder;

      function geocodePosition(pos) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            latLng: pos
          },
            function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                this.address = results[0].formatted_address;
                console.log(results[0].formatted_address);
              }
              else {
                console.log('Cannot determine address at this location.' + status);
              }
            }
          );
      }
    }

}
