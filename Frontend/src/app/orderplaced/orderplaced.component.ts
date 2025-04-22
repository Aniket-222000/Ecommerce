import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-orderplaced',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orderplaced.component.html',
  styleUrl: './orderplaced.component.css'
})
export class OrderplacedComponent {
showOrderMessage: boolean=true;
constructor(private router:Router){}
hideOrderMessage() {
  this.router.navigate([''])
}

}
