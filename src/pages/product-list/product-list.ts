import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: "page-product-list",
  templateUrl: "product-list.html"
})
export class ProductListPage {

  dataSetProduct: any;

  id: any;

  ascdesc: any;
  
  public menuItems: Array<any> = [];
  public selectedItems: Array<any> = [];
 
  noOfItems: any;
  items: any[];

  Cart: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider
  ) {
    
    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log("cart: "+JSON.stringify(this.Cart));

    this.id = this.navParams.get("id");
    //console.log(this.id);

    this.ascdesc = 'n';

  }

  ngOnInit() {

    //console.log("Product List");

    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present().then(() => {
      
      if (this.id == undefined) {
        this.navCtrl.push("HomePage");
      }

      this.getDataProductID('n');

      loader.dismiss();
    });    
  }

  ionViewDidLoad() {
    //console.log("Eu estou vivo!");
  }

  ionViewWillEnter() {

    //console.log("Product List 2");

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

  initializeItems(): void {
    this.items = this.dataSetProduct;
    //console.log(this.items);
  }

  getDataProductID(select = null){
    this.authService.getData('product/'+this.id+'&'+select).then((result) => {
        //console.log(result);
        this.dataSetProduct = result;
        this.items = this.dataSetProduct;
        //console.log(this.items);
      }, (err) => {
        console.log(err);
      });
  }

  getItems(ev: any) {

    this.initializeItems();

    const searchTerm = ev.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.items = this.items.filter(currentGoal => {
      if (currentGoal.name && searchTerm) {
        if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }

  navigate(item) {
    this.navCtrl.push("ProductDetailsPage", { id: item,  id2: this.id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }
}
