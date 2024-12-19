import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderComponent} from "./order/order.component";
import {HomeComponent} from "./home/containers/home/home.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'customers', component: CustomersComponent
  },
  {
    path: 'orders/:customerId', component: OrdersComponent
  },
  {
    path: 'order/:orderId', component: OrderComponent
  }
  ,
  {
    path: '', component: HomeComponent
  },
  {
    path: 'products/:productId', component: ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
