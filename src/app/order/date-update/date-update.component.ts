import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DateUpdate } from 'src/app/interface';
@Component({
  selector: 'app-date-update',
  templateUrl: './date-update.component.html',
  styleUrls: ['./date-update.component.css']
})
export class DateUpdateComponent implements OnInit {
  dateInterface = new DateUpdate('', '', '', '');
  programStartFlag = false;
  startFlagDisable = false;
  lastRunningTime;
  programContinueFlag = false;
  status = false;
  statusParam = { target: { value: 'status' } };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.onStatus(this.statusParam);
    console.log(this.dateInterface)
  }

  onStart(event) {
    console.log(event.target.value);
    this.dateInterface.start = event.target.value;
    let params = new HttpParams();
    params = params.append("status", this.dateInterface.start);
    this.apiService.programSatus(params).subscribe((data: any) => {
      if (data) {
        this.onStatus(this.statusParam);
        this.programStartFlag = true;
        this.startFlagDisable = true;
        console.log(data);
      } else {
        this.apiService.openSnackBar(data.data.message, "Close")

      }
    }, err => {
      console.log(err);
      this.apiService.openSnackBar(err.error.data.message, "Close")
    })
  }
  onStop(event) {
    console.log(event.target.value);
    this.dateInterface.stop = event.target.value;
    let params = new HttpParams();
    params = params.append("status", this.dateInterface.stop);
    this.apiService.programSatus(params).subscribe((data: any) => {
      if (data) {
        this.onStatus(this.statusParam);
        this.programStartFlag = false;
        this.startFlagDisable = false;
        console.log(data);
      } else {
        this.apiService.openSnackBar(data.data.message, "Close")

      }
    }, err => {
      console.log(err);
      this.apiService.openSnackBar(err.error.data.message, "Close")

    })
  }

  onStatus(event) {
    console.log(event.target.value);
    this.dateInterface.status = event.target.value;
    let params = new HttpParams();
    params = params.append("status", this.dateInterface.status);
    this.apiService.programSatus(params).subscribe((data: any) => {
      if (data.data.status) {
        this.status = true
        this.programContinueFlag = data.data.status;
        this.lastRunningTime = data.data.last_running_time;
        this.programStartFlag = true;
        this.startFlagDisable = true;
        console.log(data);
      } else {
        this.status = true;
        this.programContinueFlag = data.data.status;
        this.programStartFlag = false;
        this.startFlagDisable = false;
      }
    }, err => {
      console.log(err);
      this.apiService.openSnackBar(err.error.data.message, "Close")

    })
  }


  onDateChange(event) {
    let params = new HttpParams();
    if (this.dateInterface.datepicker != '') {
      let newDate = new Date(this.dateInterface.datepicker).toISOString().replace(".000Z", "Z");
      console.log(newDate);
      params = params.append("time", newDate);
      this.apiService.dateUpdate(params).subscribe((data: any) => {
        if (data) {
          console.log(data);
        } else {
          this.apiService.openSnackBar(data.data.message, "Close")

        }
      }, err => {
        console.log(err);
        this.apiService.openSnackBar(err.error.data.message, "Close")

      })
    } else {
      this.apiService.openSnackBar("Please select Date", "Close")
    }

  }

  onDateUpdate(event) {
    this.dateInterface.datepicker = this.lastRunningTime;
  }

}
