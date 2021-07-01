import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";

import { SocialSharing } from '@ionic-native/social-sharing';

import { AlertController } from 'ionic-angular';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-thankyou",
  templateUrl: "thankyou.html"
})
export class ThankyouPage {

  isLocationEnabled: boolean = false;
	latitude: any;
	longitude: any;

  numPedido: any;
  enderecoPedido: any;
  
  enderecoFinal: any;

  gps: any;

  nome: any;
  endereco: any;
  numero: any;
  bairro: any;
  cidade: any;
  estado: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    
    private socialSharing: SocialSharing,
    private alertCtrl: AlertController,

    public authService: AuthServiceProvider,

    public loadingCtrl: LoadingController,
  ) {

    localStorage.removeItem("Cart");

    this.numPedido = this.navParams.get("userId");
    this.enderecoPedido = this.navParams.get("endereco");
    //console.log(this.numPedido);
    //console.log(this.endereco);
    //console.log(this.enderecoPedido.nome);

    this.nome = this.enderecoPedido.nome;
    this.endereco = this.enderecoPedido.endereco;
    this.numero = this.enderecoPedido.numero;
    this.bairro = this.enderecoPedido.bairro;
    this.cidade = this.enderecoPedido.cidade;

    if(this.enderecoPedido.estado){
      this.estado = this.enderecoPedido.estado;
    }else{
      this.estado = 'GO';
    }

    this.enderecoFinal = this.endereco+", "+this.numero+", "+this.bairro+" "+this.cidade+" - "+this.estado;

    //console.log(this.endereco);
    
    this.getDataGoogleMaps(this.enderecoFinal);

  }

  refresh = refresher => {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewWillEnter() {

  }

  getDataGoogleMaps(endereco){

    //console.log(endereco);

    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present().then(() => {

      this.authService.getData('getGeoCode/'+endereco).then((result) => {
       
        this.gps = result;
        this.latitude = this.gps.latitude;
        this.longitude = this.gps.longitude;
        //console.log(result);

        loader.dismiss();
          
      }, (err) => {
        console.log(err);

        loader.dismiss();
        
      });

    });

    
  }

  onClick(){

    //console.log(this.latitude+" | "+this.longitude)
    
    if(this.latitude != undefined || this.longitude != undefined){
      
      this.socialSharing.shareViaWhatsAppToReceiver('5562993495445', 'Cliente: '+this.nome+'. Pedido: '+this.numPedido, null, 'https://maps.google.com/maps?q='+this.latitude+'%2C'+this.longitude+'&z=17&hl=pt-BR').then((result)=>{
          ///console.log(result);
          this.showAlert('A localização do endereço para entrega foi enviado com sucesso!');
        }).catch((error) => {
          //console.log('Erro ao enviar a localização: ' + JSON.stringify(error));
          this.showAlert('Erro ao enviar sua localização do endereço para entrega!');
      });
    }else{
      this.showAlert('Erro ao procurar a localização do endereço para entrega!');
    }
    
  }

  home() {
    this.navCtrl.push("HomePage");
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}
