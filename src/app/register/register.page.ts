import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service"
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isProgressVisible: boolean;

  signupForm: FormGroup;
  firebaseErrorMessage: string;
image:any;
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  // showmessage
  // name
  // surname
  // email
  // confirmPassword
  // Date
  // password
  constructor(public router: Router,
              public auth:AuthenticationService,
              private firestore: AngularFirestore,
              public alertController: AlertController,
              public modalCtrl: ModalController,
              private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder
  ) {
    this.firebaseErrorMessage = '';

  }

  ngOnInit() {

    //  if (this.authService.userLoggedIn) { // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
   // this.router.navigate(['/folder']);
  // console.log('user logged in')
  //  }

  this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required)

  });
}


signup() {
  if (this.signupForm.invalid)  // if there's an error in the form, don't submit it
      return;
      this.isProgressVisible = true;
  this.authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null)    // null is success, false means there was an error
          this.router.navigate(['/folder']);
      else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;

      this.isProgressVisible = false; // no matter what, when the auth service returns, we hide the progress indicator
  }).catch((err) => {
    console.log(err)
      this.isProgressVisible = false;
  });
}

getImage(event) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.image = reader.result;


    };


    // ChangeDetectorRef since file is loading outside the zone

  }
}


async presentAlert(message) {
  const alert = await this.alertController.create({
    header: 'Attention User',
    message:message,
    buttons: [{
      text:'OK',
      handler: () => {
        this.router.navigateByUrl('/login')
      //  this.dismiss()
      }

    }]
  });

  await alert.present();

}
    // this.validations_form = this.formBuilder.group({
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])),
    // });
  }

  // tryRegister(value) {
  //   this.authService.registerUser(value)
  //     .then(res => {
  //       console.log(res);
  //       this.errorMessage = "";
  //       this.successMessage = "Your account has been created. Please log in.";
  //     }, err => {
  //       console.log(err);
  //       this.errorMessage = err.message;
  //       this.successMessage = "";
  //     })
  // }
  // goLoginPage() {
  //   this.navCtrl.navigateBack('');
  // }

  // SignUp(email, password, name, surname){
  //   let id = this.firestore.createId();
  //   this.firestore.collection('users').doc(id).set({
  //   name: name,
  //   surname: surname,
  //   email: email,
  //   password:password,


  //   }).then(()=>{
  //   this.auth.SignUp(email, password, )
  //   this.presentAlert('Congradulations!!  Now Sign in with email and password')
  //   setTimeout(()=> this.showmessage = false, 3000);
  //   this.name = '';
  //   this.surname = '';
  //   this.email = '';
  //   this.Date = '';

  //   }).catch((error)=>{
  //     this.presentAlert(error.message)

  //   })
  // }

  // async presentAlert(message) {
  //   const alert = await this.alertController.create({
  //     header: 'Attention User',
  //     message:message,
  //     buttons: [{
  //       text:'OK',
  //       handler: () => {
  //         this.router.navigateByUrl('/folder')
  //       //  this.dismiss()
  //       }

  //     }]
  //   });

  //   await alert.present();

  // }


  // async dismiss() {
  //   return await this.modalCtrl.dismiss();
  // }



