import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ProductCardsComponent } from '../../Components/product-cards/product-cards.component';
import { GlobalItemsService } from '../../Services/global-items.service';
import { OrderplacedComponent } from "../../orderplaced/orderplaced.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductCardsComponent, OrderplacedComponent,CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
quantity: any;
  details1: any=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalItemsService,
    private viewportScroller: ViewportScroller
  ) {}
 

 
  itemId: string = '';
  details: any = {};
  cards: any = [];
  myCartArrayOfObjects: any[] = [];
  isPlaced:boolean=false;
  items:any=[];
  userId:any;
  async ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.itemId = this.route.snapshot.params['id'];
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
          
            this.userId=res.data.data._id;
          }
        });
    }
  

  
      console.log('Item ID:', this.itemId);
      await axios
        .get('http://localhost:3000/api/v1/products/getproductbyid', {
          params: {_id: this.itemId
          }
        })
        .then((response) => {
          console.log(response.data.data,"in product details");
          // handle success
          this.details = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    
    if (this.details) {
      axios
        .get('http://localhost:3000/api/v1/products/getallproducts')
        .then((res) => {
          this.cards = res.data.data;
        });
    }
  }
  async placed() {
    console.log(this.details._id,"product from details variable")
   await axios
    .post('http://localhost:3000/api/v1/orders/addorderhistory',{userId:this.userId,
      items:[{productId:this.details._id,quantity:this.quantity}],
      totalPrice:this.details.price
    })
    .then((response) => {
      // handle success
      console.log("successfully saved in to database ")
      
    })
    .catch((error) => {
      // handle error
      console.log("api called")
      console.log(error);
    });
   this.router.navigate(['/orderplaced']);
    }
  addToCart() {
    console.log('clicked');

    let localItem = localStorage.getItem('myCartData');
    if (localItem != null) {
      this.myCartArrayOfObjects = JSON.parse(localItem);
    }
    const mycartobj = {
      id: this.details._id,
      name: this.details.productName,
      img: this.details.image,
      oldprice: this.details.price,
      price: this.details.price,
      quantity: this.quantity,
    };

    // Check for duplicates based on item id
    const isDuplicate = this.myCartArrayOfObjects.some(
      (obj) => obj.id === mycartobj.id
    );

    if (!isDuplicate) {
      // If item is not a duplicate, add it to the cart
      this.myCartArrayOfObjects.push(mycartobj);
      alert("Item added to the cart ")
      // Update localStorage
      localStorage.setItem(
        'myCartData',
        JSON.stringify(this.myCartArrayOfObjects)
      );
      
    } else {
      // Handle duplicate item case if needed
      console.log('Item is already in the cart');
      alert("Item is already in the cart");
    }
  }
}
