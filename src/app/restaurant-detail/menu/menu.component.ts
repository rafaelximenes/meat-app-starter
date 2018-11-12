import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu-item/menu-item.model';
import { RestaurantesService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItem: Observable<MenuItem[]>
  constructor(private restaurantService: RestaurantesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuItem = this.restaurantService.menuOfRestaurants(this.route.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem) {
    console.log(item)

  }

}
