import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiService } from 'src/app/api.service';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { ButtonRendererComponent } from './button-render.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  frameworkComponents: any;
  api: any;
  gridApi;
  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.frameworkComponents = {
      btnCellRenderer: ButtonRendererComponent,
    }
  }
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: 100,
    paginationPageSize: 100,
  };
  rowData;
  defaultColDef;
  pageNo = 1;
  columnDefs = [
    {
      headerName: "First Name",
      field: "first_name",
      width: 200,
    },
    { headerName: "Last Name", field: "last_name", width: 200 },
    { headerName: "Email", field: "email", width: 200 },
    { headerName: "Phone Number", field: "phone_number", width: 200 },
    { headerName: "Active", field: "active", width: 200 },
    { headerName: "Admin", field: "admin", width: 200 },
    { headerName: "Created At", field: "created_at", width: 200 },
    {
      headerName: "Action",
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        onClick: this.onClick.bind(this),
      },
      minWidth: 200,
    },
  ];


  ngOnInit() {
    // this.getUsers();
  }


  openResgister() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      height: '600px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
    });
  }

  onClick() {
  }
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      if (this.gridOptions.paginationPageSize != undefined) {
        this.pageNo = params.startRow / this.gridOptions.paginationPageSize + 1;
      }
      this.apiService.getAllUsers().subscribe((data: any) => {
        console.log(data);
        this.rowData = data.data;
        params.successCallback(data.data);

      }, err => {
        this.apiService.openSnackBar(err.error.data.message, "Close");
      })
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDatasource(this.dataSource);
  }

}
