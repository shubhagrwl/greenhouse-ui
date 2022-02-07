import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
declare var $: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  reportFlag = false;
  fromDate;
  toDate;
  saleStatus;
  stockFlag = false;
  stock: any;
  progressValue = '0'
  loaderFlag = false;
  status = [{ name: 'ESTIMATING', checked: false },
  { name: 'ESTIMATED', checked: false },
  { name: 'ORDERING', checked: false },
  { name: 'ORDERED', checked: false },
  { name: 'BACKORDERED', checked: false },
  { name: 'PICKING', checked: false },
  ]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onClickReport() {
    this.reportFlag = true
  }

  stockCheck() {
    var result = this.status.filter(x => x.checked).map(x => x.name)
    this.saleStatus = result.join(",")
    if (this.fromDate === undefined || this.toDate === undefined || this.saleStatus === undefined) {
      this.apiService.openSnackBar('Please select From date, To date and status', "Close")
      return;
    } else {
      let params = new HttpParams();
      params = params.append("from", new Date(this.fromDate).toISOString().replace(".000Z", "Z"));
      params = params.append("to", new Date(this.toDate).toISOString().replace(".000Z", "Z"));
      params = params.append("status", this.saleStatus);
      this.apiService.getStock(params).subscribe((data: any) => {
        if (data) {
          this.apiService.openSnackBar(data.data.message, "Close")
          if (data.data.code === 202) {
            this.stockFlag = true;
            this.stockProgress();
          }
        } else {
          this.apiService.openSnackBar(data.data.message, "Close")
        }
      }, err => {
        console.log(err);
        this.apiService.openSnackBar(err.error.data.message, "Close")

      })
    }
  }

  stockProgress() {
    this.apiService.getStockProgress().subscribe((data: any) => {
      console.log(data);
      var per = data.data.progress;
      this.progressValue  = per.split('%').join('');
      if (data.data.progress !== "100%") {
        this.stockProgress()
      }
    })
  }
}
