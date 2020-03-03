# Scales

Scales are functions that map from an input domain to an output range.

The values in any dataset are unlikely to correspond exactly to pixel measurements for use in your visualization. Scales provide a convenient way to map those data values to new values useful for visualization purposes.

d3 scales are *functions* with parameters that you define. Once they are created, you call the scale function and pass it a value, and it nicely returns a scaled output value. You can define and use as many scales as you like. A scale is a mathematical relationship, with no direct visual output.

A scale's *input domain* is the range of possible input data values, based on your real data. A scale's *output range* is the range of possible values, commonly used as display values in pixel units. The output range is completely up to you, as the information designer. If you decide that the shortest bar should be 10 pixels tall, and the tallest will be 350 pixels tall, then you could set an output range of 10 and 350.

For example, create a scale with an input domain of `[100, 500]` and an output range of `[10, 350]`. If you handed the low input value of 100 to that scale, it would return its lowest range value, 10. If you gave it 500, it would spit back 350. If you gave it 300, it would hand 180 back (300 is the center of the domain, and 180 is in the center of the range).

> For details on scales beyond `scaleLinear()`, see the [d3-scale README](https://github.com/d3/d3-scale/blob/master/README.md).

## Normalization

Normalization is the process of mapping a numeric value to a new value between 0 and 1, based on the possible minimum and maximum values. For example, with 365 days in the year, day number 310 maps to about 0.85, or 85% of hte way through the year.

With linear scales, we are just letting d3 handle the math of the normalization process. The input value is normalized according to the domain, and then the normalized value is scaled to the output range.

[![linear-scale](.images/05-linear-scale.png)](.images/05-linear-scale.png)  
*See the example in [LinearScaleComponent](./07-scales/src/app/components/linear-scale)*  

## Scaled Scatterplot

> Although not used in the book, check out Mike Bostock's [Margin Convention](https://observablehq.com/@d3/margin-convention) to see if it makes sense for our use case.

Apart from the functions used in the following example, `scaleLinear()` has three additional methods that are worth mentioning:

Function | Description
---------|------------
[`nice([count])`](https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice) | Tells the scale to take whatever input domain you gave to `domain()` and expand both ends to the nearest round value.
[`rangeRound([range])`](https://github.com/d3/d3-scale/blob/master/README.md#continuous_rangeRound) | Use `rangeRound()` in place of `range()`, and all values output by the scale will be rounded to the nearest whole number. This is useful if you want shapes to have exact pixel values, to avoid fuzzy edges that could arise with anti-aliasing.
[`clamp(clamp)`](https://github.com/d3/d3-scale/blob/master/README.md#continuous_clamp) | By default, a linear scale *can* return values outside of the specified range. For example, if given a value outside of its expected input domain, a scale will return a number also outside of the output range. Calling `clamp(true)` on a scale, however, forces all output values to be within the specified range. This means excessive values will be rounded to the range's low or high value (whichever is nearest).

### Scaled Scatterplot Component

**scaled-scatterplot.component.html**  

```html
<section #target
         class="container"></section>
```

**scaled-scatterplot.component.ts**

```ts
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
```

**home.component.html**

```html
<mat-toolbar>Scaled Scatterplot</mat-toolbar>
<section fxLayout="column"
         fxLayoutAlign="start stretch">
  <section fxLayout="row"
           fxLayoutAlign="start center">
    <section fxLayout="column"
             fxLayoutAlign="start stretch"
             fxFlex>
      <p class="mat-subheading-2">Width: {{width}}</p>
      <mat-slider [value]="width"
                  [min]="400"
                  [max]="2000"
                  [step]="10"
                  [tickInterval]="1"
                  (input)="updateWidth($event)"></mat-slider>
    </section>
    <section fxLayout="column"
             fxLayoutAlign="start stretch"
             fxFlex>
      <p class="mat-subheading-2">Height: {{height}}</p>
      <mat-slider [value]="height"
                  [min]="100"
                  [max]="500"
                  [step]="10"
                  [tickInterval]="1"
                  (input)="updateHeight($event)"></mat-slider>
    </section>
    <section fxLayout="column"
             fxLayoutAlign="start stretch"
             fxFlex>
      <p class="mat-subheading-2">Padding: {{padding}}</p>
      <mat-slider [value]="padding"
                  [min]="4"
                  [max]="80"
                  [step]="4"
                  [tickInterval]="1"
                  (input)="updatePadding($event)"></mat-slider>
    </section>
  </section>
  <mat-form-field>
    <mat-label>Fill Color</mat-label>
    <input matInput
           [value]="fillColor"
           (keyup.enter)="updateFillColor($event)" />
  </mat-form-field>
</section>
<scaled-scatterplot [dataset]="dataset"
                    [width]="width"
                    [height]="height"
                    [padding]="padding"
                    [fillColor]="fillColor"></scaled-scatterplot>
```

**home.component.ts**

```ts
import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
  ];

  width = 1700;
  height = 300;
  padding = 20;
  fillColor = 'salmon';

  updateWidth = (event: MatSliderChange) => this.width = event.value;
  updateHeight = (event: MatSliderChange) => this.height = event.value;
  updatePadding = (event: MatSliderChange) => this.padding = event.value;
  updateFillColor = (event: KeyboardEvent) => this.fillColor = (event.target as HTMLInputElement).value;
}
```  

[![scaled-scatterplot](.images/06-scaled-scatterplot.png)](.images/06-scaled-scatterplot.png)  

## Time Scales

**scaled-scatterplot.component.html**

```html
<section #target
         class="container"></section>
```

**scaled-scatterplot.component.ts**

```ts
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
```

**home.component.html**

```html
<mat-toolbar>Time Scale</mat-toolbar>
<time-scale></time-scale>
```

[![time-scale](.images/07-time-scale.png)](.images/07-time-scale.png)