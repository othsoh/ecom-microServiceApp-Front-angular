import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {DecimalPipe} from "@angular/common";



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [DecimalPipe]
})
export class ProductDetailsComponent implements OnInit {
  product: any = [];
  productId!: number;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              public decimalPipe: DecimalPipe) {
    this.productId = route.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/INVENTORY-SERVICE/products/" + this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  addTax(total: number): number {
    return total + total * 0.1;
  }

  calculateTotal(order: any): number {
    return order.productItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  }


  calculateAmount(price: number, quantity: number): number {
    return price * quantity;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return `${formattedDate} ${formattedTime}`;
  }

}
