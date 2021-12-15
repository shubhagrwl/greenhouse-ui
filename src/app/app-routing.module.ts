import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { DateUpdateComponent } from './order/date-update/date-update.component';
import { OrderComponent } from './order/order/order.component';
import { StockComponent } from './order/stock/stock.component';
import { UserUpdateComponent } from './order/user-update/user-update.component';
import { UserComponent } from './order/user/user.component';


const routes: Routes = [

  {
    path: 'main',
    component: LayoutComponent,
    children: [
      { path: 'order', component: OrderComponent },
      { path: 'date', component: DateUpdateComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'user', component: UserComponent },
      { path: 'stock', component: StockComponent },
      { path: 'user/update', component: UserUpdateComponent },
      { path: '', component: StockComponent },
    ]
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
