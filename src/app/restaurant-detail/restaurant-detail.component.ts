import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurante: Restaurant

  constructor(private restaurantService: RestaurantesService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id'])
    this.restaurantService.restaurantById(this.route.snapshot.params['id'])
      .subscribe(restaurant => this.restaurante = restaurant)
  }

}
