import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";

import { AlertController } from 'ionic-angular';

import * as moment from "moment";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-orders-schedule',
  templateUrl: 'orders-schedule.html',
})
export class OrdersSchedulePage {

  resposeData:any

  dia: number;

  ativar_botao: any;

  Cart: any = [];

  today = new Date();
  
  ordersDetails: any[] = [];
  public noOfItems: number;
  public currency: {};

  constructor(
    public af: AngularFireAuth,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider,

    private alertCtrl: AlertController
  ) {
    

  }

  cancelarPedido(orderId) {
    let alert = this.alertCtrl.create({
      title: 'Cancelar',
      message: 'Deseja cancelar o agendamento desse pedido?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },{
          text: 'Sim',
          handler: () => {
            //console.log('Buy clicked');
            this.authService.postData(orderId, "cancelPedido").then((result) => {
              this.resposeData = result;
              
              console.log(this.resposeData);

              this.navCtrl.setRoot("OrdersSchedulePage");
              
            }, (err) => {

              console.log(err);

            });
          }
        }
      ]
    });
    alert.present();
  }

  ativarBotao(data) {

    let data_hj = moment().format("yyyy-MM-DD");

    let hora_hj = moment().format("HH:mm");

    if (data == data_hj) {
      return 0;
    } else if (data > data_hj) {

      const now = new Date(); // Data de hoje
      const past = new Date(data); // Outra data no passado
      const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
      this.dia = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (this.dia == 1) {
        if (hora_hj < '22:00') {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    } else {
      return 0;
    }

  }

  funcCalculaDias(data){

    let data_hj = moment().format("yyyy-MM-DD");

    if(data == data_hj){
      const days = "A entrega será hoje!";
      return days;
    }else if(data > data_hj){
      const now = new Date(); // Data de hoje
      const past = new Date(data); // Outra data no passado
      const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
      this.dia = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const days = 'Seu pedido será entregue em '+Math.ceil(diff / (1000 * 60 * 60 * 24))+' dias!'; // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
      return days;
    }else{
      const days = "Pedido já entregue!";
      return days;
    }
    
  }

  ngOnInit() {
    if (this.af.auth.currentUser) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present().then(() => {
        let userID = this.af.auth.currentUser.uid;
        console.log(userID);//user no firebase
        this.authService.getData('pedidosAgendadosUserID/'+userID).then(result => {
          //console.log(result);
          this.ordersDetails = JSON.parse(JSON.stringify(result));
          //console.log(this.ordersDetails.length);
          console.log(this.ordersDetails);
        }, (err) => {
          console.log(err);
        });
 
        loader.dismiss();
        
      },
        error => {
          console.error(error);
          loader.dismiss();
        }
      );

    }
  }

  ionViewWillEnter() {
    
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
  }

  isOrders(): boolean {
    return this.ordersDetails.length == 0 ? false : true;
  }

  orders(orderId) {
    //console.log(orderId);
    this.navCtrl.push("OrdersPage", { orderId: orderId });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

}
