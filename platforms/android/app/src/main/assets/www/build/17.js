webpackJsonp([17],{

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeusEnderecosPageModule", function() { return MeusEnderecosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__meus_enderecos__ = __webpack_require__(780);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MeusEnderecosPageModule = /** @class */ (function () {
    function MeusEnderecosPageModule() {
    }
    MeusEnderecosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__meus_enderecos__["a" /* MeusEnderecosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__meus_enderecos__["a" /* MeusEnderecosPage */]),
            ],
        })
    ], MeusEnderecosPageModule);
    return MeusEnderecosPageModule;
}());

//# sourceMappingURL=meus-enderecos.module.js.map

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeusEnderecosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_endereco_add_endereco__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__google_maps_geolocalizacao_google_maps_geolocalizacao__ = __webpack_require__(433);
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








var MeusEnderecosPage = /** @class */ (function () {
    function MeusEnderecosPage(af, db, toastCtrl, loadingCtrl, navCtrl, platform, events, modalCtrl, authService, alertCtrl) {
        this.af = af;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.Cart = [];
        this.addressList = [];
        this.address = {};
    }
    MeusEnderecosPage.prototype.ngOnInit = function () {
        this.url = "assets/img/profile.jpg";
    };
    MeusEnderecosPage.prototype.ionViewDidLoad = function () {
        /*setTimeout(() => {
          console.log('Async operation has ended');
          this.Cart.complete();
        }, 2000);*/
        var _this = this;
        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        //console.log(this.Cart);
        if (this.Cart != null) {
            var i;
            var soma = 0;
            var valor = [];
            for (i = 0; i < this.Cart.length; i++) {
                //console.log(this.Cart[i].item.itemQunatity);
                valor[i] = this.Cart[i].item.itemQunatity;
                soma += valor[i];
            }
            //console.log(soma);
        }
        this.noOfItems = this.Cart != null ? soma : null;
        this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (changes) {
            return changes.map(function (c) { return (__assign({ $key: c.payload.key }, c.payload.val())); });
        })).subscribe(function (res) {
            _this.addressList = res;
            //console.log(this.addressList);
        });
        this.keyAtual = localStorage.getItem('keyAddress');
        //console.log(this.keyAtual);
        this.address.$key = localStorage.getItem('keyAddress');
        //console.log(this.address.$key);
        console.log(localStorage.getItem('cep'));
        console.log(localStorage.getItem('frete'));
        console.log(localStorage.getItem('keyAddress'));
    };
    //Selected Address
    MeusEnderecosPage.prototype.selectAddress = function (address) {
        //console.log(address);
        var _this = this;
        if (address === void 0) { address = null; }
        if (address == null) {
            this.insertCep();
        }
        else {
            if (address.$key == localStorage.getItem('keyAddress')) {
                var alert_1 = this.alertCtrl.create({
                    title: "Atenção!",
                    subTitle: "Você não pode excluir o endereço que está sendo utilizado no momento!",
                    buttons: [
                        {
                            text: "OK",
                            role: 'cancel',
                            handler: function (data) {
                                console.log(data);
                            }
                        }
                    ]
                });
                alert_1.present();
            }
            else {
                var alert_2 = this.alertCtrl.create({
                    title: "Excluir!",
                    subTitle: "Você quer excluir esse endereço?",
                    buttons: [
                        {
                            text: "sim",
                            handler: function (data) {
                                _this.db.list("/users/" + _this.af.auth.currentUser.uid + "/address").remove(address.$key);
                                _this.navCtrl.push("MeusEnderecosPage");
                            }
                        }, {
                            text: "Cancelar",
                            role: 'cancel',
                            handler: function (data) {
                                console.log(data);
                            }
                        }
                    ]
                });
                alert_2.present();
            }
        }
    };
    //Selected Address
    MeusEnderecosPage.prototype.selectAddress2 = function (key, address) {
        //console.log(address);
        localStorage.setItem("cep", address.cep);
        localStorage.setItem("frete", address.frete);
        localStorage.setItem("keyAddress", key);
    };
    MeusEnderecosPage.prototype.insertCep = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__google_maps_geolocalizacao_google_maps_geolocalizacao__["a" /* GoogleMapsGeolocalizacaoPage */]);
        profileModal.present();
        profileModal.onDidDismiss(function (res) {
            //console.log(res.data.cep);
            //console.log(data.cep);
            //console.log(res.data.cep);
            //console.log(res.data);
            if (res.data.cep != 0) {
                _this.getDataGoogleMaps(res.data.cep, res.data.bairro, res.data.endereco);
            }
        });
    };
    MeusEnderecosPage.prototype.getDataGoogleMaps = function (cep, bairro, endereco) {
        var _this = this;
        if (cep != 1) {
            this.authService.getData('googleMaps/' + cep).then(function (result) {
                _this.dataSetGoogleMaps = result;
                /*console.log(cep);
                console.log(bairro);
                console.log(endereco);
                console.log(this.dataSetGoogleMaps);
                console.log(JSON.stringify(this.dataSetGoogleMaps));*/
                if ((_this.dataSetGoogleMaps != 'Digite um CEP válido') && (_this.dataSetGoogleMaps != 'Não fazemos entrega nessa região!')) {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Entregamos nesse CEP!',
                        subTitle: '',
                        buttons: [{
                                text: 'OK',
                                handler: function () {
                                    var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_endereco_add_endereco__["a" /* AddEnderecoPage */], { cep: cep, frete: JSON.stringify(_this.dataSetGoogleMaps), bairro: bairro, endereco: endereco });
                                    profileModal.onDidDismiss(function (data) {
                                        //console.log(data.data);
                                        if (data != 1) {
                                            localStorage.setItem("cep", data.data.cep);
                                            localStorage.setItem("frete", data.data.frete);
                                            localStorage.setItem("keyAddress", data.data.keyAddress);
                                            _this.navCtrl.push("MeusEnderecosPage");
                                        }
                                    });
                                    profileModal.present();
                                }
                            }]
                    });
                    alert_3.present();
                }
                else {
                    var alert_4 = _this.alertCtrl.create({
                        title: _this.dataSetGoogleMaps,
                        subTitle: '',
                        buttons: [
                            {
                                text: 'OK',
                                handler: function () {
                                    _this.insertCep();
                                }
                            }
                        ]
                    });
                    alert_4.present();
                }
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.navCtrl.pop();
        }
    };
    MeusEnderecosPage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    MeusEnderecosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-meus-enderecos',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\meus-enderecos\meus-enderecos.html"*/'<ion-header class="ion-no-border">\n  <ion-toolbar>\n      <ion-buttons left>\n          <button color="light" ion-button menuToggle>\n              <ion-icon name="menu"></ion-icon>\n          </button>\n      </ion-buttons>\n      <ion-title class="title">\n          Configurações\n      </ion-title>\n      <ion-buttons end>\n          <button color="light" ion-button icon-only color="royal" (click)="navcart()" class="header-btn-cart">\n              <ion-icon name="cart"></ion-icon>\n              <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n          </button>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid>\n  \n    <ion-fab right edge>\n      <button ion-fab mini (click)="selectAddress()"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n  \n    <div class="login">\n      <ion-row>\n        <img class="img" [src]="url">\n        <br>\n      </ion-row>\n      <br>\n      <p class="name">Meus Endereços</p>\n    </div>\n  \n    <ion-row>\n  \n      <ion-col col-1>\n  \n      </ion-col>\n  \n      <ion-col col-10>\n  \n        <ion-row>\n          <ion-col col-12>\n          \n            <ion-list radio-group class="address-radio" [(ngModel)]="address.$key">\n              <div *ngFor="let address of addressList">\n                <ion-item>\n                  <ion-label>\n                    <p class="show-address">{{address.nome}} </p>\n                    <p class="show-address">{{address.endereco}}<span *ngIf="address.numero">,\n                        {{address.numero}}</span></p>\n            \n                    <p *ngIf="address.complemento">{{address.complemento}}</p>\n                    <p class="show-address">{{address.cidade}} - {{address.estado}}</p>\n            \n                    <p class="show-address">{{address.cep}}</p>\n                    <p class="show-address">{{address.contato}}</p>\n                    \n                  </ion-label>\n                  <ion-radio (ionSelect)="selectAddress2(address.$key, address)" [value]="address.$key"></ion-radio>\n                </ion-item>\n                <button ion-button (click)="selectAddress(address)">\n                  <ion-icon ios="ios-trash" md="md-trash"></ion-icon>&nbsp;&nbsp;Excluir\n                </button>\n              </div>\n              \n            </ion-list>\n          \n          </ion-col>\n        </ion-row>\n  \n      </ion-col>\n  \n      <ion-col col-1>\n  \n      </ion-col>\n  \n    </ion-row>\n  \n  </ion-grid>\n\n</ion-content>\n\n<ion-footer class="ion-no-border">\n  <ion-toolbar>\n      <p style="font-size: 12px; text-align: center;" ion-text color="light">\n          Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\meus-enderecos\meus-enderecos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], MeusEnderecosPage);
    return MeusEnderecosPage;
}());

//# sourceMappingURL=meus-enderecos.js.map

/***/ })

});
//# sourceMappingURL=17.js.map