import {
  Component,
  Input,
  DoCheck,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'scaled-scatterplot',
  templateUrl: 'scaled-scatterplot.component.html'
})
export class ScaledScatterplotComponent implements DoCheck {
  @Input() dataset: number[][];
  @Input() width = 500;
  @Input() height = 300;
  @Input() xPadding = 20;
  @Input() yPadding = 20;
  @Input() xTicks = 16;
  @Input() yTicks = 6;
  @Input() fillColor = 'salmon';

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  aScale: d3.ScalePower<number, number>;
  xAxis: d3.Axis<d3.AxisDomain>;
  yAxis: d3.Axis<d3.AxisDomain>;

  @ViewChild('target', { static: true }) target: ElementRef;

  clear = () => this.svg.remove();

  draw = () => {
    this.xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[0])])
      .range([this.xPadding, this.width - this.xPadding * 2]);

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([this.height - this.yPadding, this.yPadding]);

    this.aScale = d3.scaleSqrt()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([0, 10]);

    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(this.xTicks)

    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(this.yTicks)

    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width + this.xPadding)
      .attr('height', this.height + this.yPadding);

    this.svg.selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))
      .attr('r', d => this.aScale(d[1]));

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${this.height - this.yPadding})`)
      .style('fill', this.fillColor)
      .call(this.xAxis);

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.xPadding}, 0)`)
      .style('fill', this.fillColor)
      .call(this.yAxis);
  }

  ngDoCheck() {
    this.svg && this.clear();
    this.draw();
  }
}
