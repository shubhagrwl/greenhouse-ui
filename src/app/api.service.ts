import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};


 function getToken(){
  let token = localStorage.getItem("token");

  if(token){
    // window.location.reload();
    token = localStorage.getItem("token");
  }
  console.log(token, 'test');
  return token;
} 

const headerOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }),
};
@Injectable({
  providedIn: "root",
})
export class ApiService  implements OnInit{
  BASE_URL = environment.BASE_URL;
  token = localStorage.getItem("token");

  constructor(
    private httpClient: HttpClient,
    public matSnackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    window.location.reload();
    this.token = localStorage.getItem("token");
  }

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
    return this.httpClient.get(`${this.BASE_URL}/dateupdator`, {
      headers: headerOption.headers,
      params: params,
    });
  }

  dateUpdate(params) {
    return this.httpClient.patch(
      `${this.BASE_URL}/dateupdator`,
      params,
      headerOption
    );
  }

  wasteRepost(params) {
    console.log(params);
    return this.httpClient.get(`${this.BASE_URL}/waste/report?range=100`, {
      headers: headerOption.headers,
      params: params,
    });
  }

  wasteRepostHistory(params) {
    return this.httpClient.get(`${this.BASE_URL}/waste/report/history?range=100`, {
      headers: headerOption.headers,
      params: params,
    });
  }
  wasteRepostRefresh() {
    return this.httpClient.get(`${this.BASE_URL}/waste/report/refresh`, {
      headers: headerOption.headers,
    });
  }

  async wasteRepostDownload(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (success) {
          var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
          var downloadUrl = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "data.xls";
          document.body.appendChild(a);
          a.click();
        };
      }
    };
    xhr.send(null);
  }

  getAllUsers() {
    console.log(this.token)
    return this.httpClient.get(`${this.BASE_URL}/users`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    });
    
  }

  getStock(params) {
    return this.httpClient.get(`${this.BASE_URL}/stock`, {
      headers: headerOption.headers,
      params: params,
    });
  }

  getStockProgress() {
    return this.httpClient.get(`${this.BASE_URL}/stock/progress`, {
      headers: headerOption.headers
    });
  }

  userUpdate(params) {
    return this.httpClient.patch(
      `${this.BASE_URL}/user`,
      params,
      headerOption
    );
  }
  deleteUser(params) {
    return this.httpClient.delete(`${this.BASE_URL}/user`, {
      headers: headerOption.headers,
      params: params,
    });
  }

  pickNpack(file, flag): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('master_pick', 'false');
    formData.append('pp_file', file);
    const req = this.httpClient.post(`${this.BASE_URL}/pickandpack`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    });
    return req;
  }

  pickNpackStatus(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/pickandpack/status`, {
      headers: headerOption.headers
    });
  }
}
