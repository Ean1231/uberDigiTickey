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

data: any;
  constructor(public router: Router,
    public auth:AuthenticationService,
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public modalCtrl: ModalController,) { }

  ngOnInit() {
    this.data =this.router.getCurrentNavigation().extras.state;
     console.log(this.data)
  }


}
