import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  categories: Category[] = []
  isCategoryPage: boolean

  constructor(private productService: ProductsService, private categoryService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false)
    })
    this._getCategories()
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(resCategory => {
      this.categories = resCategory
    })
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter).subscribe(resProducts => {
      this.products = resProducts
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter((category) => category.checked).map(category => category.id)    
    this._getProducts(selectedCategories)
  }
}
