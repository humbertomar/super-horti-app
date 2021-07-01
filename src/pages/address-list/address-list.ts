import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, ModalController} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { CheckoutPage } from "../checkout/checkout";
import { InsertCepPage } from "../insert-cep/insert-cep";
import { AddEnderecoPage } from "../add-endereco/add-endereco";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

@IonicPage()
@Component({
  selector: "page-address-list",
  templateUrl: "address-list.html"
})
export class AddressListPage {

  public backgroundImage = 'assets/img/bg.jpg';

  dataPedidoAgendado: any;
  diaSemana: any;

  frete: any;
  cep: any;
  keyAddress: any;

  enderecoCompleto: any;

  Cart: any[] = [];

  dataSetGoogleMaps: any;

  grandTotal: any;
  subTotal: any;
  address: any = {};
  addressList: any = {};
  payTotal: any;

  cart: Array<any>;
  orderDetails: any = {};
  
  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,

    public authService: AuthServiceProvider,

    public modalCtrl: ModalController,

    public fbs: FirebaseServiceProvider
  ) {

    /*console.log(localStorage.getItem("uid"));
    console.log(localStorage.getItem("email"));

    console.log(localStorage.getItem('keyAddress'));

    console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));
    console.log(localStorage.getItem('bairro'));
    console.log(localStorage.getItem('logradouro'));*/

    this.frete = localStorage.getItem('frete');
    this.cep = localStorage.getItem('cep');
    this.keyAddress = localStorage.getItem('keyAddress');

    this.dataPedidoAgendado = this.navParams.get('dataPedidoAgendado');
    this.diaSemana = this.navParams.get('diaSemana');

    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log("cart: "+JSON.stringify(this.Cart));

    this.orderDetails.grandTotal = this.navParams.get("grandTotal");
    this.payTotal = this.orderDetails.grandTotal;
    //this.orderDetails.couponDiscount = this.navParams.get("couponDiscount");
    this.orderDetails.subTotal = this.navParams.get("subTotal");
    //this.orderDetails.deductedPrice = this.navParams.get("deductedPrice");
    this.orderDetails.tax = this.navParams.get("totalVat");

    this.orderDetails.dataPedidoAgendado = this.navParams.get('dataPedidoAgendado');
    this.orderDetails.pedidoAgendado = this.navParams.get("pedidoAgendado");

    //console.log(this.orderDetails.subTotal + this.orderDetails.tax);
    //console.log(this.payTotal);

    //console.log(this.orderDetails);

    //console.log(this.frete);

    if (this.orderDetails.grandTotal == undefined) {
      this.navCtrl.push("CartPage");
    }

    if (this.af.auth.currentUser) {
      this.db
        .list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
        )).subscribe((res: any) => {
          //console.log(res.length);
          if (res.length == 0) {
            //console.log("Nada");
            let profileModal = this.modalCtrl.create(AddEnderecoPage);
            profileModal.present();

            profileModal.onDidDismiss(data => {
              //console.log(data);
              if (data.data == 1) {
                this.navCtrl.pop();
              }else{
                this.addressList = data.data;

                this.orderDetails.shippingAddress = data.data;
                //console.log(this.addressList);
    
                /*let array = this.addressList;
    
                for (var key in array) {
                    this.orderDetails.subTotal = Number(this.navParams.get("subTotal").toFixed(2));
                    this.orderDetails.tax = Number(array[key]['frete']);
                    this.orderDetails.GrandTotal = Number((this.orderDetails.subTotal + this.orderDetails.tax).toFixed(2));
    
                    this.payTotal = this.orderDetails.GrandTotal;
                    //console.log(this.payTotal);
                  }*/
              }
            });
          }else{

            //console.log(localStorage.getItem('keyAddress'));

            var output = {}
            output["bairro"] = localStorage.getItem('bairro');
            output["cep"] = localStorage.getItem('cep');
            output["cidade"] = localStorage.getItem('cidade');
            output["complemento"] = localStorage.getItem('complemento');
            output["contato"] = localStorage.getItem('contato');
            output["endereco"] = localStorage.getItem('endereco');
            output["estado"] = localStorage.getItem('estado');
            output["frete"] = localStorage.getItem('frete');
            output["nome"] = localStorage.getItem('nome');
            output["numero"] = localStorage.getItem('numero');

            this.addressList = output;

            this.orderDetails.shippingAddress = output;

            /*grandTotal
            subTotal
            totalVat
            dataPedidoAgendado
            diaSemana
            pedidoAgendado
            totalItems

            var output = {}
            output["bairro"] = this.navParams.get('dataPedidoAgendado');
            output["cep"] = endereco.cep;
            output["cidade"] = endereco.cidade;
            output["complemento"] = endereco.complemento;
            output["contato"] = endereco.contato;
            output["endereco"] = endereco.endereco;
            output["estado"] = endereco.estado;
            output["frete"] = this.addressList.frete;
            output["nome"] = endereco.nome;
            output["numero"] = endereco.numero;

            this.addressList = "";

            this.orderDetails.shippingAddress = "";*/
          }

        })
    }
    this.orderDetails.cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log(this.orderDetails);
    
  }

  insertCep() {
    let profileModal = this.modalCtrl.create(InsertCepPage, { modalId: 1 });
    profileModal.present();

    profileModal.onDidDismiss(data => {
      //console.log(data.cep);
      if (data.cep != 0) {
        this.getDataGoogleMaps(data.cep);
      }
    });
  }
  
  getDataGoogleMaps(cep) {
    this.authService.getData('googleMaps/' + cep).then((result) => {
      //console.log(result);
      this.dataSetGoogleMaps = result;
      if (this.dataSetGoogleMaps != 'Digite um CEP válido') {
        //alert("Valor do frete: R$ "+this.dataSetGoogleMaps+',00');

        let alert = this.alertCtrl.create({
          title: 'Entregamos nesse CEP!',
          //title: 'Valor do frete: R$ '+this.dataSetGoogleMaps+',00',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();

        //this.navCtrl.setRoot("AddAddressPage");
        this.navCtrl.push("AddAddressPage", {
          id: 1
        });

        //console.log(this.dataSetGoogleMaps);
        localStorage.setItem('cep', cep);
        localStorage.setItem('frete', JSON.stringify(this.dataSetGoogleMaps));
      } else {
        let alert = this.alertCtrl.create({
          title: 'CEP inválido!',
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
  }

  checkOut() {
    //console.log(this.orderDetails.shippingAddress);
    //console.log(this.pincodeMatched);

    this.orderDetails.orderView = false;

    //console.log(this.orderDetails);

    if (this.orderDetails.shippingAddress) {
      //console.log(this.orderDetails);
      this.navCtrl.push(CheckoutPage, {
        orderDetails: this.orderDetails
      });
    } else {
      this.showAlert("Confirme seu endereço primeiro!");
    }
  }

  addressOK(){
    let alert = this.alertCtrl.create({
      title: "Endereço confirmado!",
      //subTitle: '',
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Desculpe!",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}