import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
declare var $: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  reportFlag = false;
  fromDate;
  toDate;
  saleStatus;
  stockFlag = false;
  stock : any;
  loaderFlag = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    $("input:checkbox").on('click', function () {
      // in the handler, 'this' refers to the box clicked on
      var $box = $(this);
      if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    });
  }

  onClickReport() {
    this.reportFlag = true
  }

  onCheckboxClick(event) {
    this.saleStatus = event.target.value;
  }
  stockCheck() {
    if (this.fromDate === undefined || this.toDate === undefined || this.saleStatus === undefined) {
      this.apiService.openSnackBar('Please select From date, To date and status', "Close")
      return;
    } else {
      let params = new HttpParams();
      params = params.append("from", new Date(this.fromDate).toISOString().replace(".000Z", "Z"));
      params = params.append("to", new Date(this.toDate).toISOString().replace(".000Z", "Z"));
      params = params.append("status", this.saleStatus);
      this.loaderFlag = true;
      this.apiService.getStock(params).subscribe((data: any) => {
        if (data) {
          this.loaderFlag = false;
          this.stockFlag = true;
          this.reportFlag = false;
          this.stock = data;
          console.log(data);
        } else {
          this.apiService.openSnackBar(data.data.message, "Close")
        }
      }, err => {
        console.log(err);
        this.apiService.openSnackBar(err.error.data.message, "Close")

      })
    }
  }
}
