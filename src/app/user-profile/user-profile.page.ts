import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
name:any;
surname
  constructor(
              public router: Router,
              private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  //   SignUp(email, password, name, surname){
  //   let id = this.firestore.createId();
  //   this.firestore.collection('users').doc(id).set({
  //   name: name,
  //   surname: surname,
  //   email: email,
  //   password:password,


  //   }).then(()=>{
  //   this.auth.SignUp(email, password, )
  //   this.presentAlert('Congradulations!!  Now Sign in with email and password')
  //   setTimeout(()=> this.showmessage = false, 3000);
  //   this.name = '';
  //   this.surname = '';
  //   this.email = '';
  //   this.Date = '';

  //   }).catch((error)=>{
  //     this.presentAlert(error.message)

  //   })
  // }

}
