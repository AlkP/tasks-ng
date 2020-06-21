import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../mocks/products';

@Component({
  selector: 'app-shop-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product!: IProduct;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  addProduct() {
    this.addToCart.emit();
  }
}
