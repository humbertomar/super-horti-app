webpackJsonp([18],{

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exemplo3PageModule", function() { return Exemplo3PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exemplo3__ = __webpack_require__(771);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Exemplo3PageModule = /** @class */ (function () {
    function Exemplo3PageModule() {
    }
    Exemplo3PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__exemplo3__["a" /* Exemplo3Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__exemplo3__["a" /* Exemplo3Page */]),
            ],
        })
    ], Exemplo3PageModule);
    return Exemplo3PageModule;
}());

//# sourceMappingURL=exemplo3.module.js.map

/***/ }),

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Exemplo3Page; });
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


var Exemplo3Page = /** @class */ (function () {
    function Exemplo3Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.markers = [];
    }
    Exemplo3Page.prototype.ionViewDidLoad = function () {
        this.DisplayMap();
    };
    Exemplo3Page.prototype.DisplayMap = function () {
        var location = new google.maps.LatLng(-16.665136, -49.286041);
        var options = {
            center: location,
            zoom: 20,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarker(location, map);
    };
    Exemplo3Page.prototype.addMarker = function (location, map) {
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
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    this.address = results[0].formatted_address;
                    console.log(results[0].formatted_address);
                }
                else {
                    console.log('Cannot determine address at this location.' + status);
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], Exemplo3Page.prototype, "mapRef", void 0);
    Exemplo3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exemplo3',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo3\exemplo3.html"*/'<ion-header class="ion-no-border">\n  <ion-toolbar>\n    <ion-buttons left>\n      <button color="light" ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title class="title">\n      SH Delivery\n    </ion-title>\n    <!--<ion-buttons end>\n      <button color="light" ion-button icon-only color="royal" (click)="navcart()" class="header-btn-cart">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n      </button>\n    </ion-buttons>-->\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div #map id="my-map"></div>\n\n</ion-content>\n\n<ion-footer class="ion-no-border">\n  <ion-toolbar>\n    <p style="font-size: 12px; text-align: center;" ion-text color="light">\n      Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo3\exemplo3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], Exemplo3Page);
    return Exemplo3Page;
}());

//# sourceMappingURL=exemplo3.js.map

/***/ })

});
//# sourceMappingURL=18.js.map