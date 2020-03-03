import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'time-scale',
  templateUrl: 'time-scale.component.html'
})
export class TimeScaleComponent implements OnInit {
  private parseTime = d3.timeParse('%m/%d/%Y');
  private formatTime = d3.timeFormat('%b %e');

  @Input() width = 1700;
  @Input() height = 300;
  @Input() padding = 40;

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  dataset: Array<{Date: Date, Amount: number }>;
  xScale: d3.ScaleTime<number, number>;
  yScale: d3.ScaleLinear<number, number>;

  @ViewChild('target', { static: true }) target: ElementRef;

  rowConverter = (d: { Date: string, Amount: string }) => {
    return {
      Date: this.parseTime(d.Date),
      Amount: parseInt(d.Amount)
    }
  }

  load = async () => {
    this.dataset = await d3.csv('/assets/time-scale-data.csv', this.rowConverter);

    this.xScale = d3.scaleTime()
      .domain([
        d3.min(this.dataset, d => d.Date),
        d3.max(this.dataset, d => d.Date)
      ])
      .range([this.padding, this.width - this.padding]);

    this.yScale = d3.scaleLinear()
      .domain([
        d3.min(this.dataset, d => d.Amount),
        d3.max(this.dataset, d => d.Amount)
      ])
      .range([this.height - this.padding, this.padding]);

    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', d => this.xScale(d.Date))
      .attr('cy', d => this.yScale(d.Amount))
      .attr('r', 2);

    this.svg.selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .text(d => this.formatTime(d.Date))
      .attr('x', d => this.xScale(d.Date) + 4)
      .attr('y', d => this.yScale(d.Amount) + 4)
      .attr('font-size', '11px')
      .attr('fill', '#2200ff');
  }

  ngOnInit() {
    this.load();
  }
}
