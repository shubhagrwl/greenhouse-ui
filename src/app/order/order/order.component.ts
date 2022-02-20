import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  file: File = null;
  loaderFlag = false;
  progressValue: number = 0;
  logs: any[] = [];
  stockFlag: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    $("#filePrint").prop('disabled', true);
    $("#printUpload").prop('disabled', true);
    $("#fileMaster").prop('disabled', true);
    $("#masterUpload").prop('disabled', true);
  }
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  onClickReport() {
    this.stockFlag = true
  }
  clickEventHandler(eventName: string) {
    if (eventName === 'masterPick') {
      this.onMasterPick('')
    } else {
      this.onPrintOnly('')
    }
  }

  onMasterPick(param: string) {
    $("#filePrint").prop('disabled', true);
    // $("#printBtn").prop('disabled', true);
    $("#printUpload").prop('disabled', true);
    $("#fileMaster").prop('disabled', false);
    $("#masterBtn").prop('disabled', false);
    $("#masterUpload").prop('disabled', false);
    if (param === "true") {
      this.loaderFlag = true;
      this.apiService.pickNpack(this.file, 'true').subscribe((data: any) => {
        if (data) {
          console.log(data)
          if (data.data.code === 202) {
            this.loaderFlag = false;
            this.onClickReport();
            this.progress();
            this.apiService.openSnackBar('File Accepted, Pick & Pack Lists will be emailed to you upon completion', "Close");
          } else {
            this.loaderFlag = false;
            this.apiService.openSnackBar('Incompatible file. Try a different file', "Close");
          }
        }
      }, (err) => {
        this.loaderFlag = false;
        this.apiService.openSnackBar('Incompatible file. Try a different file', "Close");
      });
    }

  }
  onPrintOnly(param: string) {
    console.log(param);
    $("#fileMaster").prop('disabled', true);
    // $("#masterBtn").prop('disabled', true);
    $("#masterUpload").prop('disabled', true);
    $("#filePrint").prop('disabled', false);
    $("#printBtn").prop('disabled', false);
    $("#printUpload").prop('disabled', false);
    if (param === "false") {
      this.loaderFlag = true;
      this.apiService.pickNpack(this.file, 'true').subscribe((data: any) => {
        if (data) {
          console.log(data.data.code);
          if (data.data.code === 202) {
            this.loaderFlag = false;
            this.onClickReport();
            this.progress();
            this.apiService.openSnackBar('File Accepted, Pick & Pack Lists will be emailed to you upon completion', "Close");
          } else {
            this.loaderFlag = false;
            this.apiService.openSnackBar('Incompatible file. Try a different file', "Close");
          }
        }
      }, (err) => {
        this.loaderFlag = false;
        this.apiService.openSnackBar('Incompatible file. Try a different file', "Close");
      });
    }
  }
  progress() {
    this.apiService.pickNpackStatus().subscribe((data: any) => {
      const per = data.data.progress;
      this.progressValue = per;
      this.logs = data.data.logger;
      console.log(data.data.logger);
      if (data.data.progress !== 100) {
        this.progress()
      }
    })
  }
}
