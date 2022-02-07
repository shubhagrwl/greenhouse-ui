import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import { StockComponent } from './order/stock/stock.component';
import { DateUpdateComponent } from './order/date-update/date-update.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReportComponent } from './order/report/report.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserComponent } from './order/user/user.component';
import { ButtonRendererComponent } from './order/user/button-render.component';
import { UserUpdateComponent } from './order/user-update/user-update.component';
import { StockTableComponent } from './order/stock-table/stock-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    DateUpdateComponent,
    LoginComponent,
    SignUpComponent,
    OrderComponent,
    HeaderComponent,
    ReportComponent,
    UserComponent,
    ButtonRendererComponent,
    UserUpdateComponent,
    StockTableComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxMatNativeDateModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    BrowserAnimationsModule,
  ],
  providers: [
  ], bootstrap: [AppComponent],


})
export class AppModule { }
