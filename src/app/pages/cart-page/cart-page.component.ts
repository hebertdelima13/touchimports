import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartItemDetailed } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = []
  endSubs$: Subject<boolean> = new Subject

  constructor(private cartService: CartService, private ordersService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true)
    this.endSubs$.complete()
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = []
      respCart.items!.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId!).subscribe((resProduct) => {
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id)

    this.toastr.success('Produto deletado com sucesso!', '', {
      progressBar: true,
      timeOut: 2000
    });
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)

    this.toastr.success('Carrinho atualizado com sucesso!', '', {
      progressBar: true,
      timeOut: 2000
    });
  }
}
