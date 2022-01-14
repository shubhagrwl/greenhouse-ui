import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username;
  user;
  admin;
  adminFlag = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.username = this.user.username;
    this.admin = true; //this.user.admin
    if (this.admin === true) {
      this.adminFlag = true;
    }
  }

  logout() {
    localStorage.setItem('token', null);
    this.router.navigate(['/']);
  }

}
