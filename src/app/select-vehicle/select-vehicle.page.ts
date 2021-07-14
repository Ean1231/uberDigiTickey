import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.page.html',
  styleUrls: ['./select-vehicle.page.scss'],
})
export class SelectVehiclePage implements OnInit {
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

}
