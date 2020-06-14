import { Component } from '@angular/core';
import { IProduct, product } from '../mocks/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public product: IProduct = product;
  public chosenProduct!: IProduct;

  addProduct(item: any) {
    this.chosenProduct = item;
  }
}
