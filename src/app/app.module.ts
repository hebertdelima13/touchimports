import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SwiperModule } from 'swiper/angular';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductDescComponent } from './components/product-desc/product-desc.component';
import { ProductShipComponent } from './components/product-ship/product-ship.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductItemFeaturedComponent } from './components/product-item-featured/product-item-featured.component';
import { CartInfoHeaderComponent } from './components/cart-info-header/cart-info-header.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './pages/login/login.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RegisterComponent } from './pages/register/register.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    IndexComponent,
    ProductPageComponent,
    ProductDescComponent,
    ProductShipComponent,
    ProductGalleryComponent,
    ProductItemFeaturedComponent,
    CartInfoHeaderComponent,
    ProductItemComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwiperModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    InputNumberModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [{provide:  DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'}, UsersFacade, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
