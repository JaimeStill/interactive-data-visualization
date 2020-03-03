import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'drawing-svg',
  templateUrl: 'drawing-svg.component.html'
})
export class DrawingSvgComponent implements OnInit {
  @Input() dataset: Array<number>;
  @Input() width = 500;
  @Input() height = 100;
  @Input() fill = `#2200ff`;
  @Input() stroke = `#0099ff`;

  @ViewChild('target', { static: true }) target: ElementRef;

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  ngOnInit() {
    this.svg = d3.select(this.target.nativeElement)
                 .append('svg')
                 .attr('width', this.width)
                 .attr('height', this.height);

    this.svg.selectAll('circle')
            .data(this.dataset)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => (i * 50) + 25)
            .attr('cy', this.height / 2)
            .attr('r', d => d)
            .attr('fill', this.fill)
            .attr('stroke', this.stroke)
            .attr('stroke-width', d => d / 2);
  }
}
