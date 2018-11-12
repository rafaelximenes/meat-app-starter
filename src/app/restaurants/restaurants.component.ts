import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantesService } from './restaurants.service';
import {state, trigger, style, transition, animate} from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators'
import {Observable, from} from 'rxjs'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity:0, "max-height":"0px"})),
      state('visible', style({opacity:1, "max-height":"70px", "margin-top": "20px"})),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ] )
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService: RestaurantesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => 
        this.restaurantService.restaurants(searchTerm).pipe(catchError(error => from([]))))
    ).subscribe(restaurants => this.restaurants = restaurants )
    
    this.restaurantService.restaurants().subscribe(rests => this.restaurants = rests);
  }

  toogleSearch() {
    this.searchBarState = this.searchBarState === "hidden" ? "visible" : "hidden"
  }

}
