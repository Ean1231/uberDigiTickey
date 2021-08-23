import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  constructor(public http: HttpClient) { }

  createCheckout(payinfo) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer OGFjZGE0Y2E2YTljMTY4ZTAxNmFiMDU3NjE0NTRmZmZ8NmtSTnc1SG5CcA==',
      })
    };

    const res = this.http.post('https://digiticketsa.herokuapp.com/https://oppwa.com/v1/checkouts', payinfo,options);
    return res;
  }

  checkoutId(id) {
    const options = {
      headers: new HttpHeaders({
        // 'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer OGFjZGE0Y2E2YTljMTY4ZTAxNmFiMDU3NjE0NTRmZmZ8NmtSTnc1SG5CcA==',
      })
    };
    const res = this.http.get('https://digiticketsa.herokuapp.com/https://oppwa.com/v1/paymentWidgets.js?checkoutId=' + id, options);
    return res;
  }


  checkoutForm(checkoutid, id) {
    const options = {
      body: JSON.stringify({'entityId':''+id}),
      headers: new HttpHeaders({
        // 'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer OGFjZGE0Y2E2YTljMTY4ZTAxNmFiMDU3NjE0NTRmZmZ8NmtSTnc1SG5CcA==',
      })
    };
    const res = this.http.get('https://digiticketsa.herokuapp.com/https://oppwa.com/v1/checkouts/' + checkoutid + '/payment?entityId=' + id, options);
    return res;
  }
}
