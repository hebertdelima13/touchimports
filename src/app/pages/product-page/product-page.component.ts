import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product
  quantity: number = 1
  i=1
  endSubs$: Subject<boolean> = new Subject()

  constructor(private productService: ProductsService, private route: ActivatedRoute, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProduct(params['productid'])
      }
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true)
    this.endSubs$.complete()
  }

  increase() {
    if(this.i != 999) {
      this.i++
      this.quantity = this.i
    }
  }

  decrease() {
    if(this.i != 1) {
      this.i--
      this.quantity = this.i
    }
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

  private _getProduct(id: string) {
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }

}
