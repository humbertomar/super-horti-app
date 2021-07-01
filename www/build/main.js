webpackJsonp([22],{

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about-us/about-us.module": [
		653,
		3
	],
	"../pages/add-address/add-address.module": [
		654,
		14
	],
	"../pages/address-list/address-list.module": [
		655,
		13
	],
	"../pages/cart/cart.module": [
		656,
		12
	],
	"../pages/category/category.module": [
		657,
		11
	],
	"../pages/exemplo1/exemplo1.module": [
		658,
		20
	],
	"../pages/exemplo2/exemplo2.module": [
		659,
		19
	],
	"../pages/exemplo3/exemplo3.module": [
		660,
		18
	],
	"../pages/forgot-password/forgot-password.module": [
		661,
		1
	],
	"../pages/google-maps-geolocalizacao/google-maps-geolocalizacao.module": [
		662,
		21
	],
	"../pages/home/home.module": [
		663,
		10
	],
	"../pages/login/login.module": [
		664,
		0
	],
	"../pages/map/map.module": [
		665,
		15
	],
	"../pages/meus-enderecos/meus-enderecos.module": [
		666,
		17
	],
	"../pages/order-list/order-list.module": [
		667,
		9
	],
	"../pages/orders-schedule/orders-schedule.module": [
		668,
		16
	],
	"../pages/orders/orders.module": [
		669,
		8
	],
	"../pages/product-details/product-details.module": [
		670,
		7
	],
	"../pages/product-list/product-list.module": [
		671,
		2
	],
	"../pages/registration/registration.module": [
		672,
		6
	],
	"../pages/settings/settings.module": [
		673,
		5
	],
	"../pages/thankyou/thankyou.module": [
		674,
		4
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 240;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(53);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseServiceProvider = /** @class */ (function () {
    function FirebaseServiceProvider(db) {
        this.db = db;
        //console.log('Hello FirebaseServiceProvider Provider');
    }
    FirebaseServiceProvider.prototype.getAll = function (path) {
        return this.db.list(path, function (ref) { return ref.orderByKey(); })
            .snapshotChanges()
            .map(function (data) {
            return data.map(function (d) { return (__assign({ key: d.payload.key }, d.payload.val())); });
        });
    };
    FirebaseServiceProvider.prototype.getItems = function (path) {
        return this.db.list(path)
            //return this.db.list(path, ref => ref.orderByChild(item1).equalTo(item2))
            .snapshotChanges()
            .map(function (data) {
            return data.map(function (d) { return (__assign({ key: d.payload.key }, d.payload.val())); });
        });
    };
    FirebaseServiceProvider.prototype.getItem = function (path, item1, item2) {
        //return this.db.list("/users/" + localStorage.getItem("uid") + "/cep")
        return this.db.list(path, function (ref) { return ref.orderByChild(item1).equalTo(item2); })
            .snapshotChanges()
            .map(function (data) {
            return data.map(function (d) { return (__assign({ key: d.payload.key }, d.payload.val())); });
        });
    };
    FirebaseServiceProvider.prototype.get = function (path, key) {
        return this.db.object(path + key).snapshotChanges()
            .map(function (d) {
            return __assign({ key: d.key }, d.payload.val());
        });
    };
    FirebaseServiceProvider.prototype.save = function (item, db_fb) {
        this.db.list(db_fb)
            .push(item)
            .then(function (r) { return console.log(r); });
    };
    FirebaseServiceProvider.prototype.update = function (item, db_fb) {
        //console.log(item);
        //return this.db.list('courses').update(course.key, course);
        return this.db.list(db_fb).update(item.token, item);
    };
    FirebaseServiceProvider.prototype.remove = function (key, db_fb) {
        //console.log(item);
        //return this.db.list('courses').remove(course.key);
        return this.db.list(db_fb).remove(key);
    };
    FirebaseServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */]])
    ], FirebaseServiceProvider);
    return FirebaseServiceProvider;
}());

//# sourceMappingURL=firebase-service.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsGeolocalizacaoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GoogleMapsGeolocalizacaoPage = /** @class */ (function () {
    function GoogleMapsGeolocalizacaoPage(viewCtrl, loadingCtrl, navCtrl, navParams, zone, geolocation, nativeGeocoder, diagnostic, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.backgroundImage = 'assets/img/bg.jpg';
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.address = [];
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
    }
    GoogleMapsGeolocalizacaoPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad Exemplo2Page');
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            //alert('Is Location Enabled? '+ res);
            if (res == false) {
                var confirm = _this.alertCtrl.create({
                    title: '<b>GPS Desativado</b>',
                    message: 'As informações de localização não estão disponíveis neste dispositivo. Vá para Configurações e habilite o GPS.',
                    buttons: [
                        {
                            text: 'Ir para as Configurações',
                            handler: function () {
                                _this.diagnostic.switchToLocationSettings();
                            }
                        }
                    ]
                });
                confirm.present();
            }
        }).catch(function (e) { return console.error(e); });
    };
    GoogleMapsGeolocalizacaoPage.prototype.cepIn = function (cep) {
        //console.log(cep);
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Aguarde...'
        });
        loading.present();
        setTimeout(function () {
            if (cep != 0) {
                //console.log(Object.keys(this.address).length);
                if (Object.keys(_this.address).length > 0) {
                    _this.viewCtrl.dismiss({
                        data: _this.address
                        /*endereco: this.address.endereco,
                        bairro: this.address.bairro,
                        cidade: this.address.cidade,
                        estado: this.address.estado,
                        cep: this.address.cep*/
                    });
                }
                else {
                    _this.address = [];
                    _this.address.endereco = 0;
                    _this.address.bairro = 0;
                    _this.address.cidade = 0;
                    _this.address.estado = 0;
                    _this.address.cep = 0;
                    _this.viewCtrl.dismiss({ data: _this.address });
                }
            }
            else {
                _this.address = [];
                _this.address.endereco = 0;
                _this.address.bairro = 0;
                _this.address.cidade = 0;
                _this.address.estado = 0;
                _this.address.cep = 0;
                _this.viewCtrl.dismiss({ data: _this.address });
            }
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 2300);
    };
    GoogleMapsGeolocalizacaoPage.prototype.ionViewDidEnter = function () {
        //Set latitude and longitude of some place
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -16.665136, lng: -49.286041 },
            zoom: 15
        });
    };
    GoogleMapsGeolocalizacaoPage.prototype.updateSearchResults = function () {
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
    GoogleMapsGeolocalizacaoPage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    GoogleMapsGeolocalizacaoPage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    GoogleMapsGeolocalizacaoPage.prototype.selectSearchResult = function (item) {
        var _this = this;
        this.clearMarkers();
        this.autocompleteItems = [];
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var options = {
                    useLocale: true,
                    maxResults: 5
                };
                _this.nativeGeocoder.reverseGeocode(results[0].geometry.location.lat(), results[0].geometry.location.lng(), options)
                    .then(function (result2) {
                    _this.address = [];
                    //this.address.cep = result2[0]['postalCode'];
                    _this.address.latitude = result2[0]['latitude'];
                    _this.address.longitude = result2[0]['longitude'];
                    //alert(JSON.stringify(result2[0]['postalCode']));
                    /*alert(JSON.stringify(result2[0]));
                    alert(JSON.stringify(result2[0]['latitude']));
                    alert(JSON.stringify(result2[0]['longitude']));*/
                }).catch(function (error) { return console.log(error); });
                /*let position = {
                  lat: results[0].geometry.location.lat,
                  lng: results[0].geometry.location.lng
                };*/
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                    animation: google.maps.Animation.DROP,
                    draggable: true
                });
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
                //console.log(results[0].address_components[0]);
                //console.log(results[0]);
                //console.log(results[0].address_components[5]);
                if (results[0].address_components[5]) {
                }
                else {
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
                console.log(_this.address);
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
                    }, function (results, status) {
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
                    });
                };
            }
        });
    };
    GoogleMapsGeolocalizacaoPage.prototype.tryGeolocation = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            //alert('Is Location Enabled? '+ res);
            if (res == false) {
                var confirm = _this.alertCtrl.create({
                    title: '<b>GPS Desativado</b>',
                    message: 'As informações de localização não estão disponíveis neste dispositivo. Vá para Configurações e habilite o GPS.',
                    buttons: [
                        {
                            text: 'Ir para as Configurações',
                            handler: function () {
                                _this.diagnostic.switchToLocationSettings();
                            }
                        }
                    ]
                });
                confirm.present();
            }
            else {
                _this.clearMarkers();
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    ///alert('1: '+JSON.stringify(resp));
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
                    var geocoder2 = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                    var request = { latLng: latlng };
                    geocoder2.geocode(request, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            _this.zone.run(function () {
                                ///alert('2: '+JSON.stringify(results));
                                if (results[0] != null) {
                                    _this.address = [];
                                    _this.address.latitude = resp.coords.latitude;
                                    _this.address.longitude = resp.coords.longitude;
                                    console.log(_this.address);
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
                            });
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
                        }, function (results2, status) {
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
                        });
                    };
                }).catch(function (error) {
                    console.log('Error getting location', error);
                });
            }
        }).catch(function (e) { return console.error(e); });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    GoogleMapsGeolocalizacaoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-google-maps-geolocalizacao',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\google-maps-geolocalizacao\google-maps-geolocalizacao.html"*/'<ion-content padding class="transparent-header" [ngStyle]="{\'background-image\': \'url(\' + backgroundImage +\')\'}">\n\n  <ion-fab top right>\n    <button ion-fab color="verde-escuro" (click)="cepIn(0)">\n      <ion-icon name="md-close"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-row>\n    <ion-col col-12 text-center>\n      <button (click)="tryGeolocation()" ion-button small color="energy">Pegar Minha Localização Atual</button>\n    </ion-col>\n  </ion-row>\n\n  <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="Digite seu endereço">\n  </ion-searchbar>\n\n  <ion-list [hidden]="autocompleteItems.length == 0">\n    <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n\n  <div id=\'map\'></div>\n\n  <ion-row>\n    <ion-col>\n      <button class="login-btn" (click)="cepIn(1)" type="submit" ion-button>ENVIAR</button>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\google-maps-geolocalizacao\google-maps-geolocalizacao.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__["a" /* NativeGeocoder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_geocoder__["a" /* NativeGeocoder */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]) === "function" && _j || Object])
    ], GoogleMapsGeolocalizacaoPage);
    return GoogleMapsGeolocalizacaoPage;
}());

//# sourceMappingURL=google-maps-geolocalizacao.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEnderecoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddEnderecoPage = /** @class */ (function () {
    function AddEnderecoPage(af, db, navCtrl, navParams, viewCtrl, alertCtrl, authService) {
        /*console.log(localStorage.getItem('cep'));
        console.log(localStorage.getItem('frete'));
        console.log(localStorage.getItem('bairro'));
        console.log(localStorage.getItem('logradouro'));*/
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.backgroundImage = 'assets/img/bg.jpg';
        this.address = {};
        this.addressList = [];
        if (navParams.get('endereco')) {
            this.address.estado = 'GO';
            this.address.cidade = 'Goiânia';
            this.address.endereco = navParams.get('endereco');
            this.address.bairro = navParams.get('bairro');
            this.address.cep = navParams.get('cep');
            this.address.frete = navParams.get('frete');
        }
        else {
            this.address.estado = 'GO';
            this.address.cidade = 'Goiânia';
            this.address.endereco = localStorage.getItem('logradouro');
            this.address.bairro = localStorage.getItem('bairro');
            this.address.cep = localStorage.getItem('cep');
            this.address.frete = localStorage.getItem('frete');
        }
        /*this.authService.getData('settings').then((data: any[]) => {
          let settings = data[0];
          //console.log(settings);
    
          if (Number(localStorage.getItem('frete')) == 0) {
            this.address.frete = settings.frete_5;
          } else if (Number(localStorage.getItem('frete')) == 15) {
            this.address.frete = settings.frete_10;
          } else {
            this.address.frete = settings.frete_30;
          }
        
        });*/
        console.log(this.address);
    }
    AddEnderecoPage.prototype.addAddress = function (form) {
        var _this = this;
        console.log(this.address);
        if (this.af.auth.currentUser) {
            this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").push(this.address)
                .then(function (res) {
                var retornoString = JSON.stringify(res);
                var resultado = retornoString.split("/address/").pop();
                var KeyAddress = resultado.replace('"', '');
                _this.address.keyAddress = KeyAddress;
                //console.log(JSON.stringify(res));
                //console.log(KeyAddress);
                //this.viewCtrl.dismiss({cep: this.address.cep, frete: this.address.frete, keyAddress: KeyAddress});
                _this.viewCtrl.dismiss({ data: _this.address });
            });
        }
    };
    AddEnderecoPage.prototype.close = function (data) {
        this.viewCtrl.dismiss({ data: data });
    };
    AddEnderecoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-endereco',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\add-endereco\add-endereco.html"*/'<ion-content padding class="transparent-header" [ngStyle]="{\'background-image\': \'url(\' + backgroundImage +\')\'}">\n\n    <div padding>\n\n        <ion-fab top right>\n            <button ion-fab color="verde-escuro" (click)="close(1)">\n                <ion-icon name="md-close"></ion-icon>\n            </button>\n        </ion-fab>\n\n        <ion-list>\n            <form (ngSubmit)="addAddress(f)" #f="ngForm">\n                <ion-label class="add-heading">\n                    <strong>Insira o endereço para entrega</strong>\n                </ion-label>\n                <ion-row class="full-address">\n                    <!--<div class="error">\n                                    <p><sub>Nome é obrigatório</sub></p>\n                                </div>-->\n                    <ion-item>\n                        <ion-input type="text" placeholder="Nome - Obritagório" name="nome" id="nome" [(ngModel)]="address.nome"\n                            required>\n                        </ion-input>\n                    </ion-item>\n\n                    <ion-item>\n                        <ion-input type="text" name="contato" id="contato"\n                            [brmasker]="{mask:\'(00) 00000-0000)\', len:15}" [(ngModel)]="address.contato"\n                            placeholder="Telefone - Obritagório" required></ion-input>\n                    </ion-item>\n\n                    <ion-item class="sub-address">\n                        <ion-input type="text" placeholder="Logradouro" name="endereco" id="endereco"\n                            [(ngModel)]="address.endereco" disabled required></ion-input>\n                    </ion-item>\n\n                    <ion-item>\n                        <ion-input type="text" placeholder="Número - Obritagório" name="numero" id="numero"\n                            [(ngModel)]="address.numero" required></ion-input>\n                    </ion-item>\n\n                    <ion-item>\n                        <ion-input type="text" placeholder="Complemento - Obritagório" name="complemento" id="complemento"\n                            [(ngModel)]="address.complemento" required></ion-input>\n                    </ion-item>\n\n                    <ion-item class="sub-address">\n                        <ion-input type="text" name="bairro" id="bairro" placeholder="Bairro"\n                            [(ngModel)]="address.bairro" disabled required>\n                        </ion-input>\n                    </ion-item>\n\n                    <ion-item class="sub-address">\n                        <ion-input type="text" placeholder="Cidade" name="cidade" id="cidade"\n                            [(ngModel)]="address.cidade" disabled required></ion-input>\n                    </ion-item>\n\n                    <ion-item class="sub-address">\n                        <ion-input type="text" placeholder="Estado" name="estado" id="estado" [(ngModel)]="address.estado" disabled required></ion-input>\n                        <!--<ion-label>Estado</ion-label>-->\n                        <!--<ion-select name="estado" id="estado" [(ngModel)]="address.estado" disabled required>\n                            <ion-option value="AC">Acre</ion-option>\n                            <ion-option value="AL">Alagoas</ion-option>\n                            <ion-option value="AP">Amapá</ion-option>\n                            <ion-option value="AM">Amazonas</ion-option>\n                            <ion-option value="BA">Bahia</ion-option>\n                            <ion-option value="CE">Ceará</ion-option>\n                            <ion-option value="DF">Distrito Federal</ion-option>\n                            <ion-option value="ES">Espírito Santo</ion-option>\n                            <ion-option value="GO">Goiás</ion-option>\n                            <ion-option value="MA">Maranhão</ion-option>\n                            <ion-option value="MT">Mato Grosso</ion-option>\n                            <ion-option value="MS">Mato Grosso do Sul</ion-option>\n                            <ion-option value="MG">Minas Gerais</ion-option>\n                            <ion-option value="PA">Pará</ion-option>\n                            <ion-option value="PB">Paraíba</ion-option>\n                            <ion-option value="PR">Paraná</ion-option>\n                            <ion-option value="PE">Pernambuco</ion-option>\n                            <ion-option value="PI">Piauí</ion-option>\n                            <ion-option value="RJ">Rio de Janeiro</ion-option>\n                            <ion-option value="RN">Rio Grande do Norte</ion-option>\n                            <ion-option value="RS">Rio Grande do Sul</ion-option>\n                            <ion-option value="RO">Rondônia</ion-option>\n                            <ion-option value="RR">Roraima</ion-option>\n                            <ion-option value="SC">Santa Catarina</ion-option>\n                            <ion-option value="SP">São Paulo</ion-option>\n                            <ion-option value="SE">Sergipe</ion-option>\n                            <ion-option value="TO">Tocantins</ion-option>\n                        </ion-select>-->\n                    </ion-item>\n\n                    <ion-item class="sub-address">\n                        <ion-input type="text" placeholder="CEP" name="cep" id="cep" [(ngModel)]="address.cep" disabled readonly>\n                        </ion-input>\n                    </ion-item>\n\n                </ion-row>\n                <button class="checkOut-btn" ion-button block type="submit" [disabled]="!f.valid">\n                    <ion-icon ios="ios-add" md="md-add"></ion-icon>\n                    &nbsp;&nbsp;Adicionar Endereço\n                </button>\n            </form>\n        </ion-list>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\add-endereco\add-endereco.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], AddEnderecoPage);
    return AddEnderecoPage;
}());

//# sourceMappingURL=add-endereco.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(af, db, navCtrl, navParams, loadingCtrl, alertCtrl, authService, modalCtrl) {
        var _this = this;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.modalCtrl = modalCtrl;
        this.Cart = [];
        this.forma_pagamento = {
            "tipo": "",
            "troco": "",
        };
        this.userDetails = {
            email: "",
            name: "",
            userid: ""
        };
        this.paymentDetails = {
            paymentStatus: true
        };
        this.refresh = function (refresher) {
            refresher.complete();
            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
        };
        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        //console.log("cart: "+JSON.stringify(this.Cart));
        this.order = this.navParams.get("orderDetails");
        localStorage.setItem("nome", this.order.shippingAddress.nome);
        //console.log(this.order.shippingAddress.nome);
        //console.log(this.order.dataPedidoAgendado);
        this.payTotal = this.order.grandTotal;
        this.str = "#";
        var num = Math.floor(Math.random() * 900000) + 100000;
        this.color = this.str.concat(num);
        this.checkout = db.list("/orders");
        this.numPedido = 'P' + __WEBPACK_IMPORTED_MODULE_4_moment__().format("DDMMYYYYHHmmss");
        //console.log(this.numPedido);
        /*console.log(localStorage.getItem("uid"));
        console.log(localStorage.getItem("email"));
        console.log(localStorage.getItem('cep'));
        console.log(localStorage.getItem('frete'));*/
        this.disableButton = true;
    }
    CheckoutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.authService.getData('settings').then(function (data) {
            _this.settings = data;
            _this.settings.forEach(function (elemento) {
                //console.log(elemento.bloquear_app);
                _this.bloquear_app = elemento.bloquear_app;
                _this.qtdade_pedidos_dia = elemento.qtdade_pedidos_dia;
                _this.horario_maximo_pedidos = elemento.horario_maximo_pedidos;
            });
        }, function (err) {
            console.log(err);
        });
    };
    CheckoutPage.prototype.ionViewDidLoad = function () {
        //console.log(this.order.shippingAddress.nome);
        this.userDetails.email = localStorage.getItem("email");
        this.userDetails.name = this.order.shippingAddress.nome;
        this.userDetails.userid = localStorage.getItem("uid");
        this.userId = localStorage.getItem("uid");
    };
    CheckoutPage.prototype.choosePaymentType = function (formaPagamento) {
        //console.log(formaPagamento);
        this.forma_pagamento.tipo = formaPagamento;
    };
    CheckoutPage.prototype.onCheckOut = function () {
        var _this = this;
        this.disableButton = false;
        var loader = this.loadingCtrl.create({
            content: "Aguarde..."
        });
        if (this.forma_pagamento.tipo === "") {
            var alert_1 = this.alertCtrl.create({
                title: "Por Favor!",
                subTitle: "Selecione uma forma de pagamento!",
                buttons: ["OK"]
            });
            alert_1.present();
        }
        else {
            if (this.af.auth.currentUser) {
                this.db.object("/users/" + this.af.auth.currentUser.uid).valueChanges().subscribe(function (res) {
                    //console.log(this.order.shippingAddress.nome);
                    //console.log(res.address);
                    //console.log(res.address.key);
                    //console.log(res.name);
                    //console.log(res.mobileNo);
                    _this.userDetails.name = _this.order.shippingAddress.nome;
                    _this.userDetails.mobileNo = _this.order.shippingAddress.contato;
                    //console.log(this.userDetails.name+" | "+this.userDetails.mobileNo);
                    _this.order.cart = _this.Cart;
                    if (_this.forma_pagamento.tipo != "dinheiro" && _this.forma_pagamento.troco !== "") {
                        delete _this.forma_pagamento.troco;
                    }
                    if (_this.forma_pagamento.observacoes) {
                        _this.order.observacoes = _this.forma_pagamento.observacoes;
                        delete _this.forma_pagamento.observacoes;
                    }
                    var dataPedido = __WEBPACK_IMPORTED_MODULE_4_moment__().format("YYYY-MM-DD HH:mm:ss");
                    //this.order.orderId = Math.floor(Math.random() * 90000) + 10000;
                    _this.order.orderId = _this.numPedido;
                    //console.log(this.order.orderId);
                    _this.order.userDetails = _this.userDetails;
                    _this.order.userId = _this.userId;
                    _this.order.createdAt = dataPedido;
                    _this.order.status = "Pendente";
                    _this.order.paymentStatus = "Pendente";
                    _this.order.forma_pagamento = _this.forma_pagamento;
                    _this.order.statusReading = [{
                            title: "Seu pedido foi aceito. Você será notificado sobre o status aqui.",
                            time: dataPedido
                        }];
                    if (_this.order.shippingAddress) {
                        delete _this.order.shippingAddress.$key;
                    }
                    else {
                        _this.order.tax = 0.00;
                    }
                    //console.log(this.order);
                    //console.log(this.order.shippingAddress);
                    _this.authService.getData('pedidosDoDia/' + _this.order.dataPedidoAgendado).then(function (result) {
                        //console.log(result);
                        //console.log(this.qtdade_pedidos_dia);
                        if (result <= _this.qtdade_pedidos_dia) {
                            //salva no firebase - backup
                            _this.checkout.push(_this.order).then(function (res) {
                                console.log("Pedido feito! " + JSON.stringify(res));
                                //this.authService.postData(this.order, "pedidos").then((result) => {
                                _this.authService.postData(_this.order, "pedidosNew").then(function (result) {
                                    _this.resposeData = result;
                                    console.log(_this.resposeData);
                                    //confirma se foi enviado um json correto
                                    if (_this.resposeData == 0) {
                                        _this.showAlert("Erro ao tentar enviar seu pedido! Tente novamente!");
                                        _this.navCtrl.pop();
                                    }
                                    else {
                                        _this.navCtrl.setRoot("ThankyouPage", { 'userId': _this.order.orderId, 'endereco': _this.order.shippingAddress });
                                        //this.navCtrl.pop();
                                    }
                                    loader.present().then(function () {
                                        loader.dismiss();
                                    });
                                }, function (err) {
                                    console.log(err);
                                    loader.present().then(function () {
                                        loader.dismiss();
                                    });
                                    _this.disableButton = true;
                                });
                            }, function (err) {
                                console.log(err);
                                _this.showAlert("Erro ao tentar enviar seu pedido! Tente novamente!");
                                _this.navCtrl.pop();
                            });
                            //
                        }
                        else {
                            //console.log('Quantidade de pedidos atingiu o limite diário!');
                            var alert_2 = _this.alertCtrl.create({
                                title: "Quantidade de pedidos atingiu o limite diário!",
                                subTitle: "Tente outra data!",
                                buttons: [
                                    {
                                        text: "Cancelar",
                                        role: 'cancel',
                                        handler: function (data) {
                                            //this.navCtrl.pop();
                                            console.log('Cancelado');
                                        }
                                    }
                                ]
                            });
                            alert_2.present();
                            loader.present().then(function () {
                                loader.dismiss();
                            });
                            _this.disableButton = true;
                        }
                    }, function (err) {
                        loader.present().then(function () {
                            loader.dismiss();
                        });
                        _this.disableButton = true;
                        console.log(err);
                    });
                });
            }
        }
    };
    CheckoutPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ["OK"]
        });
        alert.present();
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-checkout",template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\checkout\checkout.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title class="title">Opções de Pagamento\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <ion-row class="amount-block">\n        <ion-col col-6>\n            <p class="total"> Total do Pedido\n                <span class="currency"> {{payTotal | currency:\'BRL\':true:\'1.2-2\'}}\n                </span>\n            </p>\n        </ion-col>\n    </ion-row>\n    <ion-list radio-group class="radio-list">\n        \n        <p class="card-title">Escolha uma forma de pagamento</p>\n\n        <ion-list radio-group>\n            <ion-row class="card-type">\n                <ion-col col-12>\n                    <ion-item class="radio-item">\n                        <ion-label>Na Entrega Dinheiro</ion-label>\n                        <ion-radio item-left value="dinheiro" (ionSelect)="choosePaymentType(\'dinheiro\')"></ion-radio>\n                    </ion-item>\n                    \n                    <ion-item class="radio-item" *ngIf="forma_pagamento.tipo == \'dinheiro\'">\n                        <ion-input type="text" name="troco" [(ngModel)]="forma_pagamento.troco" placeholder="Troco para" [brmasker]="{money: true}"></ion-input>\n                    </ion-item>\n                    \n                    <ion-item class="radio-item">\n                        <ion-label>Na Entrega Cartão Crédito</ion-label>\n                        <ion-radio item-left value="cartao_credito" (ionSelect)="choosePaymentType(\'cartao_credito\')"></ion-radio>\n                    </ion-item>\n                    <ion-item class="radio-item">\n                        <ion-label>Na Entrega Cartão Débito</ion-label>\n                        <ion-radio item-left value="cartao_debito" (ionSelect)="choosePaymentType(\'cartao_debito\')"></ion-radio>\n                    </ion-item>\n                    <ion-item class="radio-item">\n                        <ion-label>Transferência Bancária</ion-label>\n                        <ion-radio item-left value="transferencia_bancaria" (ionSelect)="choosePaymentType(\'transferencia_bancaria\')"></ion-radio>\n                    </ion-item>\n\n                    <ion-item class="radio-item">\n                        <ion-input type="text" name="observacoes" [(ngModel)]="forma_pagamento.observacoes" placeholder="Observações" ></ion-input>\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n        </ion-list>\n      \n        <div class="btn-wrapper">\n            <button ion-button full class="btn-lg" type="button" [disabled]="disableButton == false" (click)="onCheckOut()">Concluir o pedido\n            </button>\n        </div>\n        \n    </ion-list>\n\n</ion-content>\n\n<ion-footer class="ion-no-border">\n    <ion-toolbar>\n        <p style="font-size: 12px; text-align: center;" ion-text color="light">\n            Super Horti Comércio de Verduras e Legumes LTDA</p>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\checkout\checkout.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], CheckoutPage);
    return CheckoutPage;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InsertCepPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InsertCepPage = /** @class */ (function () {
    function InsertCepPage(navCtrl, navParams, viewCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.backgroundImage = 'assets/img/bg.jpg';
        this.modalId = navParams.get('modalId');
        //console.log(this.modalId);
    }
    InsertCepPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad InsertCepPage');
    };
    InsertCepPage.prototype.cepIn = function (cep) {
        //console.log(cep);
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Aguarde...'
        });
        loading.present();
        setTimeout(function () {
            if (cep != 0) {
                var cep2 = cep.split(".");
                //console.log(cep2[0]);
                //console.log(cep2[1]);
                //console.log(cep2[0]+cep2[1]);
                _this.viewCtrl.dismiss({ cep: cep2[0] + cep2[1] });
            }
            else {
                _this.viewCtrl.dismiss({ cep: 0 });
            }
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 2300);
    };
    InsertCepPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-insert-cep',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\insert-cep\insert-cep.html"*/'<ion-content padding class="transparent-header" [ngStyle]="{\'background-image\': \'url(\' + backgroundImage +\')\'}">\n\n  <div padding>\n\n    <ion-fab top right>\n      <button ion-fab color="verde-escuro" (click)="cepIn(0)">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-fab>\n\n    <ion-row>\n      <ion-col>\n        <ion-list inset class="no-border">\n\n          <img class="logo" src="assets/img/logo-2.png" />\n\n          <ion-item>\n            <ion-input type="tel" placeholder="Digite seu CEP" [brmasker]="{mask:\'00.000-000\', len:10}" #cep>\n            </ion-input>\n          </ion-item>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button class="login-btn" (click)="cepIn(cep.value)" type="submit" ion-button>ENVIAR</button>\n      </ion-col>\n    </ion-row>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\insert-cep\insert-cep.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], InsertCepPage);
    return InsertCepPage;
}());

//# sourceMappingURL=insert-cep.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Common; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Common = /** @class */ (function () {
    function Common(loadingCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        //console.log('Hello Common Provider');
    }
    Common.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({ content: "Aguarde ..." });
        this.loader.present();
    };
    Common.prototype.presentLoadingMsg = function (mensagem) {
        this.loader = this.loadingCtrl.create({ content: mensagem });
        this.loader.present();
    };
    Common.prototype.closeLoading = function () {
        this.loader.dismiss();
    };
    Common.prototype.presentToast = function (mensagem, duracao, posicao) {
        var toast = this.toastCtrl.create({
            message: mensagem,
            duration: duracao,
            position: posicao
        });
        toast.onDidDismiss(function () {
            //console.log('Dismissed toast');
        });
        toast.present();
    };
    Common = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], Common);
    return Common;
}());

//# sourceMappingURL=common.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the SpinnerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var SpinnerProvider = /** @class */ (function () {
    function SpinnerProvider(http, loadingCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        console.log('Hello SpinnerProvider Provider');
    }
    SpinnerProvider.prototype.load = function () {
        this.loader = this.loadingCtrl.create({
            content: ''
        });
        this.loader.present();
    };
    SpinnerProvider.prototype.dismiss = function () {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    SpinnerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["LoadingController"]])
    ], SpinnerProvider);
    return SpinnerProvider;
}());

//# sourceMappingURL=spinner.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Http, Headers, RequestOptions } from '@angular/http';


/*
  Generated class for the MapProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MapProvider = /** @class */ (function () {
    function MapProvider(http) {
        this.http = http;
        this.contentHeader = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.google_api_key = 'AIzaSyAjayuD_XLSuXptvzHPfsAt2OBEFDC4lOE';
        console.log('Hello MapProvider Provider');
    }
    MapProvider.prototype.getAddress = function (params) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long;
        return this.GET(url);
    };
    MapProvider.prototype.getStreetAddress = function (params) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long + '&result_type=street_address';
        return this.GET(url);
    };
    MapProvider.prototype.GET = function (url) {
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    MapProvider.prototype.POST = function (url, params) {
        // let options = new RequestOptions({
        //   headers: this.contentHeader
        // });
        // return this.http.post(url, params, options).map(res => res.json());
    };
    MapProvider.prototype.DEL = function (url) {
        // let options = new RequestOptions({
        //   headers: this.contentHeader
        // });
        // return this.http.delete(url, options).map(res => res.json());
    };
    MapProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], MapProvider);
    return MapProvider;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CartService = /** @class */ (function () {
    function CartService() {
        this.Cart = [];
        this.itemCart = {};
        this.itemInCart = [];
        this.Cart = JSON.parse(localStorage.getItem("Cart"));
    }
    CartService.prototype.OnsaveLS = function (item) {
        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        var ExtotalPrice = 0;
        var totalPrice = 0;
        this.itemInCart = [];
        if (this.Cart == null) {
            for (var i = 0; i <= item.extraOptions.length - 1; i++) {
                ExtotalPrice = ExtotalPrice + Number(item.extraOptions[i].value);
            }
            if (item.price.specialPrice) {
                totalPrice = ExtotalPrice + Number(item.price.specialPrice);
            }
            else {
                totalPrice = ExtotalPrice + Number(item.price);
            }
            this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
            this.itemCart.item = item;
            this.itemInCart.push(this.itemCart);
            localStorage.setItem("Cart", JSON.stringify(this.itemInCart));
        }
        else {
            for (var i = 0; i <= this.Cart.length - 1; i++) {
                if (this.Cart[i].item.itemId == item.itemId &&
                    this.Cart[i].item.price == item.price) {
                    this.Cart.splice(i, 1);
                }
            }
            for (var k = 0; k <= item.extraOptions.length - 1; k++) {
                ExtotalPrice = ExtotalPrice + Number(item.extraOptions[k].value);
            }
            if (item.price.specialPrice) {
                totalPrice = ExtotalPrice + Number(item.price.specialPrice);
            }
            else {
                totalPrice = ExtotalPrice + Number(item.price);
            }
            this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
            this.itemCart.item = item;
            this.Cart.push(this.itemCart);
            localStorage.setItem("Cart", JSON.stringify(this.Cart));
        }
    };
    CartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CartService);
    return CartService;
}());

//# sourceMappingURL=cart.service.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(570);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_auth__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_fire_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase_storage__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_date_picker__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__firebase_config__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_cart_service__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_social_sharing__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_firebase_service_firebase_service__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_common__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_brmasker_ionic_3__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ion2_calendar__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ion2_calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ion2_calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_insert_cep_insert_cep__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_add_endereco_add_endereco__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_spinner_spinner__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_map_map__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_native_geocoder__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_google_maps_geolocalizacao_google_maps_geolocalizacao__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_diagnostic__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_21__pages_insert_cep_insert_cep__["a" /* InsertCepPage */], __WEBPACK_IMPORTED_MODULE_28__pages_google_maps_geolocalizacao_google_maps_geolocalizacao__["a" /* GoogleMapsGeolocalizacaoPage */], __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_23__pages_add_endereco_add_endereco__["a" /* AddEnderecoPage */]],
            imports: [
                //IonicModule.forRoot(MyApp),
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
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
                }, {
                    links: [
                        { loadChildren: '../pages/about-us/about-us.module#AboutUsPageModule', name: 'AboutUsPage', segment: 'about-us', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-address/add-address.module#AddAddressPageModule', name: 'AddAddressPage', segment: 'add-address', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/address-list/address-list.module#AddressListPageModule', name: 'AddressListPage', segment: 'address-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/category/category.module#CategoryPageModule', name: 'CategoryPage', segment: 'category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/exemplo1/exemplo1.module#Exemplo1PageModule', name: 'Exemplo1Page', segment: 'exemplo1', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/exemplo2/exemplo2.module#Exemplo2PageModule', name: 'Exemplo2Page', segment: 'exemplo2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/exemplo3/exemplo3.module#Exemplo3PageModule', name: 'Exemplo3Page', segment: 'exemplo3', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/google-maps-geolocalizacao/google-maps-geolocalizacao.module#GoogleMapsGeolocalizacaoPageModule', name: 'GoogleMapsGeolocalizacaoPage', segment: 'google-maps-geolocalizacao', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/meus-enderecos/meus-enderecos.module#MeusEnderecosPageModule', name: 'MeusEnderecosPage', segment: 'meus-enderecos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-list/order-list.module#OrderListPageModule', name: 'OrderListPage', segment: 'order-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders-schedule/orders-schedule.module#OrdersSchedulePageModule', name: 'OrdersSchedulePage', segment: 'orders-schedule', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-details/product-details.module#ProductDetailsPageModule', name: 'ProductDetailsPage', segment: 'product-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-list/product-list.module#ProductListPageModule', name: 'ProductListPage', segment: 'product-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registration/registration.module#RegistrationPageModule', name: 'RegistrationPage', segment: 'registration', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsModule', name: 'Settings', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/thankyou/thankyou.module#ThankyouPageModule', name: 'ThankyouPage', segment: 'thankyou', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__angular_fire__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_14__firebase_config__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_7__angular_fire_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_fire_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19_brmasker_ionic_3__["a" /* BrMaskerModule */],
                __WEBPACK_IMPORTED_MODULE_20_ion2_calendar__["CalendarModule"]
                //StatusBar
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_19_brmasker_ionic_3__["a" /* BrMaskerModule */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicApp"]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_21__pages_insert_cep_insert_cep__["a" /* InsertCepPage */], __WEBPACK_IMPORTED_MODULE_28__pages_google_maps_geolocalizacao_google_maps_geolocalizacao__["a" /* GoogleMapsGeolocalizacaoPage */], __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_23__pages_add_endereco_add_endereco__["a" /* AddEnderecoPage */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__providers_common__["a" /* Common */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_15__pages_cart_service__["a" /* CartService */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_date_picker__["a" /* DatePicker */],
                __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_19_brmasker_ionic_3__["a" /* BrMaskerModule */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_25__providers_spinner_spinner__["a" /* SpinnerProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_map_map__["a" /* MapProvider */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_diagnostic__["a" /* Diagnostic */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 250,
	"./af.js": 250,
	"./ar": 251,
	"./ar-dz": 252,
	"./ar-dz.js": 252,
	"./ar-kw": 253,
	"./ar-kw.js": 253,
	"./ar-ly": 254,
	"./ar-ly.js": 254,
	"./ar-ma": 255,
	"./ar-ma.js": 255,
	"./ar-sa": 256,
	"./ar-sa.js": 256,
	"./ar-tn": 257,
	"./ar-tn.js": 257,
	"./ar.js": 251,
	"./az": 258,
	"./az.js": 258,
	"./be": 259,
	"./be.js": 259,
	"./bg": 260,
	"./bg.js": 260,
	"./bm": 261,
	"./bm.js": 261,
	"./bn": 262,
	"./bn.js": 262,
	"./bo": 263,
	"./bo.js": 263,
	"./br": 264,
	"./br.js": 264,
	"./bs": 265,
	"./bs.js": 265,
	"./ca": 266,
	"./ca.js": 266,
	"./cs": 267,
	"./cs.js": 267,
	"./cv": 268,
	"./cv.js": 268,
	"./cy": 269,
	"./cy.js": 269,
	"./da": 270,
	"./da.js": 270,
	"./de": 271,
	"./de-at": 272,
	"./de-at.js": 272,
	"./de-ch": 273,
	"./de-ch.js": 273,
	"./de.js": 271,
	"./dv": 274,
	"./dv.js": 274,
	"./el": 275,
	"./el.js": 275,
	"./en-au": 276,
	"./en-au.js": 276,
	"./en-ca": 277,
	"./en-ca.js": 277,
	"./en-gb": 278,
	"./en-gb.js": 278,
	"./en-ie": 279,
	"./en-ie.js": 279,
	"./en-il": 280,
	"./en-il.js": 280,
	"./en-in": 281,
	"./en-in.js": 281,
	"./en-nz": 282,
	"./en-nz.js": 282,
	"./en-sg": 283,
	"./en-sg.js": 283,
	"./eo": 284,
	"./eo.js": 284,
	"./es": 285,
	"./es-do": 286,
	"./es-do.js": 286,
	"./es-us": 287,
	"./es-us.js": 287,
	"./es.js": 285,
	"./et": 288,
	"./et.js": 288,
	"./eu": 289,
	"./eu.js": 289,
	"./fa": 290,
	"./fa.js": 290,
	"./fi": 291,
	"./fi.js": 291,
	"./fil": 292,
	"./fil.js": 292,
	"./fo": 293,
	"./fo.js": 293,
	"./fr": 294,
	"./fr-ca": 295,
	"./fr-ca.js": 295,
	"./fr-ch": 296,
	"./fr-ch.js": 296,
	"./fr.js": 294,
	"./fy": 297,
	"./fy.js": 297,
	"./ga": 298,
	"./ga.js": 298,
	"./gd": 299,
	"./gd.js": 299,
	"./gl": 300,
	"./gl.js": 300,
	"./gom-deva": 301,
	"./gom-deva.js": 301,
	"./gom-latn": 302,
	"./gom-latn.js": 302,
	"./gu": 303,
	"./gu.js": 303,
	"./he": 304,
	"./he.js": 304,
	"./hi": 305,
	"./hi.js": 305,
	"./hr": 306,
	"./hr.js": 306,
	"./hu": 307,
	"./hu.js": 307,
	"./hy-am": 308,
	"./hy-am.js": 308,
	"./id": 309,
	"./id.js": 309,
	"./is": 310,
	"./is.js": 310,
	"./it": 311,
	"./it-ch": 312,
	"./it-ch.js": 312,
	"./it.js": 311,
	"./ja": 313,
	"./ja.js": 313,
	"./jv": 314,
	"./jv.js": 314,
	"./ka": 315,
	"./ka.js": 315,
	"./kk": 316,
	"./kk.js": 316,
	"./km": 317,
	"./km.js": 317,
	"./kn": 318,
	"./kn.js": 318,
	"./ko": 319,
	"./ko.js": 319,
	"./ku": 320,
	"./ku.js": 320,
	"./ky": 321,
	"./ky.js": 321,
	"./lb": 322,
	"./lb.js": 322,
	"./lo": 323,
	"./lo.js": 323,
	"./lt": 324,
	"./lt.js": 324,
	"./lv": 325,
	"./lv.js": 325,
	"./me": 326,
	"./me.js": 326,
	"./mi": 327,
	"./mi.js": 327,
	"./mk": 328,
	"./mk.js": 328,
	"./ml": 329,
	"./ml.js": 329,
	"./mn": 330,
	"./mn.js": 330,
	"./mr": 331,
	"./mr.js": 331,
	"./ms": 332,
	"./ms-my": 333,
	"./ms-my.js": 333,
	"./ms.js": 332,
	"./mt": 334,
	"./mt.js": 334,
	"./my": 335,
	"./my.js": 335,
	"./nb": 336,
	"./nb.js": 336,
	"./ne": 337,
	"./ne.js": 337,
	"./nl": 338,
	"./nl-be": 339,
	"./nl-be.js": 339,
	"./nl.js": 338,
	"./nn": 340,
	"./nn.js": 340,
	"./oc-lnc": 341,
	"./oc-lnc.js": 341,
	"./pa-in": 342,
	"./pa-in.js": 342,
	"./pl": 343,
	"./pl.js": 343,
	"./pt": 344,
	"./pt-br": 345,
	"./pt-br.js": 345,
	"./pt.js": 344,
	"./ro": 346,
	"./ro.js": 346,
	"./ru": 347,
	"./ru.js": 347,
	"./sd": 348,
	"./sd.js": 348,
	"./se": 349,
	"./se.js": 349,
	"./si": 350,
	"./si.js": 350,
	"./sk": 351,
	"./sk.js": 351,
	"./sl": 352,
	"./sl.js": 352,
	"./sq": 353,
	"./sq.js": 353,
	"./sr": 354,
	"./sr-cyrl": 355,
	"./sr-cyrl.js": 355,
	"./sr.js": 354,
	"./ss": 356,
	"./ss.js": 356,
	"./sv": 357,
	"./sv.js": 357,
	"./sw": 358,
	"./sw.js": 358,
	"./ta": 359,
	"./ta.js": 359,
	"./te": 360,
	"./te.js": 360,
	"./tet": 361,
	"./tet.js": 361,
	"./tg": 362,
	"./tg.js": 362,
	"./th": 363,
	"./th.js": 363,
	"./tk": 364,
	"./tk.js": 364,
	"./tl-ph": 365,
	"./tl-ph.js": 365,
	"./tlh": 366,
	"./tlh.js": 366,
	"./tr": 367,
	"./tr.js": 367,
	"./tzl": 368,
	"./tzl.js": 368,
	"./tzm": 369,
	"./tzm-latn": 370,
	"./tzm-latn.js": 370,
	"./tzm.js": 369,
	"./ug-cn": 371,
	"./ug-cn.js": 371,
	"./uk": 372,
	"./uk.js": 372,
	"./ur": 373,
	"./ur.js": 373,
	"./uz": 374,
	"./uz-latn": 375,
	"./uz-latn.js": 375,
	"./uz.js": 374,
	"./vi": 376,
	"./vi.js": 376,
	"./x-pseudo": 377,
	"./x-pseudo.js": 377,
	"./yo": 378,
	"./yo.js": 378,
	"./zh-cn": 379,
	"./zh-cn.js": 379,
	"./zh-hk": 380,
	"./zh-hk.js": 380,
	"./zh-mo": 381,
	"./zh-mo.js": 381,
	"./zh-tw": 382,
	"./zh-tw.js": 382
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 620;

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { Keyboard } from '@ionic-native/keyboard';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, af, db, socialSharing, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.af = af;
        this.db = db;
        this.socialSharing = socialSharing;
        this.events = events;
        this.Cart = [];
        this.imageUrl = "assets/img/profile.jpg";
        //rootPage: string = "LoginPage";
        //rootPage: string = "WelcomePage";
        this.rootPage = "HomePage";
        platform.ready().then(function () {
            /*Keyboard.onKeyboardShow().subscribe(() => {
              document.body.classList.add('keyboard-is-open');
              console.log("Show");
            });
            Keyboard.onKeyboardHide().subscribe(() => {
              document.body.classList.remove('keyboard-is-open');
              console.log("Hidden");
            });*/
            // Ok, então a plataforma está pronta e nossos plugins estão disponíveis.
            // Aqui você pode fazer qualquer coisa nativa de nível superior que possa precisar.
            statusBar.overlaysWebView(false);
            statusBar.styleDefault();
            //splashScreen.hide();
        });
        setTimeout(function () {
            _this.splashScreen.hide();
        }, 1000);
        this.initializeApp();
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.uid = localStorage.getItem("uid");
        if (this.uid != null) {
            this.db
                .object("/users/" + this.uid)
                .valueChanges()
                .subscribe(function (res) {
                if (res != null) {
                    _this.name = res.name;
                    _this.imageUrl =
                        res.image != "" && res.image != null
                            ? res.image
                            : "assets/img/profile.jpg";
                }
                else {
                    _this.name = 'USER';
                    _this.imageUrl = 'assets/img/profile.jpg';
                }
            });
        }
        //this.getNewsCount();
        //this.getOfferCount();
        //this.listenEvents();
    };
    MyApp.prototype.getNewsCount = function () {
        var _this = this;
        this.db
            .list("/news")
            .valueChanges()
            .subscribe(function (res) {
            _this.noOfItemsInNews = res.length;
        });
    };
    MyApp.prototype.getOfferCount = function () {
        var _this = this;
        this.db
            .list("/menuItems", function (ref) { return ref.orderByChild("offer").equalTo(true); })
            .valueChanges()
            .subscribe(function (queriedItems) {
            _this.noOfItemsInOffer = queriedItems.length;
        });
    };
    MyApp.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe("imageUrl", function (response) {
            _this.imageUrl =
                response.image != "" && response.image != null
                    ? response.image
                    : "assets/img/profile.jpg";
            _this.name = response.name;
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
        /*usar no futuro
        if (this.platform.ready()) {
          this.platform.ready().then(res => {
            if (res == "cordova") {
              
            }
          });
        }
        */
    };
    MyApp.prototype.home = function () {
        this.nav.setRoot("HomePage");
    };
    MyApp.prototype.yourOrders = function () {
        this.nav.setRoot("OrderListPage");
    };
    MyApp.prototype.ordersSchedule = function () {
        this.nav.setRoot("OrdersSchedulePage");
    };
    MyApp.prototype.addToCart = function () {
        //this.nav.setRoot("CartPage");
        this.nav.push("CartPage");
    };
    MyApp.prototype.catagory = function () {
        this.nav.setRoot("CategoryPage");
    };
    MyApp.prototype.favourite = function () {
        this.nav.setRoot("FavouritePage");
    };
    MyApp.prototype.offer = function () {
        this.nav.setRoot("OfferPage");
    };
    MyApp.prototype.news = function () {
        this.nav.setRoot("NewsPage");
    };
    MyApp.prototype.contact = function () {
        this.nav.setRoot("ContactPage");
    };
    MyApp.prototype.aboutUs = function () {
        this.nav.setRoot("AboutUsPage");
    };
    MyApp.prototype.settings = function () {
        this.nav.setRoot("Settings");
    };
    MyApp.prototype.meusEnderecos = function () {
        this.nav.setRoot("MeusEnderecosPage");
    };
    MyApp.prototype.invite = function () {
        this.socialSharing.share("share Restaurant App with friends to get credits", null, null, "https://ionicfirebaseapp.com/#/");
    };
    MyApp.prototype.chat = function () {
        this.nav.setRoot("ChatPage");
    };
    MyApp.prototype.tableBooking = function () {
        this.nav.setRoot("TableBookingPage");
    };
    MyApp.prototype.bookingHistory = function () {
        this.nav.setRoot("BookingHistoryPage");
    };
    MyApp.prototype.login = function () {
        this.nav.setRoot("LoginPage");
    };
    MyApp.prototype.logout = function () {
        this.af.auth.signOut();
        //localStorage.clear();
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        localStorage.removeItem('playerId');
        localStorage.removeItem("cep");
        localStorage.removeItem("frete");
        localStorage.removeItem("keyAddress");
        localStorage.removeItem("key");
        this.imageUrl = "assets/img/profile.jpg";
        this.nav.setRoot("HomePage");
    };
    MyApp.prototype.isLoggedin = function () {
        return localStorage.getItem("uid") != null;
    };
    MyApp.prototype.isCart = function () {
        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        this.noOfItemsInCart = this.Cart != null ? this.Cart.length : null;
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\app\app.html"*/'<ion-menu persistent="true" class="menu" [content]="content" *ngIf="this.platform.dir()===\'ltr\'" side="left">\n  \n  <ion-content class="sidebar-menu">\n    <ion-row class="img-name-row">\n      <ion-col>\n        <img class="user-img" src="{{imageUrl}}">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col *ngIf="isLoggedin()">\n        <p class="user-name">{{name | uppercase}}</p>\n      </ion-col>\n    </ion-row>\n\n    <button menuClose class="menu-item" ion-item (click)="home()">\n      <ion-icon name="home" item-left></ion-icon>\n      Home\n    </button>\n    <button menuClose class="menu-item" ion-item (click)="catagory()">\n      <ion-icon name="apps" item-left></ion-icon>\n      Categorias\n    </button>\n    <!--<button *ngIf="isCart()" menuClose class="menu-item" ion-item (click)="offer()">\n      <ion-icon name="pricetag" item-left></ion-icon>\n      {{\'Ofertas\'| translate}}\n      <ion-badge class="menu-badge">{{noOfItemsInOffer}}</ion-badge>\n    </button>-->\n    <button menuClose class="menu-item" ion-item (click)="addToCart()">\n      <ion-icon name="cart" item-left></ion-icon>\n      Meu Carrinho\n      <ion-badge class="menu-badge">{{noOfItemsInCart}}</ion-badge>\n    </button>\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="yourOrders()">\n      <ion-icon name="md-list-box" item-left></ion-icon>\n      Meus Pedidos\n    </button>\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="ordersSchedule()">\n      <ion-icon name="timer" item-left></ion-icon>\n      Meus Pedidos Agendados\n    </button>\n\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="settings()">\n      <ion-icon name="settings" item-left></ion-icon>\n      Meus Dados\n    </button>\n\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="meusEnderecos()">\n      <ion-icon name="md-pin" item-left></ion-icon>\n      Meus Endereços\n    </button>\n\n    <button menuClose class="menu-item" ion-item (click)="aboutUs()">\n      <ion-icon name="contacts" item-left></ion-icon>\n      Sobre Nós\n    </button>\n\n    <!--<button menuClose class="menu-item" ion-item (click)="contact()">\n      <ion-icon name="call" item-left></ion-icon>\n      Contato\n    </button>-->\n\n    <button *ngIf="!isLoggedin()" menuClose class="menu-item" ion-item (click)="login()">\n      <ion-icon name="log-in" item-left></ion-icon>\n      Entrar\n    </button>\n    <button *ngIf="isLoggedin()" ion-item (click)="logout()" menuClose class="menu-item">\n      <ion-icon name="log-out" item-left></ion-icon>\n      Sair\n    </button>\n  </ion-content>\n\n  <ion-footer>\n    <p style="font-size: 12px; text-align: center;" ion-text color="light">26.665.619/0001-09<br>\n      Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-footer>\n\n</ion-menu>\n\n<ion-menu persistent="true" class="menu" [content]="content" *ngIf="this.platform.dir()===\'rtl\'" side="right">\n  <ion-content class="sidebar-menu">\n    <ion-row class="img-name-row">\n      <ion-col>\n        <img class="user-img" src="{{imageUrl}}">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col *ngIf="isLoggedin()">\n        <p class="user-name">{{name}}</p>\n      </ion-col>\n    </ion-row>\n\n    <button menuClose class="menu-item" ion-item (click)="home()">\n      <ion-icon name="home" item-left></ion-icon>\n     Home\n    </button>\n    <button menuClose class="menu-item" ion-item (click)="catagory()">\n      <ion-icon name="apps" item-left></ion-icon>\n      Categorias\n    </button>\n    <!--<button *ngIf="isCart()" menuClose class="menu-item" ion-item (click)="offer()">\n      <ion-icon name="pricetag" item-left></ion-icon>\n      {{\'Ofertas\'| translate}}\n      <ion-badge class="menu-badge">{{noOfItemsInOffer}}</ion-badge>\n    </button>-->\n    <button menuClose class="menu-item" ion-item (click)="addToCart()">\n      <ion-icon name="cart" item-left></ion-icon>\n      Meu Carinho\n      <ion-badge class="menu-badge">{{noOfItemsInCart}}</ion-badge>\n    </button>\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="yourOrders()">\n      <ion-icon name="timer" item-left></ion-icon>\n      Meus Pedidos\n    </button>\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="ordersSchedule()">\n      <ion-icon name="timer" item-left></ion-icon>\n      Meus Pedidos Agendados\n    </button>\n\n    <button *ngIf="isLoggedin()" menuClose class="menu-item" ion-item (click)="settings()">\n      <ion-icon name="settings" item-left></ion-icon>\n      Configurações\n    </button>\n\n    <button menuClose class="menu-item" ion-item (click)="aboutUs()">\n      <ion-icon name="contacts" item-left></ion-icon>\n      Sobre Nós\n    </button>\n\n    <!--<button menuClose class="menu-item" ion-item (click)="contact()">\n      <ion-icon name="call" item-left></ion-icon>\n      Contato\n    </button>-->\n\n    <button *ngIf="!isLoggedin()" menuClose class="menu-item" ion-item (click)="login()">\n      <ion-icon name="log-in" item-left></ion-icon>\n      Entrar\n    </button>\n    <button *ngIf="isLoggedin()" ion-item (click)="logout()" menuClose class="menu-item">\n      <ion-icon name="log-out" item-left></ion-icon>\n      Sair\n    </button>\n  \n  </ion-content>\n\n  <ion-footer>\n    <p style="font-size: 12px; text-align: center;" ion-text color="light">26.665.619/0001-09<br>\n      Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-footer>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<!--<ion-footer class="hide-on-keyboard-open ion-no-border">-->\n<!--<ion-footer class="ion-no-border">-->\n  <!--<ion-toolbar>\n      <p style="font-size: 12px; text-align: center;" ion-text color="light">26.665.619/0001-09<br>\n      Super Horti Comércio de Verduras e Legumes LTDA</p>\n      <br>\n  </ion-toolbar>\n</ion-footer>-->'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\app\app.html"*/,
            selector: "MyApp",
            providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
//config default
var firebaseConfig = {
    apiKey: "AIzaSyAvoEI5dfc57-9N3HMC-JvVhnlnotPbXug",
    authDomain: "ionic-3-restaurantapp-32a62.firebaseapp.com",
    databaseURL: "https://ionic-3-restaurantapp-32a62.firebaseio.com",
    projectId: "ionic-3-restaurantapp-32a62",
    storageBucket: "ionic-3-restaurantapp-32a62.appspot.com",
    messagingSenderId: "474869075253"
};
//# sourceMappingURL=firebase.config.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var apiUrl = 'https://superhorti.com.br/ws/controllers/_WS_/';
//let apiUrl = 'https://superhorti.com.br/ws/controllers/WS/';
//let apiUrl = 'http://localhost/douglas/superhorti.com.br/ws/controllers/_WS_/';
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        //console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.postData = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(apiUrl + type, JSON.stringify(credentials)).subscribe(function (res) {
                resolve(JSON.parse(JSON.stringify(res.json())));
                //console.log(JSON.stringify(res.json()));
            }, function (err) {
                reject(err);
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.getData = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(apiUrl + type).subscribe(function (res) {
                resolve(JSON.parse(JSON.stringify(res.json())));
                //console.log(JSON.stringify(res.json()));
            }, function (err) {
                reject(err);
                console.log(err);
            });
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ })

},[444]);
//# sourceMappingURL=main.js.map