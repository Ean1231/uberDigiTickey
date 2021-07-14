import { Component, OnInit  } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { AuthenticationService} from "../authentication.service"
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  CountryJson = environment.CountryJson;
  OTP: string = '';
  code: any;
  PhoneNumber: any;
  CountryCode: any ;
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  phoneNumber;
  // otp: string;
  // windowRef: any;

  constructor(private authserivces: AuthenticationService,
    private afAuth: AngularFireAuthModule,
    private alertController: AlertController,
    public router: Router) {
    // this.windowRef = this.authserivces.windowRef;
  }

  ngOnInit() {
    this.authserivces.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.phoneNumber = res.phoneNumber;

      } else {
        // this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
    // AngularFireModule.initializeApp(environment.firebaseConfig)
    // this.windowRef.recaptchaVerifier.render();
    // this.windowRef = this.authserivces.windowRef;
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

  }

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'visible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });


  }
  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNumber && this.CountryCode) {
      this.authserivces.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNumber).then(
        success => {
          this.OtpVerification();
          //zthis.router.navigateByUrl('/phone-or-mail');
        }
      );
    }
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
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP sent to'  + ' ' +this.CountryCode + this.PhoneNumber ,
      backdropDismiss: false,
      cssClass: 'buttoncss',
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authserivces.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);

            }
          );
        }
      },{
          text: 'Cancel',
        handler: (res) => {
          this.router.navigateByUrl('/verification')
        }

        }

      ]

    });
    await alert.present();
  }

}

