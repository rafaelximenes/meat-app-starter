import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import {tap} from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  orderForm: FormGroup

  orderId: string

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [
    {label: "Dinheiro", value:"D"},
    {label: "Cartão de Crédito", value:"C"},
    {label: "Boleto", value:"B"}
  ]

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) { }


  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('',{
        validators:[Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('',[Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation) {
      return undefined
    }

    if(email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }
    return undefined
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
}

decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
}

remove(item:CartItem) {
  this.orderService.removeItem(item)
}

checkOrder(order: Order) {
  order.orderItems = this.cartItems().map((item: CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
  this.orderService.checkOrder(order)
  .pipe(tap(orderId => this.orderId = orderId))
  .subscribe((orderId: string) =>
  {
    console.log(`Compra Concluída: ${orderId}`)
    this.orderService.clear(); 
    this.router.navigate(['order-summary'])
  })
  console.log(order)
}

isCompleted(): boolean {
  return this.orderId !== undefined
}

}
