import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { GlobalItemsService } from '../../Services/global-items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
admin: boolean=false;
admincode: string='';

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private globalService: GlobalItemsService
  ) {}
  setAdmin() {
    this.admin = !this.admin;
    this.signUp();
  }
  ngOnInit() {
    let userToken = localStorage.getItem('userToken');
    if (userToken != null && userToken != undefined) {
      axios
        .get('http://localhost:3000/api/v1/users/getuserbyid', {
          params: {
            _id: userToken,
          },
        })
        .then((res) => {
          if (res.data.data) {
            if (res.data.data.usertype == 'admin') {
              this.globalService.setAccess(true);
            }
            this.globalService.setUserLoggedInStatus(true);
            this.router.navigate(['/']);
          }
        });
    }
  }

  signUp() {
    if(this.admin!=false){
      this.admincode="admin";
    }
    else{
      this.admincode="normal";
    
    }
    console.log(this.admincode);
    axios
      .post('http://localhost:3000/api/v1/users/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        usertype:this.admincode
      })
      .then((response) => {
        localStorage.setItem('userToken', response.data.data._id);
        this.globalService.setUserLoggedInStatus(true);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        
          alert('something went wrong');
        
      });
  }

  login() {
    axios
      .post('http://localhost:3000/api/v1/users/login', {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        localStorage.setItem('userToken', response.data.data.user._id);
        console.log(response);
        
        if (response.data.data.user.usertype == 'admin') {
          this.globalService.setAccess(true);
        }
        this.globalService.setUserLoggedInStatus(true);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          alert('User does not exist');
        } else if (error.response.status == 400) {
          alert(' password and email is required');
        } else {
          alert('something went wrong');
        }
      });
  }
}
