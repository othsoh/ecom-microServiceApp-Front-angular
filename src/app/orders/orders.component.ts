import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [DecimalPipe]
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  customerId!: number;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              public decimalPipe: DecimalPipe) {
    this.customerId = route.snapshot.params['customerId'];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/BILLING-SERVICE/billsByCustomer/" + this.customerId).subscribe({
      next: (data: any) => {
        this.orders = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  calculateTotal(order: any): number {
    return order.productItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
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

  viewOrderDetails(order: any) {
    this.router.navigateByUrl("/order/" + order.id);
  }
}
