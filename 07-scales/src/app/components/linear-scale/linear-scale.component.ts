import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MatSliderChange } from '@angular/material/slider';
import * as d3 from 'd3';

@Component({
  selector: 'linear-scale',
  templateUrl: 'linear-scale.component.html'
})
export class LinearScaleComponent implements OnInit {
  @Input() minDomain = 100;
  @Input() maxDomain = 500;
  @Input() minRange = 10;
  @Input() maxRange = 350;
  @Input() domainValue = 250;

  value: number;
  scale: d3.ScaleLinear<number, number>;

  private calculate = () => {
    this.scale.domain([this.minDomain, this.maxDomain]);
    this.scale.range([this.minRange, this.maxRange]);
    this.value = this.scale(this.domainValue);
  }

  ngOnInit() {
    this.scale = d3.scaleLinear();
    this.calculate();
  }

  updateMinDomain = (event: MatSliderChange) => {
    this.minDomain = event.value;

    this.domainValue = this.minDomain > this.domainValue
      ? this.minDomain
      : this.domainValue;

    this.calculate();
  }

  updateMaxDomain = (event: MatSliderChange) => {
    this.maxDomain = event.value;

    this.domainValue = this.maxDomain < this.domainValue
      ? this.maxDomain
      : this.domainValue;

    this.calculate();
  }

  updateMinRange = (event: MatSliderChange) => {
    this.minRange = event.value;

    this.calculate();
  }

  updateMaxRange = (event: MatSliderChange) => {
    this.maxRange = event.value;

    this.calculate();
  }

  updateDomainValue = (event: MatSliderChange) => {
    this.domainValue = event.value;

    this.calculate();
  }
}
