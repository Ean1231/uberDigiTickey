import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute, NavigationExtras} from '@angular/router';
import * as queryString from 'querystring';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; //We use the InAppBrowser to open a webpage inside the app.
import { CheckoutServiceService } from '../checkout-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
