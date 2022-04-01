import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false
  currentUserId: string

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private toastr: ToastrService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    })
  }
  
  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return;
    }

    const user: User = {
      id: this.currentUserId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      zip: this.form.controls['zip'].value,
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value
    }
      this._addUser(user)
    
    // console.log(this.form.controls['name'].value)
    // console.log(this.form.controls['icon'].value)
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(res => {
      this.toastr.success('Usuário adicionado com sucesso!', '', {
        progressBar: true,
        timeOut: 2000
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      })
    }, (error) => {
      this.toastr.error('O usuário não pode ser adicionado!', '', {
        progressBar: true,
        timeOut: 2000
      }) ;
    })
  }

}
