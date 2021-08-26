import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { SelectRidePage } from '../select-ride/select-ride.page';
import { AngularFirestore} from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

import { MessagingService } from '../messaging-notification.service';
import { NearbyDriversPage } from '../nearby-drivers/nearby-drivers.page';
import { AngularFireAuth } from '@angular/fire/auth';

const { Geolocation } = Plugins;


declare var google:any;

@Component({
  selector: 'app-setroute',
  templateUrl: './setroute.page.html',
  styleUrls: ['./setroute.page.scss'],
})
export class SetroutePage implements OnInit {


  title = 'push-notification';
  message;


  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('search1') public search1ElementRef: ElementRef;
  @ViewChild("map", { static: false }) mapElement: ElementRef;
place1: any;
  map:any;
  location:any;
  latitude: number;
  longitude: number;
  latitude1: number;
  longitude1: number;
  lat1: number;
  long1: number;
  kiloMeter:any;
  duration:any;
  zoom;
  address: string;
  lat: Number ;
  lng: Number ;
user: any;
  dir = undefined;
  loca;
  destination;
email;
name;
phoneNumber;
  private geoCoder;
  homeAddress;
  price :any

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  service = new google.maps.DistanceMatrixService();


  constructor( public firestore: AngularFirestore,
    public modalController: ModalController,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    public elref: ElementRef,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public router: Router,
    private messagingService: MessagingService,
    public afAuth: AngularFireAuth,

    )
     {
      this.user = null;



        setTimeout(() => {
      this.afAuth.authState.subscribe((user) => {
        console.log('folder: user', user);

        if (user) {
          this.email = user.email;
          this.firestore
            .collection('ride-history/')
            .doc(this.email)
            .valueChanges()
            .subscribe((items: any) => {
              console.log(items);
              this.user = items;
              this.homeAddress = this.user.homeAddress;


            });
            console.log(this.homeAddress)
        }
      });
    }, 5000);

    setTimeout(() => {
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
    }, 5000);
     }




     ngOnInit() {

      this.mapsAPILoader.load().then(() => {
        this.locate() ;

       // this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;

    });
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }


ionViewWillEnter(){}

  ionViewDidEnter() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          console.log('place lat: '+this.latitude)
          console.log('place lng: '+this.longitude)

             //Open modal
          // this.openMyModal()
        });
      });
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete1 = new google.maps.places.Autocomplete(this.search1ElementRef.nativeElement);
      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng();
          this.zoom = 12;
          console.log('place 1 lat: '+this.latitude1)
          console.log('place 1 lng: '+this.longitude1)

//this.updateUserLocation()
  //  this.getDirection();
    this.test();
    this.loca = new google.maps.LatLng(
      this.latitude,
     this.longitude
    ),

    this.destination = new google.maps.LatLng(
      this.latitude1,
     this.longitude1
    ),
    this.calculateAndDisplayRoute(
      this.directionsService,
      this.directionsDisplay,
      this.loca,
      this.destination
    );
             //Open modal
         // this.openMyModal()
        });
      });
    });
    // this.loadMap();


   }
      //Watch position method
    updateUserLocation() {
    navigator.geolocation.watchPosition(async (position) => {
    this.latitude =  position.coords.latitude;
     this.longitude =  position.coords.longitude;
    this.test();

    })
  }

   public getDirection() {
     this.dir = {
       origin: { lat: this.latitude, lng: this.longitude },
       destination: { lat: this.latitude1, lng: this.longitude1}
}
   }

  //Storing coordinates to firebase and calling calculate method and watchposition

   request() {


      let id = this.firestore.createId();
      this.firestore
        // .collection('userConfirmsRequest')
        .doc('/userConfirmsRequest/' + this.email)
        .set({                                // before (gets current position)
          name: this.name,
          phoneNumber: this.phoneNumber,
          email: this.email,
          latitude: this.latitude, //latitude: position.coords.latitude,  latitude: this.latitude
          longitude: this.longitude,//longitude: position.coords.longitude,  longitude: this.longitude
          lat1: this.latitude1,
          long1: this.longitude1

        })

        .catch((error) => {
          console.log(error);
        });

this.updateUserLocation();
//this. router. navigate ( [ '/terms' ])

 this.router.navigateByUrl('/terms')


}

async dismiss() {
  await this.modalCtrl.dismiss();
}



    //Calculating Distance and Time
   test(){
    var origin = new google.maps.LatLng(
      this.latitude,
     this.longitude
    );
 var destination = new google.maps.LatLng(
      this.latitude1,
      this.longitude1
    );
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
      },

      ((response:any ,status:any)=>{
        if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      console.log(this.kiloMeter);
      console.log(this.duration);

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        console.log(this.kiloMeter);
        console.log(this.duration);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          this.kiloMeter = element.distance.text;
          this.duration = element.duration.text;
        }
      }}
      })
    );

    this.price = parseFloat(this.kiloMeter) * 6 + 10;
    console.log('Total Price : R ' + this.price)
   }






//Current Location and reverse geocoding for displaying address in pickup textfield
  public locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude; // Works fine
          this.longitude = position.coords.longitude;  // Works fine

          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(this.latitude, this.longitude);
          let request = {
            latLng: latlng
          };

          geocoder.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK ) {
              if (results[0] != null) {
                this.ngZone.run(()=>{
                  this.address = results[0].formatted_address;
                })
                console.log(this.address);
              } else {
                alert("No address available");
              }
            }
          });
        },
        error => {
          console.log("Error code: " + error.code + "<br /> Error message: " + error.message);
        }
      );
    }
  }



// Address auto complete for pickup address
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

 // Address auto complete for Drop off address
  getAddress1(latitude1, longitude1) {
    this.geoCoder.geocode({ 'position': { lat: latitude1, lng: longitude1 } }, (results, status) => {
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

 //Calculation of Route from point A to point B
    calculateAndDisplayRoute(
    directionsService: any,
    directionsDisplay: any,
    pointA: any,
    pointB: any
  ) {
    directionsService.route(
      {
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.WALKING,
      },
      function (response: any, status: any) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  async openMyModal() {
    const myModal = await this.modalController.create({
      component: NearbyDriversPage,
      cssClass: 'nearby-drivers-modal',
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
    });
    return await myModal.present();
  }

  gotoHome(){
    this.router.navigateByUrl('/ride-history')
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change home address?',

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/setroute')
          }
        }, {
            text: 'Yes',
            handler: () => {
            this.router.navigateByUrl('/ride-history')
          }
        }
      ]
    });

    await alert.present();
  }

  goBack(){
    this.router.navigateByUrl('/folder')
  }

}






