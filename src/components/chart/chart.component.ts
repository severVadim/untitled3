import {Component, Input, OnInit} from '@angular/core';
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chart:any = {};
  title = '';
  options = {
    vAxis: {
      title: 'Query procession time (milliseconds)',
    }
  };
  type = ChartType.ColumnChart;
  data = [];
  width = 550;
  height = 400;
  constructor() { }

  ngOnInit(): void {
    this.title = this.chart.operation;

    this.data = this.chart.response.map(function (resp:any) {
      let data = [];
      data.push(resp.dbName);
      data.push(resp.responseTime);
      return data;
    });
    console.log(this.data)
  }

}
