import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Plugins } from '@capacitor/core';
import { MapsAPILoader } from '@agm/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router'

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

  markers:any =[];
  infoWindows:any=[];


  constructor(public service: AuthenticationService,private activatedRoute: ActivatedRoute, public router: Router) {
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

   });
   }

  ngOnInit() {
    // this.getDirection()
    

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
