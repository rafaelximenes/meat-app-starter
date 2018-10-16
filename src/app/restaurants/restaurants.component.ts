import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantesService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]
  constructor(private restaurantService: RestaurantesService) { }

  ngOnInit() {
    this.restaurantService.restaurants().subscribe(rests => this.restaurants = rests);
  }

}
