import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'svg-scatterplot',
  templateUrl: 'svg-scatterplot.component.html'
})
export class SvgScatterplotComponent implements OnInit {
  @Input() dataset: number[][];
  @Input() width = 550;
  @Input() height = 100;
  @Input() fontSize = '11px';
  @Input() fillColor = 'red';

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  @ViewChild('target', { static: true }) target: ElementRef;

  ngOnInit() {
    this.svg = d3.select(this.target.nativeElement)
                 .append('svg')
                 .attr('width', this.width)
                 .attr('height', this.height);

    this.svg.selectAll('circle')
            .data(this.dataset)
            .enter()
            .append('circle')
            .attr('cx', d => d[0])
            .attr('cy', d => d[1])
            .attr('r', d => Math.sqrt(this.height - d[1]));

    this.svg.selectAll('text')
            .data(this.dataset)
            .enter()
            .append('text')
            .text(d => `${d[0]},${d[1]}`)
            .attr('x', d => d[0])
            .attr('y', d => d[1])
            .attr('font-size', this.fontSize)
            .attr('fill', this.fillColor);
  }
}
