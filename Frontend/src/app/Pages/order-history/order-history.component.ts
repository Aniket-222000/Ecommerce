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
  export class OrderHistoryComponent implements OnInit {
    orders: any[] = [];
    userId = localStorage.getItem('userToken');
    orderId :any= [];
    number:any;
    price:any=[];
    productName:any=[];
    productId:any;
    date: any=[];
    image:any=[];
    ngOnInit() {
      axios.get('http://localhost:3000/api/v1/orders/getuserorders', {
        params: { userId: this.userId }
      })
      .then(res => {this.orders = res.data.data;console.log("response in order history",res);
        for(let i=0;i<this.orders.length;i++){
          console.log("inside for loop")
          console.log("orders",this.orders);

    
          this.number = this.orders.length;
          this.productId=this.orders[i].items[0].productId;
         
          console.log("product id",this.productId);
          axios.get('http://localhost:3000/api/v1/products/getproductbyid',{
            params: {_id: this.productId }
          }).then(res => {this.productId = res.data.data;
            this.orderId[i]=i;
            this.date[i]=res.data.data.createdAt;
            this.price[i]=res.data.data.price;
            this.productName[i]=res.data.data.productName;
            this.image[i]=res.data.data.image;
            ;console.log("response from product in order history", res)})
          .catch(err => console.error('Failed to load order history', err));
        }
  
      })
      .catch(err => console.error('Failed to load order history', err));
      
    }
  }

