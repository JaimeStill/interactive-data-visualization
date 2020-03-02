# Data

Broadly speaking, data is structured information with potential for meaning.

Within the scope of d3 and browser-based visualization, data is limited to *text-based data*. If data can be presented in a *.txt* plain-text file, a *.csv* comma-separated value file, or as *JSON*, then it can be used with d3.

Whatever the data, it can't be made useful and visual until it is *attached* to something. In d3 lingo, the data must be *bound* to elements within the page.

## Generating Page Elements

Basic setup:

**home.component.html**

```html
<mat-form-field>
  <mat-label>Text value</mat-label>
  <input matInput [(ngModel)]="body" (keyup)="updateParagraph($event)" />
</mat-form-field>
<section class="target"></section>
```

```ts
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
```  

> The generic type for `d3.Selection` in the `paragraph` property definition is determined by hovering over the return value for `.append('p')` and viewing the return value in the method signature popup.

### Chaining Methods

This section will deconstruct the following d3 chain:

``` js
d3.select('section.target')
    .append('p')
    .text('New paragraph!');
```

Section | Description
--------|------------
`d3` | References the d3 object so its methods can be accessed
`.select('section.target')` | Accepts a CSS selector as input and returns a reference to the first element in the DOM that matches. In this case, `<section class="target">`.
`.append('p')` | Creates whatever new DOM element is specified and appends it to the end (but *just inside*) of whatever selection is being acted on. `p` is specified, so an empty `<p></p>` is created and placed directly inside of `<section class="target"></section>`. `append()` returns a reference to the new element it just created.
`.text('New paragraph!')` | Takes a string and inserts it between the opening and closing tags of the current selection. Because the previous method passed down a reference to a new `<p></p>`, `text()` transforms the element by placing the text within the element.

## Binding Data

Data visualization is a process of *mapping* data to visuals. Data in, visual properties out. Maybe bigger numbers make taller bars, or special categories trigger brighter colors. The mapping rules are up to you.

In d3, data input values are bound to elements in the DOM. Binding is like "attaching" or associating data to specific elements, so that later you can reference those values to apply mapping rules.

The `d3.data()` method is used to bind data to DOM elements. But there are two things needed in place first before data can be bound:

* The data
* A selection of DOM elements

For simplicity, this example will use an array of five numbers.

**home.component.html**  

```html
<mat-toolbar>Data Binding</mat-toolbar>
<section class="bind"></section>
```

**home.component.ts**

``` ts
dataset = [5, 10, 15, 20, 25];

ngOnInit() {
    d3.select('section.bind')
      .selectAll('p')
      .data(this.dataset)
      .enter()
      .append('p')
      .text(d => d)
      .style('color', d => d > 15 ? '#ff1e1f' : '#2200ff');
}
```

Section | Description
--------|------------
`d3.select('section.bind')` | Finds `<section class="bind">`.
`.selectAll('p')` | Selects all paragraphs in the `<section class="bind">`. Because none exist yet, this returns an empty selection. Think of this empty selection as representing the paragraphs that *will soon exist*.
`.data(this.dataset)` | Counts and parses the data values. There are five values in the array, so everything past this point is executed five times, once for each value.
`.enter()` | To create new, data-bound elements, the `enter()` function must be used. This method looks at the current DOM selection, and then at the data being handed to it. If there are more data values than corresponding DOM elements, then `enter()` *creates a new placeholder element` on which you can work. It hten hands off a reference to this new placeholder to the next step in the chain.
`.append('p')` | Takes the empty placeholder selection created by `enter()` and appends a `<p>` element into the DOM.
`.text(d => d)` | Inserts the current data value into the newly created `<p>`.
`.style('color', d => d > 15 ? '#ff1e1f' : '#2200ff')` | Sets the color style for the `<p>` based on the value of `d`. If d is greater than 15, it will be red, otherwise it will be indigo.

### Loading CSV Data

**src/assets/food.csv**  

```csv
Food,Deliciousness
Apples,9
Green Beans,5
Egg Salad Sandwich,4
Cookies,10
Liver,0.2
Burrito,7
```  

**home.component.ts**  

```ts
// optional conversion function
private foodConverter = (d: any) => {
    return {
      Food: d.Food,
      Deliciousness: parseFloat(d.Deliciousness)
    };
}

ngOnInit() {
    d3.csv('/assets/food.csv', this.foodConverter)
      .then(data => console.log(data));
}
```

