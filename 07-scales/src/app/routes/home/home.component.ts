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
