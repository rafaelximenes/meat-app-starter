import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "../app.api";
import { LoginService } from "../security/login/login.service";
import {map} from 'rxjs/operators'

@Injectable()
export class OrderService {

    constructor(public cartService: ShoppingCartService, private http: HttpClient) {}

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    removeItem(item:CartItem) {
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`,  order).pipe(map(order => order.id))
                       
    }

    clear() {
        this.cartService.clear()
    }

}