import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
constructor(private http:HttpClient){}
form = {
  productName: '',
  price: '',
  description: '',
  rating: '',
  category: '',
};

selectedFile: File | null = null;

onFileChange(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files?.length) {
    this.selectedFile = fileInput.files[0];
  }
}

submitForm() {
  const formData = new FormData();

  formData.append('productName', this.form.productName);
  formData.append('price', this.form.price);
  formData.append('description', this.form.description);
  formData.append('rating', this.form.rating);
  formData.append('category', this.form.category);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.http.post('http://localhost:3000/api/v1/products/addproduct', formData).subscribe({
    next: (response) => {
      console.log('Success!', response);
      alert("Product added successfully");
    },
    error: (error) => {
      console.error('Error:', error);
    },
    complete: () => {
      console.log('Request completed.');
    }
  });
  
  
}


}
