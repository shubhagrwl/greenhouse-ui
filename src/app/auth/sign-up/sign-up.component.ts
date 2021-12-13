import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.formInitialize();
  }
  formInitialize() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      password: ["", Validators.required],
      phone_number: ["", Validators.required],
      admin: ["", Validators.required],
    });
  }
  login() {}
  register() {
    console.log(this.registerForm.value);
    const token = localStorage.getItem("token");
    if (this.registerForm.invalid) {
      this.apiService.openSnackBar("Please fill all requried data", "Close");
      return;
    }
    this.apiService.register(this.registerForm.value).subscribe(
      (data: any) => {
        console.log(data);

        this.apiService.openSnackBar(data.data.message, "Close");
      },
      (err) => {
        this.apiService.openSnackBar(err.error.data.message, "Close");
      }
    );
  }
}
