import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class Common {

  public loader: any;

  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    //console.log('Hello Common Provider');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Aguarde ..." })
    this.loader.present();
  }

  presentLoadingMsg(mensagem) {
    this.loader = this.loadingCtrl.create({ content: mensagem })
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  presentToast(mensagem, duracao, posicao) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: duracao,
      position: posicao
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

}