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

  SignUp(email, password, name, surname,phoneNumber){
    let id = this.firestore.createId();
    this.firestore.collection('Drivers').doc(id).set({
    name: name,
    surname: surname,
    email: email,
    password:password,
    phoneNumber: phoneNumber
    // IDimg: IDimg


    }).then(()=>{
    this.auth.SignUp(email, password, )
    this.presentAlert('You have been registered...')
    setTimeout(()=> this.showmessage = false, 3000);
    this.name = '';
    this.surname = '';
    this.email = '';
    this.Date = '';
    this.phoneNumber = '';
    // this.IDimg = '';

    }).catch((error)=>{
      this.presentAlert(error.message)

    })
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
