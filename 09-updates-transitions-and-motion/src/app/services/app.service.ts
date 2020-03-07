import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  private getRandom = (max: number = 30) => Math.floor(Math.random() * max);

  private generateData = (): number[] => {
    const data = new Array<number>();
    const rand = Math.floor(Math.random() * 13);
    const value = rand % 2 ? 25 : 30;

    console.log('rand', rand);
    console.log('rand % 2', rand % 2);
    console.log('value', value);

    for (let i = 0; i < value; i++) {
      data.push(this.getRandom());
    }

    console.log('data.length', data.length);
    return data;
  }

  begin = interval(3000)
    .pipe(
      map(x => this.generateData())
    );
}
