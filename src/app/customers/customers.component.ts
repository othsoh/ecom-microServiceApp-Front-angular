import {Component, input, InputFunction, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/CUSTOMER-SERVICE/customers").subscribe({
      next: (data: any) => {
        this.customers = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getOrders(customer: any) {
    this.router.navigateByUrl("/orders/" + customer.id);
  }

    protected readonly input = input;

  SearchCustomers(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.http.get("http://localhost:8080/CUSTOMER-SERVICE/customersByName?input=" + input).subscribe({
      next: (data: any) => {
        this.customers = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
