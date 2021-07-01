import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  font: any;

  dataSetCategory: any;
  dataSetSlider: any;

  Cart: any = [];

  novoArray: any = [];
   
  noOfItems: any;

  public Categories: Array<any> = [];

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,

    public authService: AuthServiceProvider,
    public fbs: FirebaseServiceProvider
  ) {

    this.font = "sb-bistro-coffee";

    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present().then(() => {

      this.getDataSlider();
      //this.getDataCategory();

      loader.dismiss();
    });

    //localStorage.clear();//limpa o localStorage
    /*localStorage.removeItem('cep');//limpa o cep do localStorage
    localStorage.removeItem('frete');//limpa o frete do localStorage
    localStorage.removeItem('keyAddress');//limpa o frete do localStorage
    
    localStorage.removeItem('bairro');//limpa o bairro do localStorage
    localStorage.removeItem('logradouro');//limpa o endereco do localStorage*/

    /*console.log(localStorage.getItem("uid"));

    console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));

    console.log(localStorage.getItem('keyAddress'));

    console.log(localStorage.getItem('bairro'));
    console.log(localStorage.getItem('logradouro'));*/

    /*localStorage.removeItem('Test');
    console.log(localStorage.getItem("Test"));
    localStorage.setItem("Test", "123");
    console.log(localStorage.getItem("Test"));
    localStorage.setItem("Test", "123asd");
    console.log(localStorage.getItem("Test"));*/

    //console.log(localStorage.getItem('keyAddress'));

    this.getAddressUser();

  }

  ionViewWillEnter() {

    //console.log('ok');

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

    //this.uid = localStorage.getItem('uid');
    //console.log(this.uid);

  }

  getDataSlider() {
    this.authService.getData('sliders').then((result) => {
      //console.log(result);
      this.dataSetSlider = result;
      if (this.dataSetSlider) {
        this.getDataCategory();
      } else {
        this.getDataCategory();
      }
    }, (err) => {
      console.log(err);
    });
  }

  getDataCategory() {
    this.authService.getData('category')
      .then((result) => {
        //console.log(result);
        this.dataSetCategory = result;
      }, (err) => {
        console.log(err);
      });
  }

  getAddressUser() {
    if (localStorage.getItem("uid")) {

      this.db
        .list("/users/" + localStorage.getItem("uid") + "/address").snapshotChanges().pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
        )).subscribe((res: any) => {
          //console.log(res.length);
          //console.log(res);
          if (res.length > 0) {

            for (let i = 0; i < res.length; i = i + 1) {
              if (res[i].status > 0) {
                localStorage.setItem('keyAddress', res[i].$key);
                localStorage.setItem('cep', res[i].cep);
                localStorage.setItem('frete', res[i].frete);
                //console.log(res[i].$key);
              } else {
                this.novoArray.push((res[i], i));
              }
            }

            //console.log(res.length);
            //console.log(this.novoArray.length);

            if (this.novoArray.length == res.length) {//corrige o problema do usuario nao ter escolhido um endereco como principal
              this.db.list("/users/" + localStorage.getItem("uid") + "/address").update(res[0].$key, {
                status: 1
              }).then(() => {
                localStorage.setItem('keyAddress', res[0].$key);
                localStorage.setItem('cep', res[0].cep);
                localStorage.setItem('frete', res[0].frete);
                console.log('atualizado com sucesso!');
              });
            }

          }

        });
    }
  }

  navigate(id) {
    this.navCtrl.push("ProductListPage", { id: id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

}
