import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination } from "swiper";
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = []
  isFeatured = false

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this._getProducts()
    SwiperCore.use([Pagination]);
  }

  private _getProducts() {
    this.productService.getProducts().subscribe(resProducts => {
      this.products = resProducts
    })
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    autoHeight: true,
    loop: true,
    pagination: {
      type: 'bullets',
      dynamicBullets: true
    }
  };

  configPromo: SwiperOptions = {
    slidesPerView: 1.2,
    initialSlide: 1,
    centeredSlides: true,
    spaceBetween: 27,
    pagination: {
      type: 'bullets',
      dynamicBullets: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      575: {
        slidesPerView: 1.2
      }
    }
  };
}
