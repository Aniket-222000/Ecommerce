import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent  {
  // itemId : any;  
  // details :any;
  // totalPrice:any;

  //   if (this.details) {
  //     axios
  //       .get('http://localhost:3000/api/v1/products/getallproducts')
  //       .then((res) => {
  //         this.cards = res.data.data;
  //       });
  //   }
  // }
}
