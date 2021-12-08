import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { DateUpdateComponent } from './date-update/date-update.component';
import { ReportComponent } from './report/report.component';



@NgModule({
  declarations: [OrderComponent, StockComponent, DateUpdateComponent, ReportComponent],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
