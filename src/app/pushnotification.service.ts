import { Injectable } from '@angular/core';
import { Plugins,PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor} from '@capacitor/core';
import { Router } from '@angular/router';
const { PushNotifications } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(public router: Router) { }

   initPush(){
    if (Capacitor.platform !== 'web'){
      this.registerPush();
    }
  }

  private registerPush(){
    PushNotifications.requestPermission().then((permission)=>{
      if (permission.granted){
        PushNotifications.register();
      }else {

      }
    });
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken)=>{
        console.log('My token: ' + JSON.stringify(token));
      }
    );
    PushNotifications.addListener('registrationError', (error:any)=>{
      console.log('Error:'+ JSON.stringify(error))
    })
      PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotification) => {
          console.log('push received: ' + JSON.stringify(notification));
        }
      );
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (notification: PushNotificationActionPerformed)=>{
          const data = notification.notification.data;
          console.log('Action performed: ' + JSON.stringify(notification.notification));
          if (data.detailsId) {
            this.router.navigateByUrl(`/terms/${data.detailsId}`);
          }
        }
      )

  }


}
