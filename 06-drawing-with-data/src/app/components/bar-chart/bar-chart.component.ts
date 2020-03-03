import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: 'bar-chart.component.html',
  styleUrls: ['bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  @Input() dataset: Array<number>;
  @Input() color = 'teal';

  @ViewChild('target', { static: true }) target: ElementRef;

  ngOnInit() {
    d3.select(this.target.nativeElement)
      .selectAll('div')
      .data(this.dataset)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .style('height', d => `${d * 5}px`)
      .style('background-color', this.color);
  }
}
