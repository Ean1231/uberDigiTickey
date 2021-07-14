import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  firebaseErrorMessage: string;

  constructor  (private router: Router,
                private afAuth: AngularFireAuth,
                public alertController: AlertController,) {}


                canActivate(
                  next: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                  return new Promise((resolve, reject) => {
                      this.afAuth.authState.subscribe(user => {
                          if (user) {
                              if (user.emailVerified) {
                                  resolve(false);

                        this.router.navigateByUrl('/register');
                              } else {
                                  resolve(false);
                              }
                          } else {
                              resolve(false);
                              this.router.navigate(['/register']);
                          }
                      })

                  })
              }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Attention User',
      message:message,
      buttons: [{
        text:'OK',
        handler: () => {
          this.router.navigateByUrl('/login')
        //  this.dismiss()
        }

      }]
    });

    await alert.present();

  }


}
