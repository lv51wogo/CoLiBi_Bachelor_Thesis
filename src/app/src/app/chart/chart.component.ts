import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas' ,{static: false}) chartCanvas: ElementRef | undefined;
  chart: any;

  @Input()
  chatType!: string;
  @Input()
  label!: string;
  @Input()
  labelsXAxis!: any[];
  @Input()
  labelsYAxis!: any[];

  ngAfterViewInit(): void {
    this.chartMethod();
    this.chart.options.gridLines = 10;
  }

  ngOnChanges () {
    this.chart.destroy();
    this.ngAfterViewInit()
  }


  chartMethod() {
    // @ts-ignore
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.chatType,
      data: {
        labels: this.labelsXAxis,
        datasets: [
          {
            label: this.label,
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgb(41, 128, 12)',
            borderColor: 'rgb(107, 180, 60)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(41, 128, 12)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(41, 128, 12)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 3,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.labelsYAxis,
            spanGaps: false,
          }
        ]
      },
    });
  }
}
