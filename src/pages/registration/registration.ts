import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  Platform,
  AlertController,
  Events
} from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-registration",
  templateUrl: "registration.html",
})
export class RegistrationPage implements OnInit {

  public backgroundImage = 'assets/img/bg2.jpg';

  registration: FormGroup;
  userDetails: AngularFireObject<any>;

  Cart: any = [];
  noOfItems: any;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public fb: FormBuilder,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform
  ) { 

  }

  ionViewWillEnter() {

    if((localStorage.getItem("uid") != undefined || localStorage.getItem("uid")) != null){
      this.navCtrl.setRoot("HomePage");
    }

    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    //console.log(this.Cart);
    this.noOfItems = this.Cart != null ? this.Cart.length : null;
    //console.log(this.noOfItems);

  }

  onSubmit() {
    this.af.auth.createUserWithEmailAndPassword(this.registration.value.email, this.registration.value.password)
      .then((success: any) => {
        //console.log(success.user.uid);
        /*this.db.object("/users/" + success.user.uid).update({
          email: this.registration.value.email,
          role: "User"
        });*/
        localStorage.setItem("uid", success.user.uid);
        localStorage.setItem("email", this.registration.value.email);
        if(this.noOfItems > 0){
          //this.navCtrl.setRoot("CartPage");
          this.navCtrl.push("CartPage");
        }else{
          this.navCtrl.setRoot("HomePage");
        }
      }).catch(error => {
        console.log("Firebase failure: " + JSON.stringify(error));
        this.showAlert(error.message);
      });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  navLogin() {
    this.navCtrl.setRoot("LoginPage");
  }

  ngOnInit(): any {
    this.buildForm();
  }

  //Validation
  buildForm(): void {
    this.registration = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ])
    });
  }

  // private publishEvent() {
  //   this.db.object("/users/" + this.af.auth.currentUser.uid).valueChanges().subscribe(userInfo => {
  //     this.events.publish("imageUrl", userInfo);
  //   });
  // }

  back(){
    //this.navCtrl.pop();
    this.navCtrl.setRoot("HomePage");
  }
}
