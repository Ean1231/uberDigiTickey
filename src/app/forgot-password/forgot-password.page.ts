import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private auth:  AuthenticationService ,  public load: LoadingController ) { }

  ngOnInit() {
  }

  message
  forgotPassword(email){
      this.auth.forgotPassword(email).then(()=>{
      this.message = true
      setTimeout(()=> this.message = false, 3000);
      //console.log("Check your email , to  confirm")
    })

  }

}
