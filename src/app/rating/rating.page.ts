import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  // userDoc: AngularFirestoreDocument<any>;
  // rideDoc: AngularFirestoreDocument<any>;

  // user: Observable<any>;
  // ride: Observable<any>;


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    // this.userDoc = this.afs.doc('user/test-user-3')
    // this.rideDoc = this.afs.doc('ride/ean-driver')

    // this.user = this.userDoc.valueChanges();
    // this.ride = this.rideDoc.valueChanges();
  }

  // get rideID(){
  //   return this.rideDoc.ref.id;
  // }

  // get userID(){
  //   return this.rideDoc.ref.id;
  // }

}
