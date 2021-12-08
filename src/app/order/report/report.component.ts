import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DateUpdate } from 'src/app/interface';
import { Papa } from "ngx-papaparse";
import { GridApi, GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  paginationPageSize;
  dateInterface = new DateUpdate('', '', '', '');
  gridApi: GridApi;
  historyFlag = false;
  constructor(private apiService: ApiService, private papa: Papa
  ) { }

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: 100,
    paginationPageSize: 100
  };

  page = {
    100: 1,
    200: 2,
    300: 3,
    400: 4,
    500: 5,
    600: 6,
    700: 7,
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      let param = new HttpParams();
      param = param.append("page", this.page[params.endRow].toString());
      param = param.append("range", params.endRow.toString());
      param = param.append("sort", 'ASC');
      param = param.append("order", 'name');
      this.apiService.wasteRepost(param).subscribe((data: any) => {
        console.log(data);
        params.successCallback(
          data.data.report,
          700
        );
        this.dateInterface.datepicker = data.data.last_running_time
      }, err => {
        this.apiService.openSnackBar(err.error.data.message, "Close")
      })
    }
  }

  dataSourceHistory: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      let param = new HttpParams();
      param = param.append("page", this.page[params.endRow].toString());
      param = param.append("range", params.endRow.toString());
      param = param.append("sort", 'ASC');
      param = param.append("order", 'name');
      this.apiService.wasteRepostHistory(param).subscribe((data: any) => {
        console.log(data);
        params.successCallback(
          data.data.report,
          700
        );
        this.dateInterface.datepicker = data.data.last_running_time
      }, err => {
        this.apiService.openSnackBar(err.error.data.message, "Close")

      })
    }
  }
  columnDefs = [
    {
      headerName: 'Id', field: 'id', width: 200
    },
    { headerName: 'name', field: 'name', width: 200 },
    { headerName: 'Barcode', field: 'barcode', width: 200 },
    { headerName: 'allocated', field: 'allocated', width: 200 },
    { headerName: 'available', field: 'available', width: 200 },
    { headerName: 'batch', field: 'batch', width: 200 },
    { headerName: 'bin', field: 'bin', width: 200 },
    { headerName: 'location', field: 'location', width: 200 },
    { headerName: 'on_hand', field: 'on_hand', width: 200 },
    { headerName: 'on_order', field: 'on_order', width: 200 },
    { headerName: 'sku', field: 'sku', width: 200 },
    { headerName: 'stock_on_hand', field: 'stock_on_hand', width: 200 },
    { headerName: 'created_at', field: 'created_at', width: 200 },
    { headerName: 'expiry_date', field: 'expiry_date', width: 200 },
  ];

  rowData;
  defaultColDef;

  ngOnInit() {
    // this.report()

  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDatasource(this.dataSource)
  }


  report() {
    let params = new HttpParams();
    params = params.append("page", '1');
    params = params.append("range", '100');
    params = params.append("sort", 'ASC');
    params = params.append("order", 'name');
    this.apiService.wasteRepost(params).subscribe((data: any) => {
      this.rowData = data.data.report;
      this.dateInterface.datepicker = data.data.last_running_time
      console.log(data);
    }, err => {
      this.apiService.openSnackBar(err.error.data.message, "Close")
    })
  }

  download() {
    var csv = this.papa.unparse(this.rowData);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var csvURL = window.URL.createObjectURL(csvData);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'report' + '.csv');
    tempLink.click();
  }

  history() {
    this.gridApi.setDatasource(this.dataSourceHistory)
  }

  refresh() {
    this.apiService.wasteRepostRefresh().subscribe((data: any) => {
      console.log(data);
    }, err => {
      this.apiService.openSnackBar(err.error.data.message, "Close")

    })
  }
}
