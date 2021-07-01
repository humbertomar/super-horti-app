import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Console } from '@angular/core/src/console';

declare var google;

@IonicPage()
@Component({
  selector: 'page-google-maps-geolocalizacao',
  templateUrl: 'google-maps-geolocalizacao.html',
})
export class GoogleMapsGeolocalizacaoPage {

  public backgroundImage = 'assets/img/bg.jpg';

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

  address: any = [];

  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,

    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,

    private diagnostic: Diagnostic,

    public alertCtrl: AlertController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
  }

  ionViewDidLoad() {
    
    //console.log('ionViewDidLoad Exemplo2Page');
    
    this.diagnostic.isLocationEnabled().then((res) => {
      //alert('Is Location Enabled? '+ res);
      if (res == false) {
        let confirm = this.alertCtrl.create({
          title: '<b>GPS Desativado</b>',
          message: 'As informações de localização não estão disponíveis neste dispositivo. Vá para Configurações e habilite o GPS.',
          buttons: [
            {
              text: 'Ir para as Configurações',
              handler: () => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        confirm.present();
      }
    }).catch(e => console.error(e));

  }

  cepIn(cep) {
    //console.log(cep);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Aguarde...'
    });
  
    loading.present();
  
    setTimeout(() => {
      
      if(cep!=0){

        //console.log(Object.keys(this.address).length);

        if(Object.keys(this.address).length >0 ){
          this.viewCtrl.dismiss({
            data: this.address
            /*endereco: this.address.endereco,
            bairro: this.address.bairro,
            cidade: this.address.cidade,
            estado: this.address.estado,
            cep: this.address.cep*/
           });
        }else{
          this.address = [];
          this.address.endereco = 0;
          this.address.bairro = 0;
          this.address.cidade = 0;
          this.address.estado = 0;
          this.address.cep = 0;
          this.viewCtrl.dismiss({ data: this.address });
        }
        
      }else{
        this.address = [];
        this.address.endereco = 0;
        this.address.bairro = 0;
        this.address.cidade = 0;
        this.address.estado = 0;
        this.address.cep = 0;
        this.viewCtrl.dismiss({ data: this.address });
      }

    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 2300);
    
  }

  ionViewDidEnter() {
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -16.665136, lng: -49.286041 },
      zoom: 15
    });
  }

  updateSearchResults() {

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

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {

        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(results[0].geometry.location.lat(), results[0].geometry.location.lng(), options)
          .then((result2: NativeGeocoderReverseResult[]) => {
            this.address = [];
            //this.address.cep = result2[0]['postalCode'];
            this.address.latitude = result2[0]['latitude'];
            this.address.longitude = result2[0]['longitude'];

            //alert(JSON.stringify(result2[0]['postalCode']));
            /*alert(JSON.stringify(result2[0]));
            alert(JSON.stringify(result2[0]['latitude']));
            alert(JSON.stringify(result2[0]['longitude']));*/

          }).catch((error: any) => console.log(error));

        /*let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };*/
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: true
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);

        //console.log(results[0].address_components[0]);
        //console.log(results[0]);
        //console.log(results[0].address_components[5]);

        if(results[0].address_components[5]){
          
        }else{
          /*let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Infelizmente não conseguimos localizar o seu CEP. Faça o seu pedido diretamente com nossa atendente pelo WhatsApp!",
            buttons: [
              {
                text: "OK",
                role: 'cancel',
                handler: data => {
                  this.cepIn(0);
                }
              }
            ]
          });
          alert.present();*/
          //console.log('Infelizmente não conseguimos localizar o seu CEP. Faça o seu pedido diretamente com nossa atendente pelo WhatsApp!');
        }

        /*this.address = [];
        this.address.endereco = results[0].address_components[0].long_name;
        this.address.bairro = results[0].address_components[1].long_name;
        this.address.cidade = results[0].address_components[2].long_name;
        this.address.estado = results[0].address_components[3].long_name;*/
        ///this.address.cep = results[0].address_components[5].long_name;

        //this.address = results[0].address_components;
        console.log(this.address);

        //console.log(results[0].geometry.location);

        //geoPosit(this.markers.push(marker));

        //Reload markers every time the zoom changes
        //google.maps.event.addListener(marker, 'zoom_changed', function () {
        //Reload markers every time the map moves
        google.maps.event.addListener(marker, 'dragend', function () {
        //Wait until the map is loaded
        //google.maps.event.addListener(marker, 'idle', function () {
          geoPosit(marker.getPosition());
        });

        var geoPosit = function geocodePosition(pos) {

          //console.log(JSON.stringify(pos.lat()));
          //console.log(JSON.stringify(pos.lng()));

          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            latLng: pos
          },
            function (results, status) {
              
              ///alert(JSON.stringify(results));

              if (status == google.maps.GeocoderStatus.OK) {

                //this.address = results[0].formatted_address;
                //console.log(results[0].formatted_address);
                //this.address = results[0].address_components;
                
                this.address = [];
                this.address.latitude = pos.lat();
                this.address.longitude = pos.lng();
                
                /*this.address = [];
                this.address.endereco = results[0].address_components[1].long_name;
                this.address.bairro = results[0].address_components[2].long_name;
                this.address.cidade = results[0].address_components[3].long_name;
                this.address.estado = results[0].address_components[4].long_name;
                this.address.cep = results[0].address_components[6].long_name;*/
                console.log(this.address);
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

  tryGeolocation() {

    this.diagnostic.isLocationEnabled().then((res) => {
      //alert('Is Location Enabled? '+ res);
      if (res == false) {
        let confirm = this.alertCtrl.create({
          title: '<b>GPS Desativado</b>',
          message: 'As informações de localização não estão disponíveis neste dispositivo. Vá para Configurações e habilite o GPS.',
          buttons: [
            {
              text: 'Ir para as Configurações',
              handler: () => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        confirm.present();
      } else {

        this.clearMarkers();

        this.geolocation.getCurrentPosition().then((resp) => {

          ///alert('1: '+JSON.stringify(resp));

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

          let geocoder2 = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          let request = { latLng: latlng };

          geocoder2.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              this.zone.run(() => {

                ///alert('2: '+JSON.stringify(results));

                if (results[0] != null) {
                  
                  this.address = [];
                  this.address.latitude = resp.coords.latitude;
                  this.address.longitude = resp.coords.longitude;

                  console.log(this.address);

                  ///console.log(results[0].formatted_address);
                  ///alert('348: '+JSON.stringify(results[0].address_components));
                  //alert('298: '+JSON.stringify(results[0].address_components[6].long_name));
                  /*
                  //console.log(results[0].address_components[0].long_name);
                  console.log(results[0].address_components[1].long_name);
                  console.log(results[0].address_components[2].long_name);
                  console.log(results[0].address_components[3].long_name);
                  console.log(results[0].address_components[4].long_name);
                  //console.log(results[0].address_components[5].long_name);
                  console.log(results[0].address_components[6].long_name);
                  */
                  //console.log(results[0]);
                  ///this.address.endereco = results[0].address_components[1].long_name;
                  /*this.address = [];
                  this.address.endereco = results[0].address_components[1].long_name;
                  this.address.bairro = results[0].address_components[2].long_name;
                  this.address.cidade = results[0].address_components[3].long_name;
                  this.address.estado = results[0].address_components[4].long_name;
                  this.address.cep = results[0].address_components[6].long_name;*/
                  //console.log(results[0]);
                }
              })
            }
          });

          google.maps.event.addListener(marker, 'dragend', function () {
            geoPosit(marker.getPosition());
          });

          var geocoder;

          var geoPosit = function geocodePosition(pos) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              latLng: pos
            },
              function (results2, status) {

                ///alert('3: '+JSON.stringify(results2));

                if (status == google.maps.GeocoderStatus.OK) {

                  this.address = [];
                  this.address.latitude = pos.lat();
                  this.address.longitude = pos.lng();

                  console.log(this.address);

                  //this.address = results[0].address_components;
                  //console.log(results[0].address_components[1].long_name);
                  ///this.address = results[0].formatted_address;
                  //console.log(results[0].formatted_address);
                  ///console.log(results[0].address_components);
                  ///alert('340: '+JSON.stringify(results[0].address_components[6].long_name));
                  /*this.address = [];
                  this.address.endereco = results2[0].address_components[1].long_name;
                  this.address.bairro = results2[0].address_components[2].long_name;
                  this.address.cidade = results2[0].address_components[3].long_name;
                  this.address.estado = results2[0].address_components[4].long_name;
                  this.address.cep = results2[0].address_components[6].long_name;*/
                  //console.log(results2[0]);
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
    }).catch(e => console.error(e));

  }

}
