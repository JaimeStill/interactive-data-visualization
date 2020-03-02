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

