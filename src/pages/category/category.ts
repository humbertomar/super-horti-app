import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {

  font: any;

  Cart: any = [];

  dataSetCategory: any;

  noOfItems: any;
  public Categories: Array<any> = [];
  categories: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider
  ) {

    this.font = "sb-bistro-coffee";
    
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      
      this.getDataCategory();
      
      loader.dismiss();

    });
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

  getDataCategory(){
    this.authService.getData('category')
      .then((result) => {
        //console.log(result);
        this.dataSetCategory = result;
        //console.log(this.dataSetCategory);
      }, (err) => {
        console.log(err);
      });
  }

  navigate(id) {
    this.navCtrl.push("ProductListPage", { id: id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }
}
