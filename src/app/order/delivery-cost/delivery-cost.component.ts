import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-delivery-cost',
  templateUrl: './delivery-cost.component.html',
  styleUrls: ['./delivery-cost.component.css']
})
export class DeliveryCostComponent implements OnInit {

  @Input() delivery: number
  @Input() itemsValue: number

  constructor() { }

  ngOnInit() {
  }

  total(): number {
    return this.delivery + this.itemsValue;
  }

}
