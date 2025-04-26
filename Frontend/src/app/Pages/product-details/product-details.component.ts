import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ProductCardsComponent } from '../../Components/product-cards/product-cards.component';
import { GlobalItemsService } from '../../Services/global-items.service';
import { OrderplacedComponent } from "../../orderplaced/orderplaced.component";
import { CommonModule } from '@angular/common';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalItemsService
  ) {}

  itemId: string = '';
  details: any = {};
  cards: any = [];
  myCartArrayOfObjects: any[] = [];
  isPlaced:boolean=false;
  items:any=[];
  async ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId != null) {
      console.log(this.itemId);
      axios
        .get('http://localhost:3000/api/v1/products/getproductbyid', {
          params: {
            _id: this.itemId,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          // handle success
          this.details = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (this.details) {
      axios
        .get('http://localhost:3000/api/v1/products/getallproducts')
        .then((res) => {
          this.cards = res.data.data;
        });
    }
  }
  placed() {
    axios
    .post('http://localhost:3000/api/v1/orders/addorderhistory',{userId:this.itemId,items:})
    .then((response) => {
      // handle success
      this.details = response.data.data;
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
