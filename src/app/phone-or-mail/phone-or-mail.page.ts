import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import firebase from "firebase/app";

@Component({
  selector: 'app-phone-or-mail',
  templateUrl: './phone-or-mail.page.html',
  styleUrls: ['./phone-or-mail.page.scss'],
})
export class PhoneOrMailPage implements OnInit {

  constructor(public router: Router,public authService: AuthenticationService, private alertController: AlertController) { }
phoneNumber;
res: any;
otp: string = '';
Code: any;
CountryCode: any ;
recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.phoneNumber = res.phoneNumber;

      } else {
        // this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }


   enterOtp(res){
  this.authService.enterVerificationCode(res.otp).then(
    userData => {
     this.showSuccess();
      console.log(userData);
    }
  );
}

async showSuccess() {
  const alert = await this.alertController.create({
    header: 'Success',
    buttons: [
      {
        text: 'Ok',
        handler: (res) => {
          this.router.navigateByUrl('/register')
          alert.dismiss();
        }
      }
    ]
  });
  alert.present();
}


countryCodeChange($event) {
  this.CountryCode = $event.detail.value;
}
// Button event after the nmber is entered and button is clicked
signinWithPhoneNumber($event) {
  console.log('country', this.recaptchaVerifier);

  if (this.phoneNumber && this.CountryCode) {
    this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.phoneNumber).then(
      success => {
        //this.OtpVerification();
        this.router.navigateByUrl('/phone-or-mail');
      }
    );
  }
}


}
