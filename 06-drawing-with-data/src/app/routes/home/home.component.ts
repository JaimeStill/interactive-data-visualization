import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  dataset = [27, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];
  drawingSvgData = [5, 10, 15, 20, 25];
  svgBarData = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  scatterData = [
    [10, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
  ];

  private getRandom = (max: number = 30) => Math.floor(Math.random() * max);

  ngOnInit() {
    this.dataset = new Array<number>();

    for (let i = 0; i < 25; i++) {
      this.dataset.push(this.getRandom());
    }
  }
}
