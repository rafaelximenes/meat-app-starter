import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[]

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()


  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(items: CartItem) {
    this.increaseQty.emit(items)
  }
  emitDecreaseQty(items: CartItem) {
    this.decreaseQty.emit(items)
  }
  emitRemove(items: CartItem) {
    this.remove.emit(items)
  }

}
