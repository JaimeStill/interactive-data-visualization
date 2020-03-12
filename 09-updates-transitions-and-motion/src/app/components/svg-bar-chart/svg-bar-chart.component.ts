import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {
  Observable,
  Subscription
} from 'rxjs';

import * as d3 from 'd3';

@Component({
  selector: 'svg-bar-chart',
  templateUrl: 'svg-bar-chart.component.html'
})
export class SvgBarChartComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  @Input() stream: Observable<{key: number, value: number}[]>;
  @Input() width = 900;
  @Input() height = 350;
  @Input() textX = 5;
  @Input() textY = 14;
  @Input() labelSize = 11;
  @Input() fillColor = 'white';
  @Input() fill = (scale: number) => `rgb(${scale}, 22, 88)`;

  @ViewChild('target', { static: true }) target: ElementRef;

  dataset: {key: number, value: number}[];
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  xScale: d3.ScaleBand<number>;
  yScale: d3.ScaleLinear<number, number>;

  private key = (d: any) => d.key;

  private setScale = () => {
    this.xScale = d3.scaleBand<number>()
      .domain(d3.range(this.dataset.length))
      .rangeRound([0, this.width])
      .paddingInner(0.05);

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d.value)])
      .range([this.labelSize, this.height]);
  }

  private initialize = () => {
    this.setScale();

    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.selectAll('rect')
      .data(this.dataset, this.key)
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', d => this.height - this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => this.yScale(d.value))
      .attr('fill', d => this.fill(Math.floor(Math.round(d.value * 10))));

    this.svg.selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .text(d => d.value)
      .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
      .attr('y', d => this.height - this.yScale(d.value) + this.textY)
      .attr('font-size', `${this.labelSize}px`)
      .attr('fill', this.fillColor)
      .attr('text-anchor', 'middle');
  }

  private draw = () => {
    this.setScale();

    const bars = this.svg.selectAll<SVGRectElement, unknown>('rect')
        .data(this.dataset, this.key);

    bars.enter()
      .append('rect')
      .attr('x', this.width)
      .attr('y', d => this.height - this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => this.yScale(d.value))
      .attr('fill', d => this.fill(Math.floor(Math.round(d.value * 10))))
      .merge(bars)
      .transition()
      .delay((d, i) => i / this.dataset.length * 1000)
      .duration(500)
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', d => this.height - this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => this.yScale(d.value))
      .attr('fill', d => this.fill(Math.floor(Math.round(d.value * 10))));

    const text = this.svg.selectAll<SVGTextElement, unknown>('text')
      .data(this.dataset, this.key);

    text.enter()
      .append('text')
      .attr('x', this.width)
      .attr('y', d => this.height - this.yScale(d.value) + this.textY)
      .attr('font-size', `${this.labelSize}px`)
      .attr('fill', this.fillColor)
      .attr('text-anchor', 'middle')
      .merge(text)
      .transition()
      .delay((d, i) => i / this.dataset.length * 1000)
      .duration(500)
      .text(d => d.value)
      .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
      .attr('y', d => this.height - this.yScale(d.value) + this.textY);

    this.svg.selectAll('rect')
      .data(this.dataset, this.key)
      .exit()
      .transition()
      .duration(500)
      .attr('x', -this.xScale.bandwidth())
      .remove();

    this.svg.selectAll('text')
      .data(this.dataset, this.key)
      .exit()
      .transition()
      .duration(500)
      .attr('x',-this.xScale.bandwidth())
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
    this.sub.unsubscribe();
  }
}
