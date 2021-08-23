import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import * as queryString from 'querystring';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; //We use the InAppBrowser to open a webpage inside the app.
import { CheckoutServiceService } from '../checkout-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
	summary:string='';
	checkoutId:any;
	TransID:any =0
	event:any;

	totalPrice:any; //It's used in all categories

	customerName:any;
	customerSurname:any;

 result: Observable<any>;
  constructor(public http: HttpClient, private iab: InAppBrowser,
    public operationsProvider: CheckoutServiceService,) { }

  ngOnInit() {

this.customerName ="Hello";
this.customerSurname="World";
this.TransID = Math.floor(Math.random() * 90000) +''+555;
this.totalPrice = 50; //This will be the final price

this.credit(this.totalPrice);
  }


  async credit(price) {

    const body = new URLSearchParams();
    body.set('entityId', '8acda4cb6a9bdd5c016ab05886af46f2');
    body.set('amount', '1.00');
    body.set('descriptor', 'Test');
    body.set('currency', 'ZAR');
    body.set('paymentType', 'DB');
    body.set('recurringType', 'INITIAL');
    body.set('descriptor', 'Voucher');
    body.set('merchant.name', 'Digi');
    body.set('merchant.country', 'South Africa');

    const payment = queryString.stringify({
      'entityId': '8acda4cb6a9bdd5c016ab05886af46f2',
      'amount': price.toString(),
      'currency': 'ZAR',
      'paymentType': 'DB',
      'merchantTransactionId': this.TransID,
      'customer.givenName': ''+this.customerName,
      'customer.surname': ''+this.customerSurname
    });

    // console.log(payment);

    this.operationsProvider.createCheckout(payment).subscribe(async (dat: any) => {

      const browser = this.iab.create('https://digiticket.co.za/payments/copynpay.html?checkoutId=' + dat.id, '_blank', 'location=no');
      browser.show();
      browser.on('loadstart').subscribe(event => {

          if (event.url.indexOf('some error url') > -1) {

          }
        },err => {


      });

      browser.on('loadstop').subscribe(async event => {

        this.event = event.url;

          if (event.url === 'https://digiticket.co.za/payments/success.html') {

            browser.close();
            this.operationsProvider.checkoutForm(dat.id, '8acda4cb6a9bdd5c016ab05886af46f2').subscribe(async (paymentInfo: any) => {

              const navigationExtras: NavigationExtras = {
                queryParams: {
                  payInfo: JSON.stringify(paymentInfo),
                }
              };
              console.log(JSON.stringify(paymentInfo)); //Let us display the result before going to next page.

              //this.router.navigate(['successpage'],navigationExtras);

            }, async error => {

              alert('Transaction unsuccessful');

            });
          } else {


          }
        },  err => {
          alert('load error'+err)

      });

    }, (error) => {

      alert('Error opening/creating the payment form.');

    });

  }


}
