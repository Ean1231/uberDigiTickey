import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetroutePage } from '../setroute/setroute.page';
import { Router } from '@angular/router'
 import { Geolocation } from '@ionic-native/geolocation/ngx';
 import { ModalController, NavController } from '@ionic/angular';
import { SelectRidePage } from '../select-ride/select-ride.page';
import { AuthenticationService } from '../authentication.service'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';

declare var google: any;


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {



  user: Observable<any>;
  @ViewChild("map", { static: false }) mapElement: ElementRef;

  img: any;
  userEmail: string;
  displayName: string;
  map: any;
  latitude: number;
  longitude: number;
  marker:any;
  coords:any;
  items: Array<any>;

  constructor (private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public elref: ElementRef,
    public router: Router,
    public geolocation: Geolocation,
    private navCtrl: NavController,
    public authService: AuthenticationService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private menu: MenuController) {
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
    // this.authService.getUsers()
    // .then(result => {
    //   this.items = result;
    // })



   //this.loadMap()
  //  this.authService.userDetails().subscribe(res => {
  //   console.log('res', res);
  //   if (res !== null) {
  //     this.userEmail = res.email;
  //     this.displayName = res.displayName;

  //   } else {
  //     this.navCtrl.navigateBack('');
  //   }
  // }, err => {
  //   console.log('err', err);
  // })
  }
  ionViewDidEnter() {
    this.loadMap();

  }


   loadMap() {




this.geolocation.getCurrentPosition().then(({coords})=>{
  const {latitude, longitude} = coords;

  let location = new google.maps.LatLng(latitude, longitude);
  let mapOptions = {
    center: location,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

  };
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  let marker: google.maps.Marker = new google.maps.Marker({
    map: this.map,
    position: location,
    animation:google.maps.Animation.BOUNCE,

  })


})








}
async openMyModal() {
  const myModal = await this.modalCtrl.create({
    component: SetroutePage,
    cssClass: 'setroute-modal',
    animated: true,
    mode: 'ios',
    backdropDismiss: true,
  });
  return await myModal.present();
}

setRoute(){
  this.router.navigateByUrl('/setroute')
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}



  // async loadMap() {
  //   const problems = await this.reportService.getAll();
  //   this.geolocation
  //     .getCurrentPosition()
  //     .then(({ coords }) => {
  //       const { latitude, longitude } = coords;

  //       let latLng = new google.maps.LatLng(latitude, longitude);
  //       let mapOptions = {
  //         center: latLng,
  //         zoom: 16,
  //         mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       };
  //       this.getAddressFromCoords(latitude, longitude);

  //       this.map = new google.maps.Map(
  //         this.mapElement.nativeElement,
  //         mapOptions
  //       );

  //       this.map.addListener("dragend", () => {
  //         this.latitude = this.map.center.lat();
  //         this.longitude = this.map.center.lng();

  //         this.getAddressFromCoords(
  //           this.map.center.lat(),
  //           this.map.center.lng()
  //         );
  //       });
  //       problems.forEach((problem: any) => {
  //         const marker = this.addMarker(
  //           problem.latitude,
  //           problem.longitude,
  //           problem.title,
  //           problem.id
  //         );
  //         marker.addListener("click", () => {
  //           this.router.navigateByUrl(`/problem/${marker.id}`);
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting location", error);
  //     });
  // }
