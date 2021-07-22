import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { auth } from 'firebase/app';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  phoneNumber: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  userState: any;

  confirmationResult: firebase.auth.ConfirmationResult;
  currentUser: any;
  userLoggedIn: boolean;

  coords = [];
  items: Observable<any[]>
  constructor(private router: Router, public auth :AngularFireAuth, public firestore: AngularFirestore) {
    this.userLoggedIn = false;

    this.auth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
        if (user) {
            this.userLoggedIn = true;
        } else {
            this.userLoggedIn = false;
        }
    });
  }


  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return new Promise<any>((resolve, reject) => {

      this.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }

  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }



  LoginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Auth Service: loginUser: success');
            // this.router.navigate(['/dashboard']);
        })
        .catch(error => {
            console.log('Auth Service: login error...');
            console.log('error code', error.code);
            console.log('error', error);
            if (error.code)
                return { isValid: false, message: error.message };
        });
}



  SignUp(email, password){

    return new Promise((resolve, reject)=>{
      this.auth.createUserWithEmailAndPassword(email, password).then(()=>{

        resolve('Success')

      }).catch((err)=>{
        reject(err)

      })
    })

  }

  forgotPassword(email)
  {

    return new Promise((resolve , reject)=>{
      this.auth.sendPasswordResetEmail(email).then(()=>{
        resolve("Success")


      }).catch((err)=>{
        reject(err)
      })

    })


  }


  getCoords(){

    return new Promise((res, rej)=>{
      this.firestore.collection('userConfirmsRequest').valueChanges().subscribe((items: any) => {
        this.coords = items;
        console.log(items);
        res(this.coords) ;
        });

    });

  }
  // getCoords(){

  //   return new Promise((res, rej)=>{
  //     this.firestore.collection('userConfirmsRequest').valueChanges().subscribe((items: any) => {
  //       this.coords = items;
  //       console.log(items);
  //       res(this.coords) ;
  //       });

  //   });

  // }



  async SendVerificationMail() {
    return await(await this.auth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['terms']);
    })
  }






  // registerUser(value) {
  //   return new Promise<any>((resolve, reject) => {

  //     this.auth.createUserWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => resolve(res),
  //         err => reject(err))
  //   })

  // }
  // registerUser(value) {
  //   return new Promise<any>((resolve, reject) => {

  //     this.auth.createUserWithEmailAndPassword(value.email, value.password)
  //       .then(() =>{
  //         // res => resolve(res),
  //         this.SendVerificationMail();

  //       }).catch((error) => {
  //         window.alert(error.message)
  //       })


  //         // err => reject(err))
  //   })
  // }

    // Returns true when user is looged in and email is verified




    registerUser(value) {
    return this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }


  userDetails() {
    return this.auth.user
  }



  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.auth.currentUser) {
        this.auth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/Drivers').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }


  signupUser(user: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
            let emailLower = user.email.toLowerCase();

            this.firestore.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
                .set({
                   // accountType: 'endUser',
                    displayName: user.displayName,
                    displayName_lower: user.displayName.toLowerCase(),
                    email: user.email,
                    email_lower: emailLower,
                    PhoneNumber: user.phoneNumber
                });

                result.user.sendEmailVerification();                    // immediately send the user a verification email
        })
        .catch(error => {
            console.log('Auth Service: signup error', error);
            if (error.code)
                return { isValid: false, message: error.message };
        });
}

signupUseR(value: any): Promise<any> {
  return this.auth.createUserWithEmailAndPassword(value.email, '********')
      .then((result) => {
          let emailLower = value.email.toLowerCase();

          this.firestore.doc('/EmailVerify/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
              .set({

                  email: value.email,


              });

              result.user.sendEmailVerification();                    // immediately send the user a verification email
      })
      .catch(error => {
          console.log('Auth Service: signup error', error);
          if (error.code)
              return { isValid: false, message: error.message };
      });
}


async resendVerificationEmail() {                         // verification email is sent in the Sign Up function, but if you need to resend, call this function
  return (await this.auth.currentUser).sendEmailVerification()
      .then(() => {
  // this.router.navigate(['login']);
      })
      .catch(error => {
          console.log('Auth Service: sendVerificationEmail error...');
          console.log('error code', error.code);
          console.log('error', error);
          if (error.code)
              return error;
      });
}

getCurrentUser() {
  return this.auth.currentUser;                                 // returns user object for logged-in users, otherwise returns null
}

get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null && user.emailVerified !== false) ? true : false;
}


 //For rating system

  // Star reviews that belong to a user
// getUserStars(userId){
//   const starsRef = this.firestore.collection('stars', ref => ref.where('userId', '==', userId));
//   return starsRef.valueChanges();
// }
// //get all stars that belong to a ride
// getRideStars(rideId) {
// const starsRef = this.firestore.collection('stars', ref => ref.where('rideId', '==', rideId));
// return starsRef.valueChanges();
// }
//Create or update star
// setStar(userId, rideId, value){
//   //star document data
//   const star: Star = {userId, rideId, value};

//   //custom doc ID for relationship
//   const starPath = 'stars/${star.userId}_${star.rideId}';

//   //ste the data, return the promise
//   return this.firestore.doc(starPath).set(star)


// }

  // get windowRef() {
  //   return window;
  // }




}
