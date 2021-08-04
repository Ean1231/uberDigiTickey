import { AbstractType, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-nearby-drivers',
  templateUrl: './nearby-drivers.page.html',
  styleUrls: ['./nearby-drivers.page.scss'],
})
export class NearbyDriversPage implements OnInit {
  driver: Observable<any>;
driverPosition = [];
index: any;

latitude: any;
longitude: any;
NewDriver = [];
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public service: AuthenticationService) { //-28.765656075931194, 24.764983497661156
    //this.distance('-28.71565072823341', '24.734659626412974', "-28.765656075931194", "24.764983497661156")
this.setCurrentLocation();
this.driver = null;


  }


  ngOnInit() :void {
    this.afAuth.authState.subscribe(driver => {
      console.log('folder: usern', driver);

      if (driver) {
          const emailLower = driver.email.toLowerCase();
          this.driver = this.firestore.collection('regDrivers').doc(emailLower).valueChanges();
      }
    });


    this.service.getDrivers().then((items:any)=>{
      console.log(items);
      this.driverPosition = items;
    });



    setTimeout(() => {
      this.service.getDrivers().then((items:any)=>{
        console.log(items);
        this.driverPosition = items;

        setTimeout(() => {
  for (let index = 0; index <= this.driverPosition.length; index++) {
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
      if (distance <= 20) {
        this.NewDriver.push(this.driverPosition[index]);
        console.log( "im inside")
        console.log(this.NewDriver)
      }
    });
  }
 }, 3000);
     });
    }, 5000);




  }


  distance(lon1, lat1, lon2, lat2) {
    return new Promise((resolve, reject) => {
      var R = 6371; // Radius of the earth in km
      var dLat = ((lat2 - lat1) * Math.PI) / 180;
      var dLon = ((lon2 - lon1) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
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

}
