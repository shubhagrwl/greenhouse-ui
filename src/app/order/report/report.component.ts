import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/api.service";
import { DateUpdate } from "src/app/interface";
import { Papa } from "ngx-papaparse";

import {
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  paginationPageSize;
  dateInterface = new DateUpdate("", "", "", "");
  gridApi: GridApi;
  historyFlag = false;
  downloadData;
  blob;
  loaderFlag = false;
  pageNo = 1
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: 100,
    paginationPageSize: 100,
  };

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      if (this.gridOptions.paginationPageSize != undefined) {
        this.pageNo = params.startRow / this.gridOptions.paginationPageSize + 1;
      }
      let param = new HttpParams();
      param = param.append("page", this.pageNo.toString());
      param = param.append("sort", "ASC");
      param = param.append("order", "name");
      this.loaderFlag = true;
      this.apiService.wasteRepost(param).subscribe(
        (data: any) => {
          this.loaderFlag = false;
          console.log(data);
          this.downloadData = data.data.report;
          params.successCallback(data.data.report, data.data.pagination.total);
          this.dateInterface.datepicker = data.data.last_running_time;
        },
        (err) => {
          this.apiService.openSnackBar(err.error.data.message, "Close");
        }
      );
    },
  };

  dataSourceHistory: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      if (this.gridOptions.paginationPageSize != undefined) {
        this.pageNo = params.startRow / this.gridOptions.paginationPageSize + 1;
      }
      let param = new HttpParams();
      param = param.append("page", this.pageNo.toString());
      param = param.append("sort", "ASC");
      param = param.append("order", "name");
      this.loaderFlag = true;
      this.apiService.wasteRepostHistory(param).subscribe(
        (data: any) => {
          console.log(data);
          this.loaderFlag = false;
          params.successCallback(data.data.report, data.data.pagination.total);
          this.dateInterface.datepicker = data.data.last_running_time;
        },
        (err) => {
          this.apiService.openSnackBar(err.error.data.message, "Close");
        }
      );
    },
  };
  columnDefs = [
    {
      headerName: "Id",
      field: "id"
    },
    { headerName: "name", field: "name" },
    { headerName: "Barcode", field: "barcode" },
    { headerName: "allocated", field: "allocated" },
    { headerName: "available", field: "available" },
    { headerName: "batch", field: "batch" },
    { headerName: "bin", field: "bin" },
    { headerName: "location", field: "location" },
    { headerName: "on_hand", field: "on_hand" },
    { headerName: "on_order", field: "on_order" },
    { headerName: "sku", field: "sku" },
    { headerName: "stock_on_hand", field: "stock_on_hand" },
    { headerName: "created_at", field: "created_at" },
    { headerName: "expiry_date", field: "expiry_date" },
  ];

  rowData;
  defaultColDef;

  ngOnInit() {
    // this.report()
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDatasource(this.dataSource);
  }

  download() {
    var win: any = window.open('_blank');
    this.apiService.wasteRepostDownload('http://144.126.150.47:9090/waste/report/download', function (blob) {
      var url = URL.createObjectURL(blob);
      win.location = url;
    });

  }


  history() {
    this.gridApi.setDatasource(this.dataSourceHistory);
  }

  refresh() {
    this.apiService.wasteRepostRefresh().subscribe(
      (data: any) => {
        console.log(data);
        this.apiService.openSnackBar("Report is under process", "Open");
      },
      (err) => {
        this.apiService.openSnackBar(err.error.data.message, "Close");
      }
    );
  }
}
