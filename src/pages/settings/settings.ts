import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController, AlertController, LoadingController, Platform, Events, ModalController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class Settings {

  Cart: any = [];
  
  user: any = {};
  url: any = "assets/img/profile.jpg";
  value: any;
  
  public file: any = {};
  public storageRef = firebase.storage();

  addressList: any = [];

  address: any = {};

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public platform: Platform,
    public events: Events,

    public modalCtrl: ModalController,

    public alertCtrl: AlertController
  ) {

  }

  ionViewWillEnter() {
    
  }

  ngOnInit() {
    if (this.af.auth.currentUser) {
      this.db.object("/users/" + this.af.auth.currentUser.uid).valueChanges().subscribe((res: any) => {
        //console.log(res);
        if (res) {
          this.user = res;
          this.user.image = res.image ? res.image : "";
          this.url = res.image ? res.image : "assets/img/profile.jpg";
          //console.log(this.user);
        } else {
          this.user.image = "assets/img/profile.jpg";
          this.url = "assets/img/profile.jpg";
        }
      });
    }

    /*this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
    )).subscribe((res: any) => {
      //this.addressList = res;
      //console.log(this.address);
      //console.log(res);

      if (res.length != 0) {
        this.address.key = res[0]['$key'];
        this.address.bairro = res[0]['bairro'];
        this.address.cep = res[0]['cep'];
        this.address.cidade = res[0]['cidade'];
        this.address.complemento = res[0]['complemento'];
        this.address.contato = res[0]['contato'];
        this.address.endereco = res[0]['endereco'];
        this.address.estado = res[0]['estado'];
        this.address.frete = res[0]['frete'];
        this.address.nome = res[0]['nome'];
        this.address.numero = res[0]['numero'];
      }

      //console.log(this.address);
    });*/
  }

  readUrl(event) {

    this.file = (<HTMLInputElement>document.getElementById("file")).files[0];

    //console.log(this.file.name);

    let metadata = {
      contentType: "image/*"
    };
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    
    loader.present();
    
    this.storageRef.ref().child("profile/" + this.file.name).put(this.file, metadata).then(res => {
        this.user.image = res.downloadURL;
        this.url = res.downloadURL;
        this.db
          .object("users" + "/" + this.af.auth.currentUser.uid + "/image")
          .set(res.downloadURL);
        loader.dismiss();
      })
      .catch(error => {
        console.log(error);
        loader.dismiss();
      });
  }

  onSubmit(user: NgForm) {
    //console.log(this.user);
    if (this.af.auth.currentUser) {
      this.db.object("/users/" + this.af.auth.currentUser.uid).update({
          name: this.user.name,
          image: this.user.image,
          email: localStorage.getItem("email"),
          mobileNo: this.user.mobileNo
        })
        .then(() => {
          this.createToaster("Informações atualizadas com sucesso", 3000);
          this.events.publish("imageUrl", this.user);
        });
    }
  }

  onSubmit2(address: NgForm) {
    console.log("UPDATE ENDEREÇO");
    if (this.af.auth.currentUser) {
      this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").update(this.address.key, {
          
        bairro: this.address.bairro,
        cep: this.address.cep,
        cidade: this.address.cidade,
        complemento: this.address.complemento,
        contato: this.address.contato,
        endereco: this.address.endereco,
        estado: this.address.estado,
        frete: this.address.frete,
        nome: this.address.nome,
        numero: this.address.numero

        }).then(() => {
          this.createToaster("Informações atualizadas com sucesso", 3000);
        });
    }
  }

  deleteAddress(key) {

    let alert = this.alertCtrl.create({
      title: "Excluir!",
      subTitle: "Você quer excluir esse endereço?",
      buttons: [
        {
          text: "sim",
          handler: data => {
            this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").remove(key);
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

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
