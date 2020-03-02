import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  body = 'New paragraph!';
  paragraph: d3.Selection<HTMLParagraphElement, unknown, HTMLElement, any>;
  dataset = [5, 10, 15, 20, 25];

  private foodConverter = (d: any) => {
    return {
      Food: d.Food,
      Deliciousness: parseFloat(d.Deliciousness)
    };
  }

  ngOnInit() {
    this.paragraph = d3.select('section.target')
      .append('p');

    this.paragraph.text(this.body);

    d3.csv('/assets/food.csv', this.foodConverter)
      .then(data => console.log(data));

    d3.select('section.bind')
      .selectAll('p')
      .data(this.dataset)
      .enter()
      .append('p')
      .text(d => d)
      .style('color', d => d > 15 ? '#ff1e1f' : '#2200ff');
  }

  updateParagraph = (event: KeyboardEvent) => this.paragraph.text((event.target as HTMLInputElement).value);
}
