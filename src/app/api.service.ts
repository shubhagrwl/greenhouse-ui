import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

const headerOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  BASE_URL = environment.BASE_URL;

  constructor(
    private httpClient: HttpClient,
    public matSnackBar: MatSnackBar
  ) {}

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
    return this.httpClient.get(`${this.BASE_URL}/users`, {
      headers: headerOption.headers,
    });
  }


  userUpdate(params) {
    return this.httpClient.post(
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
}
