import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ViewController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { CartService } from "../../pages/cart.service";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: "page-product-details",
  templateUrl: "product-details.html"
})
export class ProductDetailsPage {

  Cart: any[] = [];

  public dataSetProduct: any = {};

  FireVisible = false;
  id: any;
  id2: any;
  count: any = 1;
  isLiked: boolean = false;
  
  public menuItems: any = {
    "id": "",
    "name": "",
    "description": "",
    "price": "",
    "image": ""
  };

  public cart = {
    itemId: "",
    extraOptions: [],
    price: "",
    name: "",
    image: "",
    itemQunatity: ""
  };

  noOfItems: any;
  noOfItems_: any;
  public selectedItems: Array<any> = [];
  menuItem: AngularFireObject<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navParams: NavParams,
    public cartService: CartService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

    public authService: AuthServiceProvider,
    public viewCtrl: ViewController
  ) {

    //this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log("cart: "+JSON.stringify(this.Cart));

    this.id = this.navParams.get("id");
    this.id2 = this.navParams.get("id2");
    //console.log(this.id);
    //console.log(this.id2);
    
    this.getDataProductID();

  }

  refresh = refresher => {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  getDataProductID(){
    this.authService.getData('productID/'+this.id)
      .then((result) => {
        //console.log(result);

        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        //console.log("cart: "+JSON.stringify(this.Cart));
        //console.log(this.Cart);

        this.menuItems.id = result[0].id;
        this.menuItems.name = result[0].name;
        this.menuItems.image = result[0].image;
        this.menuItems.description = result[0].description;
        this.menuItems.price = result[0].price;
        //console.log(this.menuItems);

        this.cart.name = result[0].name;
        this.cart.itemId = this.id;
        this.cart.image = result[0].image;
        this.cart.price = result[0].price;

        if(this.Cart == null || this.Cart.length == 0){
          //console.log(result);
          this.cart.itemQunatity = this.count;
          //console.log(this.cart);
        }else{
          for (var i = 0; i < this.Cart.length; i++) {
            //console.log(this.Cart[i]);
            if(this.Cart[i].item.itemId == result[0].id){
              //console.log(result);
              this.count = this.Cart[i].item.itemQunatity;
              //console.log(this.cart);
            }
            //console.log(this.Cart[i].item);
            //console.log(this.Cart[i].itemTotalPrice);
          }
          //console.log(this.Cart);
        }
      }, (err) => {
        //console.log('ERR!');
        console.log(err);
      });
  }

  addQuantity() {
    if (this.count < 50) {
      this.count = this.count + 1;
      this.cart.itemQunatity = this.count;
      //console.log(this.noOfItems);
      if(this.noOfItems != null){
        this.noOfItems = this.noOfItems + 1;
      }else{
        this.noOfItems = this.noOfItems + 2;
      }
      
    }
  }

  removeQuantity() {
    if (this.count > 1) {
      this.count = this.count - 1;
      this.cart.itemQunatity = this.count;
      if(this.noOfItems != null){
        this.noOfItems = this.noOfItems - 1;
      }      
    }
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

  home() {
    this.navCtrl.setRoot("HomePage");
  }

  addToCart() {

    let alert = this.alertCtrl.create({
      title: 'Produto adicionado com sucesso!',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();

    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log(this.Cart);
    //this.noOfItems = this.Cart != null ? this.Cart.length : null;

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

    this.cart.itemQunatity = this.count;
    //console.log(this.count);
    //console.log(this.cart.itemQunatity);
    //console.log(this.cart);
    this.cartService.OnsaveLS(this.cart);
    
    //this.navCtrl.push("ProductDetailsPage");
    //this.navCtrl.push("ProductDetailsPage", { id: this.id,  id2: this.id2 });
    this.navCtrl.pop();
    ///this.navCtrl.popToRoot();

    //this.viewCtrl.dismiss({ id: this.id,  id2: this.id2 });

    //location.reload();

  }

  visible = false;

}
