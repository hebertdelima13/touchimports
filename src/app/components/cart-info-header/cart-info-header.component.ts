import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart-info-header',
  templateUrl: './cart-info-header.component.html',
  styleUrls: ['./cart-info-header.component.scss']
})
export class CartInfoHeaderComponent implements OnInit, OnDestroy {

  cartCount: number | any =  0
  totalPrice: number;
  endSubs$: Subject<boolean> = new Subject();

  constructor(private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items!.length ?? 0;
    })

    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items!.map((item) => {
          this.ordersService
            .getProduct(item.productId!)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity!;
            });
        });
      }
    });
  }

}
