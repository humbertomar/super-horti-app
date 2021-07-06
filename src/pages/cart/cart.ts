import { Component } from "@angular/core";
import { NavController, IonicPage, ToastController, ModalController } from "ionic-angular";
import { AlertController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as moment from "moment";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { GoogleMapsGeolocalizacaoPage } from "../google-maps-geolocalizacao/google-maps-geolocalizacao";

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

import { AddEnderecoPage } from "../add-endereco/add-endereco";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {

  uid: string;
  
  version: string = "1.2.12a";
  bloquear_botao: boolean;

  dataEntrega: any;
  diaSemana: any;

  pedidoAgendado: any;
  dataEntregaAgendado: any;
  diaSemanaAgendado: any;

  data_pedido: any;
  data_entrega: any;
  dia_semana: any;

  bloquear_app: any;
  qtdadePedidosDia: any;
  qtdade_pedidos_dia: any;
  horario_maximo_pedidos: any;

  botaoRecalcularFrete: boolean;

  today = new Date();

  botao_finalizar: any;

  address: any = {};

  ft: any;
  cep: any;

  frete: any;
  freteFinal: any;

  keyAddress: any;

  addressList: any = [];

  dataSetGoogleMaps: any;

  orderDetails: any = {};
  public checked: boolean = false;
  public loyaltyPoints: number = 0;

  Cart: any[] = [];
  public settings: any = {};
  subTotal: any;

  public endereco: any = {};
  bairro: any;
  logradouro: any;

  totalItems: any;

  GrandTotal: any;
  otherTaxes = 0.0;
  setting: AngularFireObject<any>;
  noOfItems: any;
  total: any;
  coupons: any = [];

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,

    public navCtrl: NavController,

    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

    public authService: AuthServiceProvider,

    public modalCtrl: ModalController,

    public fbs: FirebaseServiceProvider
  ) {

    moment.locale('pt-br');

    this.data_pedido = moment().format("YYYY-MM-DD");

    let diaPedido = parseInt(moment().format("d"));
    let horaPedido = parseInt(moment().format("HH"));

    //dom: 0, seg: 1, ter: 2, qua: 3, qui: 4, sex: 5, sab: 6
    if (diaPedido == 0 && horaPedido <= this.horario_maximo_pedidos) {//domingo até 20:00
      this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(1, 'day').format("dddd");//entrega segunda
    } else if (diaPedido == 0 && horaPedido > this.horario_maximo_pedidos) {//domingo depois das 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega terça
    } else if (diaPedido == 1 && horaPedido <= this.horario_maximo_pedidos) {//segunda até 20:00
      this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(1, 'day').format("dddd");//entrega terça
    } else if (diaPedido == 1 && horaPedido > this.horario_maximo_pedidos) {//segunda depois das 20:00
      this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(3, 'day').format("dddd");//entrega quinta
    } else if (diaPedido == 2 && horaPedido <= this.horario_maximo_pedidos) {//terça até 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega quinta
    } else if (diaPedido == 2 && horaPedido > this.horario_maximo_pedidos) {//terça depois das 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega quinta
    } else if (diaPedido == 3 && horaPedido <= this.horario_maximo_pedidos) {//quarta até 20:00
      this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(1, 'day').format("dddd");//entrega quinta
    } else if (diaPedido == 3 && horaPedido > this.horario_maximo_pedidos) {//quarta depois das 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega sexta
    } else if (diaPedido == 4 && horaPedido <= this.horario_maximo_pedidos) {//quinta até 20:00
      this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(1, 'day').format("dddd");//entrega sexta
    } else if (diaPedido == 4 && horaPedido > this.horario_maximo_pedidos) {//quinta depois das 20:00
      this.data_entrega = moment().add(4, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(4, 'day').format("dddd");//entrega segunda
    } else if (diaPedido == 5 && horaPedido <= this.horario_maximo_pedidos) {//sexta até 20:00
      this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(3, 'day').format("dddd");//entrega segunda
    } else if (diaPedido == 5 && horaPedido > this.horario_maximo_pedidos) {//sexta depois das 20:00
      this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(3, 'day').format("dddd");//entrega segunda
    }else if (diaPedido == 6 && horaPedido <= this.horario_maximo_pedidos) {//sábado até 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega segunda
    } else if (diaPedido == 6 && horaPedido > this.horario_maximo_pedidos) {//sábado depois das 20:00
      this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
      this.dia_semana = moment().add(2, 'day').format("dddd");//entrega segunda
    }
    
    this.dataEntrega = this.data_entrega;
    this.diaSemana = this.dia_semana;

    if (localStorage.getItem('frete')) {
      this.ft = localStorage.getItem('frete');
      this.cep = localStorage.getItem('cep');
    }else{
      this.ft = 0;
      this.cep = null;
    }
    //console.log(this.ft);
    this.converterFrete(this.ft);

    if(localStorage.getItem('keyAddress')){
      this.keyAddress = localStorage.getItem('keyAddress');
    }else{
      this.keyAddress = null;
    }
    console.log(this.keyAddress);

    this.pedidoAgendado = 0;

    if(localStorage.getItem('uid')){
      if(!localStorage.getItem('keyAddress')){//corrige um bug devido a essa nova variavel nao existir nas versoes antigas
        
        /*if (localStorage.getItem('cep')) {
          let profileModal = this.modalCtrl.create(AddEnderecoPage, { cep: localStorage.getItem('cep'), frete: localStorage.getItem('frete'), bairro: localStorage.getItem('bairro'), endereco: localStorage.getItem('logradouro') });
          profileModal.onDidDismiss(data => {
            //console.log(data.data);
            if (data != 1) {
              localStorage.setItem("cep", data.data.cep);
              localStorage.setItem("frete", data.data.frete);
              localStorage.setItem("keyAddress", data.data.keyAddress);
              this.navCtrl.push("CartPage");
            }
          });
          profileModal.present();
        }*/
        
        /*localStorage.removeItem('cep');//limpa o cep do localStorage
        localStorage.removeItem('frete');//limpa o frete do localStorage
        localStorage.removeItem('bairro');//limpa o bairro do localStorage
        localStorage.removeItem('logradouro');//limpa o endereco do localStorage

        this.navCtrl.setRoot("HomePage");*/
      }
    }

    /*console.log(this.cep);
    console.log(this.frete);

    console.log(this.keyAddress);

    console.log(localStorage.getItem("uid"));
    
    console.log(localStorage.getItem('cep'));
    console.log(localStorage.getItem('frete'));*/

    //localStorage.clear();//limpa o localStorage
    /*localStorage.removeItem('cep');//limpa o cep do localStorage
    localStorage.removeItem('frete');//limpa o frete do localStorage
    localStorage.removeItem('freteFinal');//limpa o frete do localStorage
    localStorage.removeItem('bairro');//limpa o bairro do localStorage
    localStorage.removeItem('logradouro');//limpa o endereco do localStorage*/

    ///localStorage.removeItem('enderecoCompleto');

    /*localStorage.removeItem('Test');
    console.log(localStorage.getItem("Test"));
    localStorage.setItem("Test", "123");
    console.log(localStorage.getItem("Test"));
    localStorage.setItem("Test", "123asd");
    console.log(localStorage.getItem("Test"));*/

    //console.log(localStorage.getItem("bairro"));
    //console.log(localStorage.getItem("logradouro"));

  }

  /*ionViewDidEnter(){
    console.log('1');
  }

  ionViewWillLeave(){
    console.log('2');
  }

  ionViewDidLeave(){
    console.log('3');
  }

  ionViewWillUnload(){
    console.log('4');
  }

  ionViewDidLoad() {
    console.log('5');
  }*/

  ngOnInit() {
  
  }

  ionViewWillEnter() {

    ///console.log('dsasdasdasda');

    //localStorage.clear();//limpa o localStorage
    /*localStorage.removeItem('cep');//limpa o cep do localStorage
    localStorage.removeItem('frete');//limpa o frete do localStorage
    localStorage.removeItem('freteFinal');//limpa o frete do localStorage
    localStorage.removeItem('bairro');//limpa o bairro do localStorage
    localStorage.removeItem('logradouro');//limpa o endereco do localStorage*/

    if(localStorage.getItem('keyAddress')){
      //console.log(localStorage.getItem('keyAddress'));
      this.addressUser(localStorage.getItem('keyAddress'));
    }

    if(localStorage.getItem("uid")){

      this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() as {} }))
      )).subscribe((res: any) => {
        console.log(res);
        if(res.length > 0){
          this.addressList = res;
          this.address.$key = localStorage.getItem('keyAddress');
        }
        //console.log(this.address);
      });
  
      if (localStorage.getItem("Cart")) {
        this.checarValorProdutos();//funcao recalcular valor dos produtos caso tenha tido uma promocao
      }
  
      this.authService.getData('settings').then((data: any[]) => {
        this.settings = data;
  
        if(this.version != this.settings[0].versao){
          let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Você precisar atualizar o aplicativo do Super Horti!",
            buttons: [
              {
                text: "OK",
                role: 'cancel',
                handler: data => {
                  
                }
              }
            ]
          });
          alert.present();
          this.bloquear_botao = true;
        }else{
          this.bloquear_botao = false;
        }
  
        this.settings.forEach(elemento => {
          //console.log(elemento.bloquear_app);
          this.bloquear_app = elemento.bloquear_app;
          //this.qtdadePedidosDia = elemento.qtdade_pedidos_dia;
          this.horario_maximo_pedidos = elemento.horario_maximo_pedidos;
  
          //console.log(localStorage.getItem("uid"));

          if (localStorage.getItem("uid")) {
            this.db.list("/users/" + localStorage.getItem("uid") + "/address").snapshotChanges().pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() as {} }))
            )).subscribe((res: any) => {
              if (res.length > 0) {

                if (localStorage.getItem('frete')) {
                  this.ft = localStorage.getItem('frete');
                }else{
                  this.ft = 0;
                }
                this.converterFrete(this.ft);
  
                this.botaoRecalcularFrete = false;
                
              } else {
                //console.log("Nada!");
                if (localStorage.getItem('cep')) {
                  this.botaoRecalcularFrete = true;

                  if (localStorage.getItem('frete')) {
                    this.cep = localStorage.getItem('cep');
                    this.ft = localStorage.getItem('frete');
                  }else{
                    this.ft = 0;
                  }
                  this.converterFrete(this.ft);
  
                } else {
                  this.botaoRecalcularFrete = false;
                }
              }
            });
  
          } else {
  
            if (localStorage.getItem('cep')) {
              this.botaoRecalcularFrete = true;
              
              if (localStorage.getItem('frete')) {
                this.cep = localStorage.getItem('cep');
                this.ft = localStorage.getItem('frete');
              }else{
                this.ft = 0;
              }
              this.converterFrete(this.ft);
  
            } else {
              this.botaoRecalcularFrete = false;
            }
  
          }
  
        });
      }, (err) => {
        console.log(err);
      });

    }else{

      if (localStorage.getItem("Cart")) {
        this.checarValorProdutos();//funcao recalcular valor dos produtos caso tenha tido uma promocao
      }
  
      this.authService.getData('settings').then((data: any[]) => {
        this.settings = data;
  
        this.bloquear_botao = true;
  
        if(this.version != this.settings[0].versao){
          let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Você precisar atualizar o aplicativo do Super Horti!",
            buttons: [
              {
                text: "OK",
                role: 'cancel',
                handler: data => {
                  
                }
              }
            ]
          });
          alert.present();
        }else{
          this.bloquear_botao = false;
        }
  
        this.settings.forEach(elemento => {
          //console.log(elemento.bloquear_app);
          this.bloquear_app = elemento.bloquear_app;
          //this.qtdadePedidosDia = elemento.qtdade_pedidos_dia;
          this.horario_maximo_pedidos = elemento.horario_maximo_pedidos;
  
          //console.log(localStorage.getItem("uid"));

          if (localStorage.getItem("uid")) {
            this.db.list("/users/" + localStorage.getItem("uid") + "/address").snapshotChanges().pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() as {} }))
            )).subscribe((res: any) => {
              if (res.length > 0) {
  
                if (localStorage.getItem('frete')) {
                  this.ft = localStorage.getItem('frete');
                }else{
                  this.ft = 0;
                }
                this.converterFrete(this.ft);
  
                this.botaoRecalcularFrete = false;
                
              } else {
                //console.log("Nada!");
                if (localStorage.getItem('cep')) {
                  
                  if (localStorage.getItem('frete')) {
                    this.cep = localStorage.getItem('cep');
                    this.ft = localStorage.getItem('frete');
                  }else{
                    this.ft = 0;
                  }
                  this.converterFrete(this.ft);

                  this.botaoRecalcularFrete = true;
  
                } else {
                  this.botaoRecalcularFrete = false;
                }
              }
            });
  
          } else {
  
            if (localStorage.getItem('cep')) {
              
              if (localStorage.getItem('frete')) {
                this.cep = localStorage.getItem('cep');
                this.ft = localStorage.getItem('frete');
              }else{
                this.ft = 0;
              }
              this.converterFrete(this.ft);

              this.botaoRecalcularFrete = true;
  
            } else {
              this.botaoRecalcularFrete = false;
            }
  
          }
          //
  
        });
      }, (err) => {
        console.log(err);
      });

    }

    //this.frete = localStorage.getItem('freteFinal');
    //console.log(this.frete);

  }

  addressUser(event) {

    //console.log(event);

    //console.log(localStorage.getItem("uid"));

    if(localStorage.getItem("uid")){

      const subscribe = this.fbs.get("/users/" + this.af.auth.currentUser.uid + "/address/", event).subscribe((c: any) => {
        subscribe.unsubscribe();
        let endereco = c;
        //console.log(endereco.cep);
        //console.log(endereco);
  
        this.cep = endereco.cep;

        this.converterFrete(endereco.frete);
  
        this.authService.getData('settings').then((data: any[]) => {
          this.settings = data;
  
          //console.log(this.settings);
  
          this.settings.forEach(elemento => {
            //console.log(elemento.bloquear_app);
            this.bloquear_app = elemento.bloquear_app;
            //this.qtdadePedidosDia = elemento.qtdade_pedidos_dia;
            this.horario_maximo_pedidos = elemento.horario_maximo_pedidos;
            
            localStorage.setItem('bairro', endereco.bairro);
            localStorage.setItem('cep', endereco.cep);
            localStorage.setItem('cidade', endereco.cidade);
            localStorage.setItem('complemento', endereco.complemento);
            localStorage.setItem('contato', endereco.contato);
            localStorage.setItem('endereco', endereco.endereco);
            localStorage.setItem('estado', endereco.estado);
            localStorage.setItem('frete', endereco.frete);
            localStorage.setItem('keyAddress', event);
            localStorage.setItem('nome', endereco.nome);
            localStorage.setItem('numero', endereco.numero);
      
            //localStorage.setItem('enderecoCompleto', endereco);
            
            //console.log(this.frete);
  
            ///this.callFunction();
          });
  
        }, (err) => {
          console.log(err);
        });
  
      })

    }

  }

  //funcao recalcular valor dos produtos caso tenha tido uma promocao
  checarValorProdutos(){

    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log(this.Cart);
    this.callFunction();
    this.noOfItems = this.Cart.length;

    for (let i = 0; i <= this.Cart.length - 1; i++) {

      //https://superhorti.com.br/ws/controllers/_WS_/productID/17
      //console.log(this.Cart[i].item.itemId);
      //console.log(this.Cart[i].item.price);

      this.authService.getData('productID/'+this.Cart[i].item.itemId).then((data: any[]) => {
        this.settings = data;
  
        //console.log(Number(this.settings[0].price).toFixed(2));
        //console.log(Number(this.Cart[i].item.price).toFixed(2));

        if (Number(this.settings[0].price).toFixed(2) != Number(this.Cart[i].item.price).toFixed(2)) {
          //console.log("essa promoção acabou!");
         
          /*console.log(i);
          console.log(this.Cart[i])
          console.log(this.Cart[i].itemTotalPrice);
          console.log(this.Cart[i].item.itemQunatity);
          console.log(this.Cart[i].item.price);*/

          //console.log(this.settings[0].price * this.Cart[i].item.itemQunatity);
          //console.log(this.settings[0].price * 3);
          //console.log(this.settings[0].price);

          //apenas para testar
          /*this.Cart[i].item.itemQunatity = (7 + i);
          this.Cart[i].itemTotalPrice = ((this.settings[0].price * 2) * (7 + i));
          this.Cart[i].item.price = (this.settings[0].price  * 2);*/
          
          this.Cart[i].itemTotalPrice = this.settings[0].price * this.Cart[i].item.itemQunatity;
          this.Cart[i].item.price = this.settings[0].price;

          localStorage.setItem("Cart", JSON.stringify(this.Cart));
          this.callFunction();

          if((this.Cart.length - 1) == i){
            let alert = this.alertCtrl.create({
              title: 'Atenção',
              subTitle: 'O(s) produto(s) que estão no seu carrinho sofreram alteração de preço. Os valores foram ajustados automaticamente para o preço atual!',
              buttons: ['OK']
            });
            alert.present();
          }

        }

        this.Cart = JSON.parse(localStorage.getItem("Cart"));
        //console.log(this.Cart);
        this.noOfItems = this.Cart.length;

      }, (err) => {
        console.log(err);
      });

    }
    
  }

  insertCep() {

    let profileModal = this.modalCtrl.create(GoogleMapsGeolocalizacaoPage);
    profileModal.present();

    profileModal.onDidDismiss(res => {
      console.log(res.data.latitude);
      console.log(res.data.longitude);
      //console.log(data.cep);
      console.log(res);
      if (res.data.cep != 0) {
        ///this.getDataGoogleMaps(res.data.cep, res.data.bairro, res.data.endereco);
      }
    });

  }

  converterFrete(ft){

    //console.log(ft);

    this.authService.getData('settings').then((data: any[]) => {
      this.settings = data;
      
      //console.log(this.settings);
      
      this.settings.forEach(elemento => {

        //console.log(elemento);
        
        if (ft == 0 || ft == 7) {
          this.freteFinal = elemento.frete_5;
          //console.log(elemento.frete_5);
        } else if (ft == 15) {
          this.freteFinal = elemento.frete_10;
          //console.log(elemento.frete_10);
          //console.log(elemento.frete_25);
        } else {//25
          this.freteFinal = elemento.frete_30;
          //console.log(elemento.frete_30);
        }

        localStorage.setItem('freteFinal', this.freteFinal);

        this.frete = this.freteFinal;

        console.log('frete cad: '+ft);
        console.log('frete conv: '+this.frete);

        this.callFunction();
      });

    }, (err) => {
      console.log(err);
    });

    //this.frete = localStorage.getItem('freteFinal');
    //console.log(this.frete);

  }

  getDataGoogleMaps(cep, bairro, endereco) {
    if (cep != 1) {
      this.authService.getData('googleMaps/' + cep).then((result) => {

        this.dataSetGoogleMaps = result;

        //console.log(this.dataSetGoogleMaps);

        if ((this.dataSetGoogleMaps != 'Digite um CEP válido') && (this.dataSetGoogleMaps != 'Não fazemos entrega nessa região!')) {

          let alert = this.alertCtrl.create({
            title: 'Entregamos nesse CEP!',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();

          this.cep = cep;
          this.ft = JSON.stringify(this.dataSetGoogleMaps);

          this.converterFrete(this.ft);

          localStorage.setItem('cep', cep);
          localStorage.setItem('frete', JSON.stringify(this.dataSetGoogleMaps));
          localStorage.setItem('bairro', bairro);
          localStorage.setItem('logradouro', endereco);

          if (localStorage.getItem("uid")) {//não está logado
            this.botaoRecalcularFrete = true;
          } else {
            this.botaoRecalcularFrete = true;
          }

          this.frete = localStorage.getItem('freteFinal');

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

  callFunction() {
    let subTotal = 0;
    let totalItems = 0;
    for (var i = 0; i <= this.Cart.length - 1; i++) {
      subTotal = subTotal + this.Cart[i].itemTotalPrice;
      totalItems = totalItems + this.Cart[i].item.itemQunatity;
    }
    this.totalItems = Number(totalItems);
    this.subTotal = Number(subTotal.toFixed(2));
    this.total = Number(this.frete);//aqui
    this.GrandTotal = Number((this.subTotal + this.total).toFixed(2));

    /*console.log(this.frete);

    console.log(this.totalItems);
    console.log(this.subTotal);
    console.log(this.total);
    console.log(this.GrandTotal);*/
  }

  openCalendar() {

    //console.log("Calendar");

    //dia 24, 25/12 e dia 31 e 01/01 ele tá agendando

    let _daysConfig: DayConfig[] = [];

    _daysConfig = [
      /*{
        date: new Date(2020, 11, 24),
        disable: true
      },
      {
        date: new Date(2020, 11, 25),
        disable: true
      },
      {
        date: new Date(2020, 11, 31),
        disable: true
      },
      {
        date: new Date(2021, 0, 1),
        disable: true
      }*/
      {
        date: new Date(2021, 3, 2),
        disable: true
      }
    ];

    _daysConfig.push();

    const options: CalendarModalOptions = {
      title: '',
      monthFormat: 'MM/YYYY',
      weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      doneLabel: 'OK',
      closeLabel: 'Cancelar',
      weekStart: 0,
      //defaultDate: new Date(),
      defaultDate: new Date(Date.now() + 24 * 60 * 60 * 1000),

      //from: new Date(2020, 8, 4)
      from: new Date(Date.now() + 24 * 60 * 60 * 1000),

      //disableWeeks: [0, 6],//desativa sábado e domingo
      //disableWeeks: [2, 5, 6],//desativa terça, sexta e sábado

      //eles so entregam NESSES dias
      //Segunda - 1
      //Terça - 2
      //Quinta - 4
      //Sexta - 5

      daysConfig: _daysConfig
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {

      //console.log(date);

      if (date) {
        var stringExemplo = "" + date.dateObj + "";
        let resultado = stringExemplo.split(" ");

        //console.log(resultado[0]);

        if (resultado[0] == 'Sun' || resultado[0] == 'Sat' || resultado[0] == 'Wed') {
          let alert = this.alertCtrl.create({
            title: 'Domingo, Quarta e Sábado não fazemos entrega!',
            subTitle: 'Tente outra data!',
            buttons: ['OK']
          });
          alert.present();
        } else {

          if (resultado[0] == 'Mon') {
            this.dia_semana = 'segunda-feira';
          } else if (resultado[0] == 'Tue') {
            this.dia_semana = 'terça-feira';
          } else if (resultado[0] == 'Thu') {
            this.dia_semana = 'quinta-feira';
          } else if (resultado[0] == 'Fri') {
            this.dia_semana = 'sexta-feira';
          }

          //console.log(this.diaSemana);
          
          this.pedidoAgendado = "1";
          this.dataEntregaAgendado = date.string;
          this.diaSemanaAgendado = this.dia_semana;

          //console.log(this.pedidoAgendado);
          //console.log(this.dataEntregaAgendado);
          //console.log(this.diaSemanaAgendado);

          //this.nav2();

        }

      }else{
        this.pedidoAgendado = "0";
      }
    });
  }

  //apenas para funcionar o elemento
  segmentChanged($event) {
    
    //console.log($event.value);

    //this.pedidoAgendado = $event.value;

    //console.log(this.dataEntregaAgendado);

    /*if(this.dataEntregaAgendado != undefined && this.pedidoAgendado == "1"){
      console.log("Entrega Agendada");
    }else{
      console.log("Entrega Normal");
    }*/
  }

  nav() {

    if (this.bloquear_app > 0) {
      
      let alert = this.alertCtrl.create({
        title: "Desculpe!",
        subTitle: "Sistema fora do ar! Tente mais tarde!",
        buttons: [
          {
            text: "OK",
            role: 'cancel',
            handler: data => {
              console.log('Cancelado');
              this.navCtrl.setRoot("HomePage");
            }
          }
        ]
      });
      alert.present();
    
    } else {

      if (this.ft) {
        this.ft = '0.00';
      }else{
        this.cep = localStorage.getItem('cep');
        this.ft = localStorage.getItem('frete');
      }

      console.log(localStorage.getItem('cep'));

      //tem q calcular o frete
      if (!localStorage.getItem('cep')) {

        let loader = this.loadingCtrl.create({
          content: "Aguarde..."
        });

        let alert = this.alertCtrl.create({
          title: "Desculpe!",
          subTitle: "Você precisar calcular o frete primeiro!",
          buttons: [
            {
              text: "Ok",
              handler: data => {
                this.insertCep();
              }
            }, {
              text: "Cancelar",
              role: 'cancel',
              handler: data => {
                console.log('Cancelado');
                this.ft = 0;
              }
            }
          ]
        });
        alert.present();

        loader.present().then(() => {
          loader.dismiss();
        });

      } else {
        
        this.checarValorProdutos();
        this.nav2();

      }

    }

  }

  nav2() {

    ///console.log(this.addressList);

    //console.log(this.pedidoAgendado);

    /*console.log("Data do pedido: "+this.data_pedido);
    console.log("Data entrega do pedido normal: "+this.dataEntrega);
    console.log("Dia da semana da entrega do pedido normal: "+this.diaSemana);

    console.log("Pedido agendado: "+this.pedidoAgendado);
    console.log("Data entrega do pedido agendado: "+this.dataEntregaAgendado);
    console.log("Dia da semana da entrega do pedido agendado: "+this.diaSemanaAgendado);*/

    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    if (this.totalItems < 10) {
      this.showAlert('É necessário um pedido mínimo de 10 itens!');
      loader.present().then(() => {
        loader.dismiss();
      });
    } else {

      if (!localStorage.getItem("uid")) {
        let alert = this.alertCtrl.create({
          title: "Desculpe!",
          subTitle: "Você precisar logar primeiro!",
          buttons: [
            {
              text: "Ok",
              handler: data => {
                this.navCtrl.push("LoginPage");
              }
            }, {
              text: "Cancelar",
              role: 'cancel',
              handler: data => {
              }
            }
          ]
        });
        alert.present();

        loader.present().then(() => {
          loader.dismiss();
        });

      } else {

        if (this.pedidoAgendado != "1") {

          //console.log('asdadadasd12312323');

          //let dataHoraPedido = moment().format("YYYY-MM-DD HH:mm:ss");
          //console.log(dataHoraPedido);    

          this.data_pedido = moment().format("YYYY-MM-DD");

          let diaPedido = parseInt(moment().format("d"));
          let horaPedido = parseInt(moment().format("HH"));

          //dom: 0, seg: 1, ter: 2, qua: 3, qui: 4, sex: 5, sab: 6
          if (diaPedido == 0 && horaPedido <= this.horario_maximo_pedidos) {//domingo até 20:00
            this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(1, 'day').format("dddd");//entrega segunda
          } else if (diaPedido == 0 && horaPedido > this.horario_maximo_pedidos) {//domingo depois das 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega terça
          } else if (diaPedido == 1 && horaPedido <= this.horario_maximo_pedidos) {//segunda até 20:00
            this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(1, 'day').format("dddd");//entrega terça
          } else if (diaPedido == 1 && horaPedido > this.horario_maximo_pedidos) {//segunda depois das 20:00
            this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(3, 'day').format("dddd");//entrega quinta
          } else if (diaPedido == 2 && horaPedido <= this.horario_maximo_pedidos) {//terça até 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega quinta
          } else if (diaPedido == 2 && horaPedido > this.horario_maximo_pedidos) {//terça depois das 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega quinta
          } else if (diaPedido == 3 && horaPedido <= this.horario_maximo_pedidos) {//quarta até 20:00
            this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(1, 'day').format("dddd");//entrega quinta
          } else if (diaPedido == 3 && horaPedido > this.horario_maximo_pedidos) {//quarta depois das 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega sexta
          } else if (diaPedido == 4 && horaPedido <= this.horario_maximo_pedidos) {//quinta até 20:00
            this.data_entrega = moment().add(1, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(1, 'day').format("dddd");//entrega sexta
          } else if (diaPedido == 4 && horaPedido > this.horario_maximo_pedidos) {//quinta depois das 20:00
            this.data_entrega = moment().add(4, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(4, 'day').format("dddd");//entrega segunda
          } else if (diaPedido == 5 && horaPedido <= this.horario_maximo_pedidos) {//sexta até 20:00
            this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(3, 'day').format("dddd");//entrega segunda
          } else if (diaPedido == 5 && horaPedido > this.horario_maximo_pedidos) {//sexta depois das 20:00
            this.data_entrega = moment().add(3, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(3, 'day').format("dddd");//entrega segunda
          } else if (diaPedido == 6 && horaPedido <= this.horario_maximo_pedidos) {//sábado até 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega segunda
          } else if (diaPedido == 6 && horaPedido > this.horario_maximo_pedidos) {//sábado depois das 20:00
            this.data_entrega = moment().add(2, 'day').format("YYYY-MM-DD");
            this.dia_semana = moment().add(2, 'day').format("dddd");//entrega segunda
          }

          this.dataEntrega = this.data_entrega;
          this.diaSemana = this.dia_semana;

          let dataEntrega = this.dataEntrega.split('-');

          if (dataEntrega[2] == 2 && dataEntrega[1] == 4) {
            //console.log(' ');
            let alert = this.alertCtrl.create({
              title: "Atenção!",
              subTitle: 'Devido ao Réveillon nossa agenda está totalmente preenchida para entregas na quinta-feira (31/12). Por favor, escolha outra data!',
              buttons: [
                {
                  text: "OK",
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancelado');
                  }
                }
              ]
            });
            alert.present();

          /*if (dataEntrega[2] == 31 && dataEntrega[1] == 12) {
            //console.log(' ');
            let alert = this.alertCtrl.create({
              title: "Atenção!",
              subTitle: 'Devido ao Réveillon nossa agenda está totalmente preenchida para entregas na quinta-feira (31/12). Por favor, escolha outra data!',
              buttons: [
                {
                  text: "OK",
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancelado');
                  }
                }
              ]
            });
            alert.present();*/
          } else {

            if (this.totalItems < 10) {
              this.showAlert('É necessário um pedido mínimo de 10 itens!');
            } else {
              let alert = this.alertCtrl.create({
                title: "Finalizar o pedido agora?",
                subTitle: "Seu pedido será entregue: " + dataEntrega[2] + '/' + dataEntrega[1] + '/' + dataEntrega[0] + " - " + this.diaSemana.toUpperCase(),
                buttons: [
                  {
                    text: "Sim",
                    handler: data => {
                      this.navCtrl.push("AddressListPage", {
                        grandTotal: this.GrandTotal,
                        subTotal: this.subTotal,
                        totalVat: this.total,
                        dataPedidoAgendado: this.data_entrega,
                        diaSemana: this.diaSemana,
                        pedidoAgendado: this.pedidoAgendado,
                        totalItems: this.totalItems
                      });
                    }
                  }, {
                    text: "Não",
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancelado');
                    }
                  }
                ]
              });
              alert.present();
            }
          }

          loader.present().then(() => {
            loader.dismiss();
          });

        } else {

          if (this.totalItems < 10) {
            this.showAlert('É necessário um pedido mínimo de 10 itens!');
          } else {
            let dataEntrega = this.dataEntregaAgendado.split('-');

            let alert = this.alertCtrl.create({
              title: "Finalizar o pedido agora?",
              subTitle: "Seu pedido será entregue: " + dataEntrega[2] + '/' + dataEntrega[1] + '/' + dataEntrega[0] + " - " + this.diaSemanaAgendado.toUpperCase(),
              buttons: [
                {
                  text: "Sim",
                  handler: data => {
                    this.navCtrl.push("AddressListPage", {
                      grandTotal: this.GrandTotal,
                      subTotal: this.subTotal,
                      totalVat: this.total,
                      dataPedidoAgendado: this.dataEntregaAgendado,
                      diaSemana: this.diaSemanaAgendado,
                      pedidoAgendado: this.pedidoAgendado,
                      totalItems: this.totalItems
                    });
                  }
                }, {
                  text: "Não",
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancelado');
                  }
                }
              ]
            });
            alert.present();
          }

          loader.present().then(() => {
            loader.dismiss();
          });

        }

      }

    }

  }

  nav3(){
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      subTitle: "Atualize o aplicativo do Super Horti para continuar!",
      buttons: [
        {
          text: "OK",
          role: 'cancel',
          handler: data => {
            
          }
        }
      ]
    });
    alert.present();
  }

  add(data) {
    if (data.item.itemQunatity < 20) {
      data.item.itemQunatity = data.item.itemQunatity + 1;
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        let ExtotalPrice = 0;
        let totalPrice = 0;
        if (
          this.Cart[i].item.itemId == data.item.itemId &&
          this.Cart[i].item.price == data.item.price
        ) {
          this.Cart[i].item.itemQunatity = data.item.itemQunatity;
          for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
            ExtotalPrice =
              ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
          }
          if (this.Cart[i].item.price.specialPrice) {
            totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
          } else {
            totalPrice = ExtotalPrice + this.Cart[i].item.price;
          }
          this.Cart[i].itemTotalPrice = totalPrice * data.item.itemQunatity;
        }
      }
      localStorage.setItem("Cart", JSON.stringify(this.Cart));
      this.callFunction();
    }
  }

  remove(data) {
    if (data.item.itemQunatity > 1) {
      data.item.itemQunatity = data.item.itemQunatity - 1;
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        let ExtotalPrice = 0;
        let totalPrice = 0;
        if (
          this.Cart[i].item.itemId == data.item.itemId &&
          this.Cart[i].item.price == data.item.price
        ) {
          this.Cart[i].item.itemQunatity = data.item.itemQunatity;
          for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
            ExtotalPrice =
              ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
          }
          if (this.Cart[i].item.price.specialPrice) {
            totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
          } else {
            totalPrice = ExtotalPrice + this.Cart[i].item.price;
          }
          this.Cart[i].itemTotalPrice = totalPrice * data.item.itemQunatity;
        }
      }
      localStorage.setItem("Cart", JSON.stringify(this.Cart));
      this.callFunction();
    }
  }

  deleteItem(data) {
    for (var i = 0; i <= this.Cart.length - 1; i++) {
      if (
        this.Cart[i].item.itemId == data.item.itemId &&
        this.Cart[i].item.price.pname == data.item.price.pname
      ) {
        this.Cart.splice(i, 1);
        if (this.Cart.length == 0) {
          localStorage.removeItem("Cart");
          this.noOfItems = null;
        } else {
          localStorage.setItem("Cart", JSON.stringify(this.Cart));
          this.Cart = JSON.parse(localStorage.getItem("Cart"));
          this.noOfItems = this.noOfItems - 1;
        }
        this.callFunction();
      }
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  isCart(): boolean {
    return localStorage.getItem("Cart") == null || this.Cart.length == 0 ? false : true;
  }

  gotoHome() {
    localStorage.removeItem("Cart");
    this.navCtrl.setRoot("CategoryPage");
  }

  home() {
    this.navCtrl.setRoot("HomePage");
  }

}
