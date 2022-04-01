import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'produtos', component: ProductListComponent },
      { path: 'categoria/:categoryid', component: ProductListComponent },
      { path: 'produtos/:productid', component: ProductPageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'checkout', canActivate: [AuthGuard], component: CheckoutPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
