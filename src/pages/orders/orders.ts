
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {
  public ordersDetails: any[] = [];


  public noOfItems: number;
  public currency: {};
  public orderId: any;
  
  constructor(
    public navParams: NavParams,
    public af: AngularFireAuth,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider
  ) {

    this.orderId = this.navParams.get("orderId");
    //console.log("orderID", this.orderId);

    if (this.af.auth.currentUser) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      //console.log(this.orderId);

      this.authService.getData('pedidoID/'+this.orderId).then(result => {
        //console.log(result);
        this.ordersDetails = JSON.parse(JSON.stringify(result));
        //console.log(this.ordersDetails.length);
        //console.log(this.ordersDetails);
        loader.dismiss();
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });

    }
  }

  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  isOrders(): boolean {
    return this.ordersDetails.length == 0 ? false : true;
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }
}
