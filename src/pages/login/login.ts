import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    AlertController,
    Events,
} from 'ionic-angular';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Common } from '../../providers/common';
import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public backgroundImage = 'assets/img/bg2.jpg';

    tagHide: boolean = true;
    valForm: FormGroup;

    Cart: any = [];
    noOfItems: any;

    novoArray: any = [];

    constructor(
        public navCtrl: NavController,
        public fb: FormBuilder,
        public af: AngularFireAuth,
        public db: AngularFireDatabase,
        public alertCtrl: AlertController,
        public events: Events,
        public common: Common
    ) {
        //localStorage.clear();//limpa o localStorage
        this.valForm = fb.group({
            email: [
                '',
                Validators.compose([
                    CustomValidators.email,
                    Validators.required,
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.minLength(6),
                    Validators.required,
                ]),
            ],
        });
    }

    ionViewWillEnter() {
        if (
            (localStorage.getItem('uid') != undefined ||
                localStorage.getItem('uid')) != null
        ) {
            this.navCtrl.setRoot('HomePage');
        } else {
            localStorage.removeItem('email');
        }

        this.Cart = JSON.parse(localStorage.getItem('Cart'));
        //console.log(this.Cart);
        this.noOfItems = this.Cart != null ? this.Cart.length : null;
        //console.log(this.noOfItems);
    }

    toggleRegister() {
        this.tagHide = this.tagHide ? false : true;
    }

    OnLogin($ev, value: any) {
        this.common.presentLoading();
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.af.auth
                .signInWithEmailAndPassword(value.email, value.password)
                .then((success: firebase.auth.UserCredential) => {
                    this.common.closeLoading();
                    //console.log(success.user);
                    //this.showAlert("Seja bem vindo!");
                    localStorage.setItem('uid', success.user.uid);
                    localStorage.setItem('email', success.user.email);
                    this.getAddressUser(success.user.uid);
                    this.publishEvent();

                    if (this.noOfItems > 0) {
                        //this.navCtrl.setRoot("CartPage");
                        ////this.navCtrl.push("CartPage");
                        this.navCtrl.setRoot('HomePage');
                    } else {
                        this.navCtrl.setRoot('HomePage');
                    }
                })
                .catch((error) => {
                    this.common.closeLoading();
                    console.log(error.message);
                    this.showAlert('E-mail ou senha inválidos!');
                });
        } else {
            this.common.closeLoading();
            this.showAlert('Dados inválidos!');
        }
    }

    private publishEvent() {
        this.db
            .object('/users/' + this.af.auth.currentUser.uid)
            .valueChanges()
            .subscribe((userInfo: any) => {
                //console.log(userInfo);
                if (userInfo != null) {
                    this.events.publish('imageUrl', userInfo);
                }
            });
    }

    getAddressUser(uid) {
        this.db
            .list('/users/' + uid + '/address')
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => ({
                        $key: c.payload.key,
                        ...(c.payload.val() as {}),
                    }))
                )
            )
            .subscribe((res: any) => {
                //console.log(res.length);
                //console.log(res);
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i = i + 1) {
                        if (res[i].status > 0) {
                            localStorage.setItem('keyAddress', res[i].$key);
                            //console.log(res[i].$key);
                        } else {
                            this.novoArray.push((res[i], i));
                        }
                    }

                    //console.log(res.length);
                    //console.log(this.novoArray.length);

                    if (this.novoArray.length == res.length) {
                        //corrige o problema do usuario nao ter escolhido um endereco como principal
                        this.db
                            .list(
                                '/users/' +
                                    localStorage.getItem('uid') +
                                    '/address'
                            )
                            .update(res[0].$key, {
                                status: 1,
                            })
                            .then(() => {
                                localStorage.setItem('keyAddress', res[0].$key);
                                console.log('atualizado com sucesso!');
                            });
                    }
                }
            });
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            //title: '',
            subTitle: message,
            buttons: ['OK'],
        });
        alert.present();
    }

    Register() {
        this.navCtrl.setRoot('RegistrationPage');
    }

    onClickForgotPassword() {
        this.navCtrl.setRoot('ForgotPasswordPage');
    }

    back() {
        //this.navCtrl.pop();
        this.navCtrl.setRoot('HomePage');
    }
}
