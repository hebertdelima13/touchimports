import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  categories: Category[] = []
  users: any
  islogged: boolean  

  constructor(private router: Router, private localStorage: LocalstorageService, private userService: UsersService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this._getCategories()
    this.getUser()
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(resCategory => {
      this.categories = resCategory
    })
  }

  private getUser() {
    this.userService.observeCurrentUser().subscribe(user => {
      this.users = user
      const local = localStorage.getItem('jwtToken')
      if(local) {
        this.islogged = true
      } else {
        this.islogged = false
      }      
    })
  }
  
  logout() {
    this.localStorage.removeToken()
    this.router.navigate(['/login'])
    this.ngOnInit();
  }

}
