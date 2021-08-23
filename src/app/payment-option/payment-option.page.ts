import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NearbyDriversPage } from '../nearby-drivers/nearby-drivers.page';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.page.html',
  styleUrls: ['./payment-option.page.scss'],
})
export class PaymentOptionPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
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
