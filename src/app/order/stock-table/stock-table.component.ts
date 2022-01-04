import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  insufficientFlag = false;
  leftFlag = false;
  rowData1;
  rowData;
  @Input() stockTable: any;

  constructor() { }
  columnDefs = [
    {
      headerName: "Id",
      field: "id",
      cellRenderer: function (params) {
        return (
          '<a href="https://inventory.dearsystems.com/Product#' +
          params.value +
          '" target="_blank">' +
          params.value +
          "</a>"
        );
      },
    },
    {
      headerName: "Sale Id",
      field: "sale_id",
      cellRenderer: function (params) {
        return (
          '<a href="https://inventory.dearsystems.com/Sale#' +
          params.value +
          '" target="_blank">' +
          params.value +
          "</a>"
        );
      },
    },
    { headerName: "Sku", field: "sku" },
    { headerName: "Name", field: "name" },
    { headerName: "Order Number", field: "order_number" },
    { headerName: "Customer", field: "customer" },
    { headerName: "Ship By", field: "ship_by" },
  ];

  columnDefs1 = [
    {
      headerName: "ID",
      field: "ID",
      cellRenderer: function (params) {
        return (
          '<a href="https://inventory.dearsystems.com/Product#' +
          params.value +
          '" target="_blank">' +
          params.value +
          "</a>"
        );
      },
    },
    { headerName: "Name", field: "Name" },
    { headerName: "SKU", field: "SKU" },
    { headerName: "Barcode", field: "Barcode" },
    { headerName: "Location", field: "Location" },
    { headerName: "Bin", field: "Bin" },
    { headerName: "Batch", field: "Batch" },
    { headerName: "ExpiryDate", field: "ExpiryDate" },
    { headerName: "OnHand", field: "OnHand" },
    { headerName: "Allocated", field: "Allocated" },
    { headerName: "Available", field: "Available" },
    { headerName: "OnOrder", field: "OnOrder" },
    { headerName: "StockOnHand", field: "StockOnHand" },
  ];


  ngOnInit() {
    console.log(this.stockTable);

  }
  insufficientStock() {
    this.insufficientFlag = true;
    this.leftFlag = false;
    this.rowData = this.stockTable.insufficient_stock;;
  }
  stockLeft() {
    this.leftFlag = true;
    this.insufficientFlag = false;
    this.rowData1 = this.stockTable.stock_left;
  }
}
