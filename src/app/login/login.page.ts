import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any;
password ;
validations_form: FormGroup;
errorMessage: string = '';

isProgressVisible: boolean;


  constructor(private auth: AuthenticationService, public router: Router,public alertController: AlertController, private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
     //this.router.navigate(['/folder']);
  }

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value) {
   this.isProgressVisible = true;
    this.authService.loginUser(value)

      .then(res => {
        this.isProgressVisible = false;
      //  console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/folder');
      }, err => {
        this.isProgressVisible = false;
        this.errorMessage = err.message;
      })
  }

   goToStarsPage() {
    this.navCtrl.navigateForward('/stars-review');
  }
  goToPhoneVerification(){
    this.navCtrl.navigateForward('/verification');

  }

  // login(){
  //   this.auth.Login(this.email ,this.password).then(()=>{
  //       this.router.navigateByUrl('/folder')

  //   }).catch((error)=>{
  //     this.presentAlert(error.message);

  //    })
  // }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Attention User',
      message:message,
      buttons: ['OK']
    });

    await alert.present();

  }

}
