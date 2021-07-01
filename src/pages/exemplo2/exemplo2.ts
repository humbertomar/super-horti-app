import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

declare var google;

@IonicPage()
@Component({
  selector: 'page-exemplo2',
  templateUrl: 'exemplo2.html',
})
export class Exemplo2Page {

  map: any;

  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;

  geocoder: any;
  markers: any;

  geoAddress: string;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public zone: NgZone,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Exemplo2Page');
  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -16.665136, lng: -49.286041 },
      zoom: 15
    });
  }

  updateSearchResults(){

    //console.log(this.autocomplete.input);

    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {

      //console.log(predictions);

      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item){
    //this.clearMarkers();
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: true
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);

        console.log(results[0]);

        //console.log(results[0].geometry.location);

        //geoPosit(this.markers.push(marker));

        google.maps.event.addListener(marker, 'dragend', function () {
          geoPosit(marker.getPosition());
        });

        var geocoder;

        var geoPosit = function geocodePosition(pos) {
          geocoder = new google.maps.Geocoder();
          geocoder.geocode({
              latLng: pos
            },
              function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  this.address = results[0].formatted_address;
                  //console.log(results[0].formatted_address);
                  console.log(results[0]);
                  alert(JSON.stringify(results[0]));
                }
                else {
                  console.log('Cannot determine address at this location.' + status);
                }
              }
            );
        }

      }
    })
    
  }

  tryGeolocation(){
    //this.clearMarkers();
    
    this.geolocation.getCurrentPosition().then((resp) => {
      
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: 'Eu estou Aqui!',
        draggable: true
      });
      this.markers.push(marker);
      this.map.setCenter(pos);

      ///geoPosit(marker.getPosition());

      //console.log(resp);

      this.getGeoencoder( resp.coords.latitude, resp.coords.longitude);

      google.maps.event.addListener(marker, 'dragend', function () {
        geoPosit(marker.getPosition());
      });

      var geocoder;

      var geoPosit = function geocodePosition(pos) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            latLng: pos
          },
            function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                this.address = results[0].formatted_address;
                //console.log(results[0].formatted_address);
                console.log(results[0]);
                alert(JSON.stringify(results[0]));
              }
              else {
                console.log('Cannot determine address at this location.' + status);
              }
            }
          );
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      //this.geoAddress = this.generateAddress(result[0]);
      //console.log(this.geoAddress);
      //alert(JSON.stringify(this.geoAddress));
      alert(JSON.stringify(result[0]));
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
  return address.slice(0, -2);
}

}
