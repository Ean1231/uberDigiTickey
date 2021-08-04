import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.page.html',
  styleUrls: ['./show-profile.page.scss'],
})
export class ShowProfilePage implements OnInit {

  user: Observable<any>;
  

  constructor(private firestore: AngularFirestore,
             public afAuth: AngularFireAuth,
             public authService: AuthenticationService,
    ) {
      this.user = null;
     }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('folder: user', user);

      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
      }
  });

}
}
