import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-driver-nav',
  templateUrl: './driver-nav.page.html',
  styleUrls: ['./driver-nav.page.scss'],
})
export class DriverNavPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  public origin: any;
  public destination: any;
  latitude: number;
  longitude: number;
  data: any;
  accepted: boolean;
  lat1: number;
  long1: number;
  zoom: any;
  dir: any;
  totalPrice;
  name;
  email;
  phoneNumber;
  user: any;
  constructor(public service: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
     public storage: Storage,
     public firestore: AngularFirestore,
     public afAuth: AngularFireAuth,

     ) {

      this.storage.create();
      this.storage.get('FinalPrice').then(results=>{
        this.totalPrice = results; //This will be the final price

      });
   }

  ngOnInit() {


    this.afAuth.authState.subscribe((users) => {
      console.log('folder: user', users);
      if (users) {
        this.email = users.email;
        this.firestore
          .collection('users/')
          .doc(this.email)
          .valueChanges()
          .subscribe((items: any) => {
            console.log(items);
            this.user = items;
            this.name = this.user.displayName;
            this.phoneNumber = this.user.PhoneNumber;
            this.email = this.user.email;

              });
      }
    });

  }
  getDirection() {
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination = { lat: this.lat1, lng: this.long1};

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

}
