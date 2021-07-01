import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

import { CallNumber } from "@ionic-native/call-number";
import { EmailComposer } from "@ionic-native/email-composer";
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: "page-about-us",
  templateUrl: "about-us.html",
  providers: [CallNumber, EmailComposer]
})
export class AboutUsPage {
  
  contactNo: any = 6232078238;//7376421282

  constructor(
    public callNumber: CallNumber,
    public emailComposer: EmailComposer,
    private socialSharing: SocialSharing
  ) {}

  callUs() {
    this.callNumber.callNumber(this.contactNo, true).then(() => {}).catch(() => {});
  }

  whatsappUs(){
    this.socialSharing.shareViaWhatsAppToReceiver('5562993495445', 'Olá!').then((result)=>{
      ///console.log(result);
      //alert(result);
    }).catch((error) => {
      //console.log(error);
      console.log(JSON.stringify(error));
    });
  }

  contact() {
    let email = {
      // You can change This Email to your own Email to receive contact Email.
      to: "superhorti@hotmail.com",
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
