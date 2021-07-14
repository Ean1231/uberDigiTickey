import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-stars-review',
  templateUrl: './stars-review.page.html',
  styleUrls: ['./stars-review.page.scss'],
})
export class StarsReviewPage implements OnInit {

  @Input() userId;
  @Input() rideId;

stars: Observable<any>;
avgRating: Observable<any>;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

  }

}
