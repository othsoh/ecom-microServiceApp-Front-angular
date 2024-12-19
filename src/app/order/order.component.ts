import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {DecimalPipe} from "@angular/common";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";
import colors from "tailwindcss/colors";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [DecimalPipe]
})
export class OrderComponent implements OnInit {
  bill: any = [];
  orderId!: number;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              public decimalPipe: DecimalPipe) {
    this.orderId = route.snapshot.params['orderId'];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/BILLING-SERVICE/fullBill/" + this.orderId).subscribe({
      next: (data: any) => {
        this.bill = data;
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

  downloadPDF() {
    const doc = new jsPDF();

    // Add logo
    const imgData = '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'; // Replace with your logo's base64 data
    doc.addImage(imgData, 'PNG', 10, 10, 30, 30);


    // Add company information
    doc.setFontSize(10);
    doc.text('Temu Inc.', 150, 10);
    doc.text('+212 6 12 34 56 78', 150, 15);
    doc.text('VAT: 88576712', 150, 20);
    doc.text('Casablanca, Morocco', 150, 25);

    // Add bill information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill to:', 10, 50);
    doc.setFont('helvetica', 'normal');

    doc.setFontSize(10);
    doc.text(`${this.bill.customer?.name || ''}`, 10, 55);
    doc.text(`${this.bill.customer?.address || ''}`, 10, 60);
    doc.text(`${this.bill.customer?.phoneNumber || ''}`, 10, 65);
    doc.text(`${this.bill.customer?.email || ''}`, 10, 70);
    doc.text(`Invoice number: ${this.bill.id || ''}`, 150, 55);
    doc.text('Invoice date:', 150, 60);

    doc.text(`${this.formatDate(this.bill.billingDate)}`, 150, 65);

    // Add table
    let y = 90;
    if (this.bill.productItems && this.bill.productItems.length > 0) {
      autoTable(doc, { html: '#my-table' , startY: y, tableLineColor: [0, 0, 0], tableLineWidth: 0.1, styles: { lineColor: [0, 0, 0], lineWidth: 0.1,fillColor:[211,211,211],textColor:[1,1,1] } });


      // Add subtotal, tax, and total
      y = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text('Subtotal', 140, y);
      doc.text(this.decimalPipe.transform(this.calculateTotal(this.bill), '1.2-2') + ' MAD', 160, y);
      y += 10;
      doc.text('Tax', 140, y);
      doc.text('10%', 160, y);
      y += 10;

      doc.setFont('helvetica', 'bold');

      doc.text('Total', 140, y);
      doc.text(this.decimalPipe.transform(this.addTax(this.calculateTotal(this.bill)), '1.2-2') + ' MAD', 160, y);
    }
    const randomHash = Math.random().toString(36).substring(2, 15);

    doc.save(`invoice_${randomHash}.pdf`);
  }
}
