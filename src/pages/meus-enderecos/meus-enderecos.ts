import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController, AlertController, LoadingController, Platform, Events, ModalController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { AddEnderecoPage } from "../add-endereco/add-endereco";
import { GoogleMapsGeolocalizacaoPage } from "../google-maps-geolocalizacao/google-maps-geolocalizacao";

@IonicPage()
@Component({
  selector: 'page-meus-enderecos',
  templateUrl: 'meus-enderecos.html',
})
export class MeusEnderecosPage {

  Cart: any = [];
  noOfItems: any;

  url: any;

  addressList: any = [];

  address: any = {};

  dataSetGoogleMaps: any;

  cep: any;
  frete: any;

  keyAtual: any;

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public platform: Platform,
    public events: Events,

    public modalCtrl: ModalController,

    public authService: AuthServiceProvider,

    public alertCtrl: AlertController
  ) {
    
  }

  ngOnInit() {
    this.url = "assets/img/profile.jpg";
  }

  ionViewDidLoad() {

    /*setTimeout(() => {
      console.log('Async operation has ended');
      this.Cart.complete();
    }, 2000);*/

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
    
    this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ $key: c.payload.key, ...c.payload.val() as {} }))
    )).subscribe((res: any) => {
      this.addressList = res;
      //console.log(this.addressList);
    });

    this.keyAtual = localStorage.getItem('keyAddress');
    //console.log(this.keyAtual);
    this.address.$key = localStorage.getItem('keyAddress');
    //console.log(this.address.$key);

    console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));
    console.log(localStorage.getItem('keyAddress'));

  }

  //Selected Address
  selectAddress(address = null) {

    //console.log(address);
    
    if(address == null){

      this.insertCep();

    }else{

      if(address.$key == localStorage.getItem('keyAddress')){
        
        let alert = this.alertCtrl.create({
          title: "Atenção!",
          subTitle: "Você não pode excluir o endereço que está sendo utilizado no momento!",
          buttons: [
            {
              text: "OK",
              role: 'cancel',
              handler: data => {
                console.log(data);
              }
            }
          ]
        });
        alert.present();

      }else{

        let alert = this.alertCtrl.create({
          title: "Excluir!",
          subTitle: "Você quer excluir esse endereço?",
          buttons: [
            {
              text: "sim",
              handler: data => {
                this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").remove(address.$key);
                this.navCtrl.push("MeusEnderecosPage");
              }
            }, {
              text: "Cancelar",
              role: 'cancel',
              handler: data => {
                console.log(data);
              }
            }
          ]
        });
        alert.present();

      }

    }
        
  }

  //Selected Address
  selectAddress2(key, address) {
    //console.log(address);
    localStorage.setItem("cep", address.cep);
    localStorage.setItem("frete", address.frete);
    localStorage.setItem("keyAddress", key);
  }

  insertCep() {

    let profileModal = this.modalCtrl.create(GoogleMapsGeolocalizacaoPage);
    profileModal.present();

    profileModal.onDidDismiss(res => {
      //console.log(res.data.cep);
      //console.log(data.cep);
      //console.log(res.data.cep);
      //console.log(res.data);
      if (res.data.cep != 0) {
        this.getDataGoogleMaps(res.data.cep, res.data.bairro, res.data.endereco);
      }
    });

  }

  getDataGoogleMaps(cep, bairro, endereco) {
    if (cep != 1) {
      this.authService.getData('googleMaps/' + cep).then((result) => {

        this.dataSetGoogleMaps = result;

        /*console.log(cep);
        console.log(bairro);
        console.log(endereco);
        console.log(this.dataSetGoogleMaps);
        console.log(JSON.stringify(this.dataSetGoogleMaps));*/

        if ((this.dataSetGoogleMaps != 'Digite um CEP válido') && (this.dataSetGoogleMaps != 'Não fazemos entrega nessa região!')) {

          let alert = this.alertCtrl.create({
            title: 'Entregamos nesse CEP!',
            subTitle: '',
            buttons: [{
                text: 'OK',
                handler: () => {
                  let profileModal = this.modalCtrl.create(AddEnderecoPage, { cep: cep, frete: JSON.stringify(this.dataSetGoogleMaps), bairro: bairro, endereco: endereco });
                  profileModal.onDidDismiss(data => {
                    //console.log(data.data);
                    if(data != 1){
                      localStorage.setItem("cep", data.data.cep);
                      localStorage.setItem("frete", data.data.frete);
                      localStorage.setItem("keyAddress", data.data.keyAddress);
                      this.navCtrl.push("MeusEnderecosPage");
                    }
                  });
                  profileModal.present();
                }
              }]
          });
          alert.present();

        } else {
          let alert = this.alertCtrl.create({
            title: this.dataSetGoogleMaps,
            subTitle: '',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.insertCep();
                }
              }
            ]
          });
          alert.present();
        }

      }, (err) => {
        console.log(err);
      });
    } else {
      this.navCtrl.pop();
    }

  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

}
