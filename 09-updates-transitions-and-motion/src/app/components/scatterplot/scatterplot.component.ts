import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  Observable,
  Subscription
} from 'rxjs';

import * as d3 from 'd3';

@Component({
  selector: 'scatterplot',
  templateUrl: 'scatterplot.component.html'
})
export class ScatterplotComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  @Input() stream: Observable<number[][]>;
  @Input() width = 900;
  @Input() height = 350;
  @Input() xPadding = 30;
  @Input() yPadding = 30;
  @Input() xTicks = 16;
  @Input() yTicks = 6;
  @Input() fillColor = 'salmon';

  dataset: number[][];
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  aScale: d3.ScalePower<number, number>;
  xAxis: d3.Axis<d3.AxisDomain>;
  yAxis: d3.Axis<d3.AxisDomain>;

  @ViewChild('target', { static: true }) target: ElementRef;

  private setScale = () => {
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
  }

  private initialize = () => {
    this.setScale();

    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width + this.xPadding)
      .attr('height', this.height + this.yPadding);

    this.svg.append('clipPath')
      .attr('id', 'chart-area')
      .append('rect')
      .attr('x', this.xPadding)
      .attr('y', this.yPadding)
      .attr('width', this.width - this.xPadding * 3)
      .attr('height', this.height - this.yPadding * 2);

    this.svg.append('g')
      .attr('id', 'circles')
      .attr('clip-path', 'url(#chart-area)')
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))
      .attr('r', 2);

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height - this.yPadding})`)
      .style('fill', this.fillColor)
      .call(this.xAxis);

    this.svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.xPadding}, 0)`)
      .style('fill', this.fillColor)
      .call(this.yAxis);
  }

  draw = () => {
    this.setScale();

    this.svg.selectAll('circle')
      .data(this.dataset)
      .transition()
      .duration(1000)
      .on('start', (d, i, n) => {
        // thanks to this stackoverflow answer: https://stackoverflow.com/a/43552367/3971984
        d3.select(n[i])
          .attr('fill', 'salmon')
          .attr('r', 3)
      })
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))
      .transition()
      .duration(1000)
      .attr('fill', 'black')
      .attr('r', 2);

    this.svg.select('.x.axis')
      .transition()
      .duration(1000)
      .call(this.xAxis as any);

    this.svg.select('.y.axis')
      .transition()
      .duration(1000)
      .call(this.yAxis as any);

    this.svg.selectAll('circle')
      .data(this.dataset)
      .exit()
      .transition()
      .duration(1000)
      .attr('cx', this.width - this.xPadding)
      .remove();
  }

  ngOnInit() {
    this.sub = this.stream.subscribe(data => {
      if (data) {
        this.dataset = data;

        this.svg
          ? this.draw()
          : this.initialize();
      }
    });
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
