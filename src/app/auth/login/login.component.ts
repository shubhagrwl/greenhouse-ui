import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LayoutComponent } from 'src/app/layout/layout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.formInitialize()
  }

  formInitialize() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      this.apiService.openSnackBar(
        "Please fill all requried data",
        "Close"
      );
      return;
    }
    this.apiService.login(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.data.token);
      this.router.navigate(['main'], { relativeTo: this.activatedRoute.parent });
    }, (err) => {
      console.log(err)
    })
  }

}
