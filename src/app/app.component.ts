import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { SocialSharing } from '@ionic-native/social-sharing';

//import { Keyboard } from '@ionic-native/keyboard';

@Component({
    templateUrl: 'app.html',
    selector: 'MyApp',
    providers: [StatusBar, SplashScreen, SocialSharing],
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    Cart: any = [];
    noOfItemsInCart: any;
    noOfItemsInFevrt: any;
    noOfItemsInNews: any;
    noOfItemsInOffer: any;
    name: any;
    imageUrl: any = 'assets/img/profile.jpg';

    //rootPage: string = "LoginPage";
    //rootPage: string = "WelcomePage";

    rootPage: string = 'HomePage';
    //rootPage: string = "GoogleMapsGeolocalizacaoPage";
    //rootPage: string = 'Exemplo2Page';

    //rootPage: string = "TestesPage";

    public uid: string;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,

        public af: AngularFireAuth,
        public db: AngularFireDatabase,

        public socialSharing: SocialSharing,
        private events: Events
    ) //private Keyboard: Keyboard
    {
        platform.ready().then(() => {
            /*Keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
        console.log("Show");
      });
      Keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
        console.log("Hidden");
      });*/

            // Ok, então a plataforma está pronta e nossos plugins estão disponíveis.
            // Aqui você pode fazer qualquer coisa nativa de nível superior que possa precisar.
            statusBar.overlaysWebView(false);
            statusBar.styleDefault();
            //splashScreen.hide();
        });
        setTimeout(() => {
            this.splashScreen.hide();
        }, 1000);
        this.initializeApp();
    }

    ngOnInit() {
        this.uid = localStorage.getItem('uid');
        if (this.uid != null) {
            this.db
                .object('/users/' + this.uid)
                .valueChanges()
                .subscribe((res: any) => {
                    if (res != null) {
                        this.name = res.name;
                        this.imageUrl =
                            res.image != '' && res.image != null
                                ? res.image
                                : 'assets/img/profile.jpg';
                    } else {
                        this.name = 'USER';
                        this.imageUrl = 'assets/img/profile.jpg';
                    }
                });
        }
        //this.getNewsCount();
        //this.getOfferCount();
        //this.listenEvents();
    }

    // private getNewsCount() {
    //   this.db
    //     .list("/news")
    //     .valueChanges()
    //     .subscribe(res => {
    //       this.noOfItemsInNews = res.length;
    //     });
    // }

    // private getOfferCount() {
    //   this.db
    //     .list("/menuItems", ref => ref.orderByChild("offer").equalTo(true))
    //     .valueChanges()
    //     .subscribe(queriedItems => {
    //       this.noOfItemsInOffer = queriedItems.length;
    //     });
    // }

    // private listenEvents() {
    //   this.events.subscribe("imageUrl", response => {
    //     this.imageUrl =
    //       response.image != "" && response.image != null
    //         ? response.image
    //         : "assets/img/profile.jpg";
    //     this.name = response.name;
    //   });
    // }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
        /*usar no futuro
    if (this.platform.ready()) {
      this.platform.ready().then(res => {
        if (res == "cordova") {
          
        }
      });
    }
    */
    }

    home() {
        this.nav.setRoot('HomePage');
    }

    yourOrders() {
        this.nav.setRoot('OrderListPage');
    }

    ordersSchedule() {
        this.nav.setRoot('OrdersSchedulePage');
    }

    addToCart() {
        //this.nav.setRoot("CartPage");
        this.nav.push('CartPage');
    }

    catagory() {
        this.nav.setRoot('CategoryPage');
    }

    favourite() {
        this.nav.setRoot('FavouritePage');
    }

    offer() {
        this.nav.setRoot('OfferPage');
    }

    news() {
        this.nav.setRoot('NewsPage');
    }

    contact() {
        this.nav.setRoot('ContactPage');
    }

    aboutUs() {
        this.nav.setRoot('AboutUsPage');
    }

    settings() {
        this.nav.setRoot('Settings');
    }

    meusEnderecos() {
        this.nav.setRoot('MeusEnderecosPage');
    }

    invite() {
        this.socialSharing.share(
            'share Restaurant App with friends to get credits',
            null,
            null,
            'https://ionicfirebaseapp.com/#/'
        );
    }

    chat() {
        this.nav.setRoot('ChatPage');
    }
    tableBooking() {
        this.nav.setRoot('TableBookingPage');
    }
    bookingHistory() {
        this.nav.setRoot('BookingHistoryPage');
    }

    login() {
        this.nav.setRoot('LoginPage');
    }

    logout() {
        this.af.auth.signOut();
        //localStorage.clear();
        localStorage.removeItem('uid');
        localStorage.removeItem('email');

        localStorage.removeItem('playerId');

        localStorage.removeItem('cep');
        localStorage.removeItem('frete');

        localStorage.removeItem('keyAddress');
        localStorage.removeItem('key');

        this.imageUrl = 'assets/img/profile.jpg';
        this.nav.setRoot('HomePage');
    }

    isLoggedin() {
        return localStorage.getItem('uid') != null;
    }

    isCart() {
        this.Cart = JSON.parse(localStorage.getItem('Cart'));
        this.noOfItemsInCart = this.Cart != null ? this.Cart.length : null;
        return true;
    }
}
