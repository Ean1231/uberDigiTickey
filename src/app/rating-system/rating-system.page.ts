import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
@Component({
  selector: 'app-rating-system',
  templateUrl: './rating-system.page.html',
  styleUrls: ['./rating-system.page.scss'],
})
export class RatingSystemPage implements OnInit {
currentRate = 0;
user: Observable<any>;
displayName;
ratedBy;
ratedTo: any;
rating: any;
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public router: Router) {
      this.user = null;
    }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log('folder: user', user);

      if (user) {
          let emailLower = user.email;
          this.firestore
          .collection('users/')
          .doc(emailLower)
          .valueChanges()
          .subscribe((items:any) => {
            console.log(items);
            this.rating = items;
            this.ratedBy = this.rating.displayName;
            // this.ratedTo = this.rating.name;
          })
      }
  });
  }

  submitRating(currentRate){
    let id = this.firestore.createId();
    this.firestore.
    collection('Rating')
    .doc(id)
    .set({
    currentRate: currentRate,
    ratedBy:this.ratedBy,
    // ratedTo:this.ratedTo


    }).then(()=>{
    //this.auth.SignUp(email, password, )
    this.presentAlert('Your response was sent successfull')
    //setTimeout(()=> this.showmessage = false, 3000);
    //this.currentRate = '';


     }).catch((error)=>{
  //     this.presentAlert(error.message)
      console.log(error)
    })
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Attention user',
      message:message,
      buttons: [{
        text:'OK',
        handler: () => {
         this.router.navigateByUrl('/terms')
        }

      }]
    });

    await alert.present();

  }

}
