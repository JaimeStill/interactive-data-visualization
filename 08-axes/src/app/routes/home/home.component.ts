import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
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
    [220, 88]
  ];

  width = 1380;
  height = 300;
  xPadding = 20;
  yPadding = 20;
  xTicks = 16;
  yTicks = 6;
  fillColor = 'salmon';
  points = 50;

  updateWidth = (event: number) => this.width = event;
  updateHeight = (event: number) => this.height = event;
  updateXPadding = (event: number) => this.xPadding = event;
  updateYPadding = (event: number) => this.yPadding = event;
  updateXTicks = (event: number) => this.xTicks = event;
  updateYTicks = (event: number) => this.yTicks = event;
  updateFillColor = (event: string) => this.fillColor = event;

  updatePoints = (event: number) => {
    this.points = event;
    this.dataset = this.generateDataset();
  };

  private generateDataset = () : number[][] => {
    const data = new Array<number[]>();

    const xRange = Math.random() * 1000;
    const yRange = Math.random() * 1000;

    for (let i = 0; i < this.points; i++) {
      const x = Math.floor(Math.random() * xRange);
      const y = Math.floor(Math.random() * yRange);
      data.push([x, y]);
    }

    return data;
  }

  ngOnInit() {
    this.dataset = this.generateDataset();
  }
}
