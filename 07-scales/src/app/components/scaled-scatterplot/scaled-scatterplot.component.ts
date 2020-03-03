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
  @Input() padding = 20;
  @Input() fontSize = '11px';
  @Input() fillColor = 'red';

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  aScale: d3.ScalePower<number, number>;

  @ViewChild('target', { static: true }) target: ElementRef;

  clear = () => this.svg.remove();

  draw = () => {
    this.xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[0])])
      .range([this.padding, this.width - this.padding * 2]);

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([this.height - this.padding, this.padding]);

    this.aScale = d3.scaleSqrt()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([0, 10]);

    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))
      .attr('r', d => this.aScale(d[1]));

    this.svg.selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .text(d => `${d[0]},${d[1]}`)
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('font-size', this.fontSize)
      .attr('fill', this.fillColor);
  }

  ngDoCheck() {
    this.svg && this.clear();
    this.draw();
  }
}
