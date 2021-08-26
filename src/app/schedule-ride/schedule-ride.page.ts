import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentOptionPage } from '../payment-option/payment-option.page';
import { NearbyDriversPage } from '../nearby-drivers/nearby-drivers.page';

@Component({
  selector: 'app-schedule-ride',
  templateUrl: './schedule-ride.page.html',
  styleUrls: ['./schedule-ride.page.scss'],
})
export class ScheduleRidePage implements OnInit {
  driver: any;
  showdata: any;
  email;

  data ;
  constructor( private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public service: AuthenticationService,
    public router: Router,
    public modalCtrl: ModalController,
    )
    {

     }

  ngOnInit() {
console.log(this.data)


  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async openMyModal() {
    const myModal = await this.modalCtrl.create({
      component: PaymentOptionPage,
      cssClass: 'payment-option-modal',
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
    });
    return await myModal.present();
  }

   async openModal() {
    const myModal = await this.modalCtrl.create({
      component: NearbyDriversPage,
      cssClass: 'nearby-drivers-modal',
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
    });
    return await myModal.present();
  }



}
