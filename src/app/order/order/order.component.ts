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
  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  onMasterPick(param: string) {
    $("#filePrint").prop('disabled', true);
    $("#printBtn").prop('disabled', true);
    $("#printUpload").prop('disabled', true);
    $("#fileMaster").prop('disabled', false);
    $("#masterBtn").prop('disabled', false);
    $("#masterUpload").prop('disabled', false);
    if (param === "true") {
      this.loaderFlag = true;
      this.apiService.pickNpack(this.file, 'true').subscribe((data: any) => {
        console.log(data);
        this.loaderFlag = false;
      });
    }

  }
  onPrintOnly(param: string) {
    $("#fileMaster").prop('disabled', true);
    $("#masterBtn").prop('disabled', true);
    $("#masterUpload").prop('disabled', true);
    $("#filePrint").prop('disabled', false);
    $("#printBtn").prop('disabled', false);
    $("#printUpload").prop('disabled', false);
    if (param === "false") {
      this.loaderFlag = true;
      this.apiService.pickNpack(this.file, 'true').subscribe((data: any) => {
        console.log(data);
        this.loaderFlag = false;
      });
    }
  }
}
