import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  body = 'New paragraph!';
  paragraph: d3.Selection<HTMLParagraphElement, unknown, HTMLElement, any>;

  ngOnInit() {
    this.paragraph = d3.select('section.target')
      .append('p');

    this.paragraph.text(this.body);
  }

  updateParagraph = (event: KeyboardEvent) => this.paragraph.text((event.target as HTMLInputElement).value);
}
