webpackJsonp([19],{

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exemplo2PageModule", function() { return Exemplo2PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exemplo2__ = __webpack_require__(770);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Exemplo2PageModule = /** @class */ (function () {
    function Exemplo2PageModule() {
    }
    Exemplo2PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__exemplo2__["a" /* Exemplo2Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__exemplo2__["a" /* Exemplo2Page */]),
            ],
        })
    ], Exemplo2PageModule);
    return Exemplo2PageModule;
}());

//# sourceMappingURL=exemplo2.module.js.map

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Exemplo2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Exemplo2Page = /** @class */ (function () {
    function Exemplo2Page(navCtrl, navParams, zone, geolocation, nativeGeocoder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
    }
    Exemplo2Page.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad Exemplo2Page');
    };
    Exemplo2Page.prototype.ionViewDidEnter = function () {
        //Set latitude and longitude of some place
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -16.665136, lng: -49.286041 },
            zoom: 15
        });
    };
    Exemplo2Page.prototype.updateSearchResults = function () {
        //console.log(this.autocomplete.input);
        var _this = this;
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, function (predictions, status) {
            //console.log(predictions);
            _this.autocompleteItems = [];
            _this.zone.run(function () {
                predictions.forEach(function (prediction) {
                    _this.autocompleteItems.push(prediction);
                });
            });
        });
    };
    Exemplo2Page.prototype.selectSearchResult = function (item) {
        var _this = this;
        //this.clearMarkers();
        this.autocompleteItems = [];
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                    animation: google.maps.Animation.DROP,
                    draggable: true
                });
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
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
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            this.address = results[0].formatted_address;
                            //console.log(results[0].formatted_address);
                            console.log(results[0]);
                            alert(JSON.stringify(results[0]));
                        }
                        else {
                            console.log('Cannot determine address at this location.' + status);
                        }
                    });
                };
            }
        });
    };
    Exemplo2Page.prototype.tryGeolocation = function () {
        //this.clearMarkers();
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            var pos = {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: _this.map,
                animation: google.maps.Animation.DROP,
                title: 'Eu estou Aqui!',
                draggable: true
            });
            _this.markers.push(marker);
            _this.map.setCenter(pos);
            ///geoPosit(marker.getPosition());
            //console.log(resp);
            _this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
            google.maps.event.addListener(marker, 'dragend', function () {
                geoPosit(marker.getPosition());
            });
            var geocoder;
            var geoPosit = function geocodePosition(pos) {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    latLng: pos
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.address = results[0].formatted_address;
                        //console.log(results[0].formatted_address);
                        console.log(results[0]);
                        alert(JSON.stringify(results[0]));
                    }
                    else {
                        console.log('Cannot determine address at this location.' + status);
                    }
                });
            };
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    Exemplo2Page.prototype.getGeoencoder = function (latitude, longitude) {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then(function (result) {
            //this.geoAddress = this.generateAddress(result[0]);
            //console.log(this.geoAddress);
            //alert(JSON.stringify(this.geoAddress));
            alert(JSON.stringify(result[0]));
        })
            .catch(function (error) {
            alert('Error getting location' + JSON.stringify(error));
        });
    };
    Exemplo2Page.prototype.generateAddress = function (addressObj) {
        var obj = [];
        var address = "";
        for (var key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (var val in obj) {
            if (obj[val].length)
                address += obj[val] + ', ';
        }
        return address.slice(0, -2);
    };
    Exemplo2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exemplo2',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo2\exemplo2.html"*/'<ion-content>\n\n  <ion-row>\n    <ion-col col-12 text-center>\n      <button (click)="tryGeolocation()" ion-button small color="energy">Pegar Minha Localização Atual</button>\n    </ion-col>\n  </ion-row>\n\n  <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="Digite seu endereço">\n  </ion-searchbar>\n\n  <ion-list [hidden]="autocompleteItems.length == 0">\n    <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n\n  <div id=\'map\'></div>\n\n</ion-content>\n'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo2\exemplo2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__["a" /* NativeGeocoder */]])
    ], Exemplo2Page);
    return Exemplo2Page;
}());

//# sourceMappingURL=exemplo2.js.map

/***/ })

});
//# sourceMappingURL=19.js.map