import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-insert-cep',
  templateUrl: 'insert-cep.html',
})
export class InsertCepPage {

  public backgroundImage = 'assets/img/bg.jpg';

  modalId: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,

    public loadingCtrl: LoadingController,
  ) {
    this.modalId = navParams.get('modalId');
    //console.log(this.modalId);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad InsertCepPage');
  }

  cepIn(cep) {
    //console.log(cep);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Aguarde...'
    });
  
    loading.present();
  
    setTimeout(() => {
      
      if(cep!=0){
        let cep2 = cep.split(".");
      
        //console.log(cep2[0]);
        //console.log(cep2[1]);
        //console.log(cep2[0]+cep2[1]);
               
        this.viewCtrl.dismiss({ cep: cep2[0]+cep2[1] });
      }else{
        this.viewCtrl.dismiss({ cep: 0 });
      }

    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 2300);
    
  }

}
