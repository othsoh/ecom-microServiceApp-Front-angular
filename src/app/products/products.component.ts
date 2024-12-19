import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { DecimalPipe } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [DecimalPipe],


})
export class ProductsComponent implements OnInit {

  products : any = [];


  constructor(private http:HttpClient,
              public decimalPipe: DecimalPipe,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.http.get("http://localhost:8080/INVENTORY-SERVICE/products").subscribe({
      next: (data) => {
        this.products = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
