import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'svg-bar-chart',
  templateUrl: 'svg-bar-chart.component.html'
})
export class SvgBarChartComponent implements OnInit {
  @Input() dataset: Array<number>;
  @Input() width = 500;
  @Input() height = 100;
  @Input() barPad = 1;
  @Input() barScale = 4;
  @Input() textX = 5;
  @Input() textY = 14;
  @Input() labelSize = '11px';
  @Input() fillColor = 'white';
  @Input() fill = (scale: number) => `rgb(0, 0, ${scale})`

  @ViewChild('target', { static: true }) target: ElementRef;

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  ngOnInit() {
    this.svg = d3.select(this.target.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (this.width / this.dataset.length))
      .attr('y', d => this.height - (d * this.barScale))
      .attr('width', this.width / this.dataset.length - this.barPad)
      .attr('height', d => d * this.barScale)
      .attr('fill', d => this.fill(Math.floor(Math.round(d * 10))));

    this.svg.selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * (this.width / this.dataset.length) + (this.width / this.dataset.length - this.barPad) / 2)
      .attr('y', d => this.height - (d * this.barScale) + this.textY)
      .attr('font-size', this.labelSize)
      .attr('fill', this.fillColor)
      .attr('text-anchor', 'middle');
  }
}
