webpackJsonp([20],{

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exemplo1PageModule", function() { return Exemplo1PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exemplo1__ = __webpack_require__(769);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Exemplo1PageModule = /** @class */ (function () {
    function Exemplo1PageModule() {
    }
    Exemplo1PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__exemplo1__["a" /* Exemplo1Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__exemplo1__["a" /* Exemplo1Page */]),
            ],
        })
    ], Exemplo1PageModule);
    return Exemplo1PageModule;
}());

//# sourceMappingURL=exemplo1.module.js.map

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Exemplo1Page; });
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

var Exemplo1Page = /** @class */ (function () {
    function Exemplo1Page() {
    }
    Exemplo1Page.prototype.ionViewDidLoad = function () {
        var position = new google.maps.LatLng(-16.665136, -49.286041);
        var mapOptions = {
            zoom: 18,
            center: position,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            //Titulo
            title: 'Minha posição',
            //Animção
            animation: google.maps.Animation.DROP,
            //Icone
            icon: 'assets/imgs/pessoa.png'
        });
    };
    Exemplo1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exemplo1',template:/*ion-inline-start:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo1\exemplo1.html"*/'<ion-header class="ion-no-border">\n  <ion-toolbar>\n    <ion-buttons left>\n      <button color="light" ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title class="title">\n      SH Delivery\n    </ion-title>\n    <!--<ion-buttons end>\n      <button color="light" ion-button icon-only color="royal" (click)="navcart()" class="header-btn-cart">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n      </button>\n    </ion-buttons>-->\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div #map id="map"></div>\n\n</ion-content>\n\n<ion-footer class="ion-no-border">\n  <ion-toolbar>\n    <p style="font-size: 12px; text-align: center;" ion-text color="light">\n      Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"E:\Nova pasta\Archive-bkp-300121-mod-a\src\pages\exemplo1\exemplo1.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], Exemplo1Page);
    return Exemplo1Page;
}());

//# sourceMappingURL=exemplo1.js.map

/***/ })

});
//# sourceMappingURL=20.js.map