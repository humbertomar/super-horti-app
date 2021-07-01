import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

//import { map } from "rxjs/operators";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  Cart: any = [];
  
  //ordersDetails: any[] = [];
  ordersDetails: any[] = [];
  public noOfItems: number;
  public currency: {};

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider
  ) {
    
  }

  ngOnInit() {
    if (this.af.auth.currentUser) {
      
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });

      //console.log('pedidosUserID/'+this.af.auth.currentUser.uid);

      //let userID = this.af.auth.currentUser.uid;

      //console.log('pedidosUserID/'+userID);

      loader.present().then(() => {
        let userID = this.af.auth.currentUser.uid;
        //console.log('pedidosUserID/'+userID);//user no firebase
        
        this.authService.getData('pedidosUserID/'+userID).then(result => {
          //console.log(result);
          this.ordersDetails = JSON.parse(JSON.stringify(result));
          //console.log(this.ordersDetails.length);
          //console.log(this.ordersDetails);
          loader.dismiss();
        }, (err) => {
          console.log(err);
          loader.dismiss();
        });
        
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
    this.navCtrl.push("OrdersPage", { orderId: orderId });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

}
