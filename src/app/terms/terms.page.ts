import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Plugins } from '@capacitor/core';
import { MapsAPILoader } from '@agm/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { SetroutePage } from '../setroute/setroute.page';

const { Geolocation } = Plugins;
declare var google:any; //new addition
@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  @ViewChild('map', {read:ElementRef, static: false }) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  map: any;
  public origin: any;
  public destination: any;
  latitude: any;
  longitude: number;
  data: any =[];
  accepted: boolean;
  lat1: number;
  long1: number;
  zoom: any;
  dir: any;
items:any;
  markers:any =[];
  infoWindows:any=[];
id:any;
email;
  constructor(public service: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private firestore: AngularFirestore,
    public toastController: ToastController,
    public alertController: AlertController,
    )
    {

      // navigator.geolocation.watchPosition(async (items) => {
      this.service.getCoords().then((items: any)=>{
        console.log(items);
        this.latitude = items[0].latitude; //pick up
        this.longitude = items[0].longitude; //pick up

        console.log(this.latitude)
        console.log(this.longitude)
        this.themap();

        this.directionsService.route({
          origin: ""+this.latitude+","+this.longitude,
          destination: ""+items[0].lat1+","+items[0].long1,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      })
  //  });

   }
   updateUserLocation() {
    navigator.geolocation.watchPosition(async (position) => {
    this.latitude =  position.coords.latitude;
     this.longitude =  position.coords.longitude;
    // this.test();

    })
  }

  ngOnInit() {
    // this.getDirection()
  }

  delete() {
    let id = this.firestore.createId();
   console.log(this.id);
    this.firestore.doc('/userConfirmsRequest/' + this.email).delete().then(()=>{
     this.presentToast("Request cancelled successfully")
     this.router.navigateByUrl('/folder')
    })
//userConfirmsRequest
}
async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

async presentToastWithOptions() {
  const toast = await this.toastController.create({
    header: 'Toast header',
    message: 'Click to Close',
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  await toast.present();

  const { role } = await toast.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}




  ionViewDidEnter(){

  }

  themap(){

    let coords = new google.maps.LatLng(this.latitude,this.longitude);
    let mapOption={
      center:coords,
      zoom:11,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOption)
    this.directionsDisplay.setMap(this.map);

  }

  // getDirection() {

  //   this.origin = { lat: this.latitude, lng: this.longitude };
  //   this.destination = { lat: this.lat1, lng: this.long1};

  //   // Location within a string
  //   // this.origin = 'Taipei Main Station';
  //   // this.destination = 'Taiwan Presidential Office';
  // }

   getDirection() {
      this.origin = { lat: this.longitude, lng: this.longitude };
    this.destination = { lat: this.lat1, lng: this.long1};

    console.log(this.origin, this.destination)
}

}
