import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, AlertController, ModalController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "@angular/fire/database";

import * as moment from "moment";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {

  settings: any;
  bloquear_app: any;
  qtdade_pedidos_dia: any;
  horario_maximo_pedidos: any;

  disableButton: any;

  resposeData: any;

  Cart: any[] = [];

  forma_pagamento: any = {
    "tipo": "",
    "troco": "",
  };

  numPedido: any;

  payTotal: any;

  date: any;
  orderId: any;
  order: any;

  userId: any;
  userDetails: any = {
    email: "",
    name: "",
    userid: ""
  };
  checkout: AngularFireList<any>;
  userDetail: AngularFireObject<any>;
  bookings: AngularFireObject<any>;
  color: any;
  str: any;
  paymentType: string;
  paymentDetails: any = {
    paymentStatus: true
  };
  
  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,

    public authService: AuthServiceProvider,

    public modalCtrl: ModalController,
  ) {

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

    this.numPedido = 'P' + moment().format("DDMMYYYYHHmmss");
    //console.log(this.numPedido);

    /*console.log(localStorage.getItem("uid"));
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));*/

    this.disableButton = true;
  }

  refresh = refresher => {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewWillEnter() {
    this.authService.getData('settings').then((data: any[]) => {
      this.settings = data;
      this.settings.forEach(elemento => {
        //console.log(elemento.bloquear_app);
        this.bloquear_app = elemento.bloquear_app;
        this.qtdade_pedidos_dia = elemento.qtdade_pedidos_dia;
        this.horario_maximo_pedidos = elemento.horario_maximo_pedidos;
      });
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    //console.log(this.order.shippingAddress.nome);
    this.userDetails.email = localStorage.getItem("email");
    this.userDetails.name = this.order.shippingAddress.nome;
    this.userDetails.userid = localStorage.getItem("uid");
    this.userId = localStorage.getItem("uid");
  }

  choosePaymentType(formaPagamento) {
    //console.log(formaPagamento);
    this.forma_pagamento.tipo = formaPagamento;
  }

  onCheckOut() {

    this.disableButton = false;

    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    if (this.forma_pagamento.tipo === "") {
      let alert = this.alertCtrl.create({
        title: "Por Favor!",
        subTitle: "Selecione uma forma de pagamento!",
        buttons: ["OK"]
      });
      alert.present();
    } else {

      if (this.af.auth.currentUser) {
        this.db.object("/users/" + this.af.auth.currentUser.uid).valueChanges().subscribe((res: any) => {
          //console.log(this.order.shippingAddress.nome);
          //console.log(res.address);
          //console.log(res.address.key);
          //console.log(res.name);
          //console.log(res.mobileNo);

          this.userDetails.name = this.order.shippingAddress.nome;
          this.userDetails.mobileNo = this.order.shippingAddress.contato;

          //console.log(this.userDetails.name+" | "+this.userDetails.mobileNo);

          this.order.cart = this.Cart;

          if (this.forma_pagamento.tipo != "dinheiro" && this.forma_pagamento.troco !== "") {
            delete this.forma_pagamento.troco;
          }

          if (this.forma_pagamento.observacoes) {
            this.order.observacoes = this.forma_pagamento.observacoes;
            delete this.forma_pagamento.observacoes;
          }

          let dataPedido = moment().format("YYYY-MM-DD HH:mm:ss");

          //this.order.orderId = Math.floor(Math.random() * 90000) + 10000;
          this.order.orderId = this.numPedido;
          //console.log(this.order.orderId);
          this.order.userDetails = this.userDetails;
          this.order.userId = this.userId;
          this.order.createdAt = dataPedido;
          this.order.status = "Pendente";
          this.order.paymentStatus = "Pendente";

          this.order.forma_pagamento = this.forma_pagamento;

          this.order.statusReading = [{
            title: "Seu pedido foi aceito. Você será notificado sobre o status aqui.",
            time: dataPedido
          }];

          if (this.order.shippingAddress) {
            delete this.order.shippingAddress.$key;
          } else {
            this.order.tax = 0.00;
          }

          //console.log(this.order);
          //console.log(this.order.shippingAddress);

          this.authService.getData('pedidosDoDia/' + this.order.dataPedidoAgendado).then((result) => {

            //console.log(result);
            //console.log(this.qtdade_pedidos_dia);

            if (result <= this.qtdade_pedidos_dia) {

              //salva no firebase - backup
              this.checkout.push(this.order).then(res => {

                console.log("Pedido feito! " + JSON.stringify(res));
                
                //this.authService.postData(this.order, "pedidos").then((result) => {
                this.authService.postData(this.order, "pedidosNew").then((result) => {
                  this.resposeData = result;

                  console.log(this.resposeData);

                  //confirma se foi enviado um json correto
                  if (this.resposeData == 0) {
                    this.showAlert("Erro ao tentar enviar seu pedido! Tente novamente!");
                    this.navCtrl.pop();
                  } else {
                    this.navCtrl.setRoot("ThankyouPage", { 'userId': this.order.orderId, 'endereco': this.order.shippingAddress });
                    //this.navCtrl.pop();
                  }

                  loader.present().then(() => {
                    loader.dismiss();
                  });

                }, (err) => {
                  console.log(err);

                  loader.present().then(() => {
                    loader.dismiss();
                  });

                  this.disableButton = true;

                });
              }, (err) => {
                console.log(err);
                this.showAlert("Erro ao tentar enviar seu pedido! Tente novamente!");
                this.navCtrl.pop();
              });
              //

            } else {
              //console.log('Quantidade de pedidos atingiu o limite diário!');
              let alert = this.alertCtrl.create({
                title: "Quantidade de pedidos atingiu o limite diário!",
                subTitle: "Tente outra data!",
                buttons: [
                  {
                    text: "Cancelar",
                    role: 'cancel',
                    handler: data => {
                      //this.navCtrl.pop();
                      console.log('Cancelado');
                    }
                  }
                ]
              });
              alert.present();

              loader.present().then(() => {
                loader.dismiss();
              });

              this.disableButton = true;

            }

          }, (err) => {

            loader.present().then(() => {
              loader.dismiss();
            });

            this.disableButton = true;

            console.log(err);
          });

        });
      }

    }

  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}
