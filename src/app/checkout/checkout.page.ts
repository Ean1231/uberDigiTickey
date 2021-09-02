import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import * as queryString from 'querystring';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; //We use the InAppBrowser to open a webpage inside the app.
import { CheckoutServiceService } from '../checkout-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
 email;
 user: any;
 name: any
phoneNumber;
displayName;

  constructor(public http: HttpClient,
    private iab: InAppBrowser,
    public operationsProvider: CheckoutServiceService,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public alertController: AlertController,
    public router: Router,
    public storage: Storage
    )
    {
      this.user = null;


     }

  ngOnInit() :void {
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

            this.customerName = this.name;
            this.customerSurname = this.phoneNumber;
            this.TransID = Math.floor(Math.random() * 90000) +''+555;
            this.totalPrice = this.totalPrice; //This will be the final price

            this.credit(this.totalPrice);
            // console.log(this.customerName, "the name")

            this.storage.create();
            this.storage.get('FinalPrice').then(results=>{
              this.totalPrice = results; //This will be the final price
              this.credit(this.totalPrice);
            });
              });
      }
    });


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

     console.log(payment, "paymenttts");

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

              if(paymentInfo.result.description == 'Transaction succeeded'){
               this.presentAlertPrompt();
              }else{
                this.presentAlert();
              }
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

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Your transaction is complete',

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/checkout')
          }
        }, {
            text: 'Yes',
            handler: () => {
            this.router.navigateByUrl('/terms')
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Your transaction is not complete. Retry?',

      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/checkout')
          }
        // }, {
        //     text: 'Yes',
        //     handler: () => {
        //     this.router.navigateByUrl('/terms')
        //   }
         }
      ]
    });

    await alert.present();
  }


}
