import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { AuthenticationService} from "../authentication.service"
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from "firebase/app";
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-driver-verify',
  templateUrl: './driver-verify.page.html',
  styleUrls: ['./driver-verify.page.scss'],
})
export class DriverVerifyPage implements OnInit {
  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any ;
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  isProgressVisible: boolean;

  signupForm: FormGroup;
  firebaseErrorMessage: string;

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';



  constructor( private afAuth: AngularFireAuthModule,
    private alertController: AlertController,
    public router: Router,
    private authserivces: AuthenticationService,
    public authService: AuthenticationService,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
  });
  }

  signup() {
    if (this.signupForm.invalid)  // if there's an error in the form, don't submit it
        return;
        this.isProgressVisible = true;
    this.authService.signupUseR(this.signupForm.value).then((result) => {
        if (result == null)    // null is success, false means there was an error
            this.router.navigate(['/privacy']);
        else if (result.isValid == false)
            this.firebaseErrorMessage = result.message;

        this.isProgressVisible = false; // no matter what, when the auth service returns, we hide the progress indicator
    }).catch((err) => {
      console.log(err)
        this.isProgressVisible = false;
    });
  }



}
