import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { NgForm } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-add-address",
  templateUrl: "add-address.html"
})
export class AddAddressPage {
  
  address: any = {};

  addressList: any = {};

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    //var key = this.navParams.get("key");
    //console.log(key);

    ///this.address.cep = localStorage.getItem('cep');
    ///this.address.frete = localStorage.getItem('frete');

    //console.log(this.address.cep);
    //console.log(this.address.frete);
    /*if (this.af.auth.currentUser) {
      this.db.list("/users/" + this.af.auth.currentUser.uid + "/address").snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          //this.addressList = res;
          this.address = res;
          
          console.log(this.address);
        })
    }
    console.log(this.address);*/

    


  }

  ngOnInit() {
    if (this.af.auth.currentUser) {
      this.db
        .object("/users/" + this.af.auth.currentUser.uid + "/address")
        .valueChanges()
        .subscribe((res: any) => {
          this.address = res;

          console.log(this.address);
        });
    }

    console.log(this.address);
  }

  addAddress(form: NgForm) {
    console.log('asdasdasd');
    /*if (this.af.auth.currentUser) {
      this.db
        .list("/users/" + this.af.auth.currentUser.uid + "/address")
        .push(this.address)
        .then(res => {
          var id = this.navParams.get("id");
          if (id == 1) {
            this.navCtrl.push("UserAddressListPage");
          } else {
            this.navCtrl.pop();
          }
        });
    }*/
  }

  /*
  addAddress(form: NgForm) {
    console.log(this.address);
    if (this.af.auth.currentUser) {
      this.db
        .list("/users/" + this.af.auth.currentUser.uid + "/address")
        .push(this.address)
        .then(res => {
          var id = this.navParams.get("id");
          if (id == 1) {
            ///this.navCtrl.push("UserAddressListPage");
            //this.navCtrl.push("AddressListPage");
            this.navCtrl.pop();
          } else {
            //this.navCtrl.pop();
            this.navCtrl.setRoot("HomePage");
          }
        });
    }
  }
  */

}
