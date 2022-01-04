import { HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ApiService } from "src/app/api.service";
import { UserUpdateComponent } from "../user-update/user-update.component";
@Component({
  selector: "app-button-renderer",

  template: `
  <div style="cursor: pointer;">
  <i style="margin-right:20px;" class="fas fa-pencil-alt" (click)="openDialog()"></i>
  <i class="far fa-trash-alt" (click)="delete()"></i></div>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  updateFlag = false;
  deleteFlag = false;
  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  agInit(params): void {
    let editingCells = params.api.getEditingCells();
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
    if (!isCurrentRowEditing) this.updateFlag = true
    this.params = params;
  }
  onEdit($event) {
    if (this.params.onEdit instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onEdit(this.params);
    }
  }
  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(this.params);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: { data: this.params.data },
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      location.reload();

    });
  }
  delete() {
    console.log(this.params);
    let param = new HttpParams();
    param = param.append("email", this.params.data.email);
    this.apiService.deleteUser(param).subscribe(data => {
      console.log(data)
      location.reload();
    }, err => {
      this.apiService.openSnackBar(err.error.data.message, "Close");
    })
  }
}
