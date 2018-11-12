import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../../restaurants/restaurants.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>
  constructor(private restaurantsServices: RestaurantesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsServices.reviewsOfRestaurants(this.route.parent.snapshot.params['id'])
  }

}
