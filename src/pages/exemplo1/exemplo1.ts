import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-exemplo1',
  templateUrl: 'exemplo1.html',
})
export class Exemplo1Page {

  map: any;

  constructor() { }

  ionViewDidLoad() {
    const position = new google.maps.LatLng(-16.665136, -49.286041);

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Titulo
      title: 'Minha posição',

      //Animção
      animation: google.maps.Animation.DROP, // BOUNCE

      //Icone
      icon: 'assets/imgs/pessoa.png'
    });
  }

}
