webpackJsonp([16],{

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersSchedulePageModule", function() { return OrdersSchedulePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orders_schedule__ = __webpack_require__(785);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrdersSchedulePageModule = /** @class */ (function () {
    function OrdersSchedulePageModule() {
    }
    OrdersSchedulePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__orders_schedule__["a" /* OrdersSchedulePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__orders_schedule__["a" /* OrdersSchedulePage */]),
            ],
        })
    ], OrdersSchedulePageModule);
    return OrdersSchedulePageModule;
}());

//# sourceMappingURL=orders-schedule.module.js.map

/***/ }),

/***/ 785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersSchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
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






var OrdersSchedulePage = /** @class */ (function () {
    function OrdersSchedulePage(af, navCtrl, loadingCtrl, authService, alertCtrl) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.Cart = [];
        this.today = new Date();
        this.ordersDetails = [];
    }
    OrdersSchedulePage.prototype.cancelarPedido = function (orderId) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: 'Deseja cancelar o agendamento desse pedido?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Sim',
                    handler: function () {
                        //console.log('Buy clicked');
                        _this.authService.postData(orderId, "cancelPedido").then(function (result) {
                            _this.resposeData = result;
                            console.log(_this.resposeData);
                            _this.navCtrl.setRoot("OrdersSchedulePage");
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    OrdersSchedulePage.prototype.ativarBotao = function (data) {
        var data_hj = __WEBPACK_IMPORTED_MODULE_3_moment__().format("yyyy-MM-DD");
        var hora_hj = __WEBPACK_IMPORTED_MODULE_3_moment__().format("HH:mm");
        if (data == data_hj) {
            return 0;
        }
        else if (data > data_hj) {
            var now = new Date(); // Data de hoje
            var past = new Date(data); // Outra data no passado
            var diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
            this.dia = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (this.dia == 1) {
                if (hora_hj < '22:00') {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                return 1;
            }
        }
        else {
            return 0;
        }
    };
    OrdersSchedulePage.prototype.funcCalculaDias = function (data) {
        var data_hj = __WEBPACK_IMPORTED_MODULE_3_moment__().format("yyyy-MM-DD");
        if (data == data_hj) {
            var days = "A entrega será hoje!";
            return days;
        }
        else if (data > data_hj) {
            var now = new Date(); // Data de hoje
            var past = new Date(data); // Outra data no passado
            var diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
            this.dia = Math.ceil(diff / (1000 * 60 * 60 * 24));
            var days = 'Seu pedido será entregue em ' + Math.ceil(diff / (1000 * 60 * 60 * 24)) + ' dias!'; // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
            return days;
        }
        else {
            var days = "Pedido já entregue!";
            return days;
        }
    };
    OrdersSchedulePage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.af.auth.currentUser) {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present().then(function () {
                var userID = _this.af.auth.currentUser.uid;
                console.log(userID); //user no firebase
                _this.authService.getData('pedidosAgendadosUserID/' + userID).then(function (result) {
                    //console.log(result);
                    _this.ordersDetails = JSON.parse(JSON.stringify(result));
                    //console.log(this.ordersDetails.length);
                    console.log(_this.ordersDetails);
                }, function (err) {
                    console.log(err);
                });
                loader_1.dismiss();
            }, function (error) {
                console.error(error);
                loader_1.dismiss();
            });
        }
    };
    OrdersSchedulePage.prototype.ionViewWillEnter = function () {
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
    };
    OrdersSchedulePage.prototype.isOrders = function () {
        return this.ordersDetails.length == 0 ? false : true;
    };
    OrdersSchedulePage.prototype.orders = function (orderId) {
        //console.log(orderId);
        this.navCtrl.push("OrdersPage", { orderId: orderId });
    };
    OrdersSchedulePage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    OrdersSchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-orders-schedule',template:/*ion-inline-start:"/Users/Shared/projects/super-horti-app/src/pages/orders-schedule/orders-schedule.html"*/'<ion-header class="ion-no-border">\n  <ion-toolbar>\n      <ion-buttons left>\n          <button color="light" ion-button menuToggle>\n              <ion-icon name="menu"></ion-icon>\n          </button>\n      </ion-buttons>\n      <ion-title class="title">\n          Meus Pedidos Agendados\n      </ion-title>\n      <ion-buttons end>\n          <button color="light" ion-button icon-only color="royal" (click)="navcart()" class="header-btn-cart">\n              <ion-icon name="cart"></ion-icon>\n              <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n          </button>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="!isOrders()">\n      <div class="empty-list">\n          <ion-icon class="empty-cart" name="timer" item-left></ion-icon>\n          <p>Sem pedidos agendados!</p>\n      </div>\n\n  </div>\n  <div *ngFor="let order of ordersDetails">\n      <ion-card class="orders-item">\n          <h5 align="center">Pedido nº: <strong>{{order.orderId}}</strong></h5>\n          <h6 align="center" class="item-name">Data do Pedido: <strong>{{order.createdAt | date: \'dd/MM/yyyy H:mm\' }}</strong></h6>\n          <hr/>\n          <ion-row>\n              <ion-col col-6 no-padding>\n                  <p class="item-name">Sub Total: <strong>{{order.subTotal | currency:\'BRL\':true:\'1.2-2\'}}</strong></p>\n              </ion-col>\n              <ion-col col-6 no-padding>\n                  <p class="item-name">Taxa Entrega: <strong>{{order.tax | currency:\'BRL\':true:\'1.2-2\'}}</strong></p>\n              </ion-col>\n          </ion-row>\n          <ion-row>\n              <ion-col col-6 no-padding>\n                  <p class="item-name">Valor Total: <strong>{{order.grandTotal | currency:\'BRL\':true:\'1.2-2\'}}</strong></p>\n              </ion-col>\n              <ion-col col-6 no-padding>\n                <p class="item-name">Data de Entrega: <strong>{{order.data_entrega | date: \'dd/MM/yyyy\'}}</strong></p>\n              </ion-col>\n\n              <ion-col col-12 no-padding *ngIf="order.data_cancel_entrega == null">\n                <p class="item-name"><strong>{{funcCalculaDias(order.data_entrega)}}</strong></p>\n              </ion-col>\n\n              <ion-col col-12 no-padding>\n                <span *ngIf="order.data_cancel_entrega != null">\n                    <button ion-button color="energy" small>\n                        Cancelado em {{order.data_cancel_entrega  | date: \'dd/MM/yyyy H:mm\' }} </button>\n                </span>\n                <span *ngIf="order.data_cancel_entrega == null">\n                    <button *ngIf="ativarBotao(order.data_entrega) == 1" ion-button color="danger" (click)="cancelarPedido(order.pedido_id)" small>\n                        Cancelar Agendamento </button>\n                </span>\n              </ion-col>\n          </ion-row>\n          <ion-row>\n              <ion-col col-12 no-padding>\n                  <p class="status">Forma de Pagamento: <strong>\n                      <span *ngIf="order.tipo_pagamento == \'cartao_credito\'">Cartão de Crédito</span>\n                      <span *ngIf="order.tipo_pagamento == \'cartao_debito\'">Cartão de Débito</span>\n                      <span *ngIf="order.tipo_pagamento == \'transferencia_bancaria\'">Transferência Bancária</span>\n                      <span *ngIf="order.tipo_pagamento == \'dinheiro\'">Dinheiro</span>\n                  </strong>\n              </ion-col>\n              <ion-col col-12 no-padding>\n                  <p class="status">Pagamento: <strong><span *ngIf="order.status_pagamento  == 1">Pendente</span><span *ngIf="order.status_pagamento  == 2">Pago</span><span *ngIf="order.status_pagamento  == 3">Cancelado</span></strong></p>\n              </ion-col>\n          </ion-row>\n          <ion-row>\n              <ion-col col-6 no-padding>\n                  <p class="status">Pedido: <strong><span *ngIf="order.status_pedido == 1">Pendente</span><span *ngIf="order.status_pedido == 2">Entregue</span><span *ngIf="order.status_pedido == 3">Cancelado</span></strong></p>\n              </ion-col>\n              <ion-col col-6 no-padding>\n                  <button ion-button color="secondary" small block (click)="orders(order.pedido_id)">\n                      Detalhes do pedido</button>\n              </ion-col>\n          </ion-row>\n      </ion-card>\n  </div>\n\n</ion-content>\n\n<ion-footer class="ion-no-border">\n  <ion-toolbar>\n      <p style="font-size: 12px; text-align: center;" ion-text color="light">\n          Super Horti Comércio de Verduras e Legumes LTDA</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/Shared/projects/super-horti-app/src/pages/orders-schedule/orders-schedule.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], OrdersSchedulePage);
    return OrdersSchedulePage;
}());

//# sourceMappingURL=orders-schedule.js.map

/***/ })

});
//# sourceMappingURL=16.js.map