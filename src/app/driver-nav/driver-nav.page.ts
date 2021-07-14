import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'
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
  constructor(public service: AuthenticationService,private activatedRoute: ActivatedRoute, public router: Router) {
    this.service.getCoords().then((items: any)=>{
      // console.log(items);
        this.data = items;
   });
   }

  ngOnInit() {
  }
  getDirection() {
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination = { lat: this.lat1, lng: this.long1};

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

}
