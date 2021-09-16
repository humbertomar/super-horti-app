import { Component, NgZone, Output } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ViewController,
    LoadingController,
    AlertController,
} from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {} from 'google.maps';

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

    geocoder: google.maps.Geocoder;
    @Output()
    markers: any;

    geoAddress: string;

    geoencoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
    };

    address: any = { latitude: 0, longitude: 0 };

    constructor(
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public zone: NgZone,
        private geolocation: Geolocation,
        public alertCtrl: AlertController
    ) {
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];

        this.geocoder = new google.maps.Geocoder();
        this.markers = [];
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                this.addMarker(
                    success.coords.latitude,
                    success.coords.longitude
                );
                this.geoPosit(
                    new google.maps.LatLng({
                        lat: success.coords.latitude,
                        lng: success.coords.longitude,
                    })
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    addMarker(lat: number, lng: number) {
        var marker: google.maps.Marker = new google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            animation: google.maps.Animation.DROP,
            draggable: true,
        });
        this.markers.push(marker);
        this.map.setCenter(marker.getPosition());

        google.maps.event.addListener(marker, 'dragend', () =>
            this.geoPosit(marker.getPosition())
        );
    }

    cepIn(cep) {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Aguarde...',
        });

        loading.present();

        setTimeout(() => {
            if (Object.keys(this.address).length > 0) {
                this.viewCtrl.dismiss({
                    data: this.address,
                });
            }
        }, 1000);

        setTimeout(() => {
            loading.dismiss();
        }, 2300);
    }

    ionViewDidEnter() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -16.665136, lng: -49.286041 },
            disableDefaultUI: true,
            zoom: 15,
        });
        this.getCurrentPosition();
    }

    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions(
            { input: this.autocomplete.input },
            (predictions, status) => {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        );
    }

    clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    async selectSearchResult(item) {
        this.clearMarkers();
        this.autocompleteItems = [];

        var response = await this.geocoder.geocode({
            placeId: item.place_id,
        });

        this.addMarker(
            response.results[0].geometry.location.lat(),
            response.results[0].geometry.location.lng()
        );

        this.populateAddress(response.results[0]);
    }

    populateAddress(geocoderResult: google.maps.GeocoderResult) {
        console.log(geocoderResult);
        this.address = {};
        this.address.estado = geocoderResult.address_components.find(
            (address) => address.types.includes('administrative_area_level_1')
        )?.short_name;
        this.address.cidade = geocoderResult.address_components.find(
            (address) => address.types.includes('administrative_area_level_2')
        )?.long_name;
        this.address.bairro = geocoderResult.address_components.find(
            (address) =>
                address.types.includes('sublocality') ||
                address.types.includes('administrative_area_level_3')
        )?.long_name;
        this.address.cep = geocoderResult.address_components.find((address) =>
            address.types.includes('postal_code')
        )?.long_name;
        this.address.endereco = geocoderResult.address_components.find(
            (address) => address.types.includes('route')
        )?.long_name;
        this.address.latitude = geocoderResult.geometry.location.lat();
        this.address.longitude = geocoderResult.geometry.location.lng();
        console.log(this.address);
    }

    async geoPosit(pos: google.maps.LatLng) {
        var response = await this.geocoder.geocode({
            location: pos,
        });
        this.populateAddress(response.results[0]);
    }

    tryGeolocation() {
        this.clearMarkers();

        this.geolocation
            .getCurrentPosition()
            .then((resp: Geoposition) => {
                this.addMarker(resp.coords.latitude, resp.coords.longitude);
                this.geoPosit(
                    new google.maps.LatLng({
                        lat: resp.coords.latitude,
                        lng: resp.coords.longitude,
                    })
                );
            })
            .catch((error) => {
                console.log('Error getting location', error);
            });
    }
}
