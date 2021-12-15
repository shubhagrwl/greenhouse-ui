import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    this.userUpdateForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      admin: ["", Validators.required],
    });
  }

  update() {
    let param = new HttpParams();
    param = param.append("email", this.data.data.email);
    if (this.userUpdateForm.value.password !== "") {
      param = param.append("password", this.userUpdateForm.value.password);
    }
    if (this.userUpdateForm.value.admin !== "") {
      param = param.append("admin", this.userUpdateForm.value.admin);
    }
    console.log(param);
    this.apiService.userUpdate(param).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
        // this.apiService.openSnackBar(err.error.data.message, "Close");
      }
    );
  }
}
