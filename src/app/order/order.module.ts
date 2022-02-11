import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { DateUpdateComponent } from './date-update/date-update.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material';


@NgModule({
  declarations: [OrderComponent, StockComponent, DateUpdateComponent, ReportComponent, UserComponent, UserUpdateComponent, StockTableComponent],
  imports: [
    MatMomentDateModule,
    MatDatepickerModule,
    CommonModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]

})
export class OrderModule { }
