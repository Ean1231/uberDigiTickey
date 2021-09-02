import { AbstractType, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ScheduleRidePage } from '../schedule-ride/schedule-ride.page';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
@Component({
  selector: 'app-nearby-drivers',
  templateUrl: './nearby-drivers.page.html',
  styleUrls: ['./nearby-drivers.page.scss'],
})
export class NearbyDriversPage implements OnInit {
  driver: Observable<any>;
driverPosition = [];
index: any;
isProgressVisible: boolean;
data: any;
latitude: number;
longitude: number;
lat: number;
long: number;
NewDriver = [];
Drivers = []
  constructor(private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public service: AuthenticationService,
    public modalCtrl: ModalController,
    public router: Router
    ) { //-28.765656075931194, 24.764983497661156
    //this.distance('-28.71565072823341', '24.734659626412974', "-28.765656075931194", "24.764983497661156")
this.setCurrentLocation();
this.driver = null;
this.getDriverStatus();

this.isProgressVisible = true;
this.afAuth.authState.subscribe(driver => {
  console.log('folder: usern', driver);

  if (driver) {

      const emailLower = driver.email.toLowerCase();
      this.driver = this.firestore.collection('regDrivers').doc(emailLower).valueChanges();
  }
});



setTimeout(() => {
  this.service.getDrivers().then((items:any)=>{
    console.log(items);
    this.driverPosition = items;

    setTimeout(() => {

for (let index = 0; index < this.driverPosition.length; index++) {
// console.log( "im inside")
this.distance(
  // '-28.71565072823341',
  // '24.734659626412974',
  this.latitude,
  this.longitude,
  this.driverPosition[index].lat,
  this.driverPosition[index].long

).then((distance: any) => {

  console.log(this.driverPosition[index].lat);
  console.log(this.driverPosition[index].long);
  if (distance <= 5000) {
    if(this.driverPosition[index].status){
      this.NewDriver.push(this.driverPosition[index]);
    }
    this.isProgressVisible = false;
    console.log( "im inside")
  }
});
}
}, 3000);
 });
}, 5000);


  }


  ngOnInit() {
    // this.data = this.router.getCurrentNavigation().extras.state;
    // console.log(this.data)z
  }



  async dismiss() {
  await this.modalCtrl.dismiss();
}


  distance(latitude, longitude, lat, long) {
    return new Promise((resolve, reject) => {
      var R = 6371; // Radius of the earth in km
      var dLat = ((lat - latitude) * Math.PI) / 180;
      var dLon = ((long - longitude) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((latitude * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

      console.log(d.toFixed(2));
      resolve(d);
    });
    }


    setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
       // this.zoom = 8;
       // this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  getDriverStatus() {
    return new Promise((res, rej) => {
      this.afAuth.authState.subscribe((driver) => {
        console.log('folder: user', driver);
        if (driver) {

          this.firestore
            .collection('driverStatus/')

            .valueChanges()
            .subscribe((items: any) => {
              console.log(items)
              res(items);
            });
        }
      });
    });
  }


  async openMyModal(data) {
    const myModal = await this.modalCtrl.create({
      component: ScheduleRidePage,
      cssClass: 'nearby-drivers-modal',
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        data: data
      }

    });


    return await myModal.present();

  }

  // details(data){
  //   console.log(data)
  //   this.router.navigateByUrl('/schedule-ride', {state:data});
  // }

}
