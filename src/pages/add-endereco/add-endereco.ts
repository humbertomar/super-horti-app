import { Component } from "@angular/core";
import { NavController, NavParams, ViewController, AlertController } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { NgForm } from "@angular/forms";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-add-endereco',
  templateUrl: 'add-endereco.html',
})
export class AddEnderecoPage {

  public backgroundImage = 'assets/img/bg.jpg';

  address: any = {};

  addressList: any = [];

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,

    public viewCtrl: ViewController,

    public alertCtrl: AlertController,

    public authService: AuthServiceProvider,
  ) {

    /*console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));
    console.log(localStorage.getItem('bairro'));
    console.log(localStorage.getItem('logradouro'));*/

    if(navParams.get('endereco')){
      this.address.estado = 'GO';
      this.address.cidade = 'Goiânia';
      this.address.endereco = navParams.get('endereco');
      this.address.bairro = navParams.get('bairro');
      this.address.cep = navParams.get('cep');
      this.address.frete = navParams.get('frete');
    }else{
      this.address.estado = 'GO';
      this.address.cidade = 'Goiânia';
      this.address.endereco = localStorage.getItem('logradouro');
      this.address.bairro = localStorage.getItem('bairro');
      this.address.cep = localStorage.getItem('cep');
      this.address.frete = localStorage.getItem('frete');
    }

    /*this.authService.getData('settings').then((data: any[]) => {
      let settings = data[0];
      //console.log(settings);

      if (Number(localStorage.getItem('frete')) == 0) {
        this.address.frete = settings.frete_5;
      } else if (Number(localStorage.getItem('frete')) == 15) {
        this.address.frete = settings.frete_10;
      } else {
        this.address.frete = settings.frete_30;
      }
    
    });*/

    console.log(this.address);

  }

  addAddress(form: NgForm) {
    console.log(this.address);
    if (this.af.auth.currentUser) {
      this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").push(this.address)
        .then(res => {
          let retornoString = JSON.stringify(res);
          let resultado = retornoString.split("/address/").pop();
          let KeyAddress = resultado.replace('"', '');
          this.address.keyAddress = KeyAddress;
          //console.log(JSON.stringify(res));
          //console.log(KeyAddress);
          //this.viewCtrl.dismiss({cep: this.address.cep, frete: this.address.frete, keyAddress: KeyAddress});
          this.viewCtrl.dismiss({ data: this.address });
        });
    }

  }

  close(data) {
    this.viewCtrl.dismiss({data:data});
  }

}
