import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

const headerOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient,
    public matSnackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action ? action : undefined, {
      verticalPosition: "top",
      horizontalPosition: "end",
    });
  }

  login(body) {
    return this.httpClient.post(`${this.BASE_URL}/login`, body, httpOptions);
  }


  register(params) {
    return this.httpClient.post(
      `${this.BASE_URL}/signup`,
      params,
      headerOption
    );
  }

  programSatus(params) {
    return this.httpClient.get(
      `${this.BASE_URL}/dateupdator`, { headers: headerOption.headers, params: params }
    );
  }

  dateUpdate(params) {
    return this.httpClient.patch(
      `${this.BASE_URL}/dateupdator`, params, headerOption
    );
  }

  wasteRepost(params) {
    return this.httpClient.get(
      `${this.BASE_URL}/waste/report`, { headers: headerOption.headers, params: params }
    );
  }

  wasteRepostHistory(params) {
    return this.httpClient.get(
      `${this.BASE_URL}/waste/report/history`, { headers: headerOption.headers, params: params }
    );
  }
  wasteRepostRefresh() {
    return this.httpClient.get(
      `${this.BASE_URL}/waste/report/refresh`, { headers: headerOption.headers}
    );
  }
}
