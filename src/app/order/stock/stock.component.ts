import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  reportFlag = false;
  fromDate;
  toDate;
  constructor() { }

  ngOnInit() {
    
  }

  onClickReport() {
    this.reportFlag = true
  }

  stockCheck() {
    let fromD = new Date(this.fromDate).toISOString().replace(".000Z", "Z");
    let toD = new Date(this.toDate).toISOString().replace(".000Z", "Z");

  }
}
