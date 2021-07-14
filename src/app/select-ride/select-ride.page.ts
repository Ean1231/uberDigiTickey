import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FolderPage } from '../folder/folder.page';
import { SetroutePage } from '../setroute/setroute.page';

@Component({
  selector: 'app-select-ride',
  templateUrl: './select-ride.page.html',
  styleUrls: ['./select-ride.page.scss'],
})
export class SelectRidePage implements OnInit {

  constructor( public modalCtrl: ModalController) { }

  ngOnInit() {
  }

// async openMyModal() {
//   const myModal = await this.modalCtrl.create({
//     component: SetroutePage,
//     cssClass: 'setroute-modal',
//     animated: true,
//     mode: 'ios',
//     backdropDismiss: false,
//   });
//   return await myModal.present();
// }

}
