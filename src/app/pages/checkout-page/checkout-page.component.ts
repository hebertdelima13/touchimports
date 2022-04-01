import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { CartService } from 'src/app/services/cart.service';
import { ORDER_STATUS } from 'src/app/services/order-constants';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  checkoutFormgroup!: FormGroup;
  isSubmitted: boolean = false
  orderItems: OrderItem[] = []
  userId: string
  unsubscribe$: Subject<boolean> = new Subject();


  constructor(private router: Router, private formBuilder: FormBuilder, private cartService: CartService, private ordersService: OrdersService, private usersService: UsersService) { }

  ngOnInit(): void {
    this._initCheckoutForm()
    this._autoFillUserData()
    this._getCartItems()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  private _initCheckoutForm() {
    this.checkoutFormgroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user:any) => {
        if (user) {
          this.userId = user.id;
          this.checkoutFormgroup.controls['name'].setValue(user.name);
          this.checkoutFormgroup.controls['email'].setValue(user.email);
          this.checkoutFormgroup.controls['phone'].setValue(user.phone);
          this.checkoutFormgroup.controls['street'].setValue(user.street);
          this.checkoutFormgroup.controls['apartment'].setValue(user.apartment);
          this.checkoutFormgroup.controls['zip'].setValue(user.zip);
          this.checkoutFormgroup.controls['city'].setValue(user.city);
        }
      });
  }

  private _getCartItems() {
    const cart:Cart = this.cartService.getCart()
    this.orderItems = cart.items!.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })

    console.log(this.orderItems)
  }

  placeOrder() {
    this.isSubmitted = true
    if (this.checkoutFormgroup.invalid) {
      return
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutFormgroup.controls['street'].value,
      shippingAddress2: this.checkoutFormgroup.controls['apartment'].value,
      city: this.checkoutFormgroup.controls['city'].value,
      zip: this.checkoutFormgroup.controls['zip'].value,
      phone: this.checkoutFormgroup.controls['phone'].value,
      status: 'pendente',
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }

    this.ordersService.createOrder(order).subscribe(() => {
      this.router.navigate(['/'])
      this.cartService.emptyCart()
    }, () => {

    })
  }

  backToCart() {
    this.router.navigate(['/cart'])
  }
}