import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss'],
})
export class RideHistoryPage implements OnInit {
  @ViewChild('search') public searchElementRef: ElementRef;

key: string = 'my places';
coordinates = [];
private geoCoder;
zoom;
address: any;
latitude: number;
longitude: number;
email;
user: any;
  constructor(
     public service :AuthenticationService,
     public afAuth: AngularFireAuth,
     private firestore: AngularFirestore,
     private ngZone: NgZone,
     private mapsAPILoader: MapsAPILoader,
     public router: Router
     ) {
    this.service.getCoords().then((items:any)=>{
      console.log(items);
      this.coordinates = items;

    });



  }

rideHistory(address){
  this.afAuth.authState.subscribe((user) => {
    console.log('folder: user', user);

    if (user) {
      this.email = user.email;
      this.firestore
        //.collection('/ride-history/')
        .doc('/ride-history/' + this.email)
        .set({
          homeAddress: address
        });
        console.log(address);
    }
  });
  this.router.navigateByUrl('/setroute')
}



  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;

          // console.log('place lat: '+this.latitude)
          // console.log('place lng: '+this.longitude)

             //Open modal
          // this.openMyModal()
        });
      });
    });

  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'position': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

//   save(){
// this.storage.set(this.key, this.address)
//   }

// loadData(){
//   this.storage.get(this.key).then((val) => {
//     console.log('your home location is' , val)
//   })
// }

}
