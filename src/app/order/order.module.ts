import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { DateUpdateComponent } from './date-update/date-update.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { StockTableComponent } from './stock-table/stock-table.component';



@NgModule({
  declarations: [OrderComponent, StockComponent, DateUpdateComponent, ReportComponent, UserComponent, UserUpdateComponent, StockTableComponent],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
