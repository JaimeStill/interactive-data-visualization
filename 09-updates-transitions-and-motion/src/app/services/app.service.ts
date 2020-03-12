import { Injectable } from '@angular/core';

import { timer } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  private getRandom = (max: number = 30) => Math.floor(Math.random() * max);

  private generateBarData = (): {key: number, value: number}[] => {
    const data = new Array<{key: number, value: number}>();
    const rand = Math.floor(Math.random() * 13);
    const value = rand % 2 ? 25 : 30;

    for (let i = 0; i < value; i++) {
      data.push({key: i + 1, value: this.getRandom()});
    }

    return data;
  }

  private generateScatterData = (): number[][] => {
    const data = new Array<number[]>();
    const values = Math.floor(Math.random() * 10) + 30;

    for (let i = 0; i < values; i++) {
      data.push([this.getRandom(50), this.getRandom(50)]);
    }

    return data;
  }

  barStream = timer(0, 3000)
    .pipe(
      map(x => this.generateBarData())
    );

  scatterStream = timer(0, 3000)
    .pipe(
      map(x => this.generateScatterData())
    );
}
