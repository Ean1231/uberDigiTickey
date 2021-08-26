import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service"
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.page.html',
  styleUrls: ['./driver-register.page.scss'],
})
export class DriverRegisterPage implements OnInit {
  showmessage
  name
  surname
  email
  confirmPassword
  Date
  password
  path: string;
  IDimg
  phoneNumber;

  constructor(public router: Router,
    public auth:AuthenticationService,
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public modalCtrl: ModalController,) { }

  ngOnInit() {
  }

z
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


  async dismiss() {
    return await this.modalCtrl.dismiss();
  }
  btnBack(){
    //this.router.navigate("./home");
  }

  upload($event) {
    this.path = $event.target.files[0];
  }

  getImage(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.IDimg = reader.result;


      };


      // ChangeDetectorRef since file is loading outside the zone

    }
  }

}
