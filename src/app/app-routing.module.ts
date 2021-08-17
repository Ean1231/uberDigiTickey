import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'distance', //folder, distance
    pathMatch: 'full'
  },
  {
    path: 'folder', //folder/:id
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'setroute',
    loadChildren: () => import('./setroute/setroute.module').then( m => m.SetroutePageModule)
  },
  {
    path: 'select-ride',
    loadChildren: () => import('./select-ride/select-ride.module').then( m => m.SelectRidePageModule)
  },
  {
    path: 'distance',
    loadChildren: () => import('./distance/distance.module').then( m => m.DistancePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./rating/rating.module').then( m => m.RatingPageModule)
  },
  {
    path: 'driver-verify',
    loadChildren: () => import('./driver-verify/driver-verify.module').then( m => m.DriverVerifyPageModule)
  },
  {
    path: 'driver-register',
    loadChildren: () => import('./driver-register/driver-register.module').then( m => m.DriverRegisterPageModule)
  },
  {
    path: 'driver-nav',
    loadChildren: () => import('./driver-nav/driver-nav.module').then( m => m.DriverNavPageModule)
  },
  {
    path: 'stars-review',
    loadChildren: () => import('./stars-review/stars-review.module').then( m => m.StarsReviewPageModule)
  },
  {
    path: 'select-vehicle',
    loadChildren: () => import('./select-vehicle/select-vehicle.module').then( m => m.SelectVehiclePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'phone-or-mail',
    loadChildren: () => import('./phone-or-mail/phone-or-mail.module').then( m => m.PhoneOrMailPageModule)
  },
  {
    path: 'email-verify',
    loadChildren: () => import('./email-verify/email-verify.module').then( m => m.EmailVerifyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },  {
    path: 'rating-system',
    loadChildren: () => import('./rating-system/rating-system.module').then( m => m.RatingSystemPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'show-profile',
    loadChildren: () => import('./show-profile/show-profile.module').then( m => m.ShowProfilePageModule)
  },
  {
    path: 'nearby-drivers',
    loadChildren: () => import('./nearby-drivers/nearby-drivers.module').then( m => m.NearbyDriversPageModule)
  },
  {
    path: 'ride-history',
    loadChildren: () => import('./ride-history/ride-history.module').then( m => m.RideHistoryPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
function canActivate(arg0: (m: typeof import("./folder/folder.module")) => typeof import("./folder/folder.module").FolderPageModule, canActivate: any, arg2: (typeof AuthGuard)[]): import("@angular/core").Type<any> | import("@angular/core").NgModuleFactory<any> | import("rxjs").Observable<import("@angular/core").Type<any>> | Promise<any> {
  throw new Error('Function not implemented.');
}

