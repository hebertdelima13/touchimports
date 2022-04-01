import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-desc',
  templateUrl: './product-desc.component.html',
  styleUrls: ['./product-desc.component.scss']
})
export class ProductDescComponent implements OnInit {

  product: Product
  endSubs$: Subject<boolean> = new Subject()

  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['productid']) {
        this._getProduct(params['productid'])
      }
    })
  }

  ngOnDestroy(): void {
      this.endSubs$.next(true)
      this.endSubs$.complete()
  }

  private _getProduct(id: string) {
    this.productService.getProduct(id).subscribe(resProduct => {
      this.product = resProduct
    })
  }

}
