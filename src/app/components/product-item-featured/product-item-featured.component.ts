import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item-featured',
  templateUrl: './product-item-featured.component.html',
  styleUrls: ['./product-item-featured.component.scss']
})
export class ProductItemFeaturedComponent implements OnInit {
  
  quantity = 1;

  @Input() product: Product;

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem)

    this.toastr.success('Produto adicionado com sucesso!', '', {
      progressBar: true,
      timeOut: 2000
    });
  }

}
