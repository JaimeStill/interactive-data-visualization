import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  dataset: number[];

  private getRandom = (max: number = 30) => Math.floor(Math.random() * max);

  private generateData = () => {
    const data = new Array<number>();

    for (let i = 0; i < 25; i++) {
      data.push(this.getRandom());
    }

    return data;
  }

  ngOnInit() {
    this.dataset = this.generateData();
  }
}
